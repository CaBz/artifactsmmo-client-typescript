import {Coordinates} from "../lexical/MapCoordinates.js";

export class Map {
    constructor(private readonly data: any) {
    }

    getName() {
        return this.data.name;
    }

    getSkin() {
        return this.data.skin;
    }

    getCoordinates(): Coordinates {
        return {
            x: this.data.x,
            y: this.data.y,
        };
    }

    getContentType() {
        return this.data.content.type;
    }

    getContentCode() {
        return this.data.content.code;
    }
}
