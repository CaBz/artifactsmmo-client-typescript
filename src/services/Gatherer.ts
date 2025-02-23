import {CharacterGateway} from "../gateways/CharacterGateway.js";
import {CooldownWaiter} from "./CooldownWaiter.js";
import * as Utils from "../Utils.js";
import {ClientException} from "../gateways/ClientException.js";

export class Gatherer {
    constructor(private readonly waiter: CooldownWaiter, private readonly characterGateway: CharacterGateway) {
    }

    async gather(loops: number): Promise<void> {
        Utils.logHeadline(`GATHER > ${loops}`);
        await this.waiter.waitForCooldown();

        try {
            await this.characterGateway.gather();
        } catch (e) {
            // Inventory full
            if (e instanceof ClientException) {
                console.error(`${e.code}: ${e.message}`);
                return;
            }

            console.error((e as Error).message);
            throw (e);
        }

        if (loops-1 === 0) {
            return;
        }

        await this.gather(loops-1);
    }
}
