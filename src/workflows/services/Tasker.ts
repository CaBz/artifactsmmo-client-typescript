import {Waiter} from "./Waiter.js";
import {CharacterGateway} from "../../gateways/CharacterGateway.js";
import * as Utils from "../../Utils.js";
import {ClientException} from "../../gateways/ClientException.js";
import {Items} from "../../lexical/Items.js";
import {Character} from "../../entities/Character.js";

export class Tasker {
    constructor(private readonly waiter: Waiter, private readonly characterGateway: CharacterGateway) {
    }

    async getTask(): Promise<void> {
        Utils.logHeadline(`GET TASK`);
        const character: Character = await this.waiter.wait();

        if (character.getTask() !== undefined) {
            Utils.errorHeadline(`SKIP - Already Has`);
            return;
        }

        try {
            await this.characterGateway.taskGet();
        } catch (e) {
            if (e instanceof ClientException) {
                Utils.errorHeadline(`${e.code}: ${e.message}`);
                return;
            }

            Utils.errorHeadline((e as Error).message);
        }
    }

    async exchangeTask(): Promise<void> {
        Utils.logHeadline(`EXCHANGE TASK`);
        await this.waiter.wait();

        try {
            await this.characterGateway.taskExchange();
        } catch (e) {
            if (e instanceof ClientException) {
                Utils.errorHeadline(`${e.code}: ${e.message}`);
                return;
            }

            Utils.errorHeadline((e as Error).message);
        }
    }

    async tradeTask(item: Items, quantity: number): Promise<void> {
        const realQuantity: number = quantity === -1 ? 1 : quantity;

        Utils.logHeadline(`TRADE TASK > ${item} x${realQuantity}`);
        await this.waiter.wait();

        try {
            await this.characterGateway.taskTrade(item, realQuantity);
        } catch (e) {
            if (e instanceof ClientException) {
                Utils.errorHeadline(`${e.code}: ${e.message}`);
                return;
            }

            Utils.errorHeadline((e as Error).message);
        }

        if (quantity === -1) {
            await this.tradeTask(item, quantity);
        }
    }

    async completeTask(): Promise<void> {
        Utils.logHeadline(`COMPLETE TASK`);
        await this.waiter.wait();

        try {
            await this.characterGateway.taskComplete();
        } catch (e) {
            if (e instanceof ClientException) {
                Utils.errorHeadline(`${e.code}: ${e.message}`);
                return;
            }

            Utils.errorHeadline((e as Error).message);
        }
    }

    async cancelTask(): Promise<void> {
        Utils.logHeadline(`CANCEL TASK`);
        await this.waiter.wait();

        try {
            await this.characterGateway.taskCancel();
        } catch (e) {
            if (e instanceof ClientException) {
                Utils.errorHeadline(`${e.code}: ${e.message}`);
                return;
            }

            Utils.errorHeadline((e as Error).message);
        }
    }
}
