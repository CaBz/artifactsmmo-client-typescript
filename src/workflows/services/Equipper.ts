import {CharacterGateway} from "../../gateways/CharacterGateway.js";
import {Waiter} from "./Waiter.js";
import * as Utils from "../../Utils.js";
import {ClientException} from "../../gateways/ClientException.js";
import {Items} from "../../lexical/Items.js";
import {EquipmentSetTypes, Item, ItemType} from "../../entities/Item.js";
import {EquippableSlot} from "../../lexical/EquippableSlot.js";
import {Recipe, Recipes, ResourceItem} from "../../lexical/Recipes.js";

export class Equipper {
    constructor(private readonly waiter: Waiter, private readonly characterGateway: CharacterGateway, private readonly items: Map<string, Item>) {
    }

    async equip(item: Items, quantity: number, slot: EquippableSlot): Promise<void> {
        Utils.logHeadline(`EQUIP > ${item} x${quantity} - ${slot}`);
        if (slot === EquippableSlot.None) {
            Utils.errorHeadline(`SKIP - Not Equippable`);
            return;
        }

        const character = await this.waiter.wait();
        if (character.getItemEquippedIn(slot) === item) {
            Utils.errorHeadline(`SKIP - Already equipped`);
            return;
        }

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

        const character = await this.waiter.wait();
        if (!character.hasSlotEquipped(slot)) {
            Utils.errorHeadline(`SKIP - Already unequipped`);
            return;
        }

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
            + `| ${Utils.formatForMiddle('Recipe', 90)} `
            + `|`;

        console.log('-'.repeat(headline.length));
        console.log(`| ${Utils.formatForMiddle(`ITEMS`, headline.length - 4)} |`)
        console.log('-'.repeat(headline.length));
        console.log(headline);
        console.log('-'.repeat(headline.length));


        items.forEach((item: Item) => {
            let recipe: Recipe | undefined = undefined;
            try { recipe = Recipes.getFor(item.code); } catch { }

            const recipeItems: string = (recipe === undefined)
                ? '(not craftable)'
                : recipe.items.map((recipeItem: ResourceItem) => `${recipeItem.code} x${recipeItem.quantity}`).join(', ');

            console.log(
                `| ${item.code.padEnd(23)} `
                + `| ${item.level.toString().padStart(3)} `
                + `| ${item.typeAndSubtype.padEnd(13)} `
                + `| ${item.effectsToString().padEnd(84, ' ')} `
                + `| ${recipeItems.padEnd(90, ' ')} `
                + `|`
            );
        });
    }
}
