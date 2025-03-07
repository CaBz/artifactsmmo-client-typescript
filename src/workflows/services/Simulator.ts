import {CharacterGateway} from "../../gateways/CharacterGateway.js";
import {Monster} from "../../entities/Monster.js";
import {Character} from "../../entities/Character.js";
import {Monsters} from "../../lexical/Monsters.js";
import {StatEffects} from "../../lexical/TypeEffects.js";
import * as Utils from "../../Utils.js";
import {Item, ItemType} from "../../entities/Item.js";
import {Items} from "../../lexical/Items.js";
import {Equippables} from "../../lexical/Equippables.js";
import {
    AllEquippableSlots,
    EquippableSlot,
    EquippableSlots,
    EquippableSlotToType
} from "../../lexical/EquippableSlot.js";
import {ArtifactsClient} from "../../gateways/ArtifactsClient.js";
import {Recipe, Recipes, ResourceItem} from "../../lexical/Recipes.js";
import {Skills} from "../../lexical/Skills.js";
import {
    CraftableCooking,
    CraftableGearcrafting,
    CraftableJewelry,
    CraftableWeaponcrafting
} from "../../lexical/Craftables.js";
import {Banker} from "./Banker.js";
import {Effects} from "../../lexical/Effects.js";

export class Simulator {
    private character: Character;

    constructor(
        private readonly client: ArtifactsClient,
        private readonly characterGateway: CharacterGateway,
        private readonly monsters: Map<string, Monster>,
        private readonly items: Map<string, Item>,
        private readonly banker: Banker,
    ) {
    }

    async loadCharacter(): Promise<void> {
        if (!this.character) {
            this.character = await this.characterGateway.status();
        }
    }

    async findBestSetAgainst(code: Monsters, level: number): Promise<void> {
        await this.loadCharacter();

        const attackerStats: any = this.getEntityStats(this.character.getAllStats());
        const values: any = this.calculateSimulationFor(attackerStats, code, 1000);

        if (level === -1) {
            level = this.character.level;
        }

        const headline =
            `| ${'Slot'.padEnd(12, ' ')} `
            + `| ${'Item'.padEnd(23, ' ')} `
            + `| ${'Lv.'.padStart(3, ' ')} `
            + `| Fights `
            + `| ${'Wins'.padStart(4, ' ')} `
            + `| ${'Losses'.padStart(6, ' ')} `
            + `| ${'Rate'.padStart(6, ' ')} `
            + `| Turns `
            + `| Atk HP `
            + `| Def HP `
            + `|`
        const line = `| ${'-'.repeat(headline.length - 4)} |`

        console.log(`Current equipped items: ${values.successRate}% in ${values.averageTurns} turns`);
        console.log(line);
        console.log(headline);
        console.log(line);

        AllEquippableSlots.forEach((slot: EquippableSlot) => {
            const itemType = EquippableSlotToType[slot] || undefined;
            if (itemType === undefined) {
                return;
            }

            // Get a baseline of stats without current equipped items
            const stats: any = JSON.parse(JSON.stringify(attackerStats));
            const equippedItemCode: any = this.character.getEquippedGear(slot);
            if (equippedItemCode) {
                const equippedItem = this.items.get(equippedItemCode)!;
                equippedItem.effects.forEach((effect: any) => {
                    stats[effect.code] -= effect.value;
                });
            }

            const items = Array.from(this.items.values()).filter((item: Item) => item.type === itemType && (item.level > (level - 9) && item.level <= level));
            items.sort((a, b) => a.level - b.level);
            items.forEach((item: Item) => {
                const copyStats = JSON.parse(JSON.stringify(stats));
                item.effects.forEach((effect: any) => {
                    copyStats[effect.code] += effect.value;
                });

                const simulationResult: any = this.calculateSimulationFor(copyStats, code, 1000);

                const logger: any = simulationResult.successRate > values.successRate ? console.error : console.log;
                logger(
                    '|',
                    ((equippedItemCode == item.code ? '* ' : '') + slot).padEnd(12, ' '), '|',
                    item.name.padEnd(23, ' '), '|',
                    item.level.toString().padStart(3, ' '), '|',
                    simulationResult.fights.toString().padStart(6, ' '), '|',
                    simulationResult.wins.toString().padStart(4, ' '), '|',
                    simulationResult.losses.toString().padStart(6, ' '), '|',
                    simulationResult.successRate.toString().padStart(6, ' '), '|',
                    simulationResult.averageTurns.toString().padStart(5, ' '), '|',
                    simulationResult.averageAttackerHP.toString().padStart(6, ' '), '|',
                    simulationResult.averageDefenderHP.toString().padStart(6, ' '), '|',
                );

                return;
            });
            console.log(line);
        });

        return;
    }

