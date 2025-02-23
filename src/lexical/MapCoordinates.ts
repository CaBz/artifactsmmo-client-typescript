import {PointOfInterest} from "./PointOfInterest.js";

export interface Coordinates {
    x: number,
    y: number,
}

export const MapCoordinates: {[key: string]: Coordinates} = {
    // Monster
    [PointOfInterest.Chicken]: { x: 0, y: 1 }, //lv.1
    [PointOfInterest.GreenSlime1]: { x: 0, y: -1 }, //lv.4
    [PointOfInterest.YellowSlime1]: { x: 4, y: -1 }, //lv.2
    [PointOfInterest.YellowSlime2]: { x: 0, y: 1 }, //lv.5

    // Crafting
    [PointOfInterest.Cooking]: { x: 1, y: 1 },
    [PointOfInterest.Weapon]: { x: 2, y: 1 },
    [PointOfInterest.Armor]: { x: 3, y: 1 },
    [PointOfInterest.Jewel]: { x: 1, y: 3 },
    [PointOfInterest.Alchemy]: { x: 2, y: 3 },
    [PointOfInterest.Workshop]: { x: -2, y: -3 },
    [PointOfInterest.Forge]: { x: 1, y: 5 },

    // Gathering
    [PointOfInterest.Ash]: { x: -1, y: 0 },
    [PointOfInterest.Copper]: { x: 2, y: 0 },
    [PointOfInterest.Sunflower]: { x: 2, y: 2 },
    [PointOfInterest.Gudgeon]: { x: 4, y: 2 },

    // Utilities
    [PointOfInterest.Bank]: { x: 4, y: 1 },
    [PointOfInterest.GrandExchange]: { x: 5, y: 1 },
};
