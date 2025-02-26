import {CharacterGateway} from "../../gateways/CharacterGateway.js";
import {PointOfInterest} from "../../lexical/PointOfInterest.js";
import {Waiter} from "./Waiter.js";
import {MapCoordinates} from "../../lexical/MapCoordinates.js";
import * as Utils from "../../Utils.js";
import {ClientException} from "../../gateways/ClientException.js";

export class Mover {
    constructor(private readonly waiter: Waiter, private readonly characterGateway: CharacterGateway) {
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
        await this.waiter.wait();

        try {
            await this.characterGateway.move(x, y);
        } catch (e) {
            if (e instanceof ClientException) {
                Utils.errorHeadline(`${e.code}: ${e.message}`);
                return;
            }

            Utils.errorHeadline((e as Error).message);
        }
    }
}
