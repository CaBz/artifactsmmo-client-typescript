import {CharacterGateway} from "../gateways/CharacterGateway.js";
import * as Utils from "../Utils.js";

export class CooldownWaiter {
    constructor(private readonly characterGateway: CharacterGateway) {
    }

    async waitForCooldown(): Promise<void> {
        const result = await this.characterGateway.status();

        const remainingCooldown = result.isInCooldown() ? result.getRemainingCooldown() : 0;
        if (!remainingCooldown) {
            return;
        }

        Utils.logHeadline(`>>> ${remainingCooldown}ms`)

        await Utils.sleep(remainingCooldown);
    }
}
