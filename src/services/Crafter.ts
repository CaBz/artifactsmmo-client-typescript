import {CharacterGateway} from "../gateways/CharacterGateway.js";
import {CooldownWaiter} from "./CooldownWaiter.js";
import * as Utils from "../Utils.js";
import {ClientException} from "../gateways/ClientException.js";
import {Item} from "../lexical/Item.js";

export class Crafter {
    constructor(private readonly waiter: CooldownWaiter, private readonly characterGateway: CharacterGateway) {
    }

    async craft(item: Item, quantity: number): Promise<void> {
        Utils.logHeadline(`CRAFT > ${item} x${quantity}`);
        await this.waiter.waitForCooldown();

        try {
            await this.characterGateway.craft(item, quantity === -1 ? 1 : quantity);
        } catch (e) {
            if (e instanceof ClientException) {
                console.error(`${e.code}: ${e.message}`);
                return;
            }

            console.error((e as Error).message);
            throw (e);
        }

        if (quantity === -1) {
            await this.craft(item, quantity);
        }
    }
}
