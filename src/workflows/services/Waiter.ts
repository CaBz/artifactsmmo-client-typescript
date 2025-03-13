import {CharacterGateway} from "../../gateways/CharacterGateway.js";
import * as Utils from "../../Utils.js";
import {Character} from "../../entities/Character.js";

export class Waiter {
    constructor(private readonly characterGateway: CharacterGateway) {
    }

    async wait(): Promise<Character> {
        const result = await this.characterGateway.status();

        const remainingCooldown = result.isInCooldown() ? result.getRemainingCooldown() : 0;
        if (!remainingCooldown) {
            return result;
        }

        Utils.stdoutHeadline(`>>> ${(remainingCooldown/1000).toFixed(2)}s`);

        await Utils.sleep(remainingCooldown);

        Utils.stdoutClear();

        return result;
    }
}