    async findNextToDo(name: Skills, hideNotCraftable: string | undefined): Promise<void> {
        await this.loadCharacter();

        const bank: any = await this.banker.getBank();
        const characterSkill = this.character.getSkill(name);
        const maximumInventory: number = 99999;
        const itemsToCraft: any[] = [];
        let craftables: Items[] = [];
        switch (name) {
            case Skills.Gearcrafting:
                craftables = CraftableGearcrafting;
                break;
            case Skills.Weaponcrafting:
                craftables = CraftableWeaponcrafting;
                break;
            case Skills.Jewelrycrafting:
                craftables = CraftableJewelry;
                break;
            case Skills.Cooking:
                craftables = CraftableCooking;
                break;
            default:
                throw new Error('Not implemented');
        }


        craftables.forEach((code: Items) => {
            const recipe: Recipe = Recipes.getFor(code);

            if (recipe.level <= characterSkill.level && recipe.level > (characterSkill.level - 10)) {
                const recipeItems: any[] = [];
                const recipeQuantityFromBank = this.banker.calculateRecipeQuantityFromBankItems(bank, recipe, maximumInventory)
                recipe.items.forEach((recipeItem: ResourceItem) => {
                    const bankQuantity = bank[recipeItem.code] || 0;
                    recipeItems.push({bankQuantity, code: recipeItem.code, quantity: recipeItem.quantity});
                });
                itemsToCraft.push({ item: this.items.get(code)!, recipeItems: recipeItems, recipeQuantityBank: recipeQuantityFromBank});
            }
        });

        itemsToCraft.sort((a, b) => a.item.level - b.item.level || a.recipeQuantityBank - b.recipeQuantityBank);
        itemsToCraft.forEach((item: any) => {
            if (hideNotCraftable !== undefined && item.recipeQuantityBank === 0) {
                return;
            }

            console.error(`${item.item.code} - lv.${item.item.level} = x${item.recipeQuantityBank}`);
            item.recipeItems.forEach((recipeItem: any) => {
                console.log(`    * x${recipeItem.quantity} ${recipeItem.code} [Bank: ${recipeItem.bankQuantity}] = ${item.recipeQuantityBank * recipeItem.quantity}`);
            });
            console.log();
        });
    }

