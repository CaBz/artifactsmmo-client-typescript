import {Waiter} from "./Waiter.js";
import {CharacterGateway} from "../../gateways/CharacterGateway.js";
import {Items} from "../../lexical/Items.js";
import * as Utils from "../../Utils.js";
import {ClientException} from "../../gateways/ClientException.js";
import {Character} from "../../entities/Character.js";
import {UseItemActionCondition} from "../WorkflowOrchestrator.js";

export class ItemUser {
    constructor(private readonly waiter: Waiter, private readonly characterGateway: CharacterGateway) {
    }

    async use(item: Items, quantity: number, condition?: UseItemActionCondition) {
        const realQuantity: number = quantity === -1 ? 1 : quantity;

        Utils.logHeadline(`USE > ${item} x${quantity}`);
        const character: Character = await this.waiter.wait();
        if (condition === UseItemActionCondition.FullHP && character.isFullHealth()) {
            Utils.errorHeadline(`SKIP - Full Health`);
            return;
        }

        if (character.holdsHowManyOf(item) < realQuantity) {
            Utils.errorHeadline(`SKIP - Does Not Have`);
            return;
        }

        try {
            await this.characterGateway.use(item, realQuantity);
        } catch (e) {
            if (e instanceof ClientException) {
                Utils.errorHeadline(`${e.code}: ${e.message}`);
                return;
            }

            Utils.errorHeadline((e as Error).message);
        }

        if (quantity === -1) {
            await this.use(item, quantity);
        }
    }
}
