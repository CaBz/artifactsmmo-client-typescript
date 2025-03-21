import {Waiter} from "./Waiter.js";
import {CharacterGateway} from "../../gateways/CharacterGateway.js";
import {Items} from "../../lexical/Items.js";
import * as Utils from "../../Utils.js";
import {ClientException} from "../../gateways/ClientException.js";
import {ArtifactsClient} from "../../gateways/ArtifactsClient.js";
import {BankWithdrawActionCondition} from "../WorkflowOrchestrator.js";
import {Character} from "../../entities/Character.js";
import {Recipe} from "../../lexical/Recipes.js";
import {Item, ItemSubType, ItemType} from "../../entities/Item.js";

export class Banker {
    constructor(
        private readonly waiter: Waiter,
        private readonly characterGateway: CharacterGateway,
        private readonly client: ArtifactsClient,
        private readonly items: Map<string, Item>,
    ) {
    }

    async depositAll(): Promise<void> {
        const character: Character = await this.characterGateway.status();
        const inventories = character.getInventory();

        if (character.gold > 0) {
            await this.depositGold(character.gold);
        }

        let inventory;
        for (let i=0; i<inventories.length; i++) {
            inventory = inventories[i];
            if (inventory.quantity === 0) {
                continue;
            }

            await this.depositItem(inventory.code, inventory.quantity);
        }
    }

    async depositGold(quantity: number): Promise<void> {
        Utils.logHeadline(`BANK DEPOSIT > x${quantity}g`);

        await this.waiter.wait();

        try {
            await this.characterGateway.bankDepositGold(quantity);
        } catch (e) {
            if (e instanceof ClientException) {
                Utils.errorHeadline(`${e.code}: ${e.message}`);
                return;
            }

            Utils.errorHeadline((e as Error).message);
        }
    }

    async depositItem(item: Items, quantity: number): Promise<void> {
        Utils.logHeadline(`BANK DEPOSIT > ${item} x${quantity}`);

        await this.waiter.wait();

        try {
            await this.characterGateway.bankDeposit(item, quantity);
        } catch (e) {
            if (e instanceof ClientException) {
                Utils.errorHeadline(`${e.code}: ${e.message}`);
                return;
            }

            Utils.errorHeadline((e as Error).message);
        }
    }

    async withdraw(item: Items, quantity: number, condition?: BankWithdrawActionCondition): Promise<void> {
        if (condition === BankWithdrawActionCondition.DoNotHave) {
            const character: Character = await this.characterGateway.status();
            const heldItems: number = character.holdsHowManyOf(item);
            if (heldItems >= quantity) {
                Utils.logHeadline(`BANK WITHDRAW > ${item} x${quantity}`);
                Utils.errorHeadline(`SKIP - Already Has`);
                return;
            }
        }

        if (quantity === -1) {
            const result = await this.client.bankQuery(item);
            quantity = result[0]?.quantity;
            if (quantity === undefined) {
                return
            }

            const character = await this.characterGateway.status();
            const availableSpaces = character.availableInventorySpaces();

            quantity = Math.min(quantity, availableSpaces);
        }

        Utils.logHeadline(`BANK WITHDRAW > ${item} x${quantity}`);

        await this.waiter.wait();

        try {
            await this.characterGateway.bankWithdraw(item, quantity);
        } catch (e) {
            if (e instanceof ClientException) {
                Utils.errorHeadline(`${e.code}: ${e.message}`);
                return;
            }

            Utils.errorHeadline((e as Error).message);
        }
    }

    async getStatus() {
        try {
            const result = await this.client.getBank();
            //result.sort((a: any, b: any) => a.code.localeCompare(b.code));
            this.logBankItems(result);
        } catch (e) {
            if (e instanceof ClientException) {
                Utils.errorHeadline(`${e.code}: ${e.message}`);
                return;
            }

            Utils.errorHeadline((e as Error).message);
        }
    }

