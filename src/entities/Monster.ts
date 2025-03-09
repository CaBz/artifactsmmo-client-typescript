import {StatEffects} from "../lexical/TypeEffects.js";
import {Effects} from "../lexical/Effects.js";

export class Monster {
    constructor(private readonly data: any) {
        /*
        {
            "name": "Bandit Lizard",
            "code": "bandit_lizard",
            "level": 25,
            "hp": 780,
            "attack_fire": 40,
            "attack_earth": 0,
            "attack_water": 40,
            "attack_air": 0,
            "res_fire": -5,
            "res_earth": 25,
            "res_water": -5,
            "res_air": 25,
            "critical_strike": 5,
            "effects": [
              {
                "code": "poison",
                "value": 20
              }
            ],
            "min_gold": 0,
            "max_gold": 15,
            "drops": [
              {
                "code": "bandit_armor",
                "rate": 600,
                "min_quantity": 1,
                "max_quantity": 1
              },
              {
                "code": "lizard_eye",
                "rate": 10,
                "min_quantity": 1,
                "max_quantity": 1
              },
              {
                "code": "lizard_skin",
                "rate": 10,
                "min_quantity": 1,
                "max_quantity": 1
              },
              {
                "code": "dreadful_book",
                "rate": 1500,
                "min_quantity": 1,
                "max_quantity": 1
              }
            ]
          }
        */
    }

    get name(): string {
        return this.data.name;
    }

    get nameForEnum(): string {
        return this.name.replaceAll(/[^a-zA-Z0-9]/g, '');
    }

    get code(): string {
        return this.data.code;
    }

    get level(): number {
        return this.data.level;
    }

    getAllStats() {
        return StatEffects.map((stat) => {
            { return {code: stat, value: this.data[stat] ?? 0}; }
        });
    }

    get effects(): any[] {
        return this.data.effects;
    }

    getPoisonDamage(): number {
        const effects: any[] = this.effects.filter((effect: any) => effect.code === Effects.Poison);

        return effects[0]?.value || 0;
    }

    get drops(): any[] {
        return this.data.drops;
    }
}
