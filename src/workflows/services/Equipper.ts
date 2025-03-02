import {CharacterGateway} from "../../gateways/CharacterGateway.js";
import {Waiter} from "./Waiter.js";
import * as Utils from "../../Utils.js";
import {ClientException} from "../../gateways/ClientException.js";
import {Items} from "../../lexical/Items.js";
import {Item} from "../../entities/Item.js";
import {EquippableSlot} from "../../lexical/EquippableSlot.js";

export class Equipper {
    constructor(private readonly waiter: Waiter, private readonly characterGateway: CharacterGateway, private readonly items: Map<string, Item>) {
    }

    async swap(code: Items): Promise<void> {
        const item = this.items.get(code);
        if (!item) {
            Utils.logHeadline(`${code} does not exist`);
            return;
        }

        await this.unequip(1, item.type as EquippableSlot);
        await this.equip(code, 1, item.type as EquippableSlot);
    }

    async equip(item: Items, quantity: number, slot: EquippableSlot): Promise<void> {
        Utils.logHeadline(`EQUIP > ${item} x${quantity} - ${slot}`);
        if (slot === EquippableSlot.None) {
            Utils.errorHeadline(`SKIP - Not Equippable`);
            return;
        }

        await this.waiter.wait();

        try {
            await this.characterGateway.equip(item, quantity, slot);
        } catch (e) {
            if (e instanceof ClientException) {
                Utils.errorHeadline(`${e.code}: ${e.message}`);
                return;
            }

            Utils.errorHeadline((e as Error).message);
        }

        return;
    }

    async unequip(quantity: number, slot: EquippableSlot): Promise<void> {
        Utils.logHeadline(`UNEQUIP > ${slot} x${quantity}`);
        if (slot === EquippableSlot.None) {
            Utils.errorHeadline(`SKIP - Not Unequippable`);
            return;
        }

        await this.waiter.wait();

        try {
            await this.characterGateway.unequip(quantity, slot);
        } catch (e) {
            if (e instanceof ClientException) {
                Utils.errorHeadline(`${e.code}: ${e.message}`);
                return;
            }

            Utils.errorHeadline((e as Error).message);
        }

        return;
    }
}
