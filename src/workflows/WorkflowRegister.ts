import {PointOfInterest} from "../lexical/PointOfInterest.js";
import {Items} from "../lexical/Items.js";
import {Action, WorkflowAction} from "./WorkflowOrchestrator.js";
import {WorkflowFactory} from "./WorkflowFactory.js";
import {AllEquippableSlots, EquippableSlot} from "../lexical/EquippableSlot.js";

export class WorkflowRegister {
    static create(): Map<string, WorkflowAction[]> {
        const workflows = new Map<string, WorkflowAction[]>;

        WorkflowRegister.registerForOthers(workflows);
        WorkflowRegister.registerForSets(workflows);

        return workflows;
    }

    private static registerForOthers(workflows: Map<string, WorkflowAction[]>) {
        workflows.set('dump-bank', [
            { action: Action.Move, coordinates: PointOfInterest.Bank1 },
            { action: Action.BankDepositAll },
        ]);
        workflows.set('db', [
            { action: Action.Move, coordinates: PointOfInterest.Bank1 },
            { action: Action.BankDepositAll },
        ]);

        workflows.set('unequip-all', [
            ... AllEquippableSlots.map((slot: EquippableSlot): WorkflowAction => {
                return { action: Action.Unequip, quantity: 1, slot: slot };
            }),
            { action: Action.Move, coordinates: PointOfInterest.Bank1 },
            { action: Action.BankDepositAll },
        ]);
    }

    private static registerForSets(workflows: Map<string, WorkflowAction[]>) {
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
            [Items.IronSword, 1, EquippableSlot.Weapon],
            [Items.IronBoots, 1, EquippableSlot.Boots],
            [Items.IronHelm, 1, EquippableSlot.Helmet],
            [Items.IronLegsArmor, 1, EquippableSlot.LegArmor],
            [Items.IronArmor, 1, EquippableSlot.BodyArmor],
            [Items.SlimeShield, 1, EquippableSlot.Shield],
            [Items.LifeAmulet, 1, EquippableSlot.Amulet],
            [Items.IronRing, 2, [EquippableSlot.Ring1, EquippableSlot.Ring2]],
        ];

        workflows.set('craft-level10-set', WorkflowFactory.withdrawAndCraftManyAndEquip(level10Set, false));
        workflows.set('equip-level10-set', WorkflowFactory.withdrawAndEquip(level10Set));

        const level15Set = [
            [Items.MultislimesSword, 1, EquippableSlot.Weapon],
            [Items.AdventurerBoots, 1, EquippableSlot.Boots],
            [Items.WolfEars, 1, EquippableSlot.Helmet],
            [Items.AdventurerPants, 1, EquippableSlot.LegArmor],
            [Items.AdventurerVest, 1, EquippableSlot.BodyArmor],
            [Items.SlimeShield, 1, EquippableSlot.Shield],
            [Items.AirWaterAmulet, 1, EquippableSlot.Amulet],
            [Items.IronRing, 2, [EquippableSlot.Ring1, EquippableSlot.Ring2]],
        ];

        workflows.set('craft-level15-set', WorkflowFactory.withdrawAndCraftManyAndEquip(level15Set, false));
        workflows.set('equip-level15-set', WorkflowFactory.withdrawAndEquip(level15Set));

        const antiOgreSet: any[][] = [
            [Items.SkullStaff, 1, EquippableSlot.Weapon], // +40 fire atk
            [Items.SteelBoots, 1, EquippableSlot.Boots], // + 8 earth res hardwood_plank x3,steel x6,ogre_eye x4,ogre_skin x2
            [Items.TromatisingMask, 1, EquippableSlot.Helmet], // +16 fire atk
            [Items.SkeletonPants, 1, EquippableSlot.LegArmor], // +10 fire atk
            [Items.SkeletonArmor, 1, EquippableSlot.BodyArmor], // +15 fire atk
            [Items.SteelShield, 1, EquippableSlot.Shield], // +7 all res steel x6,serpent_skin x4,wolf_bone x3,ogre_eye x2
            [Items.SkullAmulet, 1, EquippableSlot.Amulet], // +10 fire atk
            [Items.SkullRing, 1, EquippableSlot.Ring1], // +11 fire atk
            [Items.SkullRing, 1, EquippableSlot.Ring2], // +11 fire atk
        ];

        workflows.set('craft-antiogre-set', WorkflowFactory.withdrawAndCraftManyAndEquip(antiOgreSet, false));
        workflows.set('equip-antiogre-set', WorkflowFactory.withdrawAndEquip(antiOgreSet));
    }
}

