import {CraftableAlchemy, CraftableCooking, CraftableMining, CraftableWoodcutting, Item} from "./lexical/Item.js";
import {FightingPOIs, GatheringPOIs, PointOfInterest} from "./lexical/PointOfInterest.js";
import {Recipe, Recipes, ResourceItem} from "./lexical/Recipes.js";

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
        workflows.set('copper-craft', WorkflowFactory.gatherAndCraft(PointOfInterest.Copper, PointOfInterest.Bank1, PointOfInterest.Forge, Item.Copper, Item.CopperOre));
        workflows.set('iron-craft', WorkflowFactory.gatherAndCraft(PointOfInterest.Iron, PointOfInterest.Bank1, PointOfInterest.Forge, Item.Iron, Item.IronOre));

        workflows.set('ash-craft', WorkflowFactory.gatherAndCraft(PointOfInterest.Ash1, PointOfInterest.Bank1, PointOfInterest.Workshop, Item.AshPlank, Item.AshWood));
        workflows.set('spruce-craft', WorkflowFactory.gatherAndCraft(PointOfInterest.Spruce1, PointOfInterest.Bank1, PointOfInterest.Workshop, Item.SprucePlank, Item.SpruceWood));

        workflows.set('sunflower-craft', WorkflowFactory.gatherAndCraft(PointOfInterest.Sunflower, PointOfInterest.Bank1, PointOfInterest.Alchemy, Item.SmallHealthPotion, Item.Sunflower));

        workflows.set('gudgeon-cook', WorkflowFactory.gatherAndCraft(PointOfInterest.Gudgeon, PointOfInterest.Bank1, PointOfInterest.Cooking, Item.CookedGudgeon, Item.Gudgeon));
        workflows.set('shrimp-cook', WorkflowFactory.gatherAndCraft(PointOfInterest.Shrimp, PointOfInterest.Bank1, PointOfInterest.Cooking, Item.CookedShrimp, Item.Shrimp));


        GatheringPOIs.forEach((pointOfInterests: PointOfInterest[]) => {
            const [gatherPOI, bankPOI] = pointOfInterests;
            workflows.set(`gather-${gatherPOI}`, WorkflowFactory.gather(gatherPOI!, bankPOI!));
        })
    }

    private static registerForMonsters(workflows: Map<string, WorkflowAction[]>) {
        FightingPOIs.forEach((pointOfInterest: PointOfInterest) => {
            workflows.set(`fight-${pointOfInterest}`, WorkflowFactory.fightUntilFull(pointOfInterest));
        })
    }

    private static registerForCrafting(workflows: Map<string, WorkflowAction[]>) {
        CraftableMining.forEach((bar: Item) => {
            workflows.set(`forge-${bar}`, WorkflowFactory.bankWithdrawAndCraft(PointOfInterest.Forge, bar, -1));
        });

        CraftableWoodcutting.forEach((plank: Item) => {
            workflows.set(`cut-${plank}`, WorkflowFactory.bankWithdrawAndCraft(PointOfInterest.Workshop, plank, -1));
        });

        CraftableCooking.forEach((meal: Item) => {
            workflows.set(`cook-${meal}`, WorkflowFactory.bankWithdrawAndCraft(PointOfInterest.Cooking, meal, -1));
        });

        CraftableAlchemy.forEach((potion: Item) => {
            workflows.set(`brew-${potion}`, WorkflowFactory.bankWithdrawAndCraft(PointOfInterest.Alchemy, potion, -1));
        });
    }

    private static registerForOthers(workflows: Map<string, WorkflowAction[]>) {
        workflows.set('dump-bank', [
            // Move to bank and dump everything
            { action: Action.Move, coordinates: PointOfInterest.Bank1 },
            { action: Action.BankDepositAll },
        ]);
    }
}

export class WorkflowFactory {
    static gatherAndCraft(gatherPoint: PointOfInterest, bankPoint: PointOfInterest, craftPoint: PointOfInterest, craftItem: Item, gatherItem: Item): WorkflowAction[] {
        return [
            { action: Action.Move, coordinates: gatherPoint },
            { action: Action.Gather, loops: -1 },

            { action: Action.Move, coordinates: craftPoint },
            { action: Action.Craft, code: craftItem, quantity: -1, },

            { action: Action.Move, coordinates: bankPoint },
            { action: Action.BankDepositAll },
            { action: Action.BankWithdraw, code: gatherItem, quantity: -1 },
        ]
    }

    static gather(gatherPoint: PointOfInterest, bankPoint: PointOfInterest): WorkflowAction[] {
        return [
            { action: Action.Move, coordinates: gatherPoint },
            { action: Action.Gather, loops: -1 },

            { action: Action.Move, coordinates: bankPoint },
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
            { action: Action.Move, coordinates: PointOfInterest.Bank1 },
            { action: Action.BankDepositAll },
        ];
    }

    static bankWithdrawAndCraft(craftPoint: PointOfInterest, craftItem: Item, craftQuantity: number): WorkflowAction[] {
        const recipe: Recipe = Recipes.getFor(craftItem);
        const itemsLength: number = recipe.items.length;

        const withdrawActions: WorkflowAction[] = recipe.items.map((item: ResourceItem): WorkflowAction => {
            return {
                action: Action.BankWithdraw,
                code: item.code,
                // Get as many items if it's just one item
                quantity: itemsLength === 1 ? -1 : item.quantity
            }
        });

        return [
            { action: Action.Move, coordinates: PointOfInterest.Bank1 },
            { action: Action.BankDepositAll },
            ...withdrawActions,
            { action: Action.Move, coordinates: craftPoint },
            { action: Action.Craft, code: craftItem, quantity: craftQuantity },
        ];
    }
}
