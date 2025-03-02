import {Waiter} from "./Waiter.js";
import {CharacterGateway} from "../../gateways/CharacterGateway.js";
import * as Utils from "../../Utils.js";
import {ClientException} from "../../gateways/ClientException.js";
import {Character} from "../../entities/Character.js";

export class Rester {
    constructor(private readonly waiter: Waiter, private readonly characterGateway: CharacterGateway) {
    }

    async rest(): Promise<Character> {
        Utils.logHeadline(`REST`);
        const character: Character = await this.waiter.wait();
        if (character.isFullHealth()) {
            Utils.errorHeadline(`SKIP - Full Health`);
            return character;
        }

        // @TODO: Add logic to check inventory for consumables instead of resting - Resting should be last resort

        try {
            const result = await this.characterGateway.rest();
            return result.character;
        } catch (e) {
            if (e instanceof ClientException) {
                Utils.errorHeadline(`${e.code}: ${e.message}`);
                return character;
            }

            Utils.errorHeadline((e as Error).message);
        }

        return character;
    }
}
