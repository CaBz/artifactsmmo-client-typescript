import {CharacterGateway} from "../../gateways/CharacterGateway.js";
import {Waiter} from "./Waiter.js";
import * as Utils from "../../Utils.js";
import {ClientException} from "../../gateways/ClientException.js";
import {Items} from "../../lexical/Items.js";
import {EquipmentSetTypes, Item, ItemType} from "../../entities/Item.js";
import {EquippableSlot} from "../../lexical/EquippableSlot.js";

export class Equipper {
    constructor(private readonly waiter: Waiter, private readonly characterGateway: CharacterGateway, private readonly items: Map<string, Item>) {
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

    async swap(code: Items): Promise<void> {
        const item = this.items.get(code);
        if (!item) {
            Utils.logHeadline(`${code} does not exist`);
            return;
        }

        await this.unequip(1, item.type as unknown as EquippableSlot);
        await this.equip(code, 1, item.type as unknown as EquippableSlot);
    }

    logToConsole(level: number, type?: ItemType) {
        const items: Item[] = Array.from(this.items.values()).filter((item: Item) => {
            if (type === undefined && !EquipmentSetTypes.includes(item.type)) {
                return false;
            }

            if (type != undefined && type !== item.type) {
                return false;
            }

            if (level === -1) {
                return true;
            }

            return item.level === level;
        });

        items.sort((a, b) => a.typeAndSubtypeWeight - b.typeAndSubtypeWeight || a.level - b.level);

        const headline = `| ${Utils.formatForMiddle('Name', 23)} `
            + `| Lv. `
            + `| ${Utils.formatForMiddle('Type', 13)} `
            + `| ${Utils.formatForMiddle('Effects', 84)} `
            + `|`;

        console.log('-'.repeat(headline.length));
        console.log(`| ${Utils.formatForMiddle(`ITEMS`, headline.length - 4)} |`)
        console.log('-'.repeat(headline.length));
        console.log(headline);
        console.log('-'.repeat(headline.length));

        items.forEach((item: Item) => {
            const effects = item.effects.map(effect => `${effect.code}: ${effect.value}`);
            console.log(
                `| ${item.code.padEnd(23)} `
                + `| ${item.level.toString().padStart(3)} `
                + `| ${item.typeAndSubtype.padEnd(13)} `
                + `| ${effects.join(', ').padEnd(84, ' ')} `
                + `|`
            );
        });
    }
}
