import {FightingPOIs, GatheringPOIs, PointOfInterest} from "./lexical/PointOfInterest.js";
import {Recipe, Recipes, ResourceItem} from "./lexical/Recipes.js";
import {Items} from "./lexical/Items.js";
import {
    CraftableAlchemy,
    CraftableCooking,
    CraftableGearcrafting, CraftableJewelry,
    CraftableMining,
    CraftableWeaponcrafting,
    CraftableWoodcutting
} from "./lexical/CraftableItems.js";

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
    code: Items;
    quantity: number;
}

export interface RecycleAction {
    action: Action.Recycle;
    code: Items;
    quantity: number;
}

export interface BankDepositAllAction {
    action: Action.BankDepositAll;
}

export interface BankWithdrawAction {
    action: Action.BankWithdraw;
    code: Items;
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
    | RecycleAction
    | RestAction
    | FightAction
    | SubworkflowAction
    | BankWithdrawAction
    | BankDepositAllAction;

export enum Action {
    Move = 'move',
    Gather = 'gather',
    Craft = 'craft',
    Recycle = 'recycle',
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
        workflows.set('copper-craft', WorkflowFactory.gatherAndCraft(PointOfInterest.Copper, PointOfInterest.Bank1, PointOfInterest.Forge, Items.Copper, Items.CopperOre));
        workflows.set('iron-craft', WorkflowFactory.gatherAndCraft(PointOfInterest.Iron, PointOfInterest.Bank1, PointOfInterest.Forge, Items.Iron, Items.IronOre));

        workflows.set('ash-craft', WorkflowFactory.gatherAndCraft(PointOfInterest.Ash1, PointOfInterest.Bank1, PointOfInterest.Workshop, Items.AshPlank, Items.AshWood));
        workflows.set('spruce-craft', WorkflowFactory.gatherAndCraft(PointOfInterest.Spruce1, PointOfInterest.Bank1, PointOfInterest.Workshop, Items.SprucePlank, Items.SpruceWood));

        workflows.set('sunflower-craft', WorkflowFactory.gatherAndCraft(PointOfInterest.Sunflower, PointOfInterest.Bank1, PointOfInterest.Alchemy, Items.SmallHealthPotion, Items.Sunflower));

        workflows.set('gudgeon-cook', WorkflowFactory.gatherAndCraft(PointOfInterest.Gudgeon, PointOfInterest.Bank1, PointOfInterest.Cooking, Items.CookedGudgeon, Items.Gudgeon));
        workflows.set('shrimp-cook', WorkflowFactory.gatherAndCraft(PointOfInterest.Shrimp, PointOfInterest.Bank1, PointOfInterest.Cooking, Items.CookedShrimp, Items.Shrimp));
        workflows.set('trout-cook', WorkflowFactory.gatherAndCraft(PointOfInterest.Trout, PointOfInterest.Bank2, PointOfInterest.Cooking, Items.CookedTrout, Items.Trout));


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
        CraftableMining.forEach((item: Items) => {
            workflows.set(`craft-${item}`, WorkflowFactory.bankWithdrawAndCraft(PointOfInterest.Forge, item, -1, false));
        });

        CraftableWeaponcrafting.forEach((item: Items) => {
            workflows.set(`craft-${item}`, WorkflowFactory.bankWithdrawAndCraft(PointOfInterest.Weapon, item, -1, true));
        });

        CraftableGearcrafting.forEach((item: Items) => {
            workflows.set(`craft-${item}`, WorkflowFactory.bankWithdrawAndCraft(PointOfInterest.Gear, item, -1, true));
        });

        CraftableJewelry.forEach((item: Items) => {
            workflows.set(`craft-${item}`, WorkflowFactory.bankWithdrawAndCraft(PointOfInterest.Jewel, item, -1, true));
        });

        CraftableWoodcutting.forEach((item: Items) => {
            workflows.set(`craft-${item}`, WorkflowFactory.bankWithdrawAndCraft(PointOfInterest.Workshop, item, -1, false));
        });

        CraftableCooking.forEach((item: Items) => {
            workflows.set(`craft-${item}`, WorkflowFactory.bankWithdrawAndCraft(PointOfInterest.Cooking, item, -1, false));
        });

        CraftableAlchemy.forEach((item: Items) => {
            workflows.set(`craft-${item}`, WorkflowFactory.bankWithdrawAndCraft(PointOfInterest.Alchemy, item, -1, false));
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
    static gatherAndCraft(gatherPoint: PointOfInterest, bankPoint: PointOfInterest, craftPoint: PointOfInterest, craftItem: Items, gatherItem: Items): WorkflowAction[] {
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

    static bankWithdrawAndCraft(craftPoint: PointOfInterest, craftItem: Items, craftQuantity: number, recycle: boolean): WorkflowAction[] {
        const recipe: Recipe = Recipes.getFor(craftItem);

        const withdrawActions: WorkflowAction[] = recipe.items.map((item: ResourceItem): WorkflowAction => {
            return {
                action: Action.BankWithdraw,
                code: item.code,
                quantity: item.quantity,
            }
        });

        const result = [
            { action: Action.Move, coordinates: PointOfInterest.Bank1 },
            { action: Action.BankDepositAll },
            ...withdrawActions,
            { action: Action.Move, coordinates: craftPoint },
            { action: Action.Craft, code: craftItem, quantity: craftQuantity },
        ];

        if (recycle) {
            result.push({ action: Action.Recycle, code: craftItem, quantity: craftQuantity });
        }

        return result;
    }
}
