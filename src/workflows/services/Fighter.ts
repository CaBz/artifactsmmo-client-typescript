import {Waiter} from "./Waiter.js";
import {CharacterGateway} from "../../gateways/CharacterGateway.js";
import * as Utils from "../../Utils.js";
import {ClientException} from "../../gateways/ClientException.js";
import {Character} from "../../entities/Character.js";

export class Fighter {
    constructor(private readonly waiter: Waiter, private readonly characterGateway: CharacterGateway) {
    }

    async fight(loops: number): Promise<void> {
        Utils.logHeadline(`FIGHT > ${loops}`);
        await this.waiter.wait();

        try {
            await this.characterGateway.fight();
        } catch (e) {
            if (e instanceof ClientException) {
                Utils.errorHeadline(`${e.code}: ${e.message}`);
                return;
            }

            Utils.errorHeadline((e as Error).message);
        }

        if ((loops - 1) === 0) {
            return;
        }

        await this.fight(loops - 1);
    }
}
