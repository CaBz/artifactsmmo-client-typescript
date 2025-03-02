import {Waiter} from "./Waiter.js";
import {CharacterGateway} from "../../gateways/CharacterGateway.js";
import * as Utils from "../../Utils.js";
import {ClientException} from "../../gateways/ClientException.js";
import {Character} from "../../entities/Character.js";
import {ItemUser} from "./ItemUser.js";
import {Item} from "../../entities/Item.js";
import {Effects} from "../../lexical/Effects.js";

export class Rester {
    constructor(
        private readonly waiter: Waiter,
        private readonly characterGateway: CharacterGateway,
        private readonly itemUser: ItemUser,
        private readonly items: Map<string, Item>,
    ) {
    }

    async rest(): Promise<Character> {
        Utils.logHeadline(`REST`);
        const character: Character = await this.waiter.wait();
        if (character.isFullHealth()) {
            Utils.errorHeadline(`SKIP - Full Health`);
            return character;
        }

        // await this.restoreFromConsumables(character);

        // @TODO: Add logic to check inventory for consumables instead of resting - Resting should be last resort

        try {
            const result = await this.characterGateway.rest();
            return result.character;
        } catch (e) {
            if (e instanceof ClientException) {
                Utils.errorHeadline(`${e.code}: ${e.message}`);
                return character;
            }

            Utils.errorHeadline((e as Error).message);
        }

        return character;
    }

    async restoreFromConsumables(character: Character) {
        const inventory: any[] = character.getInventory();
        const consumables: Item[] = [];

        inventory.forEach((inventoryItem: any) => {
            const item = this.items.get(inventoryItem);
            if (item?.isConsumable) {
                consumables.push(item);
            }
        });

        consumables.sort((a, b) => a.getEffectValueFor(Effects.Heal) - b.getEffectValueFor(Effects.Heal));

        consumables.forEach((consumable) => {
            console.log(`${consumable.name} => ${consumable.getEffectValueFor(Effects.Heal)}`)
        });
    }
}
