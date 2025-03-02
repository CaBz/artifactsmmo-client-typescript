import {PointOfInterest, Workstations} from "../lexical/PointOfInterest.js";
import {Items} from "../lexical/Items.js";
import {
    Action,
    BankWithdrawActionCondition,
    CraftActionConditions,
    SubworkflowCondition,
    WorkflowAction
} from "./WorkflowOrchestrator.js";
import {Recipe, Recipes, ResourceItem} from "../lexical/Recipes.js";

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
            {
                action: Action.SubWorkflow,
                condition: SubworkflowCondition.InventoryFull,
                actions: [
                    { action: Action.Move, coordinates: monsterPoint },
                    { action: Action.Rest },
                    { action: Action.Fight, loops: 1 },
                ],
            },
            { action: Action.Move, coordinates: PointOfInterest.Bank1 },
            { action: Action.BankDepositAll },
        ];
    }

    static withdrawAndCraft(craftPoint: PointOfInterest, craftItem: Items, craftQuantity: number, recycle: boolean): WorkflowAction[] {
        const recipe: Recipe = Recipes.getFor(craftItem);

        const withdrawActions: WorkflowAction[] = recipe.items.map((item: ResourceItem): WorkflowAction => {
            return { action: Action.BankWithdraw, code: item.code, quantity: item.quantity }
        });

        const result: WorkflowAction[] = [
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

    static withdrawAndCraftManyAndEquip(craftItems: any, equip?: boolean): WorkflowAction[] {
        const withdrawActions: WorkflowAction[] = [];
        const craftActions: WorkflowAction[] = [];
        const equipActions: WorkflowAction[] = [];

        craftItems.forEach(([craftItem, quantity, equippableSlot]: any) => {
            const recipe: Recipe = Recipes.getFor(craftItem);
            const craftPoint: PointOfInterest = Workstations[recipe.skill]!;

            withdrawActions.push({ action: Action.BankWithdraw, code: craftItem, quantity: quantity, condition: BankWithdrawActionCondition.DoNotHave })
            withdrawActions.push(...recipe.items.map((item: ResourceItem): WorkflowAction => {
                return { action: Action.BankWithdraw, code: item.code, quantity: item.quantity }
            }));

            craftActions.push({ action: Action.Move, coordinates: craftPoint });
            craftActions.push({ action: Action.Craft, code: craftItem, quantity: quantity, condition: CraftActionConditions.DoNotHave });

            if (equip) {
                if (Array.isArray(equippableSlot)) {
                    equippableSlot.forEach((slot) => {
                        equipActions.push({action: Action.Unequip, quantity: 1, slot: slot});
                        equipActions.push({action: Action.Equip, code: craftItem, quantity: 1, slot: slot});
                    })
                } else {
                    equipActions.push({action: Action.Equip, code: craftItem, quantity: 1, slot: equippableSlot});
                }
            }
        })

        return [
            { action: Action.Move, coordinates: PointOfInterest.Bank1 },
            { action: Action.BankDepositAll },
            ...withdrawActions,
            ...craftActions,
            ...equipActions,
            { action: Action.Move, coordinates: PointOfInterest.Bank1 },
            { action: Action.BankDepositAll },
        ];
    }

    static withdrawAndEquip(items: any): WorkflowAction[] {
        const withdrawActions: WorkflowAction[] = [];
        const equipActions: WorkflowAction[] = [];

        items.forEach(([craftItem, quantity, equippableSlot]: any) => {
            withdrawActions.push({ action: Action.BankWithdraw, code: craftItem, quantity: quantity, condition: BankWithdrawActionCondition.DoNotHave });
            if (Array.isArray(equippableSlot)) {
                equippableSlot.forEach((slot) => {
                    equipActions.push({action: Action.Unequip, quantity: 1, slot: slot});
                    equipActions.push({action: Action.Equip, code: craftItem, quantity: 1, slot: slot});
                })
            } else {
                equipActions.push({action: Action.Unequip, quantity: 1, slot: equippableSlot});
                equipActions.push({action: Action.Equip, code: craftItem, quantity: 1, slot: equippableSlot});
            }
        })

        return [
            { action: Action.Move, coordinates: PointOfInterest.Bank1 },
            { action: Action.BankDepositAll },
            ...withdrawActions,
            ...equipActions,
            { action: Action.BankDepositAll },
        ];
    }
}
