import {CharacterGateway} from "../../gateways/CharacterGateway.js";
import {Monster} from "../../entities/Monster.js";
import {Character} from "../../entities/Character.js";
import {Monsters} from "../../lexical/Monsters.js";
import {StatEffects} from "../../lexical/TypeEffects.js";
import * as Utils from "../../Utils.js";
import {Item} from "../../entities/Item.js";
import {Items} from "../../lexical/Items.js";
import {Equippables} from "../../lexical/Equippables.js";
import {EquippableSlot, EquippableSlots} from "../../lexical/EquippableSlot.js";
import {ArtifactsClient} from "../../gateways/ArtifactsClient.js";
import {Recipes, ResourceItem} from "../../lexical/Recipes.js";

export class Simulator {
    private character: Character;

    constructor(
        private readonly client: ArtifactsClient,
        private readonly characterGateway: CharacterGateway,
        private readonly monsters: Map<string, Monster>,
        private readonly items: Map<string, Item>,
    ) {
    }

    async loadCharacter(): Promise<void> {
        if (!this.character) {
            this.character = await this.characterGateway.status();
        }
    }

    async findBestUsableEquippables(code: Monsters) {
        await this.loadCharacter();
        const attackerStats = this.getEntityStats(this.character.getAllStats());
        const values: any = this.calculateSimulationFor(attackerStats, code, 1000);

        console.log(`Current equipped items: ${values.successRate}%`);
        console.log();

        const bank: any = {};
        (await this.client.getBank()).forEach((bankItem: any) => {
            bank[bankItem.code] = bankItem.quantity;
        });

        EquippableSlots.forEach((slot: EquippableSlot) => {
            const result: any = this.simulateForEquipmentSlot(code, slot);

            console.error(slot);
            result.forEach((entry: any) => {
                if (entry.successRate < values.successRate) {
                    return;
                }

                if (this.character.hasEquipped(entry.item)) {
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
                logger(`* [lv.${item.level.toString()}] ${item.code} = ${entry.successRate}% => Available [x${quantity}] | Craftable [${isCraftable ? 'Y' : 'N'}] ${recipeItems.join(', ')}`);
            });
            console.log();
        });
    }

    async findBestUsableEquippableSlot(code: Monsters, slot: EquippableSlot) {
        await this.loadCharacter();

        const result: any = this.simulateForEquipmentSlot(code, slot);

        console.log(result);
    }

    private simulateForEquipmentSlot(code: Monsters, slot: EquippableSlot) {
        let result: any = [];
        Equippables.forEach((itemCode: Items) => {
            const item = this.items.get(itemCode)!;
            if (item.equippableSlot !== slot) {
                return;
            }

            if (this.character.level < item.level) {
                return;
            }

            const values: any = this.simulateWithItemAgainst(code, item, 1000);

            result.push({ item: item.code, level: item.level, successRate: values.successRate});
        });

        result.sort((a: any, b: any) => b.successRate - a.successRate);

        return result;
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

        const values: any = this.calculateSimulationFor(attackerStats, code, loops);
        return values;
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
            + `| ${Utils.formatForMiddle('Good Against', 23)} `
            + `| ${Utils.formatForMiddle('Weak Against', 23)} `
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

    async simulateWithItemCodeAgainst(monsterCode: Monsters, itemCode: Items) {
        await this.loadCharacter();

        const item: Item = this.items.get(itemCode)!;
        const values = await this.simulateWithItemAgainst(monsterCode, item, 1000);

        console.log(values);
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
