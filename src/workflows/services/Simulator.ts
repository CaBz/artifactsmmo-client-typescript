import {CharacterGateway} from "../../gateways/CharacterGateway.js";
import {Monster} from "../../entities/Monster.js";
import {Character} from "../../entities/Character.js";
import {Monsters} from "../../lexical/Monsters.js";
import {StatEffects} from "../../lexical/TypeEffects.js";
import * as Utils from "../../Utils.js";

export class Simulator {
    private character: Character;

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

    async simulateAgainst(code: Monsters, withLogs?: boolean): Promise<void> {
        await this.loadCharacter();
        const monster: Monster = this.monsters.get(code)!;

        const characterStats: any = this.getEntityStats(this.character);
        const monsterStats: any = this.getEntityStats(monster);

        if (withLogs === undefined ? true : withLogs) {
            console.log(Utils.LINE);
            Utils.logHeadline(`SIMULATION FIGHT`);
            console.log(Utils.LINE);
        }

        const turns = this.executeFight(
            this.character.name,
            characterStats,
            monster.name,
            monsterStats,
            withLogs === undefined ? true : withLogs
        );

        if (withLogs === undefined ? true : withLogs) {
            console.log(Utils.LINE);
        }

        if (characterStats.hp > 0 && turns < 100) {
            Utils.logHeadline(`${this.character.name} lv.${this.character.level} (${characterStats.hp}hp) won against ${monster.name} lv.${monster.level} (${monsterStats.hp}hp) in ${turns} turns!`);
        } else {
            Utils.errorHeadline(`${this.character.name} lv.${this.character.level} (${characterStats.hp}hp) lost against ${monster.name} lv.${monster.level} (${monsterStats.hp}hp) in ${turns} turns!`)
        }

        if (withLogs === undefined ? true : withLogs) {
            this.logFighterDetails(this.character, characterStats, monster, monsterStats);
        }
    }

    async simulateAgainstAllMonsters(): Promise<void> {
        await this.loadCharacter();
        await this.monsters.forEach(async (monster) => {
            await this.simulateAgainst(monster.code, false);
        })
    }

    private executeFight(attackName: any, attackerStats: any, defenderName: any, defenderStats: any, withLogs: boolean): number {
        let tmp;

        let turn = 1;
        while (attackerStats.hp > 0 && attackerStats.hp > 0) {
            this.fight(turn, attackName, attackerStats, defenderName, defenderStats, withLogs);

            tmp = attackName;
            attackName = defenderName;
            defenderName = tmp;

            tmp = attackerStats;
            attackerStats = defenderStats;
            defenderStats = tmp;

            turn ++;
        }

        return turn;
    }

    private fight(turn: number, attackerName: any, attackerStats: any, defenderName: any, defenderStats: any, withLogs: boolean) {
        const elements = ['air', 'earth', 'fire', 'water'];

        elements.forEach((element) => {
            const defenderResistance = defenderStats[`res_${element}`];
            const attackerElementalAttack = attackerStats[`attack_${element}`];
            const attackerElementalDmg = attackerStats[`dmg_${element}`];
            const attackerDmg = attackerStats[`dmg`];

            // Critical strike gives you a chance to perform a strike that will perform 1.5x the total attack.
            const isCrit = (Math.random() * 100) < attackerStats.critical_strike;

            // Here's the formula for calculating the effects of damage: Attack * (Damage * 0.01)
            let attack = attackerElementalAttack + (attackerElementalAttack * ((attackerElementalDmg + attackerDmg) * 0.01));
            attack = attack * (isCrit ? 1.5 : 1)

            // Here's the formula for calculating the effects of damage reduction: Attack * (Resistance * 0.01)
            let resistance = attack * (defenderResistance * 0.01);

            // Here's the formula to calculate the chance of blocking in % format: (Resistance / 10)
            const isBlocked = (Math.random() * 100) < (resistance / 10);

            let damage = attack - resistance;
            damage = damage = Math.round(damage);

            if (damage <= 0) {
                return;
            }

            if (isBlocked) {
                if (!withLogs) {
                    return;
                }

                console.warn(`[TURN ${turn}] ${attackerName} (${attackerStats.hp}hp) was blocked by ${defenderName} (${defenderStats.hp}hp)`);
                return
            }

            defenderStats.hp -= damage;

            if (!withLogs) {
                return;
            }

            const logger = isCrit ? console.error : console.log;
            logger(`[TURN ${turn}] ${attackerName} (${attackerStats.hp}hp) deals ${damage} ${element} to ${defenderName} (${defenderStats.hp}hp)`);

        });
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

        entity.getAllStats().forEach((stat) => {
            entityStats[stat.code] = stat.value;
        });

        return entityStats;
    }

}

