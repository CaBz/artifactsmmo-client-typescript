import {CharacterGateway} from "../../gateways/CharacterGateway.js";
import {Monster} from "../../entities/Monster.js";
import {Character} from "../../entities/Character.js";
import {Monsters} from "../../lexical/Monsters.js";
import {StatEffects} from "../../lexical/TypeEffects.js";
import * as Utils from "../../Utils.js";

export class Simulator {
    private character: Character = undefined;

    constructor(
        private readonly characterGateway: CharacterGateway,
        private readonly monsters: Map<string, Monster>,
    ) {
    }

    async loadCharacter(): Promise<void> {
        if (!this.character) {
            this.character = await this.characterGateway.status();
        }
    }

    async simulateAgainst(code: Monsters, logLevel: string) {
        await this.loadCharacter();
        const monster: Monster = this.monsters.get(code)!;

        const characterStats: any = this.getEntityStats(this.character.getAllStats());
        const monsterStats: any = this.getEntityStats(monster.getAllStats());

        if (logLevel === 'details') {
            console.log(Utils.LINE);
            Utils.logHeadline(`SIMULATION FIGHT`);
            console.log(Utils.LINE);
        }

        const turns = this.executeFight(
            this.character.name,
            characterStats,
            monster.name,
            monsterStats,
            logLevel === 'details'
        );

        if (logLevel === 'details') {
            console.log(Utils.LINE);
        }

        let fightResult = `${this.character.name} (${characterStats.hp.toString().padStart(4, ' ')}hp) vs`;
        fightResult = `${fightResult} ${monster.name.padEnd(16, ' ')} (${monsterStats.hp.toString().padStart(4, ' ')}hp) =>`;
        fightResult = `${fightResult} lv.${this.character.level} vs lv.${monster.level.toString().padStart(2, ' ')} =`;

        const won = characterStats.hp > 0 && turns < 100;
        const result = {won, turns, characterHP: characterStats.hp, monsterHP: monsterStats.hp};
        if (!['details', 'summary'].includes(logLevel)) {
            return result;
        }

        if (won) {
            Utils.logHeadline(`${fightResult}  WIN - ${turns.toString().padStart(3, ' ')} TURNS`);
        } else {
            Utils.errorHeadline(`${fightResult} LOSS - ${turns.toString().padStart(3, ' ')} TURNS`)
        }

        if (logLevel === 'details') {
            this.logFighterDetails(this.character, characterStats, monster, monsterStats);
        }

        return result;
    }

    async simulateAgainstFor(code: Monsters, loops: number): Promise<void> {
        const values = await this.calculateSimulationFor(code, loops);

        console.log(
            values.fights, 'Fights',
            values.wins, 'Wins',
            values.losses, 'Losses',
            values.successRate, '%',
            values.averageTurns, 'Turns',
            values.averageCharacterHP, 'Char HP',
            values.averageMonsterHP, 'Mob HP',
        );
    }

    async calculateSimulationFor(code: Monsters, loops: number) {
        let result;
        let turns = 0,
            characterHP = 0,
            monsterHP = 0,
            wins: number = 0;

        for (let i=0; i<loops; i++) {
            result = await this.simulateAgainst(code, 'none');
            turns += result.turns;
            characterHP += result.characterHP;
            monsterHP += result.monsterHP;
            wins += result.won ? 1 : 0;
        }

        return {
            fights: loops,
            wins,
            losses: loops - wins,
            successRate: Math.round(((wins > 0 ? wins : 0) / loops) * 10000) / 100,
            averageTurns: Math.round((turns / loops) * 100) / 100,
            averageCharacterHP: Math.round((characterHP / loops) * 100) / 100,
            averageMonsterHP: Math.round((monsterHP / loops) * 100) / 100,
        }
    }

    async simulateAgainstAllMonsters(): Promise<void> {
        await this.loadCharacter();

        const monsters: Monster[] = Array.from(this.monsters.values());
        monsters.sort((a, b) => a.level - b.level);

        const numberFormatter = new Intl.NumberFormat('en-us', {minimumFractionDigits: 2});
        const headline = `| ${Utils.formatForMiddle('Monster', 16)} | Lv. | Success % | Turns |  Avg. HP | Avg. Mob HP | ${Utils.formatForMiddle('Good Against', 23)} | ${Utils.formatForMiddle('Weak Against', 23)} |`;

        console.log('-'.repeat(headline.length));
        console.log(headline);
        console.log('-'.repeat(headline.length));

        let monster: Monster, values, logger, analyzes;
        for (let i=0; i<monsters.length; i++) {
            monster = monsters[i]!;
            values = await this.calculateSimulationFor(monster.code, 1000);
            analyzes = await this.analyzeFightTurn(monster.code);

            logger = values.successRate === 100 ? console.info : console.error;
            logger(
                `| ${monster.name.padEnd(16)} | ${monster.level.toString().padStart(3)} | ${numberFormatter.format(values.successRate).padStart(8)}% | ${numberFormatter.format(values.averageTurns).padStart(6)} | ${numberFormatter.format(values.averageCharacterHP).padStart(7)} | ${numberFormatter.format(values.averageMonsterHP).padStart(11)} | ${analyzes.attack.goodAgainst.join(', ').padEnd(23, ' ')} | ${analyzes.defend.weakAgainst.join(', ').padEnd(23, ' ')} |`
            );
        }

        console.log('-'.repeat(headline.length));
    }

    async analyzeFightTurn(code: Monsters): Promise<void> {
        await this.loadCharacter();
        const monster: Monster = this.monsters.get(code)!;

        const characterStats: any = this.getEntityStats(StatEffects.map((stat) => {
            const value = stat.startsWith('attack') ? 1000 : 0;
            return {code: stat, value};
        }));
        const monsterStats: any = this.getEntityStats(monster.getAllStats());

        const characterAgainstMonster = this.fight(1, 'Dummy', characterStats, monster.name, monsterStats, false);
        const monsterAgainstCharacter = this.fight(1, monster.name, monsterStats, 'Dummy', characterStats, false);

        const result = {
            attack: {
                goodAgainst: [],
                weakAgainst: [],
            },
            defend: {
                goodAgainst: [],
                weakAgainst: [],
            }
        }

        const elements = ['air', 'earth', 'fire', 'water'];
        elements.forEach((element) => {
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

    private logFighterDetails(attacker, attackerStats, defender, defenderStats) {
        console.log(Utils.LINE);
        Utils.errorHeadline(`${attacker.name.padEnd(15, ' ')} vs ${defender.name.padStart(15, ' ')}`);
        console.log(Utils.LINE);

        StatEffects.forEach((stat) => {
            Utils.logHeadline(`${stat.padEnd(15, ' ')}: ${attackerStats[stat].toString().padEnd(6, ' ')} vs ${defenderStats[stat].toString().padStart(6, ' ')}`);
        });
        console.log(Utils.LINE);
    }

    private getEntityStats(entity: any) {
        const entityStats = {};

        entity.forEach((stat) => {
            entityStats[stat.code] = stat.value;
        });

        return entityStats;
    }
}
