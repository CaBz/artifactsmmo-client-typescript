import {CharacterGateway} from "../../gateways/CharacterGateway.js";
import {Waiter} from "./Waiter.js";
import * as Utils from "../../Utils.js";
import {ClientException} from "../../gateways/ClientException.js";
import {Character} from "../../entities/Character.js";
import {Container} from "../../Container.js";

export class Gatherer {
    constructor(private readonly waiter: Waiter, private readonly characterGateway: CharacterGateway) {
    }

    async gather(loops: number): Promise<void> {
        Utils.logHeadline(`GATHER > ${loops}`);
        const character: Character = await this.waiter.wait();
        if (character.isInventoryFull()) {
            Utils.errorHeadline('SKIP - Inventory Full')
            return;
        }

        try {
            await this.characterGateway.gather();
        } catch (e) {
            // Inventory full
            if (e instanceof ClientException) {
                Utils.errorHeadline(`${e.code}: ${e.message}`);
                return;
            }

            Utils.errorHeadline((e as Error).message);
        }

        if (loops-1 === 0) {
            return;
        }

        await Container.taskRepository.checkForImmediateTask();
        await this.gather(loops-1);
    }
}
