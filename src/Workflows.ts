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
        workflows.set('copper', // Mining lv. 1
            WorkflowFactory.gatherAndCraft(PointOfInterest.Copper, PointOfInterest.Forge, Item.Copper, Item.CopperOre)
        );

        workflows.set('iron', // Mining lv. 10
            WorkflowFactory.gatherAndCraft(PointOfInterest.Iron, PointOfInterest.Forge, Item.Iron, Item.IronOre)
        );

        // Wood
        workflows.set('ash', WorkflowFactory.gather(PointOfInterest.Ash1)); // Woodcutting lv. 1
        workflows.set('spruce', WorkflowFactory.gather(PointOfInterest.Spruce1)); // Woodcutting lv. 10


        workflows.set('sunflower', // Alchemy lv. 1 + Alchemy lv. 5
            WorkflowFactory.gatherAndCraft(PointOfInterest.Sunflower, PointOfInterest.Alchemy, Item.SmallHealthPotion, Item.Sunflower)
        );

        workflows.set('gudgeon', // Fishing lv. 1
            //WorkflowFactory.gatherAndCraft(PointOfInterest.Gudgeon, PointOfInterest.Cooking, Item.CookedGudgeon, Item.Gudgeon)
            WorkflowFactory.gather(PointOfInterest.Gudgeon)
        );

        workflows.set('shrimp', // Fishing lv. 10
            WorkflowFactory.gather(PointOfInterest.Shrimp)
        );
    }

    private static registerForMonsters(workflows: Map<string, WorkflowAction[]>) {
        workflows.set('yellow_slime1', // Level 2
            WorkflowFactory.fightUntilFull(PointOfInterest.YellowSlime1)
        );
    }

    private static registerForCrafting(workflows: Map<string, WorkflowAction[]>) {
        workflows.set('copper_bar',
            WorkflowFactory.bankWithdrawAndCraft(Item.CopperOre, -1, PointOfInterest.Forge, Item.Copper, -1)
        );

        workflows.set('small_health_potion',
            WorkflowFactory.bankWithdrawAndCraft(Item.Sunflower, -1, PointOfInterest.Alchemy, Item.SmallHealthPotion, -1)
        );
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

export class WorkflowFactory {
    static gatherAndCraft(gatherPoint: PointOfInterest, craftPoint: PointOfInterest, craftItem: Item, gatherItem: Item): WorkflowAction[] {
        return [
            { action: Action.Move, coordinates: gatherPoint },
            { action: Action.Gather, loops: -1 },

            { action: Action.Move, coordinates: craftPoint },
            { action: Action.Craft, code: craftItem, quantity: -1, },

            { action: Action.Move, coordinates: PointOfInterest.Bank },
            { action: Action.BankDepositAll },
            { action: Action.BankWithdraw, code: gatherItem, quantity: -1 },
        ]
    }

    static gather(gatherPoint: PointOfInterest): WorkflowAction[] {
        return [
            { action: Action.Move, coordinates: gatherPoint },
            { action: Action.Gather, loops: -1 },

            { action: Action.Move, coordinates: PointOfInterest.Bank },
            { action: Action.BankDepositAll },
        ]
    }

    static fightUntilFull(monsterPoint: PointOfInterest): WorkflowAction[] {
        return [
            { action: Action.Move, coordinates: monsterPoint },
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
        ];
    }

    static bankWithdrawAndCraft(resourceItem: Item, resourceQuantity: number, craftPoint: PointOfInterest, craftItem: Item, craftQuantity: number): WorkflowAction[] {
        return [
            { action: Action.Move, coordinates: PointOfInterest.Bank },
            { action: Action.BankDepositAll },

            { action: Action.BankWithdraw, code: resourceItem, quantity: resourceQuantity },
            { action: Action.Move, coordinates: craftPoint },
            { action: Action.Craft, code: craftItem, quantity: craftQuantity, },
        ]
    }
}