    async findBestUsableEquippables(code: Monsters, maxLevel: number) {
        await this.loadCharacter();
        const attackerStats = this.getEntityStats(this.character.getAllStats());
        const values: any = this.calculateSimulationFor(attackerStats, code, 1000);

        console.log(`Current equipped items: ${values.successRate}% in ${values.averageTurns} turns`);
        console.log();

        const bank: any = await this.banker.getBank();

        EquippableSlots.forEach((slot: EquippableSlot) => {
            const result: any[] = this.simulateForEquipmentSlot(code, slot, maxLevel);

            console.error(`${slot} => ${result.length} possible upgrades`);
            result.forEach((entry: any) => {
                // Don't want to see items already equipped
                if (this.character.hasEquipped(entry.item)) {
                    return;
                }

                // Don't want to see items less successful
                if (entry.successRate < values.successRate) {
                    return;
                }

                // Don't want to see items that creates more turns
                if (entry.turns >= values.averageTurns) {
                    return;
                }

                const item = this.items.get(entry.item)!;
                const recipe = item.isCraftable ? Recipes.getFor(entry.item) : undefined;

                const quantity: number = (bank[entry.item] || 0) + this.character.holdsHowManyOf(entry.item);
                let isCraftable: boolean = item.isCraftable;
                let recipeItems: string[] = [];
                recipe?.items.forEach((recipeItem: ResourceItem) => {
                    const bankQuantity = bank[recipeItem.code] || 0;
                    recipeItems.push(`x${recipeItem.quantity} ${recipeItem.code}`);

                    if (bankQuantity < recipeItem.quantity) {
                        isCraftable = false;
                        return
                    }
                });

                const logger: any = quantity === 0 && !isCraftable ? console.error : console.log;
                logger(`* [lv.${item.level.toString()}] ${item.code} = ${entry.successRate}% in ${entry.turns} turns => Available [x${quantity}] | Craftable [${isCraftable ? 'Y' : 'N'}] ${recipeItems.join(', ')}`);
            });
            console.log();
        });
    }

    async findBestUsableEquippableSlot(code: Monsters, slot: EquippableSlot, maxLevel: number) {
        await this.loadCharacter();

        const result: any = this.simulateForEquipmentSlot(code, slot, maxLevel);

        console.log(result);
    }

    async simulateAgainst(code: Monsters, logLevel: string) {
        await this.loadCharacter();
        const attackerStats: any = this.getEntityStats(this.character.getAllStats());

        const result: any = this.simulateWithStatsAgainst(attackerStats, code, logLevel);
        console.log(result);
    }

    async simulateAgainstFor(code: Monsters, loops: number): Promise<any> {
        await this.loadCharacter();
        const attackerStats: any = this.getEntityStats(this.character.getAllStats());

        return this.calculateSimulationFor(attackerStats, code, loops);
    }

    async simulateAgainstAllMonsters(): Promise<void> {
        await this.loadCharacter();
        const attackerStats: any = this.getEntityStats(this.character.getAllStats());

        const monsters: Monster[] = Array.from(this.monsters.values());
        monsters.sort((a, b) => a.level - b.level);

        const numberFormatter = new Intl.NumberFormat('en-us', {minimumFractionDigits: 2});
        const headline = `| ${Utils.formatForMiddle('Monster', 16)} `
            + `| Lv. `
            + `| Success % `
            + `| Turns  `
            + `| Avg. Atk. HP `
            + `| Avg. Def. HP `
            + `| ${Utils.formatForMiddle('Monster Weaknesses', 23)} `
            + `| ${Utils.formatForMiddle('Monster Strengths', 23)} `
            + `| ${Utils.formatForMiddle('Effects', 14)} `
            + `| ${Utils.formatForMiddle('Drops', 93)} `
            + `|`;

        console.log('-'.repeat(headline.length));
        console.log(headline);
        console.log('-'.repeat(headline.length));

        let monster: Monster, values: any, logger: any, analyzes: any;
        let effects: any[], drops: any[];

        for (let i=0; i<monsters.length; i++) {
            monster = monsters[i]!;
            values = await this.calculateSimulationFor(attackerStats, monster.code as Monsters, 1000);
            analyzes = await this.analyzeFightTurn(monster.code as Monsters);

            effects = monster.effects.map(effect => effect.code);
            drops = monster.drops.map(drop => drop.code);

            logger = values.successRate === 100 ? console.info : console.error;
            logger(
                `| ${monster.name.padEnd(16)} `
                + `| ${monster.level.toString().padStart(3)} `
                + `| ${numberFormatter.format(values.successRate).padStart(8)}% `
                + `| ${numberFormatter.format(values.averageTurns).padStart(6)} `
                + `| ${numberFormatter.format(values.averageAttackerHP).padStart(12)} `
                + `| ${numberFormatter.format(values.averageDefenderHP).padStart(12)} `
                + `| ${analyzes.attack.goodAgainst.join(', ').padEnd(23, ' ')} `
                + `| ${analyzes.defend.weakAgainst.join(', ').padEnd(23, ' ')} `
                + `| ${(effects.length === 0 ? '(none)' : effects.join(', ')).padEnd(14, ' ')} `
                + `| ${(drops.length === 0 ? '(none)' : drops.join(', ')).padEnd(93, ' ')} `
                + `|`
            );
        }

        console.log('-'.repeat(headline.length));
    }

