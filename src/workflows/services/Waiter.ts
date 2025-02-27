import {CharacterGateway} from "../../gateways/CharacterGateway.js";
import * as Utils from "../../Utils.js";

export class Waiter {
    constructor(private readonly characterGateway: CharacterGateway) {
    }

    async wait(): Promise<void> {
        const result = await this.characterGateway.status();

        const remainingCooldown = result.isInCooldown() ? result.getRemainingCooldown() : 0;
        if (!remainingCooldown) {
            return;
        }

        Utils.stdoutHeadline(`>>> ${remainingCooldown}ms`);

        await Utils.sleep(remainingCooldown);

        Utils.stdoutClear();
    }
}
