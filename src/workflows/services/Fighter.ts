import {Waiter} from "./Waiter.js";
import {CharacterGateway} from "../../gateways/CharacterGateway.js";
import * as Utils from "../../Utils.js";
import {ClientException} from "../../gateways/ClientException.js";
import {Monsters} from "../../lexical/Monsters.js";

export class Fighter {
    constructor(private readonly waiter: Waiter, private readonly characterGateway: CharacterGateway) {
    }

    async fight(loops: number, code: Monsters): Promise<void> {
        Utils.logHeadline(`FIGHT > ${code}`);

        await this.waiter.wait();

        try {
            await this.characterGateway.fight();
        } catch (e) {
            if (e instanceof ClientException) {
                Utils.errorHeadline(`${e.code}: ${e.message}`);
                await Utils.sleep(5000);
                return;
            }
            Utils.errorHeadline((e as Error).message);
        }

        if ((loops - 1) === 0) {
            return;
        }

        await this.fight(loops - 1, code);
    }
}
