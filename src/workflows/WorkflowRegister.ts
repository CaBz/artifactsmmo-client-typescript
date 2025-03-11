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

        workflows.set('equip-bandit_lizard_set', WorkflowFactory.withdrawAndEquip([
            [Items.VampireBow, 1, EquippableSlot.Weapon],
            [Items.SerpentSkinBoots, 1, EquippableSlot.Boots],
            [Items.PiggyHelmet, 1, EquippableSlot.Helmet],
            [Items.PiggyPants, 1, EquippableSlot.LegArmor],
            [Items.BanditArmor, 1, EquippableSlot.BodyArmor],
            [Items.SteelShield, 1, EquippableSlot.Shield],
            [Items.RubyAmulet, 1, EquippableSlot.Amulet],
            [Items.SkullRing, 1, EquippableSlot.Ring1],
            [Items.SkullRing, 1, EquippableSlot.Ring2],
        ]));

        workflows.set('equip-demon_set-lv20', WorkflowFactory.withdrawAndEquip([
            [Items.DreadfulStaff, 1, EquippableSlot.Weapon],
            [Items.SteelBoots, 1, EquippableSlot.Boots],
            [Items.MagicWizardHat, 1, EquippableSlot.Helmet],
            [Items.SteelLegsArmor, 1, EquippableSlot.LegArmor],
            [Items.BanditArmor, 1, EquippableSlot.BodyArmor],
            [Items.SteelShield, 1, EquippableSlot.Shield],
            [Items.DreadfulAmulet, 1, EquippableSlot.Amulet],
            [Items.DreadfulRing, 1, EquippableSlot.Ring1],
            [Items.DreadfulRing, 1, EquippableSlot.Ring2],
        ]));

        workflows.set('equip-demon_set-lv25', WorkflowFactory.withdrawAndEquip([
            [Items.DreadfulStaff, 1, EquippableSlot.Weapon],
            [Items.SteelBoots, 1, EquippableSlot.Boots],
            [Items.MagicWizardHat, 1, EquippableSlot.Helmet],
            [Items.LizardSkinLegsArmor, 1, EquippableSlot.LegArmor],
            [Items.BanditArmor, 1, EquippableSlot.BodyArmor],
            [Items.SteelShield, 1, EquippableSlot.Shield],
            [Items.TopazAmulet, 1, EquippableSlot.Amulet],
            [Items.DreadfulRing, 1, EquippableSlot.Ring1],
            [Items.DreadfulRing, 1, EquippableSlot.Ring2],
        ]));
    }
}

