import {Coordinates} from "../lexical/MapCoordinates.js";

export class MapTile {
    constructor(private readonly data: any) {
        /*
        {
            "name": "string",
            "skin": "string",
            "x": 0,
            "y": 0,
            "content": {
                "type": "string",
                "code": "string"
        }
        */
    }

    get name() {
        return this.data.name;
    }

    get skin() {
        return this.data.skin;
    }

    get coordinates(): Coordinates {
        return {
            x: this.data.x,
            y: this.data.y,
        };
    }

    get contentType() {
        return this.data.content?.type;
    }

    get contentCode() {
        return this.data.content?.code;
    }
}
