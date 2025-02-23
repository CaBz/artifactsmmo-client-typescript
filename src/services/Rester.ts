import {CooldownWaiter} from "./CooldownWaiter.js";
import {CharacterGateway} from "../gateways/CharacterGateway.js";
import * as Utils from "../Utils.js";
import {ClientException} from "../gateways/ClientException.js";

export class Rester {
    constructor(private readonly waiter: CooldownWaiter, private readonly characterGateway: CharacterGateway) {
    }

    async rest(): Promise<void> {
        Utils.logHeadline(`REST`);
        await this.waiter.waitForCooldown();

        try {
            await this.characterGateway.rest();
        } catch (e) {
            if (e instanceof ClientException) {
                console.error(`${e.code}: ${e.message}`);
                return;
            }

            console.error((e as Error).message);
            throw (e);
        }
    }
}
