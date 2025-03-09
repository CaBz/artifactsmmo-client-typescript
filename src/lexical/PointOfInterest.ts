import {Skills} from "./Skills.js";
import {Items} from "./Items.js";

export enum PointOfInterest {


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


    Cooking = 'workshop_cooking',
    Weapon = 'workshop_weaponcrafting',
    Gear = 'workshop_gearcrafting',
    Jewel = 'workshop_jewelrycrafting',
    Alchemy = 'workshop_alchemy',
    Workshop = 'workshop_woodcutting',
    Forge = 'workshop_mining',

    TaskMasterMonsters = 'tasks_master_monsters',
    TaskMasterItems = 'tasks_master_items',

    Bank1 = 'bank1',
    Bank2 = 'bank2',
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

export const TaskMasters: any = {
    'items': PointOfInterest.TaskMasterItems,
    'monsters': PointOfInterest.TaskMasterMonsters,
}

export const TaskMasterBanks: any = {
    'items': PointOfInterest.Bank2,
    'monsters': PointOfInterest.Bank1,
}

export const ItemGatheringPOIs: any = {
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