    private logBankItems(bank: any): void {
        const bankItems: any[] = bank.items;
        const items = bankItems.map((bankItem: any) => ({ item: this.items.get(bankItem.code)!, quantity: bankItem.quantity }));
        items.sort((a: any, b: any) => a.item.typeAndSubtypeWeight - b.item.typeAndSubtypeWeight || a.level - b.level || a.item.name.localeCompare(b.item.name));

        const headline = `| ${Utils.formatForMiddle('Name', 23)} `
            + `| Lv. `
            + `| ${Utils.formatForMiddle('Type', 25)} `
            + `| Quantity `
            + `| ${Utils.formatForMiddle('Effects', 84)} `
            + `|`;

        const bankUsage = `${bankItems.length}/${bank.bank.slots}`

        console.log('-'.repeat(headline.length));
        console.log(`| ${Utils.formatForMiddle(`BANK STATUS (${bankUsage}) - ${bank.bank.gold}g`, headline.length - 4)} |`)
        console.log('-'.repeat(headline.length));
        console.log(headline);
        console.log('-'.repeat(headline.length));

        items.forEach((entry) => {
            const item: Item = entry.item;
            const quantity: number = entry.quantity;

            const itemType = item.typeAndSubtype;

            console.log(
                `| ${item.name.padEnd(23, ' ')} `
                + `| ${item.level.toString().padStart(3)} `
                + `| ${itemType.padEnd(25, ' ')} `
                + `| ${quantity.toString().padStart(8, ' ')} `
                + `| ${item.effectsToString().padEnd(84, ' ')} `
                + `|`
            );
        });

        console.log('-'.repeat(headline.length));
    }

    async getBank() {
        // Get bank items
        const bank: any = {};
        (await this.client.getBank()).items.forEach((bankItem: any) => {
            bank[bankItem.code] = bankItem.quantity;
        });

        return bank;
    }

    async getBankItemFromType(types: ItemType[], maximumLevel: number) {
        const bankItems = (await this.client.getBank()).items;

        let mappedBankItems: any[] =  bankItems.map((entry: any) => ({ item: this.items.get(entry.code), quantity: entry.quantity }));
        let filteredBankItems: any[] = mappedBankItems.filter((entry: any) => (types.includes(entry.item.type) && entry.item.level <= maximumLevel));

        filteredBankItems.sort((a: any, b: any) => b.item.level - a.item.level);

        return filteredBankItems;
    }

    async getFoodConsumables(maximumLevel: number) {
        let consumables: any[] = await this.getBankItemFromType([ItemType.Consumable], maximumLevel);
        consumables = consumables.filter((entry: any) => (entry.item.subType === ItemSubType.Food) && (entry.item.code !== 'apple'));

        return consumables
    }

    async getCookables(maximumLevel: number) {
        let resources: any = await this.getBankItemFromType([ItemType.Resource], maximumLevel);
        resources = resources.filter((entry: any) => ([ItemSubType.Food, ItemSubType.Fishing].includes(entry.item.subType)));

        resources.sort((a: any, b: any) => a.item.level - b.item.level);
    }

    async howManyTimesRecipeCanBeCraft(recipe: Recipe, maxInventory: number): Promise<number> {
        const bank: any = await this.getBank();

        return this.calculateRecipeQuantityFromBankItems(bank, recipe, maxInventory);
    }

    calculateRecipeQuantityFromBankItems(bank: any, recipe: Recipe, maxInventory: number): number {
        let recipeQuantity: number = recipe.getQuantityCraftable(maxInventory);

        // Make sure we update the recipe times based on the minimum possible from available items in bank
        const availableItems: any[] = [];
        recipe.items.forEach((item: any) => {
            if (!bank[item.code]) {
                return;
            }

            const bankQuantity: number = bank[item.code];
            const bankRecipeQuantity: number = Math.floor(bankQuantity / item.quantity);
            recipeQuantity = Math.min(recipeQuantity, bankRecipeQuantity);
            availableItems.push({code: item.code, quantity: bankQuantity});
            return;
        });

        // Check if we have all recipe items in our bank
        if (availableItems.length < recipe.items.length) {
            return 0;
        }

        return recipeQuantity;
    }
}
