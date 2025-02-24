import {CharacterGateway} from "../gateways/CharacterGateway.js";
import * as Utils from "../Utils.js";
import {Direction} from "tty";

export class CooldownWaiter {
    constructor(private readonly characterGateway: CharacterGateway) {
    }

    async waitForCooldown(): Promise<void> {
        const result = await this.characterGateway.status();

        const remainingCooldown = result.isInCooldown() ? result.getRemainingCooldown() : 0;
        if (!remainingCooldown) {
            return;
        }

        const line = `>>> ${remainingCooldown}ms`;
        process.stdout.write(`| ${line.padEnd(34, ' ')} |`);

        await this.sleep(remainingCooldown);
        process.stdout.clearLine(1);
        process.stdout.cursorTo(0);
    }

    private async sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
}
