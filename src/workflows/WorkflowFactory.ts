import {PointOfInterest} from "../lexical/PointOfInterest.js";
import {Items} from "../lexical/Items.js";
import {Action, SubworkflowCondition, WorkflowAction} from "./WorkflowOrchestrator.js";
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
