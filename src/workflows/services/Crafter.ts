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
        Utils.logHeadline(`RECYCLE > ${item} x${quantity}`);
        await this.waiter.wait();

        try {
            await this.characterGateway.recycle(item, quantity === -1 ? 1 : quantity);
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
