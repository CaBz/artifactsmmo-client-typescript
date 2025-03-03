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

    async use(item: Items, quantity: number, condition?: UseItemActionCondition): Promise<Character> {
        const realQuantity: number = quantity === -1 ? 1 : quantity;


        const character: Character = await this.waiter.wait();
        if (condition === UseItemActionCondition.FullHP && character.isFullHealth()) {
            Utils.logHeadline(`USE > ${item} x${quantity}`);
            Utils.errorHeadline(`USE > Skipped (Full HP)`);
            return character;
        }

        if (character.holdsHowManyOf(item) < realQuantity) {
            Utils.errorHeadline(`SKIP - Does Not Have`);
            return character;
        }

        Utils.logHeadline(`USE > ${item} x${quantity}`);

        try {
            const useResult: any = await this.characterGateway.use(item, realQuantity);
            return useResult.character;
        } catch (e) {
            if (e instanceof ClientException) {
                Utils.errorHeadline(`${e.code}: ${e.message}`);
                return character;
            }

            Utils.errorHeadline((e as Error).message);
        }

        if (quantity === -1) {
            return this.use(item, quantity);
        }

        return character;
    }
}
