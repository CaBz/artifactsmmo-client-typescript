import {CharacterGateway} from "../../gateways/CharacterGateway.js";
import {Waiter} from "./Waiter.js";
import * as Utils from "../../Utils.js";
import {ClientException} from "../../gateways/ClientException.js";
import {Character} from "../../entities/Character.js";

export class Gatherer {
    constructor(private readonly waiter: Waiter, private readonly characterGateway: CharacterGateway) {
    }

    async gather(loops: number): Promise<void> {
        Utils.logHeadline(`GATHER > ${loops}`);
        await this.waiter.wait();

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

        await this.gather(loops-1);
    }

    async gatherForTask(): Promise<void> {
        Utils.logHeadline(`GATHER-FT >`);
        const character: Character = await this.characterGateway.status();
        const task = character.getTask();
        if (!task) {
            Utils.errorHeadline('NO TASKS!');
            return;
        }

        const value = task.total - task.progress - character.holdsHowManyOf(task.task);
        if (value <= 0) {
            return;
        }

        await this.gather(value);
    }
}
