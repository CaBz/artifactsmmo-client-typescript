import {CharacterGateway} from "../../gateways/CharacterGateway.js";
import {Waiter} from "./Waiter.js";
import * as Utils from "../../Utils.js";
import {ClientException} from "../../gateways/ClientException.js";
import {Items} from "../../lexical/Items.js";
import {CraftActionConditions} from "../WorkflowOrchestrator.js";
import {Character} from "../../entities/Character.js";

export class Crafter {
    constructor(private readonly waiter: Waiter, private readonly characterGateway: CharacterGateway) {
    }

    async craft(item: Items, quantity: number, condition?: CraftActionConditions): Promise<void> {
        const realQuantity: number = quantity === -1 ? 1 : quantity;

        Utils.logHeadline(`CRAFT > ${item} x${realQuantity}`);

        if (condition === CraftActionConditions.DoNotHave) {
            const character: Character = await this.characterGateway.status();
            const heldItems: number = character.holdsHowManyOf(item);
            if (heldItems >= realQuantity) {
                Utils.errorHeadline(`SKIP - Already Has`);
                return;
            }
        }

        await this.waiter.wait();

        try {
            await this.characterGateway.craft(item, realQuantity);
        } catch (e) {
            if (e instanceof ClientException) {
                Utils.errorHeadline(`${e.code}: ${e.message}`);
                return;
            }

            Utils.errorHeadline((e as Error).message);
        }

        if (quantity === -1) {
            await this.craft(item, quantity);
        }
    }

    async recycle(item: Items, quantity: number): Promise<void> {
        const realQuantity = quantity === -1 ? 1 : quantity;

        Utils.logHeadline(`RECYCLE > ${item} x${realQuantity}`);
        const character: Character = await this.waiter.wait();

        if (character.holdsHowManyOf(item) < realQuantity) {
            Utils.errorHeadline(`SKIP - Does Not Have`);
            return;
        }

        try {
            await this.characterGateway.recycle(item, realQuantity);
        } catch (e) {
            if (e instanceof ClientException) {
                Utils.errorHeadline(`${e.code}: ${e.message}`);
                return;
            }

            Utils.errorHeadline((e as Error).message);
        }

        if (quantity === -1) {
            await this.recycle(item, quantity);
        }
    }
}
