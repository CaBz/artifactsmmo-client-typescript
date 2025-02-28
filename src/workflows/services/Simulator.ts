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

    async simulateAgainst(code: Monsters, withLogs?: boolean): Promise<boolean> {
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

        let fightResult = `${this.character.name} (${characterStats.hp.toString().padStart(4, ' ')}hp) vs`;
        fightResult = `${fightResult} ${monster.name.padEnd(16, ' ')} (${monsterStats.hp.toString().padStart(4, ' ')}hp) =>`;
        fightResult = `${fightResult} lv.${this.character.level} vs lv.${monster.level.toString().padStart(2, ' ')} =`;

        const fightWon = characterStats.hp > 0 && turns < 100;
        if (fightWon) {
            Utils.logHeadline(`${fightResult}  WIN - ${turns.toString().padStart(3, ' ')} TURNS`);
        } else {
            Utils.errorHeadline(`${fightResult} LOSS - ${turns.toString().padStart(3, ' ')} TURNS`)
        }

        if (withLogs === undefined ? true : withLogs) {
            this.logFighterDetails(this.character, characterStats, monster, monsterStats);
        }

        return fightWon;
    }

    async simulateAgainstFor(code: Monsters, loops: number): Promise<void> {
        let wins: number = 0;

        for (let i=0; i<loops; i++) {
            if (await this.simulateAgainst(code, false)) {
                wins++;
            }
        }

        console.log(`Success rate: ${Math.round(((wins > 0 ? wins : 1) / loops) * 10000) / 100}%`);
    }

    async simulateAgainstAllMonsters(): Promise<void> {
        await this.loadCharacter();

        // async function called inside a non-awaitable iterator - GG!
        // I'm going to keep this easter egg and regret it when I'll try to debug why it's not working
        // Happy friday
        this.monsters.forEach((monster) => {
            this.simulateAgainst(monster.code, false);
        })
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

        elements.forEach((element) => {
            const defenderResistance = defenderStats[`res_${element}`];
            const attackerElementalAttack = attackerStats[`attack_${element}`];
            const attackerElementalDmg = attackerStats[`dmg_${element}`];
            const attackerDmg = attackerStats[`dmg`];

            // Here's the formula for calculating the effects of damage: Attack * (Damage * 0.01)
            let attack = attackerElementalAttack + (attackerElementalAttack * ((attackerElementalDmg + attackerDmg) * 0.01));

            // Critical strike gives you a chance to perform a strike that will perform 1.5x the total attack.
            const isCrit = (Math.random() * 100) < attackerStats.critical_strike;
            attack = attack * (isCrit ? 1.5 : 1); // Do we need to floor attack before?
            attack = Math.floor(attack); // Important

            // Here's the formula for calculating the effects of damage reduction: Attack * (Resistance * 0.01)
            let resistance = attack * (defenderResistance * 0.01);
            resistance = Math.floor(resistance); // Important

            // Attack is the basic stats. Each attack removes one hit point from its opponent.
            let damage = attack - resistance;
            damage = damage = Math.floor(damage); // Important

            // No damage = Not worth to consider it as an attack
            if (damage <= 0) {
                return;
            }

            // @TBC: This formula seems weird
            // Here's the formula to calculate the chance of blocking in % format: (Resistance / 10)
            const isBlocked = (Math.random() * 100) < (resistance / 10);
            if (isBlocked) {
                if (!withLogs) {
                    return;
                }

                console.info(`[TURN ${turn}] ${attackerName} (${attackerStats.hp}hp) was blocked by ${defenderName} (${defenderStats.hp}hp)`);
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
Fight start: Character HP: 425/425, Monster HP: 400/400
Turn 1: The character used earth attack and dealt 33 damage. (Monster HP: 367/400)
Turn 2: The monster used water attack and dealt 17 damage (Critical strike). (Character HP: 408/425)
Turn 2: The monster used air attack and dealt 17 damage (Critical strike). (Character HP: 391/425)
Turn 3: The character used earth attack and dealt 33 damage. (Monster HP: 334/400)
Turn 4: The monster used water attack and dealt 11 damage. (Character HP: 380/425)
Turn 4: The monster used air attack and dealt 11 damage. (Character HP: 369/425)
Turn 5: The character used earth attack and dealt 33 damage. (Monster HP: 301/400)
Turn 6: The monster used water attack and dealt 11 damage. (Character HP: 358/425)
Turn 6: The monster used air attack and dealt 11 damage. (Character HP: 347/425)
Turn 7: The character used earth attack and dealt 33 damage. (Monster HP: 268/400)
Turn 8: The monster used water attack and dealt 11 damage. (Character HP: 336/425)
Turn 8: The monster used air attack and dealt 11 damage. (Character HP: 325/425)
Turn 9: The character used earth attack and dealt 33 damage. (Monster HP: 235/400)
Turn 10: The monster used water attack and dealt 11 damage. (Character HP: 314/425)
Turn 10: The monster used air attack and dealt 11 damage. (Character HP: 303/425)
Turn 11: The character used earth attack and dealt 33 damage. (Monster HP: 202/400)
Turn 12: The monster used water attack and dealt 17 damage (Critical strike). (Character HP: 286/425)
Turn 12: The monster used air attack and dealt 17 damage (Critical strike). (Character HP: 269/425)
Turn 13: The character used earth attack and dealt 33 damage. (Monster HP: 169/400)
Turn 14: The monster used water attack and dealt 17 damage (Critical strike). (Character HP: 252/425)
Turn 14: The monster used air attack and dealt 17 damage (Critical strike). (Character HP: 235/425)
Turn 15: The character used earth attack and dealt 33 damage. (Monster HP: 136/400)
Turn 16: The monster used water attack and dealt 17 damage (Critical strike). (Character HP: 218/425)
Turn 16: The monster used air attack and dealt 17 damage (Critical strike). (Character HP: 201/425)
Turn 17: The character used earth attack and dealt 33 damage. (Monster HP: 103/400)
Turn 18: The monster used water attack and dealt 17 damage (Critical strike). (Character HP: 184/425)
Turn 18: The monster used air attack and dealt 17 damage (Critical strike). (Character HP: 167/425)
Turn 19: The character used earth attack and dealt 33 damage. (Monster HP: 70/400)
Turn 20: The monster used water attack and dealt 11 damage. (Character HP: 156/425)
Turn 20: The monster used air attack and dealt 11 damage. (Character HP: 145/425)
Turn 21: The character used earth attack and dealt 33 damage. (Monster HP: 37/400)
Turn 22: The monster used water attack and dealt 17 damage (Critical strike). (Character HP: 128/425)
Turn 22: The monster used air attack and dealt 17 damage (Critical strike). (Character HP: 111/425)
Turn 23: The character used earth attack and dealt 33 damage. (Monster HP: 4/400)
Turn 24: The monster used water attack and dealt 17 damage (Critical strike). (Character HP: 94/425)
Turn 24: The monster used air attack and dealt 17 damage (Critical strike). (Character HP: 77/425)
Turn 25: The character used earth attack and dealt 33 damage. (Monster HP: 0/400)
Fight result: win. (Character HP: 77/425, Monster HP: 0/400)
*/
