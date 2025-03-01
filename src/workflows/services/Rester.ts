import {Waiter} from "./Waiter.js";
import {CharacterGateway} from "../../gateways/CharacterGateway.js";
import * as Utils from "../../Utils.js";
import {ClientException} from "../../gateways/ClientException.js";

export class Rester {
    constructor(private readonly waiter: Waiter, private readonly characterGateway: CharacterGateway) {
    }

    async rest(): Promise<void> {
        Utils.logHeadline(`REST`);
        await this.waiter.wait();

        // @TODO: Add logic to check inventory for consumables instead of resting - Resting should be last resort

        try {
            await this.characterGateway.rest();
        } catch (e) {
            if (e instanceof ClientException) {
                Utils.errorHeadline(`${e.code}: ${e.message}`);
                return;
            }

            Utils.errorHeadline((e as Error).message);
        }
    }
}
