import {FightingPOIs, GatheringPOIs, PointOfInterest} from "../lexical/PointOfInterest.js";
import {Items} from "../lexical/Items.js";
import {
    CraftableAlchemy,
    CraftableCooking,
    CraftableGearcrafting, CraftableJewelry,
    CraftableMining,
    CraftableWeaponcrafting,
    CraftableWoodcutting
} from "../lexical/CraftableItems.js";
import {Action, WorkflowAction} from "./WorkflowOrchestrator.js";
import {WorkflowFactory} from "./WorkflowFactory.js";
import {EquippableSlot} from "../entities/Character.js";

export class WorkflowRegister {
    static create(): Map<string, WorkflowAction[]> {
        const workflows = new Map<string, WorkflowAction[]>;

        WorkflowRegister.registerForGathering(workflows);
        WorkflowRegister.registerForMonsters(workflows);
        WorkflowRegister.registerForCrafting(workflows);
        WorkflowRegister.registerForTasks(workflows);
        WorkflowRegister.registerForOthers(workflows);
        WorkflowRegister.registerForSets(workflows);


        workflows.set('test', [
            { action: Action.ExecuteTask },
        ]);

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
        workflows.set('bass-cook', WorkflowFactory.gatherAndCraft(PointOfInterest.Bass, PointOfInterest.Bank2, PointOfInterest.Cooking, Items.CookedBass, Items.Bass));


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
            workflows.set(`craft-${item}`, WorkflowFactory.withdrawAndCraft(PointOfInterest.Forge, item, -1, false));
        });

        CraftableWeaponcrafting.forEach((item: Items) => {
            workflows.set(`craft-${item}`, WorkflowFactory.withdrawAndCraft(PointOfInterest.Weapon, item, -1, false));
        });

        CraftableWeaponcrafting.forEach((item: Items) => {
            workflows.set(`recraft-${item}`, WorkflowFactory.withdrawAndCraft(PointOfInterest.Weapon, item, -1, true));
        });

        CraftableGearcrafting.forEach((item: Items) => {
            workflows.set(`craft-${item}`, WorkflowFactory.withdrawAndCraft(PointOfInterest.Gear, item, -1, false));
        });

        CraftableGearcrafting.forEach((item: Items) => {
            workflows.set(`recraft-${item}`, WorkflowFactory.withdrawAndCraft(PointOfInterest.Gear, item, -1, true));
        });

        CraftableJewelry.forEach((item: Items) => {
            workflows.set(`craft-${item}`, WorkflowFactory.withdrawAndCraft(PointOfInterest.Jewel, item, -1, false));
        });

        CraftableJewelry.forEach((item: Items) => {
            workflows.set(`recraft-${item}`, WorkflowFactory.withdrawAndCraft(PointOfInterest.Jewel, item, -1, true));
        });

        CraftableWoodcutting.forEach((item: Items) => {
            workflows.set(`craft-${item}`, WorkflowFactory.withdrawAndCraft(PointOfInterest.Workshop, item, -1, false));
        });

        CraftableCooking.forEach((item: Items) => {
            workflows.set(`craft-${item}`, WorkflowFactory.withdrawAndCraft(PointOfInterest.Cooking, item, -1, false));
        });

        CraftableAlchemy.forEach((item: Items) => {
            workflows.set(`craft-${item}`, WorkflowFactory.withdrawAndCraft(PointOfInterest.Alchemy, item, -1, false));
        });
    }

    private static registerForTasks(workflows: Map<string, WorkflowAction[]>) {
        workflows.set('task-items', [
            { action: Action.Move, coordinates: PointOfInterest.TaskMasterItems },
            { action: Action.GetTask },
            { action: Action.ExecuteTask },
            { action: Action.Move, coordinates: PointOfInterest.TaskMasterItems },
            { action: Action.CompleteTask },
            { action: Action.Move, coordinates: PointOfInterest.Bank2 },
            { action: Action.BankDepositAll},
            { action: Action.BankWithdraw, code: Items.TasksCoin, quantity: -1},
            { action: Action.Move, coordinates: PointOfInterest.TaskMasterItems },
            { action: Action.ExchangeTask },
        ]);

        workflows.set('task-monsters', [
            { action: Action.Move, coordinates: PointOfInterest.Bank1 },
            { action: Action.BankDepositAll },
            { action: Action.Move, coordinates: PointOfInterest.TaskMasterMonsters },
            { action: Action.GetTask },
            { action: Action.ExecuteTask },
            { action: Action.Move, coordinates: PointOfInterest.TaskMasterMonsters },
            { action: Action.CompleteTask },
            { action: Action.Move, coordinates: PointOfInterest.Bank1 },
            { action: Action.BankDepositAll},
            { action: Action.BankWithdraw, code: Items.TasksCoin, quantity: -1},
            { action: Action.Move, coordinates: PointOfInterest.TaskMasterMonsters },
            { action: Action.ExchangeTask },
        ]);
    }

    private static registerForOthers(workflows: Map<string, WorkflowAction[]>) {
        workflows.set('dump-bank', [
            // Move to bank and dump everything
            { action: Action.Move, coordinates: PointOfInterest.Bank1 },
            { action: Action.BankDepositAll },
        ]);
    }

    private static registerForSets(workflows: Map<string, WorkflowAction[]>) {
        const copperSet = [
            [Items.StickyDagger, 1, EquippableSlot.Weapon],
            [Items.CopperDagger, 1, EquippableSlot.Weapon],
            [Items.CopperBoots, 1, EquippableSlot.Boots],
            [Items.CopperHelmet, 1, EquippableSlot.Helmet],
            [Items.WoodenShield, 1, EquippableSlot.Shield],
            [Items.CopperArmor, 1, EquippableSlot.BodyArmor],
            [Items.CopperLegsArmor, 1, EquippableSlot.LegArmor],
            [Items.CopperRing, 2, [EquippableSlot.Ring1, EquippableSlot.Ring2]],
            [Items.LifeAmulet, 1, EquippableSlot.Amulet],
        ];
        workflows.set('copper-set', WorkflowFactory.withdrawAndCraftManyAndEquip(copperSet, true));
        workflows.set('equip-copper-set', WorkflowFactory.withdrawAndEquip(copperSet));
    }
}

