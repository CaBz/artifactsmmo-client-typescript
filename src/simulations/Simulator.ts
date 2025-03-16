import {CharacterGateway} from "../gateways/CharacterGateway.js";
import {Monster} from "../entities/Monster.js";
import {Character} from "../entities/Character.js";
import {Monsters} from "../lexical/Monsters.js";
import {StatEffects} from "../lexical/TypeEffects.js";
import * as Utils from "../Utils.js";
import {Item} from "../entities/Item.js";
import {Items} from "../lexical/Items.js";
import {
    EquippableAmulets,
    EquippableBodyArmors, EquippableBoots,
    EquippableHelmets, EquippableLegArmors, EquippableRings,
    Equippables,
    EquippableShields,
    EquippableWeapons
} from "../lexical/Equippables.js";
import {
    AllEquippableSlots,
    EquippableSlot,
    EquippableSlots,
    EquippableSlotToType, GearEquippableSlots
} from "../lexical/EquippableSlot.js";
import {ArtifactsClient} from "../gateways/ArtifactsClient.js";
import {Recipe, Recipes, ResourceItem} from "../lexical/Recipes.js";
import {
    CraftableGearcrafting,
    CraftableJewelry,
    CraftableWeaponcrafting
} from "../lexical/Craftables.js";
import {Banker} from "../workflows/services/Banker.js";
import {Effects} from "../lexical/Effects.js";
import {Container} from "../Container.js";


type GearSet = Record<string, Item>;
interface Population { gearSet: GearSet; successRate: number, averageTurns: number, averageAttackerHP: number }

export class Simulator {
    private character: Character;

    constructor(
        private readonly client: ArtifactsClient,
        private readonly characterGateway: CharacterGateway,
        private readonly banker: Banker,
    ) {
    }

    async loadCharacter(): Promise<void> {
        if (!this.character) {
            this.character = await this.characterGateway.status();
        }
    }

    async simulateUltimateAll(level: number, showUnavailableItems: boolean): Promise<void> {
        await this.loadCharacter();

        if (level === -1) {
            level = this.character.level;
        }

        let minLevel = level < 10 ? 1 : (Math.floor(level / 10) * 10 - 10);
        minLevel = minLevel === level ? level - 5 : minLevel;

        const prep = await this.getGearPool(minLevel, level, showUnavailableItems);

        const monsters: Monster[] = Array.from(Container.monsters.values());
        monsters.sort((a, b) => a.level - b.level);

        const result: any = {};
        let gearSet: any;
        let populationResult: any;
        for (let i=0; i<monsters.length; i++) {
            console.log(`Simulating for ${monsters[i]!.code} (lv. ${monsters[i]!.level})`);
            populationResult = this.simulateUltimateForMonsterWithGear(prep.attackerStats, prep.gearPool, monsters[i]!.code as Monsters);

            gearSet = {};
            Object.entries(populationResult.gearSet).forEach(([key, item]) => {
                gearSet[key] = (item as Item).code;
            });

            result[monsters[i]!.code] = { ... populationResult };
            result[monsters[i]!.code]['gearSet'] = gearSet;

            await Utils.writeFile(`data/simulations-${this.character.name}-${level}-${showUnavailableItems ? 'all' : 'limited'}.json`, result);
            console.log();
        }
    }

    async simulateUltimate(code: Monsters, level: number, showUnavailableItems: boolean): Promise<Population> {
        await this.loadCharacter();

        if (level === -1) {
            level = this.character.level;
        }

        let minLevel = level < 10 ? 1 : (Math.floor(level / 10) * 10);
        minLevel = minLevel === level ? level - 5 : minLevel;

        const prep = await this.getGearPool(minLevel, level, showUnavailableItems);

        const monster: Monster = Container.monsters.get(code)!;
        console.log(`Simulating for ${monster.code} (lv. ${monster.level})`);
        return this.simulateUltimateForMonsterWithGear(prep.attackerStats, prep.gearPool, code)
    }

