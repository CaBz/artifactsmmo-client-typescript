export enum PointOfInterest {
    // Monsters
    Chicken = 'chicken',
    GreenSlime1 = 'green_slime1',
    GreenSlime2 = 'green_slime2',
    YellowSlime1 = 'yellow_slime1',
    YellowSlime2 = 'yellow_slime2',
    BlueSlime1 = 'blue_slime1',
    BlueSlime2 = 'blue_slime2',
    RedSlime1 = 'red_slime1',
    RedSlime2 = 'red_slime2',

    // Crafting
    Cooking = 'cooking',
    Weapon = 'weapon',
    Armor = 'armor',
    Jewel = 'jewel',
    Alchemy = 'alchemy',

    Workshop = 'workshop',
    Forge = 'forge',

    // Gathering
    Copper = 'copper', // 2,0 -- 1 // copper_rocks - copper_ore
    Iron = 'iron', // 1,7 -- 10 // iron_rocks - iron_ore
    Coal = 'coal', // 1,6 -- 20 // coal_rocks - coal
    Gold = 'gold', // 6,-3 -- 30 // gold_rocks - gold_ore
    Mithril = 'mithril', // -2,13 -- 40 // mithril_rocks - mithril_ore

    Ash1 = 'ash1', // 6, 1 -- 1 // ash_tree - ash_wood
    Ash2 = 'ash2', // -1, 0 -- 1 // ash_tree - ash_wood
    Spruce1 = 'spruce1', // 2,6  -- 10 // spruce_tree - spruce_wood
    Spruce2 = 'spruce2', // 1,9 -- 10 // spruce_tree - spruce_wood
    Birch1 = 'birch1', // 3,5 -- 20 // birch_tree - birch_wood
    Birch2 = 'birch2', // -1,6 -- 20 // birch_tree - birch_wood
    Magic = 'magic', // 3,11 -- 35 // magic_tree -magic_wood
    Maple1 = 'maple1', // 4,14 -- 40 // maple_tree - maple_wood
    Maple2 = 'maple12', // 1,13 -- 40 // maple_tree - maple_wood

    Sunflower = 'sunflower', // 2,2 -- 1 // sunflower_field - sunflower
    Nettle = 'nettle', // 7,11 -- 20 // nettle - nettle_leaf
    Glowsteam = 'glowsteam', // 1,10 -- 40 // glowstem - glowstem_leaf

    Gudgeon = 'gudgeon', // 4,2 -- 1 // gudgeon_fishing_spot - gudgeon
    Shrimp = 'shrimp', // 5,2 -- 10 // shrimp_fishing_spot - shrimp
    Trout = 'trout', // 7,12 -- 20 // trout_fishing_spot - trout
    Bass = 'bass', // 6,12 -- 30 // bass_fishing_spot - bass
    Salmon1 = 'salmon1', // -3,-4 -- 40 // salmon_fishing_spot - salmon
    Salmon2 = 'salmon2', // -2,-4 -- 40 // salmon_fishing_spot - salmon

    // Utilities
    Bank1 = 'bank1',
    Bank2 = 'bank2', // 7,13
    GrandExchange = 'grand_exchange'
}


export const FightingPOIs = [
    PointOfInterest.Chicken,
    PointOfInterest.GreenSlime1,
    PointOfInterest.GreenSlime2,
    PointOfInterest.YellowSlime1,
    PointOfInterest.YellowSlime2,
    PointOfInterest.BlueSlime1,
    PointOfInterest.BlueSlime2,
    PointOfInterest.RedSlime1,
    PointOfInterest.RedSlime2,
];
