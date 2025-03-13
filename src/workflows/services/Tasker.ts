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
        const character: Character = await this.waiter.wait();

        if (character.getTask() !== undefined) {
            Utils.errorHeadline(`GET TASK > SKIP`);
            return;
        }
        Utils.logHeadline(`GET TASK`);

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
        const character = await this.waiter.wait();
        if (character.holdsHowManyOf(Items.TasksCoin) < 6) {
            Utils.errorHeadline('EXCHANGE TASK > SKIP');
            return;
        }

        Utils.logHeadline(`EXCHANGE TASK`);

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
        const character = await this.waiter.wait();
        if (character.holdsHowManyOf(item) === 0) {
            Utils.errorHeadline('TRADE TASK > SKIP');
            return;
        }

        const realQuantity: number = quantity === -1 ? 1 : quantity;
        Utils.logHeadline(`TRADE TASK > ${item} x${realQuantity}`);

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
        const character = await this.waiter.wait();
        if (!character.getTask()) {
            Utils.errorHeadline(`CANCEL TASK > SKIP`);
            return;
        }

        Utils.logHeadline(`COMPLETE TASK`);

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
        const character = await this.waiter.wait();
        if (!character.getTask()) {
            Utils.errorHeadline(`CANCEL TASK > SKIP`);
            return;
        }

        Utils.logHeadline(`CANCEL TASK`);

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
