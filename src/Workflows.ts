import {Item} from "./lexical/Item.js";
import {PointOfInterest} from "./lexical/PointOfInterest.js";
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
        workflows.set('spruce', WorkflowFactory.gather(PointOfInterest.Spruce1, PointOfInterest.Bank1));
        workflows.set('spruce-craft', WorkflowFactory.gatherAndCraft(PointOfInterest.Spruce1, PointOfInterest.Bank1, PointOfInterest.Workshop, Item.SprucePlank, Item.SpruceWood));

        // Alchemy lv. 1 + Alchemy lv. 5
        workflows.set('sunflower', WorkflowFactory.gather(PointOfInterest.Sunflower, PointOfInterest.Bank1));
        workflows.set('sunflower-craft', WorkflowFactory.gatherAndCraft(PointOfInterest.Sunflower, PointOfInterest.Bank1, PointOfInterest.Alchemy, Item.SmallHealthPotion, Item.Sunflower));

        // Alchemy lv. 20 + Bank2
        workflows.set('nettle', WorkflowFactory.gather(PointOfInterest.Nettle, PointOfInterest.Bank2));

        workflows.set('sunflower', // Alchemy lv. 1 + Alchemy lv. 5
            WorkflowFactory.gather(PointOfInterest.Sunflower, PointOfInterest.Bank1)
        );

        workflows.set('gudgeon-cook', // Fishing lv. 1
            WorkflowFactory.gatherAndCraft(PointOfInterest.Gudgeon, PointOfInterest.Bank1, PointOfInterest.Cooking, Item.CookedGudgeon, Item.Gudgeon)
        );

        workflows.set('gudgeon', // Fishing lv. 1
            WorkflowFactory.gather(PointOfInterest.Gudgeon, PointOfInterest.Bank1)
        );

        workflows.set('shrimp', // Fishing lv. 10
            WorkflowFactory.gather(PointOfInterest.Shrimp, PointOfInterest.Bank1)
        );
    }

    private static registerForMonsters(workflows: Map<string, WorkflowAction[]>) {
        workflows.set('chicken', // Level 2
            WorkflowFactory.fightUntilFull(PointOfInterest.Chicken)
        );

        workflows.set('yellow_slime1', // Level 2
            WorkflowFactory.fightUntilFull(PointOfInterest.YellowSlime1)
        );

        workflows.set('green_slime1', // Level 4
            WorkflowFactory.fightUntilFull(PointOfInterest.GreenSlime1)
        );
    }

    private static registerForCrafting(workflows: Map<string, WorkflowAction[]>) {
        workflows.set('copper_bar',
            WorkflowFactory.bankWithdrawAndCraft([{code: Item.CopperOre, quantity:-1}], PointOfInterest.Forge, Item.Copper, -1)
        );

        workflows.set('ash_plank',
            WorkflowFactory.bankWithdrawAndCraft([{code: Item.AshWood, quantity:-1}], PointOfInterest.Workshop, Item.AshPlank, -1)
        );

        workflows.set('spruce_plank',
            WorkflowFactory.bankWithdrawAndCraft([{code: Item.SpruceWood, quantity:-1}], PointOfInterest.Workshop, Item.SprucePlank, -1)
        );

        workflows.set('small_health_potion',
            WorkflowFactory.bankWithdrawAndCraft([{code: Item.Sunflower, quantity:-1}], PointOfInterest.Alchemy, Item.SmallHealthPotion, -1)
        );

        workflows.set('earth_boost_potion',
            WorkflowFactory.bankWithdrawAndCraft([
                    {code: Item.Sunflower, quantity: 1},
                    {code: Item.YellowSlimeBall, quantity: 1},
                    {code: Item.Algae, quantity: 1},
            ],
            PointOfInterest.Alchemy, Item.EathBoostPotion, 1)
        );

        workflows.set('air_boost_potion',
            WorkflowFactory.bankWithdrawAndCraft([
                {code: Item.Sunflower, quantity: 1},
                {code: Item.GreenSlimeBall, quantity: 1},
                {code: Item.Algae, quantity: 1},
            ], PointOfInterest.Alchemy, Item.AirBoostPotion, 1)
        );
    }

    private static registerForOthers(workflows: Map<string, WorkflowAction[]>) {
        workflows.set('dump-bank', [
            // Move to bank and dump everything
            { action: Action.Move, coordinates: PointOfInterest.Bank1 },
            { action: Action.BankDepositAll },
        ]);

        workflows.set('sunflower-earth-potion', [
            ...workflows.get('sunflower')!,
            ...workflows.get('earth_boost_potion')!
        ]);


        workflows.set('test', [
            { action: Action.Move, coordinates: PointOfInterest.Bank1 },
            { action: Action.BankDepositAll },
            { action: Action.BankWithdraw, code: Item.CopperOre, quantity: -1 },
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

    static bankWithdrawAndCraft(resourceItems: ResourceItem[], craftPoint: PointOfInterest, craftItem: Item, craftQuantity: number): WorkflowAction[] {
        const actions = [
            { action: Action.Move, coordinates: PointOfInterest.Bank1 },
            { action: Action.BankDepositAll },
        ];

        let resourceItem: ResourceItem;
        for (var i=0; i<resourceItems.length; i++) {
            resourceItem = resourceItems[i]!;
            actions.push({ action: Action.BankWithdraw, code: resourceItem.code, quantity: resourceItem.quantity });
        }

        actions.push({ action: Action.Move, coordinates: craftPoint });
        actions.push({ action: Action.Craft, code: craftItem, quantity: craftQuantity, });

        return actions;
    }

    static recipeToWithdrawActions(item: Item): WorkflowAction[] {
        const recipe = Recipes.getFor(item);
        const actions = [];
        for (var i=0; i<recipe.items.length; i++) {
            actions.push({ action: Action.BankWithdraw, code: recipe.items[i].code, quantity: recipe.items[i].quantity });
        }

        return actions;
    }
}
