import {CharacterGateway} from "../../gateways/CharacterGateway.js";
import {Item} from "../../entities/Item.js";
import {Monster} from "../../entities/Monster.js";
import {Character} from "../../entities/Character.js";
import {Monsters} from "../../lexical/Monsters.js";
import {Effect} from "../../entities/Effect.js";
import {Items} from "../../lexical/Items.js";

export class Simulator {
    private character: Character;

    constructor(
        private readonly characterGateway: CharacterGateway,
        private readonly items: Map<string, Item>,
        private readonly monsters: Map<string, Monster>,
        private readonly effects: Map<string, Effect>
    ) {
    }

    async simulateAgainst(monster: Monsters): Promise<void> {
        await this.loadCharacter();

        this.character.logToConsole(['stats', 'elements']);

        const aggregatedStats = {

        }
        StatEffects

        this.character.getStats().forEach((stat) => {
            aggregatedStats[stat.code] = stat.value;
        });

        this.character.getElements().forEach((stat) => {
            if (!aggregatedStats[stat.code]) {
                aggregatedStats[stat.code] = 0;
            }

            aggregatedStats[stat.code] += stat.value;
        });

        console.log(aggregatedStats);

        // const equippedGears = this.character.getEquippedGears().map((gear) => this.items.get(gear));
        // equippedGears.forEach((gear: any) => {
        //     console.log(gear.code, gear.effects);
        // });

        //console.log(this.monsters.get(monster));
    }

    async loadCharacter(): Promise<void> {
        if (!this.character) {
            this.character = await this.characterGateway.status();
        }
    }

    private async getAllStatEffects(): Promise<string[]> {
        return this.effects
    }
}