    async analyzeFightTurn(code: Monsters): Promise<void> {
        await this.loadCharacter();
        const monster: Monster = this.monsters.get(code)!;

        const attackerStats: any = this.getEntityStats(StatEffects.map((stat) => {
            const value = stat.startsWith('attack') ? 1000 : 0;
            return {code: stat, value};
        }));
        const monsterStats: any = this.getEntityStats(monster.getAllStats());

        const characterAgainstMonster = this.fight(1, 'Dummy', attackerStats, monster.name, monsterStats, false);
        const monsterAgainstCharacter = this.fight(1, monster.name, monsterStats, 'Dummy', attackerStats, false);

        const result: any = {
            attack: {
                goodAgainst: [],
                weakAgainst: [],
            },
            defend: {
                goodAgainst: [],
                weakAgainst: [],
            }
        }

        const elements: string[] = ['air', 'earth', 'fire', 'water'];
        elements.forEach((element: string) => {
            if (characterAgainstMonster[element].damage >= 1000) {
                result.attack.goodAgainst.push(element);
            } else {
                result.attack.weakAgainst.push(element);
            }

            if (monsterAgainstCharacter[element].damage) {
                result.defend.weakAgainst.push(element);
            } else {
                result.defend.goodAgainst.push(element);
            }
        });

        return result;
    }

    async simulateWithItemCodeAgainst(monsterCode: Monsters, itemCode: Items) {
        await this.loadCharacter();

        const item: Item = this.items.get(itemCode)!;
        const values = await this.simulateWithItemAgainst(monsterCode, item, 1000);

        console.log(values);
    }

    private simulateForEquipmentSlot(code: Monsters, slot: EquippableSlot, maxLevel: number) {
        let result: any = [];
        Equippables.forEach((itemCode: Items) => {
            const item = this.items.get(itemCode)!;
            if (item.equippableSlot !== slot) {
                return;
            }

            if (item.level > maxLevel) {
                return;
            }

            if (this.character.level < item.level) {
                return;
            }

            const values: any = this.simulateWithItemAgainst(code, item, 1000);

            result.push({ item: item.code, level: item.level, successRate: values.successRate, turns: values.averageTurns});
        });

        result.sort((a: any, b: any) => b.successRate - a.successRate || b.turns - a.turns || b.level - a.level);

        return result;
    }

    private simulateWithItemAgainst(monsterCode: Monsters, item: Item, fights: number) {
        const equippedGears = this.character.getEquippedGears();

        const stats = StatEffects.map((stat) => {
            return {code: stat, value: 0};
        })

        const attackerStats: any = this.getEntityStats(stats);
        attackerStats.hp += this.calculateCharacterHP();

        equippedGears.forEach((itemCode: Items) => {
            let equippedItem = this.items.get(itemCode)!;
            if (equippedItem.equippableSlot === item.equippableSlot) {
                equippedItem = item;
            }

            equippedItem.effects.forEach((effect: any) => {
                attackerStats[effect.code] += effect.value;
            });
        });

        return this.calculateSimulationFor(attackerStats, monsterCode, fights);
    }