/*
Fight start: Character HP: 420/420, Monster HP: 400/400
Turn 1: The character used earth attack and dealt 33 damage. (Monster HP: 367/400)
Turn 2: The monster used water attack and dealt 17 damage (Critical strike). (Character HP: 403/420)
Turn 2: The monster used air attack and dealt 17 damage (Critical strike). (Character HP: 386/420)
Turn 3: The character used earth attack and dealt 33 damage. (Monster HP: 334/400)
Turn 4: The monster used water attack and dealt 11 damage. (Character HP: 375/420)
Turn 4: The monster used air attack and dealt 11 damage. (Character HP: 364/420)
Turn 5: The character used earth attack and dealt 33 damage. (Monster HP: 301/400)
Turn 6: The monster used water attack and dealt 17 damage (Critical strike). (Character HP: 347/420)
Turn 6: The monster used air attack and dealt 17 damage (Critical strike). (Character HP: 330/420)
Turn 7: The character used earth attack and dealt 33 damage. (Monster HP: 268/400)
Turn 8: The monster used water attack and dealt 17 damage (Critical strike). (Character HP: 313/420)
Turn 8: The monster used air attack and dealt 17 damage (Critical strike). (Character HP: 296/420)
Turn 9: The character used earth attack and dealt 33 damage. (Monster HP: 235/400)
Turn 10: The monster used water attack and dealt 11 damage. (Character HP: 285/420)
Turn 10: The monster used air attack and dealt 11 damage. (Character HP: 274/420)
Turn 11: The character used earth attack and dealt 33 damage. (Monster HP: 202/400)
Turn 12: The monster used water attack and dealt 11 damage. (Character HP: 263/420)
Turn 12: The monster used air attack and dealt 11 damage. (Character HP: 252/420)
Turn 13: The character used earth attack and dealt 33 damage. (Monster HP: 169/400)
Turn 14: The monster used water attack and dealt 11 damage. (Character HP: 241/420)
Turn 14: The monster used air attack and dealt 11 damage. (Character HP: 230/420)
Turn 15: The character used earth attack and dealt 33 damage. (Monster HP: 136/400)
Turn 16: The monster used water attack and dealt 17 damage (Critical strike). (Character HP: 213/420)
Turn 16: The monster used air attack and dealt 17 damage (Critical strike). (Character HP: 196/420)
Turn 17: The character used earth attack and dealt 33 damage. (Monster HP: 103/400)
Turn 18: The monster used water attack and dealt 17 damage (Critical strike). (Character HP: 179/420)
Turn 18: The monster used air attack and dealt 17 damage (Critical strike). (Character HP: 162/420)
Turn 19: The character used earth attack and dealt 33 damage. (Monster HP: 70/400)
Turn 20: The monster used water attack and dealt 17 damage (Critical strike). (Character HP: 145/420)
Turn 20: The monster used air attack and dealt 17 damage (Critical strike). (Character HP: 128/420)
Turn 21: The character used earth attack and dealt 33 damage. (Monster HP: 37/400)
Turn 22: The monster used water attack and dealt 17 damage (Critical strike). (Character HP: 111/420)
Turn 22: The monster used air attack and dealt 17 damage (Critical strike). (Character HP: 94/420)
Turn 23: The character used earth attack and dealt 50 damage (Critical strike). (Monster HP: 0/400)
Fight result: win. (Character HP: 94/420, Monster HP: 0/400)
*/
