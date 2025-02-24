import {CooldownWaiter} from "./CooldownWaiter.js";
import {CharacterGateway} from "../gateways/CharacterGateway.js";
import {Item} from "../lexical/Item.js";
import * as Utils from "../Utils.js";
import {ClientException} from "../gateways/ClientException.js";
import {ArtifactsClient} from "../gateways/ArtifactsClient.js";

export class Banker {
    constructor(
        private readonly waiter: CooldownWaiter,
        private readonly characterGateway: CharacterGateway,
        private readonly client: ArtifactsClient
    ) {
    }

    async depositAll(): Promise<void> {
        const character = await this.characterGateway.status();
        const inventories = character.getInventory();

        let inventory;
        for (let i=0; i<inventories.length; i++) {
            inventory = inventories[i];
            if (inventory.quantity === 0) {
                continue;
            }

            await this.depositItem(inventory.code, inventory.quantity);
        }
    }

    async depositItem(item: Item, quantity: number): Promise<void> {
        Utils.logHeadline(`BANK DEPOSIT > ${item} x${quantity}`);

        await this.waiter.waitForCooldown();

        try {
            await this.characterGateway.bankDeposit(item, quantity);
        } catch (e) {
            if (e instanceof ClientException) {
                console.error(`${e.code}: ${e.message}`);
                return;
            }

            console.error((e as Error).message);
            throw (e);
        }
    }

    async withdraw(item: Item, quantity: number): Promise<void> {
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

        await this.waiter.waitForCooldown();

        try {
            await this.characterGateway.bankWithdraw(item, quantity);
        } catch (e) {
            if (e instanceof ClientException) {
                console.error(`${e.code}: ${e.message}`);
                return;
            }

            console.error((e as Error).message);
            throw (e);
        }
    }

    async getStatus(withItems: boolean) {
        try {
            const result = await this.client.getBank(withItems);
            console.dir(result, { depth: null })
        } catch (e) {
            if (e instanceof ClientException) {
                console.error(`${e.code}: ${e.message}`);
                return;
            }

            console.error((e as Error).message);
            throw (e);
        }
    }
}
