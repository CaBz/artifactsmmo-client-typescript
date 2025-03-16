import {MapTile} from "./MapTile.js";
import {Coordinates} from "../lexical/Coordinates.js";

export class Event {
    constructor(private readonly data: any) {
        /*
        {
            name: 'Nomadic Merchant',
            code: 'nomadic_merchant',
            map: {
              name: 'City',
              skin: 'forest_village2_nomadic_merchant',
              x: 3,
              y: 2,
              content: { type: 'npc', code: 'nomadic_merchant' }
            },
            previous_skin: 'forest_village2',
            duration: 60,
            expiration: '2025-03-09T19:18:07.519Z',
            created_at: '2025-03-09T18:18:07.519Z'
          }
        */
    }

    get name(): string {
        return this.data.name;
    }

    get map(): MapTile {
        return new MapTile(this.data.map);
    }

    get mapData(): MapTile {
        return this.data.map;
    }

    get code(): string {
        return this.data.code;
    }

    get coordinates(): Coordinates {
        return { x: this.data.map.x, y: this.data.map.y };
    }

    get isExpired(): boolean {
        return this.getRemainingActive() <= 0;
    }

    getRemainingActive(): number {
        const now = new Date();
        const expiration = new Date(this.data.expiration);
        const timeDifference = expiration.getTime() - now.getTime();

        return timeDifference > 0 ? timeDifference : 0;
    }
}