    private simulateWithStatsAgainst(attackerStats: any, code: Monsters, logLevel: string) {
        const monster: Monster = this.monsters.get(code)!;
        const defenderStats: any = this.getEntityStats(monster.getAllStats());

        if (logLevel === 'details') {
            console.log(Utils.LINE);
            Utils.logHeadline(`SIMULATION FIGHT`);
            console.log(Utils.LINE);
        }

        const turns = this.executeFight(
            this.character.name,
            attackerStats,
            monster.name,
            defenderStats,
            logLevel === 'details'
        );

        if (logLevel === 'details') {
            console.log(Utils.LINE);
        }

        let fightResult = `${this.character.name} (${attackerStats.hp.toString().padStart(4, ' ')}hp) vs`;
        fightResult = `${fightResult} ${monster.name.padEnd(16, ' ')} (${defenderStats.hp.toString().padStart(4, ' ')}hp) =>`;
        fightResult = `${fightResult} vs lv.${monster.level.toString().padStart(2, ' ')} =`;

        const won = attackerStats.hp > 0 && turns < 100;
        const result = {won, turns, attackerHP: attackerStats.hp, defenderHP: defenderStats.hp};
        if (!['details', 'summary'].includes(logLevel)) {
            return result;
        }

        if (won) {
            Utils.logHeadline(`${fightResult}  WIN - ${turns.toString().padStart(3, ' ')} TURNS`);
        } else {
            Utils.errorHeadline(`${fightResult} LOSS - ${turns.toString().padStart(3, ' ')} TURNS`)
        }

        if (logLevel === 'details') {
            this.logFighterDetails(this.character, attackerStats, monster, defenderStats);
        }

        return result;
    }

    private calculateSimulationFor(attackerStats: any, code: Monsters, loops: number) {
        let result: any,
            clonedAttackerStats: any;

        let turns: number = 0,
            attackerHP: number = 0,
            defenderHP: number = 0,
            wins: number = 0;

        for (let i=0; i<loops; i++) {
            clonedAttackerStats = JSON.parse(JSON.stringify(attackerStats));
            result = this.simulateWithStatsAgainst(clonedAttackerStats, code, 'none');
            turns += result.turns;
            attackerHP += result.attackerHP;
            defenderHP += result.defenderHP;
            wins += result.won ? 1 : 0;
        }

        return {
            fights: loops,
            wins,
            losses: loops - wins,
            successRate: Math.round((wins / loops) * 10000) / 100,
            averageTurns: Math.round((turns / loops) * 100) / 100,
            averageAttackerHP: Math.round((attackerHP / loops) * 100) / 100,
            averageDefenderHP: Math.round((defenderHP / loops) * 100) / 100,
        }
    }

    private executeFight(attackName: any, attackerStats: any, defenderName: any, defenderStats: any, withLogs: boolean): number {
        let tmp;

        let turn = 0;
        while (attackerStats.hp > 0 && attackerStats.hp > 0) {
            turn++;
            this.fight(turn, attackName, attackerStats, defenderName, defenderStats, withLogs);

            tmp = attackName;
            attackName = defenderName;
            defenderName = tmp;

            tmp = attackerStats;
            attackerStats = defenderStats;
            defenderStats = tmp;
        }

        return turn;
    }

    private fight(turn: number, attackerName: any, attackerStats: any, defenderName: any, defenderStats: any, withLogs: boolean) {
        const elements = ['air', 'earth', 'fire', 'water'];
        const turnResult: any = {}

        elements.forEach((element) => {
            const isCrit = (Math.random() * 100) < attackerStats.critical_strike;
            const values = this.calculateFightValues(
                attackerStats[`attack_${element}`],
                attackerStats[`dmg_${element}`],
                attackerStats[`dmg`],
                defenderStats[`res_${element}`],
                isCrit
            );

            turnResult[element] = values;

            if (values.damage <= 0) {
                return;
            }

            // Here's the formula to calculate the chance of blocking in % format: (Resistance / 10)
            const isBlocked = (Math.random() * 100) < (values.resistance / 10);
            if (isBlocked) {
                values.damage = 0;
            }

            defenderStats.hp -= values.damage;

            if (!withLogs) {
                return;
            }

            const logger = isCrit ? console.error : console.log;
            logger(`[TURN ${turn}] ${attackerName} (${attackerStats.hp}hp) deals ${values.damage} ${element} to ${defenderName} (${defenderStats.hp}hp)`);

        });

        return turnResult;
    }

