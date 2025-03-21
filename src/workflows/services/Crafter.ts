import {CharacterGateway} from "../../gateways/CharacterGateway.js";
import {Waiter} from "./Waiter.js";
import * as Utils from "../../Utils.js";
import {ClientException} from "../../gateways/ClientException.js";
import {Items} from "../../lexical/Items.js";
import {CraftActionConditions} from "../WorkflowOrchestrator.js";
import {Character} from "../../entities/Character.js";
import {Container} from "../../Container.js";

export class Crafter {
    constructor(private readonly waiter: Waiter, private readonly characterGateway: CharacterGateway) {
    }

    async craft(item: Items, quantity: number, condition?: CraftActionConditions): Promise<Character> {
        const realQuantity: number = quantity === -1 ? 1 : quantity;

        Utils.logHeadline(`CRAFT > ${item} x${realQuantity}`);

        let character: Character = await this.waiter.wait();
        if (condition === CraftActionConditions.DoNotHave) {
            const heldItems: number = character.holdsHowManyOf(item);
            if (heldItems >= realQuantity) {
                Utils.errorHeadline(`SKIP - Already Has`);
                return character;
            }
        }
        try {
            const craftResult: any = await this.characterGateway.craft(item, realQuantity);
            character = craftResult.character;
        } catch (e) {
            if (e instanceof ClientException) {
                Utils.errorHeadline(`${e.code}: ${e.message}`);
                return character;
            }

            Utils.errorHeadline((e as Error).message);
        }

        if (quantity === -1) {
            await Container.taskRepository.checkForImmediateTask();
            return this.craft(item, quantity);
        }

        return character;
    }

    async recycle(item: Items, quantity: number): Promise<void> {
        const character: Character = await this.waiter.wait();
        const realQuantity = quantity === -1 ? 1 : quantity;

        if (character.holdsHowManyOf(item) < realQuantity) {
            Utils.errorHeadline(`RECYCLE > SKIP`);
            return;
        }

        Utils.logHeadline(`RECYCLE > ${item} x${realQuantity}`);

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
