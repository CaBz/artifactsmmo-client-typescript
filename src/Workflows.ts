import {Item} from "./lexical/Item.js";
import {PointOfInterest} from "./lexical/PointOfInterest.js";

export interface MoveAction {
    action: Action.Move;
    coordinates: PointOfInterest;
}

export interface GatherAction {
    action: Action.Gather;
    loops: number;
}

export interface CraftAction {
    action: Action.Craft;
    code: Item;
    quantity: number;
}

export interface BankDepositAllAction {
    action: Action.BankDepositAll;
}

export interface BankWithdrawAction {
    action: Action.BankWithdraw;
    code: Item;
    quantity: number;
}

export interface RestAction {
    action: Action.Rest;
}

export interface FightAction {
    action: Action.Fight;
    loops: number;
}

export interface SubworkflowAction {
    action: Action.SubWorkflow;
    actions: WorkflowAction[];
    condition: SubworkflowCondition;
}

export enum SubworkflowCondition {
    InventoryFull = 'inventory-full',
}

export type WorkflowAction =
    MoveAction
    | GatherAction
    | CraftAction
    | RestAction
    | FightAction
    | SubworkflowAction
    | BankWithdrawAction
    | BankDepositAllAction;

export enum Action {
    Move = 'move',
    Gather = 'gather',
    Craft = 'craft',
    Rest = 'rest',
    Fight = 'fight',
    BankDepositAll = 'bank-deposit-all',
    BankWithdraw = 'bank-withdraw',

    SubWorkflow = 'subworkflow',
}

export class WorkflowRegister {
    static getWorkflows(): Map<string, WorkflowAction[]> {
        const workflows = new Map<string, WorkflowAction[]>;

        WorkflowRegister.registerForGathering(workflows);
        WorkflowRegister.registerForMonsters(workflows);
        WorkflowRegister.registerForCrafting(workflows);
        WorkflowRegister.registerForOthers(workflows);

        return workflows;
    }

    private static registerForGathering(workflows: Map<string, WorkflowAction[]>) {
        // Mining lv. 1
        workflows.set('copper', [
            // Gather until full
            { action: Action.Move, coordinates: PointOfInterest.Copper },
            { action: Action.Gather, loops: -1 },

            // Make all copper
            { action: Action.Move, coordinates: PointOfInterest.Forge },
            { action: Action.Craft, code: Item.Copper, quantity: -1, },

            // Drop everything and get back the ores
            { action: Action.Move, coordinates: PointOfInterest.Bank },
            { action: Action.BankDepositAll },
            { action: Action.BankWithdraw, code: Item.CopperOre, quantity: -1 },
        ]);

        // Woodcutting lv. 1
        workflows.set('ash', [
            { action: Action.Move, coordinates: PointOfInterest.Ash2 },
            { action: Action.Gather, loops: -1 },
            { action: Action.Move, coordinates: PointOfInterest.Bank },
            { action: Action.BankDepositAll },
        ]);

        // Alchemy lv. 1 + Alchemy lv. 5
        workflows.set('sunflower', [
            { action: Action.Move, coordinates: PointOfInterest.Sunflower },
            { action: Action.Gather, loops: -1 },

            { action: Action.Move, coordinates: PointOfInterest.Alchemy },
            { action: Action.Craft, code: Item.SmallHealthPotion, quantity: -1, },

            { action: Action.Move, coordinates: PointOfInterest.Bank },
            { action: Action.BankDepositAll },
            { action: Action.BankWithdraw, code: Item.Sunflower, quantity: -1 },
        ]);

        // Fishing lv. 1
        workflows.set('gudgeon', [
            { action: Action.Move, coordinates: PointOfInterest.Gudgeon },
            { action: Action.Gather, loops: -1 },

            { action: Action.Move, coordinates: PointOfInterest.Cooking },
            { action: Action.Craft, code: Item.CookedGudgeon, quantity: -1, },

            { action: Action.Move, coordinates: PointOfInterest.Bank },
            { action: Action.BankDepositAll },
            { action: Action.BankWithdraw, code: Item.Gudgeon, quantity: -1 },
        ]);
    }

    private static registerForMonsters(workflows: Map<string, WorkflowAction[]>) {
        // Level 2
        workflows.set('yellow_slime1', [
            { action: Action.Move, coordinates: PointOfInterest.YellowSlime1 },
            {
                action: Action.SubWorkflow,
                condition: SubworkflowCondition.InventoryFull,
                actions: [
                    { action: Action.Rest },
                    { action: Action.Fight, loops: 1 },
                ],
            },
            { action: Action.Move, coordinates: PointOfInterest.Bank },
            { action: Action.BankDepositAll },
        ]);
    }

    private static registerForCrafting(workflows: Map<string, WorkflowAction[]>) {
        workflows.set('copper_bar', [
            // Move to bank and dump everything
            { action: Action.Move, coordinates: PointOfInterest.Bank },
            { action: Action.BankDepositAll },

            // Get copper ores and go craft ingots
            { action: Action.BankWithdraw, code: Item.CopperOre, quantity: 10 },
            { action: Action.Move, coordinates: PointOfInterest.Forge },
            { action: Action.Craft, code: Item.Copper, quantity: 1, },
        ]);

        workflows.set('small_health_potion', [
            { action: Action.Move, coordinates: PointOfInterest.Bank },
            { action: Action.BankDepositAll },

            { action: Action.BankWithdraw, code: Item.Sunflower, quantity: 30 },
            { action: Action.Move, coordinates: PointOfInterest.Alchemy },
            { action: Action.Craft, code: Item.SmallHealthPotion, quantity: 10, },
        ]);
    }

    private static registerForOthers(workflows: Map<string, WorkflowAction[]>) {
        workflows.set('dump-bank', [
            // Move to bank and dump everything
            { action: Action.Move, coordinates: PointOfInterest.Bank },
            { action: Action.BankDepositAll },
        ]);


        workflows.set('test', [
            { action: Action.Move, coordinates: PointOfInterest.Bank },
            { action: Action.BankDepositAll },
            { action: Action.BankWithdraw, code: Item.CopperOre, quantity: -1 },
        ]);
    }
}
