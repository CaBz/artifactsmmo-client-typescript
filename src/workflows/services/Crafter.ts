import {CharacterGateway} from "../../gateways/CharacterGateway.js";
import {Waiter} from "./Waiter.js";
import * as Utils from "../../Utils.js";
import {ClientException} from "../../gateways/ClientException.js";
import {Items} from "../../lexical/Items.js";

export class Crafter {
    constructor(private readonly waiter: Waiter, private readonly characterGateway: CharacterGateway) {
    }

    async craft(item: Items, quantity: number): Promise<void> {
        Utils.logHeadline(`CRAFT > ${item} x${quantity}`);
        await this.waiter.wait();

        try {
            await this.characterGateway.craft(item, quantity === -1 ? 1 : quantity);
        } catch (e) {
            if (e instanceof ClientException) {
                console.error(`${e.code}: ${e.message}`);
                return;
            }

            console.error((e as Error).message);
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
                console.error(`${e.code}: ${e.message}`);
                return;
            }

            console.error((e as Error).message);
        }

        if (quantity === -1) {
            await this.recycle(item, quantity);
        }
    }
}
