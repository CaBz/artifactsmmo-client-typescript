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
        let character: Character = await this.waiter.wait();
        if (character.isFullHealth()) {
            Utils.errorHeadline(`REST > Skipped (Full HP)`);
            return character;
        }

        character = await this.restoreFromConsumables(character);


        try {
            const result: any = await this.characterGateway.rest();
            Utils.logHeadline(`REST > +${result.hpRestored}hp`);

            return result.character;
        } catch (e) {
            Utils.logHeadline(`REST > Failed`);
            if (e instanceof ClientException) {
                Utils.errorHeadline(`${e.code}: ${e.message}`);
                return character;
            }

            Utils.errorHeadline((e as Error).message);
            return character;
        }
    }

    async restoreFromConsumables(character: Character): Promise<Character> {
        const inventory: any[] = character.getInventory();
        const consumables: Item[] = [];

        inventory.forEach((inventoryItem: any) => {
            const item: Item = this.items.get(inventoryItem.code)!;
            if (item?.isConsumable && item.getEffectValueFor(Effects.Heal) > 0) {
                consumables.push(item);
            }
        });

        if (consumables.length === 0) {
            return character;
        }

        consumables.sort((a: Item, b: Item) => a.level - b.level);

        const firstConsumable: Item = consumables.shift()!;
        const consumableHP: number = firstConsumable.getEffectValueFor(Effects.Heal);
        character = await this.itemUser.use(firstConsumable.code, 1);
        if (!character.isFullHealth() && (consumableHP + character.hp) < character.maxHp) {
            return this.restoreFromConsumables(character);
        }

        character = await this.waiter.wait();
        return character
    }
}