    private async getGearPool(minLevel: number, maxLevel: number, showUnavailableItems: boolean) {
        const characters = await this.client.getAllCharacterStatus();
        const bank: any = await this.banker.getBank();

        const codeMapFunction = function (code: string) {
            return Container.items.get(code)!;
        }

        const itemFilterFunction = function (item: Item) {
            if (item.level > maxLevel) { return false; }
            if (item.level < minLevel) { return false; }

            if (showUnavailableItems) {
                return true;
            }

            // @TODO: Filter more to only include items that matters?
            // Test item attack vs monster weakness
            // Test item resistance vs monster strenghts

            if (bank[item.code]) { return true ;}
            for (let i=0; i<characters.length; i++) {
                if (characters[i]!.holdsHowManyOf(item.code) > 0) { return true; }
            }

            return false;
        }

        const gearPool: Record<string, Item[]> = {
            [EquippableSlot.Helmet]: EquippableHelmets.map(codeMapFunction).filter(itemFilterFunction),
            [EquippableSlot.BodyArmor]: EquippableBodyArmors.map(codeMapFunction).filter(itemFilterFunction),
            [EquippableSlot.LegArmor]: EquippableLegArmors.map(codeMapFunction).filter(itemFilterFunction),
            [EquippableSlot.Boots]: EquippableBoots.map(codeMapFunction).filter(itemFilterFunction),
            [EquippableSlot.Weapon]: EquippableWeapons.map(codeMapFunction).filter(itemFilterFunction),
            [EquippableSlot.Shield]: EquippableShields.map(codeMapFunction).filter(itemFilterFunction),
            [EquippableSlot.Ring1]: EquippableRings.map(codeMapFunction).filter(itemFilterFunction),
            [EquippableSlot.Ring2]: EquippableRings.map(codeMapFunction).filter(itemFilterFunction),
            [EquippableSlot.Amulet]: EquippableAmulets.map(codeMapFunction).filter(itemFilterFunction),
        };

        const stats: any[] = StatEffects.map((stat: Effects) => ({code: stat, value: (stat === Effects.Hitpoints ? this.character.getBaseHp() : 0)}));
        const attackerStats: any = this.getEntityStats(stats);

        return {
            gearPool,
            attackerStats,
        };
    }

    private simulateUltimateForMonsterWithGear(attackerStats: any, gearPool: Record<string, Item[]>, code: Monsters): Population {
        const fightLoops = 250; // The more the better, but slows down a lot
        const populationSize = 200; // higher = more slow
        const generations = 50; // higher = more precise

        let population: Population[] = [];
        for (let i = 0; i < populationSize; i++) {
            const gearSet =  Object.fromEntries(GearEquippableSlots.map(slot => [slot, Utils.randomArrayValue(gearPool[slot]!)]));
            population.push({ gearSet, ... this.simulateFight(attackerStats, gearSet, code, fightLoops) });
        }

        let newGearSet;
        let slotToChange;

        for (let gen = 0; gen < generations; gen++) {
            population.sort((a, b) => b.successRate - a.successRate || a.averageTurns - b.averageTurns || b.averageAttackerHP - a.averageAttackerHP);

            const topHalf = population.slice(0, populationSize / 2);
            const newPopulation = population[0]!.successRate === 0 ? [] : [...topHalf];

            while (newPopulation.length < populationSize) {
                const parent1 = Utils.randomArrayValue(topHalf).gearSet;
                const parent2 = Utils.randomArrayValue(topHalf).gearSet;

                let child: GearSet = {};
                GearEquippableSlots.forEach(slot => {
                    child[slot] = Math.random() < 0.5 ? parent1[slot]! : parent2[slot]!;
                });

                // Random mutation
                if (Math.random() < 0.1) {
                    newGearSet = { ...child };
                    slotToChange = Utils.randomArrayValue(GearEquippableSlots);
                    newGearSet[slotToChange] = Utils.randomArrayValue(gearPool[slotToChange]!);
                    child = newGearSet;
                }

                newPopulation.push({ gearSet: child, ... this.simulateFight(attackerStats, child, code, fightLoops) });
            }

            population = newPopulation;
            Utils.stdoutClear();
            process.stdout.write(`  -> ${(gen + 1).toString()}/${generations} = Best ${population[0]!.successRate.toFixed(2)}% success in ${population[0]!.averageTurns.toFixed(2)} turns with ${population[0]!.averageAttackerHP.toFixed(2)}HP left`);
        }
        console.log();

        const result = population[0]!;
        GearEquippableSlots.forEach((slot) => {
            const item = result.gearSet[slot];
            if (!item) {
                return;
            }

            console.log(`  * ${slot.padEnd(10, ' ')} | ${item.code.padEnd(23, ' ')} | [lv. ${item.level}]`);
        });

        return population[0]!;
    }

