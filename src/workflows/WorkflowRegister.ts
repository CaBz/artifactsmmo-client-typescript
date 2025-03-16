import {PointOfInterest} from "../lexical/PointOfInterest.js";
import {Items} from "../lexical/Items.js";
import {Action, WorkflowAction} from "./WorkflowOrchestrator.js";
import {WorkflowFactory} from "./WorkflowFactory.js";
import {AllEquippableSlots, EquippableSlot, GearEquippableSlots} from "../lexical/EquippableSlot.js";

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

        workflows.set('unequip-set', [
            ... GearEquippableSlots.map((slot: EquippableSlot): WorkflowAction => {
                return { action: Action.Unequip, quantity: 1, slot: slot };
            }),
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

        workflows.set('equip-vampire_set-lv25', WorkflowFactory.withdrawAndEquip([
            [Items.VampireBow, 1, EquippableSlot.Weapon],
            [Items.SerpentSkinBoots, 1, EquippableSlot.Boots],
            [Items.PiggyHelmet, 1, EquippableSlot.Helmet],
            [Items.SkeletonPants, 1, EquippableSlot.LegArmor],
            [Items.BanditArmor, 1, EquippableSlot.BodyArmor],
            [Items.SteelShield, 1, EquippableSlot.Shield],
            [Items.SkullAmulet, 1, EquippableSlot.Amulet],
            [Items.SkullRing, 1, EquippableSlot.Ring1],
            [Items.SkullRing, 1, EquippableSlot.Ring2],
        ]));

        workflows.set('equip-imp_set-lv25', WorkflowFactory.withdrawAndEquip([
            [Items.SkullWand, 1, EquippableSlot.Weapon],
            [Items.SteelShield, 1, EquippableSlot.Boots],
            [Items.PiggyHelmet, 1, EquippableSlot.Helmet],
            [Items.SerpentSkinLegsArmor, 1, EquippableSlot.LegArmor],
            [Items.BanditArmor, 1, EquippableSlot.BodyArmor],
            [Items.SteelShield, 1, EquippableSlot.Shield],
            // [Items.EmeraldAmulet, 1, EquippableSlot.Amulet],
            [Items.SkullAmulet, 1, EquippableSlot.Amulet],
            [Items.SkullRing, 1, EquippableSlot.Ring1],
            [Items.RingofChance, 1, EquippableSlot.Ring2],
        ]));

        workflows.set('equip-bandit_lizard_set-lv25', WorkflowFactory.withdrawAndEquip([
            [Items.VampireBow, 1, EquippableSlot.Weapon],
            [Items.SerpentSkinBoots, 1, EquippableSlot.Boots],
            [Items.PiggyHelmet, 1, EquippableSlot.Helmet],
            // [Items.PiggyPants, 1, EquippableSlot.LegArmor],
            [Items.SkeletonPants, 1, EquippableSlot.LegArmor],
            [Items.BanditArmor, 1, EquippableSlot.BodyArmor],
            [Items.SteelShield, 1, EquippableSlot.Shield],
            //[Items.RubyAmulet, 1, EquippableSlot.Amulet],
            [Items.SkullAmulet, 1, EquippableSlot.Amulet],
            [Items.SkullRing, 1, EquippableSlot.Ring1],
            [Items.SkullRing, 1, EquippableSlot.Ring2],
        ]));

        workflows.set('equip-demon_set-lv25', WorkflowFactory.withdrawAndEquip([
            // [Items.DreadfulStaff, 1, EquippableSlot.Weapon],
            [Items.SkullWand, 1, EquippableSlot.Weapon],
            [Items.SteelBoots, 1, EquippableSlot.Boots],
            // [Items.MagicWizardHat, 1, EquippableSlot.Helmet],
            [Items.PiggyHelmet, 1, EquippableSlot.Helmet],
            // [Items.LizardSkinLegsArmor, 1, EquippableSlot.LegArmor],
            [Items.SkeletonPants, 1, EquippableSlot.LegArmor],
            // [Items.LizardSkinArmor, 1, EquippableSlot.BodyArmor],
            [Items.PiggyArmor, 1, EquippableSlot.BodyArmor],
            [Items.SteelShield, 1, EquippableSlot.Shield],
            // [Items.Sapphire, 1, EquippableSlot.Amulet],
            [Items.SkullAmulet, 1, EquippableSlot.Amulet],
            // [Items.DreadfulRing, 1, EquippableSlot.Ring1],
            [Items.SkullRing, 1, EquippableSlot.Ring1],
            // [Items.DreadfulRing, 1, EquippableSlot.Ring2],
            [Items.SkullRing, 1, EquippableSlot.Ring2],
        ]));

        workflows.set('equip-demon_set-lv30', WorkflowFactory.withdrawAndEquip([
            [Items.ObsidianBattleaxe, 1, EquippableSlot.Weapon],
            [Items.FlyingBoots, 1, EquippableSlot.Boots],
            [Items.LichCrown, 1, EquippableSlot.Helmet],
            [Items.ConjurerSkirt, 1, EquippableSlot.LegArmor],
            [Items.BanditArmor, 1, EquippableSlot.BodyArmor],
            [Items.GoldShield, 1, EquippableSlot.Shield],
            [Items.TopazAmulet, 1, EquippableSlot.Amulet],
            [Items.TopazRing, 1, EquippableSlot.Ring1],
            [Items.TopazRing, 1, EquippableSlot.Ring2],
        ]));


        // OK Bandit Lizard -> lizard_eye + lizard_skin
        // OK Imp -> demoniac_dust + piece_of_obsidian
        // Death knight -> red_cloth
        // Demon -> demon_horn
        // Ownbear -> owlbear_hair + owlbear_claw

    }
}

