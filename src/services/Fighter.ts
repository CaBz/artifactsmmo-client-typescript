import {CooldownWaiter} from "./CooldownWaiter.js";
import {CharacterGateway} from "../gateways/CharacterGateway.js";
import * as Utils from "../Utils.js";
import {ClientException} from "../gateways/ClientException.js";

export class Fighter {
    constructor(private readonly waiter: CooldownWaiter, private readonly characterGateway: CharacterGateway) {
    }

    async fight(loops: number): Promise<void> {
        Utils.logHeadline(`FIGHT > ${loops}`);
        await this.waiter.waitForCooldown();

        try {
            await this.characterGateway.fight();
        } catch (e) {
            if (e instanceof ClientException) {
                console.error(`${e.code}: ${e.message}`);
                return;
            }

            console.error((e as Error).message);
            throw (e);
        }

        if ((loops - 1) === 0) {
            return;
        }

        await this.fight(loops - 1);
    }
}
