import {CharacterGateway} from "../gateways/CharacterGateway.js";
import {PointOfInterest} from "../lexical/PointOfInterest.js";
import {CooldownWaiter} from "./CooldownWaiter.js";
import {MapCoordinates} from "../lexical/MapCoordinates.js";
import * as Utils from "../Utils.js";
import {ClientException} from "../gateways/ClientException.js";

export class Mover {
    constructor(private readonly waiter: CooldownWaiter, private readonly characterGateway: CharacterGateway) {
    }

    async moveToPointOfInterest(name: PointOfInterest): Promise<void> {
        const coordinates = MapCoordinates[name];
        if (!coordinates) {
            throw new Error(`COORDINATES NOT DEFINED FOR ${name}`);
        }

        await this.moveToCoordinates(coordinates.x, coordinates.y, name);
    }

    async moveToCoordinates(x: number, y: number, name?: PointOfInterest): Promise<void> {
        Utils.logHeadline(`MOVE x:${x} y:${y} (${name})`);
        await this.waiter.waitForCooldown();

        try {
            await this.characterGateway.move(x, y);
        } catch (e) {
            if (e instanceof ClientException) {
                console.error(`${e.code}: ${e.message}`);
                return;
            }

            console.error((e as Error).message);
            throw (e);
        }
    }
}
