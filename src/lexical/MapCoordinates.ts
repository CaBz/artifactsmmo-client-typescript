import {PointOfInterest} from "./PointOfInterest.js";

export interface Coordinates {
    x: number,
    y: number,
}

export const MapCoordinates: {[key: string]: Coordinates} = {
    // Monster
    [PointOfInterest.Chicken]: { x: 0, y: 1 }, //lv.1
    [PointOfInterest.Cow]: { x: 0, y: 2 }, //lv.1
    [PointOfInterest.YellowSlime1]: { x: 4, y: -1 }, //lv.2
    [PointOfInterest.YellowSlime2]: { x: 0, y: 1 }, //lv.2
    [PointOfInterest.GreenSlime1]: { x: 3, y: -2 }, //lv.4
    [PointOfInterest.GreenSlime2]: { x: 0, y: -1 }, //lv.4
    [PointOfInterest.BlueSlime1]: { x: 2, y: -1 }, //lv.6
    [PointOfInterest.BlueSlime2]: { x: 0, y: -2 }, //lv.6
    [PointOfInterest.RedSlime1]: { x: 1, y: -1 }, //lv.7
    [PointOfInterest.RedSlime2]: { x: 2, y: -2 }, //lv.7

    // Crafting
    [PointOfInterest.Cooking]: { x: 1, y: 1 },
    [PointOfInterest.Weapon]: { x: 2, y: 1 },
    [PointOfInterest.Armor]: { x: 3, y: 1 },
    [PointOfInterest.Jewel]: { x: 1, y: 3 },
    [PointOfInterest.Alchemy]: { x: 2, y: 3 },
    [PointOfInterest.Workshop]: { x: -2, y: -3 },
    [PointOfInterest.Forge]: { x: 1, y: 5 },

    // Gathering
    // Ores
    [PointOfInterest.Copper]: { x: 2, y: 0 }, // 1
    [PointOfInterest.Iron]: { x: 1, y: 7 }, // 10
    [PointOfInterest.Coal]: { x: 1, y: 6 }, // 20
    [PointOfInterest.Gold]: { x: 6, y: -3 }, // 30
    [PointOfInterest.Mithril]: { x: -2, y: 13 }, // 40

    // Woods
    [PointOfInterest.Ash1]: { x: 6, y: 1 }, // 1 - BEST
    [PointOfInterest.Ash2]: { x: -1, y: 0 }, // 1
    [PointOfInterest.Spruce1]: { x: 2, y: 6 }, // 10 - BEST
    [PointOfInterest.Spruce2]: { x: 1, y: 9 }, // 10
    [PointOfInterest.Birch1]: { x: 3, y: 5 }, // 20 - BEST
    [PointOfInterest.Birch2]: { x: -1, y: 6 }, // 20
    [PointOfInterest.Magic]: { x: 3, y: 11 }, // 35 - Event? Move around?
    [PointOfInterest.Maple1]: { x: 4, y: 14 }, // 40 - BEST
    [PointOfInterest.Maple2]: { x: 1, y: 13 }, // 40

    // Plants
    [PointOfInterest.Sunflower]: { x: 2, y: 2 },
    [PointOfInterest.Glowsteam]: { x: 1, y: 10 },
    [PointOfInterest.Nettle]: { x: 7, y: 14 },

    // Fishes
    [PointOfInterest.Gudgeon]: { x: 4, y: 2 },
    [PointOfInterest.Shrimp]: { x: 5, y: 2 },
    [PointOfInterest.Trout]: { x: 7, y: 12 },
    [PointOfInterest.Bass]: { x: 6, y: 12 },
    [PointOfInterest.Salmon1]: { x: -3, y: -4 },
    [PointOfInterest.Salmon2]: { x: -2, y: -4 },

    // Utilities
    [PointOfInterest.Bank1]: { x: 4, y: 1 },
    [PointOfInterest.Bank2]: { x: 7, y: 13 },
    [PointOfInterest.GrandExchange]: { x: 5, y: 1 },
};
