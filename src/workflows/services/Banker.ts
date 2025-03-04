import {Waiter} from "./Waiter.js";
import {CharacterGateway} from "../../gateways/CharacterGateway.js";
import {Items} from "../../lexical/Items.js";
import * as Utils from "../../Utils.js";
import {ClientException} from "../../gateways/ClientException.js";
import {ArtifactsClient} from "../../gateways/ArtifactsClient.js";
import {BankWithdrawActionCondition} from "../WorkflowOrchestrator.js";
import {Character} from "../../entities/Character.js";
import {Recipe, ResourceItem} from "../../lexical/Recipes.js";
import {Item} from "../../entities/Item.js";

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

    private logBankItems(bankItems: any[]): void {
        const items = bankItems.map((bankItem: any) => ({ item: this.items.get(bankItem.code)!, quantity: bankItem.quantity }));
        items.sort((a, b) => a.item.type.localeCompare(b.item.type) || a.item.name.localeCompare(b.item.name));

        const headline = `| ${Utils.formatForMiddle('Name', 23)} `
            + `| Lv. `
            + `| ${Utils.formatForMiddle('Type', 10)} `
            + `| Quantity `
            + `|`;

        console.log('-'.repeat(headline.length));
        console.log(`| ${Utils.formatForMiddle('BANK STATUS', headline.length - 4)} |`)
        console.log('-'.repeat(headline.length));
        console.log(headline);
        console.log('-'.repeat(headline.length));

        items.forEach((entry) => {
            const item: Item = entry.item;
            const quantity: number = entry.quantity;

            console.log(
                `| ${item.name.padEnd(23, ' ')} `
                + `| ${item.level.toString().padStart(3)} `
                + `| ${item.type.padEnd(10, ' ')} `
                + `| ${quantity.toString().padStart(8, ' ')} `
                + `|`
            );
        });

        console.log('-'.repeat(headline.length));
    }

    async howManyTimesRecipeCanBeCraft(recipe: Recipe, maxInventory: number): Promise<number> {
        // Get bank items
        const bankItems: any[] = await this.client.getBank();

        // Check character skill level vs recipe level?

        // Figure out how many times we can do the recipe, assuming we have all items
        const recipeRequiredItems: number = recipe.items.reduce((total: number, item: ResourceItem) => total + item.quantity, 0);
        let recipeQuantity: number = Math.floor(maxInventory / recipeRequiredItems);

        // Make sure we update the recipe times based on the minimum possible from available items in bank
        const availableItems: any[] = [];
        recipe.items.forEach((item: any) => {
            bankItems.forEach((bankItem: any) => {
                if (bankItem.code === item.code) {
                    const bankRecipeQuantity: number = Math.floor(bankItem.quantity / item.quantity);
                    recipeQuantity = Math.min(recipeQuantity, bankRecipeQuantity);
                    availableItems.push(bankItem);
                    return;
                }
            });
        });

        // Check if we have all recipe items in our bank
        if (availableItems.length < recipe.items.length) {
            return 0;
        }

        return recipeQuantity;
    }
}
