import {FightingPOIs, GatheringPOIs, PointOfInterest} from "../lexical/PointOfInterest.js";
import {Items} from "../lexical/Items.js";
import {
    CraftableAlchemy,
    CraftableCooking,
    CraftableGearcrafting,
    CraftableJewelry,
    CraftableMining,
    CraftableWeaponcrafting,
    CraftableWoodcutting
} from "../lexical/Craftables.js";
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

        // @TODO: Add a workflow for each equippable item -> go to bank, withdraw item, equip

        return workflows;
    }

    private static registerForGathering(workflows: Map<string, WorkflowAction[]>) {
        workflows.set('copper-craft', WorkflowFactory.gatherAndCraft(PointOfInterest.Copper, PointOfInterest.Bank1, PointOfInterest.Forge, Items.Copper, Items.CopperOre));
        workflows.set('iron-craft', WorkflowFactory.gatherAndCraft(PointOfInterest.Iron, PointOfInterest.Bank1, PointOfInterest.Forge, Items.Iron, Items.IronOre));

        workflows.set('ash-craft', WorkflowFactory.gatherAndCraft(PointOfInterest.Ash1, PointOfInterest.Bank1, PointOfInterest.Workshop, Items.AshPlank, Items.AshWood));
        workflows.set('spruce-craft', WorkflowFactory.gatherAndCraft(PointOfInterest.Spruce1, PointOfInterest.Bank1, PointOfInterest.Workshop, Items.SprucePlank, Items.SpruceWood));
        workflows.set('dead-craft', WorkflowFactory.gatherAndCraft(PointOfInterest.DeadTree2, PointOfInterest.Bank1, PointOfInterest.Workshop, Items.DeadWoodPlank, Items.DeadWood));

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
            workflows.set(`recraft-${item}`, WorkflowFactory.withdrawAndCraft(PointOfInterest.Weapon, item, -1, true));
        });

        CraftableGearcrafting.forEach((item: Items) => {
            workflows.set(`craft-${item}`, WorkflowFactory.withdrawAndCraft(PointOfInterest.Gear, item, -1, false));
            workflows.set(`recraft-${item}`, WorkflowFactory.withdrawAndCraft(PointOfInterest.Gear, item, -1, true));
        });

        CraftableJewelry.forEach((item: Items) => {
            workflows.set(`craft-${item}`, WorkflowFactory.withdrawAndCraft(PointOfInterest.Jewel, item, -1, false));
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
        workflows.set('task-items-complete', [
            { action: Action.Move, coordinates: PointOfInterest.TaskMasterItems },
            { action: Action.CompleteTask },
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

        workflows.set('task-monsters-complete', [
            { action: Action.Move, coordinates: PointOfInterest.TaskMasterMonsters },
            { action: Action.CompleteTask },
        ]);
    }

    private static registerForOthers(workflows: Map<string, WorkflowAction[]>) {
        workflows.set('dump-bank', [
            { action: Action.Move, coordinates: PointOfInterest.Bank1 },
            { action: Action.BankDepositAll },
        ]);
        workflows.set('unequip-dump-bank', [
            { action: Action.Unequip, quantity: 1, slot: EquippableSlot.Weapon },
            { action: Action.Unequip, quantity: 1, slot: EquippableSlot.Shield },
            { action: Action.Unequip, quantity: 1, slot: EquippableSlot.Helmet },
            { action: Action.Unequip, quantity: 1, slot: EquippableSlot.BodyArmor },
            { action: Action.Unequip, quantity: 1, slot: EquippableSlot.LegArmor },
            { action: Action.Unequip, quantity: 1, slot: EquippableSlot.Boots },
            { action: Action.Unequip, quantity: 1, slot: EquippableSlot.Ring1 },
            { action: Action.Unequip, quantity: 1, slot: EquippableSlot.Ring2 },
            { action: Action.Unequip, quantity: 1, slot: EquippableSlot.Amulet },
            { action: Action.Unequip, quantity: 1, slot: EquippableSlot.Artifact1 },
            { action: Action.Unequip, quantity: 1, slot: EquippableSlot.Artifact2 },
            { action: Action.Unequip, quantity: 1, slot: EquippableSlot.Artifact3 },
            { action: Action.Unequip, quantity: 1, slot: EquippableSlot.Utility1 },
            { action: Action.Unequip, quantity: 1, slot: EquippableSlot.Utility2 },
            { action: Action.Unequip, quantity: 1, slot: EquippableSlot.Bag },
            { action: Action.Unequip, quantity: 1, slot: EquippableSlot.Rune },
            { action: Action.Move, coordinates: PointOfInterest.Bank1 },
            { action: Action.BankDepositAll },
        ]);
    }

    private static registerForSets(workflows: Map<string, WorkflowAction[]>) {
        /*Equippables.forEach((item: Items) => {
            workflows.set(`equip-${item.code}`)
        });*/

        const level1Set = [
            [Items.CopperDagger, 1, EquippableSlot.Weapon],
            [Items.CopperBoots, 1, EquippableSlot.Boots],
            [Items.CopperHelmet, 1, EquippableSlot.Helmet],
            [Items.WoodenShield, 1, EquippableSlot.Shield],
            [Items.CopperRing, 2, [EquippableSlot.Ring1, EquippableSlot.Ring2]],
        ];
        workflows.set('craft-level1-set', WorkflowFactory.withdrawAndCraftManyAndEquip(level1Set, false));
        workflows.set('equip-level1-set', WorkflowFactory.withdrawAndEquip(level1Set));

        const level5Set = [
            [Items.StickyDagger, 1, EquippableSlot.Weapon],
            [Items.CopperBoots, 1, EquippableSlot.Boots],
            [Items.CopperHelmet, 1, EquippableSlot.Helmet],
            [Items.CopperLegsArmor, 1, EquippableSlot.LegArmor],
            [Items.CopperArmor, 1, EquippableSlot.BodyArmor],
            [Items.WoodenShield, 1, EquippableSlot.Shield],
            [Items.LifeAmulet, 1, EquippableSlot.Amulet],
            [Items.CopperRing, 2, [EquippableSlot.Ring1, EquippableSlot.Ring2]],
        ];
        workflows.set('craft-level5-set', WorkflowFactory.withdrawAndCraftManyAndEquip(level5Set, false));
        workflows.set('equip-level5-set', WorkflowFactory.withdrawAndEquip(level5Set));

        const level10Set = [
            [Items.IronBoots, 1, EquippableSlot.Boots],
            [Items.IronHelm, 1, EquippableSlot.Helmet],
            [Items.IronLegsArmor, 1, EquippableSlot.LegArmor],
            [Items.IronArmor, 1, EquippableSlot.BodyArmor],
            [Items.SlimeShield, 1, EquippableSlot.Shield],
            [Items.LifeAmulet, 1, EquippableSlot.Amulet],
            [Items.IronRing, 2, [EquippableSlot.Ring1, EquippableSlot.Ring2]],
        ];

        const level10EarthSet = [
            [Items.IronSword, 1, EquippableSlot.Weapon],
            ...level10Set,
        ];

        workflows.set('craft-level10-earth-set', WorkflowFactory.withdrawAndCraftManyAndEquip(level10EarthSet, false));
        workflows.set('equip-level10-earth-set', WorkflowFactory.withdrawAndEquip(level10EarthSet));

        const level10AirSet = [
            [Items.IronDagger, 1, EquippableSlot.Weapon],
            ...level10Set,
        ];

        workflows.set('craft-level10-air-set', WorkflowFactory.withdrawAndCraftManyAndEquip(level10AirSet, false));
        workflows.set('equip-level10-air-set', WorkflowFactory.withdrawAndEquip(level10AirSet));

        const level10FireSet = [
            [Items.FireBow, 1, EquippableSlot.Weapon],
            ...level10Set,
        ];

        workflows.set('craft-level10-fire-set', WorkflowFactory.withdrawAndCraftManyAndEquip(level10FireSet, false));
        workflows.set('equip-level10-fire-set', WorkflowFactory.withdrawAndEquip(level10FireSet));

        const level10WaterSet = [
            [Items.GreaterWoodenStaff, 1, EquippableSlot.Weapon],
            ...level10Set,
        ];

        workflows.set('craft-level10-water-set', WorkflowFactory.withdrawAndCraftManyAndEquip(level10WaterSet, false));
        workflows.set('equip-level10-water-set', WorkflowFactory.withdrawAndEquip(level10WaterSet));
    }
}

