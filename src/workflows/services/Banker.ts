import {Waiter} from "./Waiter.js";
import {CharacterGateway} from "../../gateways/CharacterGateway.js";
import {Items} from "../../lexical/Items.js";
import * as Utils from "../../Utils.js";
import {ClientException} from "../../gateways/ClientException.js";
import {ArtifactsClient} from "../../gateways/ArtifactsClient.js";
import {BankWithdrawActionCondition} from "../WorkflowOrchestrator.js";
import {Character} from "../../entities/Character.js";

export class Banker {
    constructor(
        private readonly waiter: Waiter,
        private readonly characterGateway: CharacterGateway,
        private readonly client: ArtifactsClient
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

    async getStatus(withItems: boolean) {
        try {
            const result = await this.client.getBank(withItems);
            result.sort((a: any, b: any) => a.code.localeCompare(b.code));
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
        Utils.logHeadline(`BANK STATUS`);

        // bankItems.forEach((bankItem) => {
        //     Utils.logHeadline(`${bankItem.code.padEnd(28, ' ')} ${bankItem.quantity.toString().padStart(5, ' ')}`);
        // });

        console.dir(bankItems, { depth: null });
    }
}
