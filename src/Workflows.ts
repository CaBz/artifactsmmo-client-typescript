import {AlchemyCraftable, CookingCraftable, Item} from "./lexical/Item.js";
import {FightingPOIs, PointOfInterest} from "./lexical/PointOfInterest.js";
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
        // Mining lv. 1
        workflows.set('copper', WorkflowFactory.gather(PointOfInterest.Copper, PointOfInterest.Bank1));
        workflows.set('copper-craft', WorkflowFactory.gatherAndCraft(PointOfInterest.Copper, PointOfInterest.Bank1, PointOfInterest.Forge, Item.Copper, Item.CopperOre));

        // Mining lv. 10
        workflows.set('iron', WorkflowFactory.gather(PointOfInterest.Iron, PointOfInterest.Bank1));
        workflows.set('iron-craft', WorkflowFactory.gatherAndCraft(PointOfInterest.Iron, PointOfInterest.Bank1, PointOfInterest.Forge, Item.Iron, Item.IronOre));

        // Woodcutting lv. 1
        workflows.set('ash', WorkflowFactory.gather(PointOfInterest.Ash1, PointOfInterest.Bank1));
        workflows.set('ash-craft', WorkflowFactory.gatherAndCraft(PointOfInterest.Ash1, PointOfInterest.Bank1, PointOfInterest.Workshop, Item.AshPlank, Item.AshWood));

        // Woodcutting lv. 10
        workflows.set('spruce', WorkflowFactory.gather(PointOfInterest.Spruce1, PointOfInterest.Bank1));
        workflows.set('spruce-craft', WorkflowFactory.gatherAndCraft(PointOfInterest.Spruce1, PointOfInterest.Bank1, PointOfInterest.Workshop, Item.SprucePlank, Item.SpruceWood));

        // Woodcutting lv. 20
        workflows.set('birch', WorkflowFactory.gather(PointOfInterest.Birch1, PointOfInterest.Bank1));

        // Alchemy lv. 1 + Alchemy lv. 5
        workflows.set('sunflower', WorkflowFactory.gather(PointOfInterest.Sunflower, PointOfInterest.Bank1));
        workflows.set('sunflower-craft', WorkflowFactory.gatherAndCraft(PointOfInterest.Sunflower, PointOfInterest.Bank1, PointOfInterest.Alchemy, Item.SmallHealthPotion, Item.Sunflower));

        // Alchemy lv. 20 + Bank2
        workflows.set('nettle', WorkflowFactory.gather(PointOfInterest.Nettle, PointOfInterest.Bank2));

        // Fishing lv. 1
        workflows.set('gudgeon-cook', WorkflowFactory.gatherAndCraft(PointOfInterest.Gudgeon, PointOfInterest.Bank1, PointOfInterest.Cooking, Item.CookedGudgeon, Item.Gudgeon));
        workflows.set('gudgeon', WorkflowFactory.gather(PointOfInterest.Gudgeon, PointOfInterest.Bank1));

        // Fishing lv. 10
        workflows.set('shrimp', WorkflowFactory.gather(PointOfInterest.Shrimp, PointOfInterest.Bank1));
        workflows.set('shrimp-cook', WorkflowFactory.gatherAndCraft(PointOfInterest.Shrimp, PointOfInterest.Bank1, PointOfInterest.Cooking, Item.CookedShrimp, Item.Shrimp));
    }

    private static registerForMonsters(workflows: Map<string, WorkflowAction[]>) {
        FightingPOIs.forEach((pointOfInterest: PointOfInterest) => {
            workflows.set(pointOfInterest, WorkflowFactory.fightUntilFull(pointOfInterest));
        })
    }

    private static registerForCrafting(workflows: Map<string, WorkflowAction[]>) {
        workflows.set('copper_bar', WorkflowFactory.bankWithdrawAndCraft(PointOfInterest.Forge, Item.Copper, -1));
        workflows.set('iron_bar', WorkflowFactory.bankWithdrawAndCraft(PointOfInterest.Forge, Item.Iron, -1));

        workflows.set('ash_plank', WorkflowFactory.bankWithdrawAndCraft(PointOfInterest.Workshop, Item.AshPlank, -1));
        workflows.set('spruce_plank', WorkflowFactory.bankWithdrawAndCraft(PointOfInterest.Workshop, Item.SprucePlank, -1));

        CookingCraftable.forEach((meal: Item) => {
            workflows.set(`craft_${meal}`, WorkflowFactory.bankWithdrawAndCraft(PointOfInterest.Cooking, meal, -1));
        });

        AlchemyCraftable.forEach((potion: Item) => {
            workflows.set(`craft_${potion}`, WorkflowFactory.bankWithdrawAndCraft(PointOfInterest.Alchemy, potion, -1));
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
