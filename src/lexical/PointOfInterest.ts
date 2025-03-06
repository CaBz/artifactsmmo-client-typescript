import {Skills} from "./Skills.js";
import {Items} from "./Items.js";

export enum PointOfInterest {
    // Monsters
    Chicken = 'chicken',
    Cow = 'cow',
    GreenSlime1 = 'green_slime1',
    GreenSlime2 = 'green_slime2',
    YellowSlime1 = 'yellow_slime1',
    YellowSlime2 = 'yellow_slime2',
    BlueSlime1 = 'blue_slime1',
    BlueSlime2 = 'blue_slime2',
    RedSlime1 = 'red_slime1',
    RedSlime2 = 'red_slime2',
    Mushmush1 = 'mushmush1',
    Mushmush2 = 'mushmush2',
    FlyingSerpent1 = 'flying_serpent1',
    FlyingSerpent2 = 'flying_serpent2',
    Highwayman = 'highwayman',
    Wolf1 = 'wolf1',
    Wolf2 = 'wolf2',
    Skeleton1 = 'skeleton1',
    Skeleton2 = 'skeleton2',
    Pig = 'pig',
    Ogre1 = 'ogre1',
    Ogre2 = 'ogre2',
    Spider = 'spider',

    // Crafting
    Cooking = 'cooking',
    Weapon = 'weapon',
    Gear = 'gear',
    Jewel = 'jewel',
    Alchemy = 'alchemy',

    Workshop = 'workshop',
    Forge = 'forge',

    TaskMasterMonsters = 'task_master_monsters',
    TaskMasterItems = 'task_master_items',

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
    DeadTree1 = 'dead_tree1',
    DeadTree2 = 'dead_tree2',
    Magic = 'magic', // 3,11 -- 35 // magic_tree -magic_wood
    Maple1 = 'maple1', // 4,14 -- 40 // maple_tree - maple_wood
    Maple2 = 'maple12', // 1,13 -- 40 // maple_tree - maple_wood

    Sunflower = 'sunflower', // 2,2 -- 1 // sunflower_field - sunflower
    Nettle = 'nettle', // 7,11 -- 20 // nettle - nettle_leaf
    Glowstem = 'glowstem', // 1,10 -- 40 // glowstem - glowstem_leaf

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

export const Workstations: any = {
    [Skills.Mining]: PointOfInterest.Forge,
    [Skills.Woodcutting]: PointOfInterest.Workshop,
    [Skills.Weaponcrafting]: PointOfInterest.Weapon,
    [Skills.Gearcrafting]: PointOfInterest.Gear,
    [Skills.Jewelrycrafting]: PointOfInterest.Jewel,
    [Skills.Cooking]: PointOfInterest.Cooking,
    [Skills.Alchemy]: PointOfInterest.Alchemy,
}

export const FightingPOIs: PointOfInterest[] = [
    PointOfInterest.Chicken,
    PointOfInterest.GreenSlime1,
    PointOfInterest.GreenSlime2,
    PointOfInterest.YellowSlime1,
    PointOfInterest.YellowSlime2,
    PointOfInterest.BlueSlime1,
    PointOfInterest.BlueSlime2,
    PointOfInterest.RedSlime1,
    PointOfInterest.RedSlime2,
    PointOfInterest.Cow,
    PointOfInterest.Mushmush1,
    PointOfInterest.Mushmush2,
    PointOfInterest.FlyingSerpent1,
    PointOfInterest.FlyingSerpent2,
    PointOfInterest.Highwayman,
    PointOfInterest.Wolf1,
    PointOfInterest.Wolf2,
    PointOfInterest.Skeleton1,
    PointOfInterest.Skeleton2,
    PointOfInterest.Pig,
    PointOfInterest.Ogre1,
    PointOfInterest.Ogre2,
    PointOfInterest.Spider,
];

export const GatheringPOIs = [
    [PointOfInterest.Copper, PointOfInterest.Bank1],
    [PointOfInterest.Iron, PointOfInterest.Bank1],
    [PointOfInterest.Coal, PointOfInterest.Bank1],
    [PointOfInterest.Gold, PointOfInterest.Bank1],
    [PointOfInterest.Mithril, PointOfInterest.Bank2],

    [PointOfInterest.Ash1, PointOfInterest.Bank1],
    [PointOfInterest.Ash2, PointOfInterest.Bank1],
    [PointOfInterest.Spruce1, PointOfInterest.Bank1],
    [PointOfInterest.Spruce2, PointOfInterest.Bank2],
    [PointOfInterest.Birch1, PointOfInterest.Bank1],
    [PointOfInterest.Birch2, PointOfInterest.Bank1],
    [PointOfInterest.DeadTree1, PointOfInterest.Bank2],
    [PointOfInterest.DeadTree2, PointOfInterest.Bank1],
    [PointOfInterest.Maple1, PointOfInterest.Bank2],
    [PointOfInterest.Maple2, PointOfInterest.Bank2],

    [PointOfInterest.Sunflower, PointOfInterest.Bank1],
    [PointOfInterest.Nettle, PointOfInterest.Bank2],
    [PointOfInterest.Glowstem, PointOfInterest.Bank2],

    [PointOfInterest.Gudgeon, PointOfInterest.Bank1],
    [PointOfInterest.Shrimp, PointOfInterest.Bank1],
    [PointOfInterest.Trout, PointOfInterest.Bank2],
    [PointOfInterest.Bass, PointOfInterest.Bank2],
    [PointOfInterest.Salmon1, PointOfInterest.Bank1],
    [PointOfInterest.Salmon2, PointOfInterest.Bank1],

    // Event
    [PointOfInterest.Magic, PointOfInterest.Bank2],
];

export const ItemGatheringPOIs = {
    [Items.CopperOre]: [PointOfInterest.Copper, PointOfInterest.Bank1],
    [Items.IronOre]: [PointOfInterest.Iron, PointOfInterest.Bank1],
    [Items.Coal]: [PointOfInterest.Coal, PointOfInterest.Bank1],
    [Items.GoldOre]: [PointOfInterest.Gold, PointOfInterest.Bank1],
    [Items.MithrilOre]: [PointOfInterest.Mithril, PointOfInterest.Bank2],

    [Items.AshWood]: [PointOfInterest.Ash1, PointOfInterest.Bank1],
    [Items.SpruceWood]: [PointOfInterest.Spruce1, PointOfInterest.Bank1],
    [Items.BirchWood]: [PointOfInterest.Birch1, PointOfInterest.Bank1],
    [Items.DeadWood]: [PointOfInterest.DeadTree1, PointOfInterest.Bank2],
    [Items.MapleWood]: [PointOfInterest.Maple1, PointOfInterest.Bank2],

    [Items.Sunflower]: [PointOfInterest.Sunflower, PointOfInterest.Bank1],
    [Items.NettleLeaf]: [PointOfInterest.Nettle, PointOfInterest.Bank2],
    [Items.GlowstemLeaf]: [PointOfInterest.Glowstem, PointOfInterest.Bank2],

    [Items.Gudgeon]: [PointOfInterest.Gudgeon, PointOfInterest.Bank1],
    [Items.Shrimp]: [PointOfInterest.Shrimp, PointOfInterest.Bank1],
    [Items.Trout]: [PointOfInterest.Trout, PointOfInterest.Bank2],
    [Items.Bass]: [PointOfInterest.Bass, PointOfInterest.Bank2],
    [Items.Salmon]: [PointOfInterest.Salmon1, PointOfInterest.Bank1],
}
