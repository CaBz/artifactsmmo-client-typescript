import {Skills} from "./Skills.js";
import {Items} from "./Items.js";

export enum PointOfInterest {
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
    GrandExchange = 'grand_exchange',
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

export const GatherBank: any = {
    [Items.MithrilOre]: PointOfInterest.Bank2,
    [Items.DeadWood]: PointOfInterest.Bank2,
    [Items.NettleLeaf]: PointOfInterest.Bank2,
    [Items.GlowstemLeaf]: PointOfInterest.Bank2,
    [Items.Trout]: PointOfInterest.Bank2,
    [Items.Bass]: PointOfInterest.Bank2,
}