    private calculateFightValues(elementalAttack: number, elementalDamage: number, physicalDamage: number, elementalResistance: number, isCrit: boolean) {
        // Here's the formula for calculating the effects of damage: Attack * (Damage * 0.01)
        let attack = elementalAttack + (elementalAttack * ((elementalDamage + physicalDamage) * 0.01));

        // Critical strike gives you a chance to perform a strike that will perform 1.5x the total attack.
        attack = attack * (isCrit ? 1.5 : 1); // Do we need to floor attack before?
        attack = Math.floor(attack); // Important

        // Here's the formula for calculating the effects of damage reduction: Attack * (Resistance * 0.01)
        let resistance = attack * (elementalResistance * 0.01);
        resistance = Math.floor(resistance); // Important

        // Attack is the basic stats. Each attack removes one hit point from its opponent.
        let damage = attack - resistance;
        damage = damage = Math.floor(damage); // Important

        return {
            attack,
            resistance,
            damage
        };
    }

    private calculateCharacterHP(): number {
        let equipmentHp = 0;
        this.character.getEquippedGears().forEach((itemCode: Items) => {
            const item: Item = this.items.get(itemCode)!;
            item.effects.forEach((effect: any) => {
                if (effect.code !== 'hp') {
                    return;
                }

                equipmentHp += effect.value;
            });
        });

        return this.character.maxHp - equipmentHp;
    }

    private logFighterDetails(attacker: any, attackerStats: any, defender: any, defenderStats: any) {
        console.log(Utils.LINE);
        Utils.errorHeadline(`${attacker.name.padEnd(15, ' ')} vs ${defender.name.padStart(15, ' ')}`);
        console.log(Utils.LINE);

        StatEffects.forEach((stat) => {
            Utils.logHeadline(`${stat.padEnd(15, ' ')}: ${attackerStats[stat].toString().padEnd(6, ' ')} vs ${defenderStats[stat].toString().padStart(6, ' ')}`);
        });
        console.log(Utils.LINE);
    }

    private getEntityStats(entity: any) {
        const entityStats: any = {};

        entity.forEach((stat: any) => {
            entityStats[stat.code] = stat.value;
        });

        return entityStats;
    }
}


/*
Fight start: Character HP: 675/675, Monster HP: 650/650
Turn 1: The character used fire attack and dealt 83 damage. (Monster HP: 567/650)
Turn 2: The monster used earth attack and dealt 68 damage. (Character HP: 607/675)
Turn 3: The character used fire attack and dealt 83 damage. (Monster HP: 484/650)
Turn 4: The monster used earth attack and dealt 68 damage. (Character HP: 539/675)
Turn 5: The character heals 34 HP. (Character HP: 573/675)
Turn 5: The character used fire attack and dealt 83 damage. (Monster HP: 401/650)
Turn 6: The monster used earth attack and dealt 68 damage. (Character HP: 505/675)
Turn 7: The character used fire attack and dealt 83 damage. (Monster HP: 318/650)
Turn 8: The monster used earth attack and dealt 68 damage. (Character HP: 437/675)
Turn 9: The character used fire attack and dealt 83 damage. (Monster HP: 235/650)
Turn 10: The monster used earth attack and dealt 68 damage. (Character HP: 369/675)
Turn 11: The character heals 34 HP. (Character HP: 403/675)
Turn 11: The character used fire attack and dealt 83 damage. (Monster HP: 152/650)
Turn 12: The monster used earth attack and dealt 68 damage. (Character HP: 335/675)
Turn 13: The character used fire attack and dealt 83 damage. (Monster HP: 69/650)
Turn 14: The monster used earth attack and dealt 102 damage (Critical strike). (Character HP: 233/675)
Turn 15: The character used fire attack and dealt 83 damage. (Monster HP: 0/650)
Fight result: win. (Character HP: 233/675, Monster HP: 0/650)
*/