    private simulateFight(stats: any, gearSet: GearSet, monsterCode: Monsters, loops: number): any {
        let clonedStats = { ...stats }

        Object.values(gearSet).forEach((item) => {
            if (!item) {
                return;
            }

            item.effects.forEach((effect: any) => {
                clonedStats[effect.code] += effect.value;
            });
        });

        return this.calculateSimulationFor(clonedStats, monsterCode, loops);
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
            const stats: any = { ...attackerStats };
            const equippedItemCode: any = this.character.getEquippedGear(slot);
            if (equippedItemCode) {
                const equippedItem = Container.items.get(equippedItemCode)!;
                equippedItem.effects.forEach((effect: any) => {
                    stats[effect.code] -= effect.value;
                });
            }

            const items = Array.from(Container.items.values()).filter((item: Item) => item.type === itemType && (item.level > (level - 9) && item.level <= level));
            items.sort((a, b) => a.level - b.level);
            items.forEach((item: Item) => {
                const copyStats = { ...stats };
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

    async findNextToDo(hideNotCraftable: string | undefined): Promise<void> {
        await this.loadCharacter();

        const bank: any = await this.banker.getBank();
        const maximumInventory: number = 99999;
        const itemsToCraft: any[] = [];
        let craftables: Items[] = [... CraftableGearcrafting, ... CraftableWeaponcrafting, ... CraftableJewelry];


        craftables.forEach((code: Items) => {
            const recipe: Recipe = Recipes.getFor(code);
            const skill: any = this.character.getSkill(recipe.skill);

            if (recipe.level <= skill.level && recipe.level > (skill.level - 11)) {
                const recipeItems: any[] = [];
                const recipeQuantityFromBank = this.banker.calculateRecipeQuantityFromBankItems(bank, recipe, maximumInventory)
                recipe.items.forEach((recipeItem: ResourceItem) => {
                    const bankQuantity = bank[recipeItem.code] || 0;
                    recipeItems.push({bankQuantity, code: recipeItem.code, quantity: recipeItem.quantity});
                });
                itemsToCraft.push({ skill, item: Container.items.get(code)!, recipeItems: recipeItems, recipeQuantityBank: recipeQuantityFromBank});
            }
        });
        itemsToCraft.sort((a, b) => a.skill.name.localeCompare(b.skill.name) || a.item.level - b.item.level || a.recipeQuantityBank - b.recipeQuantityBank);

        const headline =
            ``
            + `| ${Utils.formatForMiddle('Skill', 15)} `
            + `| Lv `
            + `| ${Utils.formatForMiddle('Item', 23)} `
            + `| Qty `
            + `| ${Utils.formatForMiddle('Recipe', 160)} `
            + `|`
        const line = `| ${'-'.repeat(headline.length - 4)} |`

        console.log(line);
        console.log(headline);
        console.log(line);

        itemsToCraft.forEach((entry: any) => {
            const item: Item = entry.item;
            const recipeItems = entry.recipeItems;
            const skill: any = entry.skill;

            if (hideNotCraftable !== undefined && entry.recipeQuantityBank === 0) {
                return;
            }

            recipeItems.sort((a: any, b: any) => a.code.localeCompare(b.code));
            const recipeItemsString: any = recipeItems.map((recipeItem: any) => `x${recipeItem.quantity} ${recipeItem.code} (${recipeItem.quantity * entry.recipeQuantityBank}/${recipeItem.bankQuantity})`).join(', ');

            const logger = entry.recipeQuantityBank > 0 ? console.error : console.log;
            logger(
                ``
                + `| ${skill.name.padEnd(15, ' ')} `
                + `| ${item.levelToCraft.toString().padStart(2, ' ')} `
                + `| ${item.code.padEnd(23, ' ')} `
                + `| ${entry.recipeQuantityBank.toString().padStart(3, ' ')} `
                + `| ${recipeItemsString.toString().padEnd(160, ' ')} `
                + `|`
            );
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
                // if (entry.turns >= values.averageTurns) {
                //     return;
                // }

                const item = Container.items.get(entry.item)!;
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

    async simulateAgainstAllMonsters(): Promise<void> {
        await this.loadCharacter();
        const attackerStats: any = this.getEntityStats(this.character.getAllStats());

        const monsters: Monster[] = Array.from(Container.monsters.values());
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
            values = this.calculateSimulationFor(attackerStats, monster.code as Monsters, 1000);
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
        const monster: Monster = Container.monsters.get(code)!;

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

        const item: Item = Container.items.get(itemCode)!;
        const values = this.simulateWithItemAgainst(monsterCode, item, 1000);

        console.log(values);
    }

    private simulateForEquipmentSlot(code: Monsters, slot: EquippableSlot, maxLevel: number) {
        let result: any = [];
        Equippables.forEach((itemCode: Items) => {
            const item = Container.items.get(itemCode)!;
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
        const stats: any[] = StatEffects.map((stat: Effects) => ({code: stat, value: 0}));

        const attackerStats: any = this.getEntityStats(stats);
        attackerStats.hp += this.calculateCharacterHP();

        const equippedGears = this.character.getEquippedGears();
        equippedGears.forEach((itemCode: Items) => {
            let equippedItem = Container.items.get(itemCode)!;
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
        const monster: Monster = Container.monsters.get(code)!;
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

        const won = attackerStats.hp > 0 && turns < 100;
        const result = {won, turns, attackerHP: attackerStats.hp, defenderHP: defenderStats.hp};
        if (!['details', 'summary'].includes(logLevel)) {
            return result;
        }

        if (logLevel === 'details') {
            console.log(Utils.LINE);
        }

        let fightResult = `${this.character.name} (${attackerStats.hp.toString().padStart(4, ' ')}hp) vs`;
        fightResult = `${fightResult} ${monster.name.padEnd(16, ' ')} (${defenderStats.hp.toString().padStart(4, ' ')}hp) =>`;
        fightResult = `${fightResult} vs lv.${monster.level.toString().padStart(2, ' ')} =`;

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

    private efficientSimulateWithStatsAgainst(attackerStats: any, defenderStats:any, monsterName: string) {
        const turns = this.executeFight(
            this.character.name,
            attackerStats,
            monsterName,
            defenderStats,
            false
        );

        return {won: (attackerStats.hp > 0 && turns < 100), turns, attackerHP: attackerStats.hp, defenderHP: defenderStats.hp};
    }

    calculateSimulationFor(attackerStats: any, code: Monsters, loops: number) {
        let result: any,
            clonedAttackerStats: any,
            clonedDefenderStats: any;

        let turns: number = 0,
            attackerHP: number = 0,
            defenderHP: number = 0,
            wins: number = 0;


        const monster: Monster = Container.monsters.get(code)!;
        const defenderStats: any = this.getEntityStats(monster.getAllStats());

        for (let i=0; i<loops; i++) {
            clonedAttackerStats = { ...attackerStats };
            clonedDefenderStats = { ...defenderStats };
            result = this.efficientSimulateWithStatsAgainst(clonedAttackerStats, clonedDefenderStats, monster.name);
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
            const item: Item = Container.items.get(itemCode)!;
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


// Heal rune
/*
Fight start: Character HP: 675/675, Monster HP: 650/650
Turn 1: The character used fire attack and dealt 83 damage. (Monster HP: 567/650)
Turn 2: The monster used earth attack and dealt 68 damage. (Character HP: 607/675)
Turn 3: The character used fire attack and dealt 83 damage. (Monster HP: 484/650)
Turn 4: The monster used earth attack and dealt 68 damage. (Character HP: 539/675)
- Turn 5: The character heals 34 HP. (Character HP: 573/675)
Turn 5: The character used fire attack and dealt 83 damage. (Monster HP: 401/650)
Turn 6: The monster used earth attack and dealt 68 damage. (Character HP: 505/675)
Turn 7: The character used fire attack and dealt 83 damage. (Monster HP: 318/650)
Turn 8: The monster used earth attack and dealt 68 damage. (Character HP: 437/675)
Turn 9: The character used fire attack and dealt 83 damage. (Monster HP: 235/650)
Turn 10: The monster used earth attack and dealt 68 damage. (Character HP: 369/675)
- Turn 11: The character heals 34 HP. (Character HP: 403/675)
Turn 11: The character used fire attack and dealt 83 damage. (Monster HP: 152/650)
Turn 12: The monster used earth attack and dealt 68 damage. (Character HP: 335/675)
Turn 13: The character used fire attack and dealt 83 damage. (Monster HP: 69/650)
Turn 14: The monster used earth attack and dealt 102 damage (Critical strike). (Character HP: 233/675)
Turn 15: The character used fire attack and dealt 83 damage. (Monster HP: 0/650)
Fight result: win. (Character HP: 233/675, Monster HP: 0/650)
*/

// Poison
/*
Fight start: Character HP: 680/680, Monster HP: 550/550
Turn 1: The character used fire attack and dealt 69 damage. (Monster HP: 481/550)
- Turn 2: The monster applies a poison of 20 on your character. (Character poison: 20)
Turn 2: The monster used fire attack and dealt 30 damage. (Character HP: 650/680)
Turn 2: The monster used water attack and dealt 37 damage. (Character HP: 613/680)
- Turn 3: The character suffers from poison and loses 20 HP. (Character HP: 593/680)
Turn 3: The character used fire attack and dealt 104 damage (Critical strike). (Monster HP: 377/550)
Turn 4: The monster used fire attack and dealt 30 damage. (Character HP: 563/680)
Turn 4: The monster used water attack and dealt 37 damage. (Character HP: 526/680)
- Turn 5: The character suffers from poison and loses 20 HP. (Character HP: 506/680)
Turn 5: The character heals 34 HP. (Character HP: 540/680)
Turn 5: The character used fire attack and dealt 69 damage. (Monster HP: 308/550)
Turn 6: The monster used fire attack and dealt 30 damage. (Character HP: 510/680)
Turn 6: The monster used water attack and dealt 37 damage. (Character HP: 473/680)
- Turn 7: The character suffers from poison and loses 20 HP. (Character HP: 453/680)
Turn 7: The character used fire attack and dealt 69 damage. (Monster HP: 239/550)
Turn 8: The monster used fire attack and dealt 30 damage. (Character HP: 423/680)
Turn 8: The monster used water attack and dealt 37 damage. (Character HP: 386/680)
- Turn 9: The character suffers from poison and loses 20 HP. (Character HP: 366/680)
Turn 9: The character used fire attack and dealt 69 damage. (Monster HP: 170/550)
Turn 10: The monster used fire attack and dealt 45 damage (Critical strike). (Character HP: 321/680)
Turn 10: The monster used water attack and dealt 56 damage (Critical strike). (Character HP: 265/680)
- Turn 11: The character suffers from poison and loses 20 HP. (Character HP: 245/680)
Turn 11: The character heals 34 HP. (Character HP: 279/680)
Turn 11: The character used fire attack and dealt 69 damage. (Monster HP: 101/550)
Turn 12: The monster used fire attack and dealt 30 damage. (Character HP: 249/680)
Turn 12: The monster used water attack and dealt 37 damage. (Character HP: 212/680)
- Turn 13: The character suffers from poison and loses 20 HP. (Character HP: 192/680)
Turn 13: The character used fire attack and dealt 69 damage. (Monster HP: 32/550)
Turn 14: The monster used fire attack and dealt 45 damage (Critical strike). (Character HP: 147/680)
Turn 14: The monster used water attack and dealt 56 damage (Critical strike). (Character HP: 91/680)
- Turn 15: The character suffers from poison and loses 20 HP. (Character HP: 71/680)
Turn 15: The character used fire attack and dealt 69 damage. (Monster HP: 0/550)
Fight result: win. (Character HP: 71/680, Monster HP: 0/550)
*/


/*
Fight start: Character HP: 685/685, Monster HP: 480/480
Turn 1: The character used fire attack and dealt 64 damage. (Monster HP: 416/480)
Turn 2: The monster used water attack and dealt 28 damage. (Character HP: 657/685)
Turn 3: The character used fire attack and dealt 64 damage. (Monster HP: 352/480)
Turn 4: The character blocked water attack.
Turn 5: The character used fire attack and dealt 96 damage (Critical strike). (Monster HP: 256/480)
Turn 6: The monster used water attack and dealt 42 damage (Critical strike). (Character HP: 615/685)
Turn 7: The character used fire attack and dealt 64 damage. (Monster HP: 192/480)
Turn 8: The monster used water attack and dealt 28 damage. (Character HP: 587/685)
Turn 9: The character used fire attack and dealt 64 damage. (Monster HP: 128/480)
Turn 10: The monster used water attack and dealt 28 damage. (Character HP: 559/685)
Turn 11: The character used fire attack and dealt 64 damage. (Monster HP: 64/480)
Turn 12: The monster used water attack and dealt 42 damage (Critical strike). (Character HP: 517/685)
Turn 13: The character used fire attack and dealt 64 damage. (Monster HP: 0/480)
Fight result: win. (Character HP: 517/685, Monster HP: 0/480)
*/


/*
Fight start: Character HP: 850/850, Monster HP: 1750/1750
Turn 1: The character applies a burn of 16 on the monster. (Monster burn: 16)
Turn 1: The character used fire attack and dealt 39 damage. (Monster HP: 1711/1750)
Turn 1: The character used air attack and dealt 33 damage. (Monster HP: 1678/1750)
Turn 2: The monster suffers from burn and loses 16 HP. (Monster HP: 1662/1750)
Turn 2: The monster applies a burn of 7 on your character. (Character burn: 7)
Turn 2: The monster used earth attack and dealt 34 damage. (Character HP: 816/850)
Turn 3: The character suffers from burn and loses 7 HP. (Character HP: 809/850)
Turn 3: The character used fire attack and dealt 59 damage (Critical strike). (Monster HP: 1603/1750)
Turn 3: The character used air attack and dealt 50 damage (Critical strike). (Monster HP: 1553/1750)
Turn 4: The monster suffers from burn and loses 14 HP. (Monster HP: 1539/1750)
Turn 4: The monster used earth attack and dealt 34 damage. (Character HP: 775/850)
Turn 5: The character suffers from burn and loses 6 HP. (Character HP: 769/850)
Turn 5: The character used fire attack and dealt 39 damage. (Monster HP: 1500/1750)
Turn 5: The character used air attack and dealt 33 damage. (Monster HP: 1467/1750)
Turn 6: The monster suffers from burn and loses 13 HP. (Monster HP: 1454/1750)
Turn 6: The monster used earth attack and dealt 34 damage. (Character HP: 735/850)
Turn 7: The character suffers from burn and loses 5 HP. (Character HP: 730/850)
Turn 7: The character used fire attack and dealt 39 damage. (Monster HP: 1415/1750)
Turn 7: The character used air attack and dealt 33 damage. (Monster HP: 1382/1750)
Turn 8: The monster suffers from burn and loses 12 HP. (Monster HP: 1370/1750)
Turn 8: The monster used earth attack and dealt 34 damage. (Character HP: 696/850)
Turn 9: The character suffers from burn and loses 4 HP. (Character HP: 692/850)
Turn 9: The character used fire attack and dealt 39 damage. (Monster HP: 1331/1750)
Turn 9: The character used air attack and dealt 33 damage. (Monster HP: 1298/1750)
Turn 10: The monster suffers from burn and loses 11 HP. (Monster HP: 1287/1750)
Turn 10: The monster used earth attack and dealt 34 damage. (Character HP: 658/850)
Turn 11: The character suffers from burn and loses 3 HP. (Character HP: 655/850)
Turn 11: The character used fire attack and dealt 39 damage. (Monster HP: 1248/1750)
Turn 11: The character used air attack and dealt 33 damage. (Monster HP: 1215/1750)
Turn 12: The monster suffers from burn and loses 10 HP. (Monster HP: 1205/1750)
Turn 12: The monster used earth attack and dealt 34 damage. (Character HP: 621/850)
Turn 13: The character suffers from burn and loses 2 HP. (Character HP: 619/850)
Turn 13: The character used fire attack and dealt 39 damage. (Monster HP: 1166/1750)
Turn 13: The character used air attack and dealt 33 damage. (Monster HP: 1133/1750)
Turn 14: The monster suffers from burn and loses 9 HP. (Monster HP: 1124/1750)
Turn 14: The monster used earth attack and dealt 34 damage. (Character HP: 585/850)
Turn 15: The character suffers from burn and loses 1 HP. (Character HP: 584/850)
Turn 15: The character used fire attack and dealt 39 damage. (Monster HP: 1085/1750)
Turn 15: The character used air attack and dealt 33 damage. (Monster HP: 1052/1750)
Turn 16: The monster suffers from burn and loses 8 HP. (Monster HP: 1044/1750)
Turn 16: The character blocked earth attack.
Turn 17: The character used fire attack and dealt 59 damage (Critical strike). (Monster HP: 985/1750)
Turn 17: The character used air attack and dealt 50 damage (Critical strike). (Monster HP: 935/1750)
Turn 18: The monster suffers from burn and loses 7 HP. (Monster HP: 928/1750)
Turn 18: The monster used earth attack and dealt 34 damage. (Character HP: 550/850)
Turn 19: The character used fire attack and dealt 59 damage (Critical strike). (Monster HP: 869/1750)
Turn 19: The character used air attack and dealt 50 damage (Critical strike). (Monster HP: 819/1750)
Turn 20: The monster suffers from burn and loses 6 HP. (Monster HP: 813/1750)
Turn 20: The monster used earth attack and dealt 34 damage. (Character HP: 516/850)
Turn 21: The character used fire attack and dealt 39 damage. (Monster HP: 774/1750)
Turn 21: The character used air attack and dealt 33 damage. (Monster HP: 741/1750)
Turn 22: The monster suffers from burn and loses 5 HP. (Monster HP: 736/1750)
Turn 22: The monster used earth attack and dealt 34 damage. (Character HP: 482/850)
Turn 23: The character used fire attack and dealt 39 damage. (Monster HP: 697/1750)
Turn 23: The character used air attack and dealt 33 damage. (Monster HP: 664/1750)
Turn 24: The monster suffers from burn and loses 4 HP. (Monster HP: 660/1750)
Turn 24: The monster used earth attack and dealt 34 damage. (Character HP: 448/850)
Turn 25: The character used fire attack and dealt 39 damage. (Monster HP: 621/1750)
Turn 25: The character used air attack and dealt 33 damage. (Monster HP: 588/1750)
Turn 26: The monster suffers from burn and loses 3 HP. (Monster HP: 585/1750)
Turn 26: The monster used earth attack and dealt 34 damage. (Character HP: 414/850)
Turn 27: The character used fire attack and dealt 39 damage. (Monster HP: 546/1750)
Turn 27: The character used air attack and dealt 33 damage. (Monster HP: 513/1750)
Turn 28: The monster suffers from burn and loses 2 HP. (Monster HP: 511/1750)
Turn 28: The monster used earth attack and dealt 34 damage. (Character HP: 380/850)
Turn 29: The character used fire attack and dealt 39 damage. (Monster HP: 472/1750)
Turn 29: The character used air attack and dealt 33 damage. (Monster HP: 439/1750)
Turn 30: The monster suffers from burn and loses 1 HP. (Monster HP: 438/1750)
Turn 30: The monster used earth attack and dealt 34 damage. (Character HP: 346/850)
Turn 31: The character used fire attack and dealt 39 damage. (Monster HP: 399/1750)
Turn 31: The character used air attack and dealt 33 damage. (Monster HP: 366/1750)
Turn 32: The monster used earth attack and dealt 34 damage. (Character HP: 312/850)
Turn 33: The character used fire attack and dealt 39 damage. (Monster HP: 327/1750)
Turn 33: The character used air attack and dealt 33 damage. (Monster HP: 294/1750)
Turn 34: The monster used earth attack and dealt 34 damage. (Character HP: 278/850)
Turn 35: The character used fire attack and dealt 39 damage. (Monster HP: 255/1750)
Turn 35: The character used air attack and dealt 33 damage. (Monster HP: 222/1750)
Turn 36: The monster used earth attack and dealt 34 damage. (Character HP: 244/850)
Turn 37: The character used fire attack and dealt 39 damage. (Monster HP: 183/1750)
Turn 37: The character used air attack and dealt 33 damage. (Monster HP: 150/1750)
Turn 38: The monster used earth attack and dealt 34 damage. (Character HP: 210/850)
Turn 39: The character used fire attack and dealt 39 damage. (Monster HP: 111/1750)
Turn 39: The character used air attack and dealt 33 damage. (Monster HP: 78/1750)
Turn 40: The monster used earth attack and dealt 34 damage. (Character HP: 176/850)
Turn 41: The character used fire attack and dealt 59 damage (Critical strike). (Monster HP: 19/1750)
Turn 41: The character used air attack and dealt 50 damage (Critical strike). (Monster HP: 0/1750)
Fight result: win. (Character HP: 176/850, Monster HP: 0/1750)
*/
