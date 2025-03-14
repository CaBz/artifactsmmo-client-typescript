import {Mover} from "./services/Mover.js";
import {Gatherer} from "./services/Gatherer.js";
import {Crafter} from "./services/Crafter.js";
import {Banker} from "./services/Banker.js";
import {Rester} from "./services/Rester.js";
import {Fighter} from "./services/Fighter.js";
import {Tasker} from "./services/Tasker.js";
import {CharacterGateway} from "../gateways/CharacterGateway.js";
import {Character} from "../entities/Character.js";
import {PointOfInterest} from "../lexical/PointOfInterest.js";
import {Items} from "../lexical/Items.js";
import * as Utils from "../Utils.js";
import {WorkflowRegister} from "./WorkflowRegister.js";
import {Equipper} from "./services/Equipper.js";
import {WorkflowGenerator} from "./WorkflowGenerator.js";
import {ItemUser} from "./services/ItemUser.js";
import {EquippableSlot} from "../lexical/EquippableSlot.js";

export enum MoveActionCondition {
    InventoryNotFull = 'inventory-not-full',
    NoTasks = 'no-tasks',
}

export interface MoveAction {
    action: Action.Move;
    coordinates: PointOfInterest | string;
    condition?: MoveActionCondition;
}

export interface GatherAction {
    action: Action.Gather;
    loops: number;
}

export interface GatherForTaskAction {
    action: Action.GatherForTask;
}

export enum CraftActionConditions {
    DoNotHave= 'do-not-have',
}

export interface CraftAction {
    action: Action.Craft;
    code: Items;
    quantity: number;
    condition?: CraftActionConditions;
}

export interface RecycleAction {
    action: Action.Recycle;
    code: Items;
    quantity: number;
}

export interface EquipAction {
    action: Action.Equip;
    code: Items;
    quantity: number;
    slot: EquippableSlot;
}

export interface UnequipAction {
    action: Action.Unequip;
    quantity: number;
    slot: EquippableSlot;
}

export interface SwapAction {
    action: Action.Swap;
    code: Items;
}

export enum UseItemActionCondition {
    FullHP = 'full-hp',
}

export interface UseItemAction {
    action: Action.UseItem;
    code: Items;
    quantity: number;
    condition?: UseItemActionCondition;
}

export interface BankDepositAllAction {
    action: Action.BankDepositAll;
}

export enum BankWithdrawActionCondition {
    DoNotHave = 'do-not-have',
}

export interface BankWithdrawAction {
    action: Action.BankWithdraw;
    code: Items;
    quantity: number;
    condition?: BankWithdrawActionCondition;
}

export interface RestAction {
    action: Action.Rest;
}

export interface FightAction {
    action: Action.Fight;
    loops: number;
}

export interface GetTaskAction {
    action: Action.GetTask;
}

export interface TradeTaskAction {
    action: Action.TradeTask;
    code: Items;
    quantity: number;
}

export interface CompleteTaskAction {
    action: Action.CompleteTask;
}

export interface ExchangeTaskAction {
    action: Action.ExchangeTask;
}

export interface SubworkflowAction {
    action: Action.SubWorkflow;
    actions: WorkflowAction[];
    condition?: SubworkflowCondition;
}

export enum SubworkflowCondition {
    NoMoreConsumables = 'no-more-consumables',
    TaskCompleted = 'task-completed',
    TaskCompletedOrNoMoreConsumables = 'task-completed-or-no-more-consumables',
}

export type WorkflowAction =
    MoveAction
    | GatherAction
    | GatherForTaskAction
    | CraftAction
    | RecycleAction
    | EquipAction
    | UnequipAction
    | SwapAction
    | UseItemAction
    | RestAction
    | FightAction
    | GetTaskAction
    | TradeTaskAction
    | CompleteTaskAction
    | ExchangeTaskAction
    | SubworkflowAction
    | BankWithdrawAction
    | BankDepositAllAction;

export enum Action {
    Move = 'move',
    Gather = 'gather',
    GatherForTask = 'gather-for-task',
    Craft = 'craft',
    Recycle = 'recycle',
    Equip = 'equip',
    Unequip = 'unequip',
    Swap = 'swap',
    UseItem = 'use-item',
    Rest = 'rest',
    Fight = 'fight',
    GetTask = 'get-task',
    TradeTask = 'trade-task',
    CompleteTask = 'complete-task',
    ExchangeTask = 'exchange-task',
    BankDepositAll = 'bank-deposit-all',
    BankWithdraw = 'bank-withdraw',

    SubWorkflow = 'subworkflow',
}

export class WorkflowOrchestrator {
    constructor(
        private readonly characterGateway: CharacterGateway,
        private readonly mover: Mover,
        private readonly gatherer: Gatherer,
        private readonly crafter: Crafter,
        private readonly equipper: Equipper,
        private readonly itemUser: ItemUser,
        private readonly banker: Banker,
        private readonly rester: Rester,
        private readonly fighter: Fighter,
        private readonly tasker: Tasker,
        private readonly staticWorkflows: Map<string, WorkflowAction[]>,
        private readonly workflowGenerator: WorkflowGenerator,
    ) {
    }

    private currentWorkflow: string = '';

    async findWorkflowAndExecute(name: string, loops: number): Promise<void> {
        let workflowActions = this.staticWorkflows.get(name);
        if (!workflowActions || workflowActions.length === 0) {
            workflowActions = await this.workflowGenerator.generate(name);
            if (!workflowActions || workflowActions.length === 0) {
                console.error(`Put a proper workflow name from ${WorkflowRegister.name}`);
                return;
            }

            // console.dir(workflowActions, { depth: null });
        }

        Utils.logHeadline(`WORKFLOW: ${name}`);
        this.currentWorkflow = name;

        try {
            await this.execute(workflowActions!);
        } catch (e) {
            // Don't crash
            console.error(e);
            await Utils.sleep(5000);
        }

        if ((loops - 1) === 0) {
            return;
        }

        await this.findWorkflowAndExecute(name, loops - 1);
    }

    private async execute(actions: WorkflowAction[]): Promise<void> {
        for (var i=0; i<actions.length; i++) {
            await this.dispatchAction(actions[i]!);
        }
    }

    private async executeWithCondition(actions: WorkflowAction[], condition?: string): Promise<void> {
        const character: Character = await this.characterGateway.status();

        if (character.isInventoryFull()) {
            Utils.errorHeadline('CHARACTER FULL');
            return;
        }

        let bankConsumables;
        if (condition === SubworkflowCondition.NoMoreConsumables) {
            if (!character.hasConsumables()) {
                bankConsumables = (await this.banker.getFoodConsumables(character.level));
                if (bankConsumables.length > 0) {
                    Utils.errorHeadline('NEED TO REFILL');
                    return;
                }

                condition = undefined;
            }

        }

        if (condition === SubworkflowCondition.TaskCompleted) {
            character.logToConsole(['task']);
            if (character.isTaskCompleted()) {
                Utils.errorHeadline('TASK PROGRESS COMPLETED');
                return;
            }
        }

        // Weird logic to put here
        if (condition === SubworkflowCondition.TaskCompletedOrNoMoreConsumables) {
            character.logToConsole(['task']);
            if (character.isTaskCompleted()) {
                Utils.errorHeadline('TASK PROGRESS COMPLETED');
                return;
            }

            if (!character.hasConsumables()) {
                bankConsumables = (await this.banker.getFoodConsumables(character.level)).length;
                if (bankConsumables === 0) {
                    condition = SubworkflowCondition.TaskCompleted;
                } else {
                    Utils.errorHeadline('NEED TO REFILL');
                    return;
                }
            }
        }

        for (let i=0; i<actions.length; i++) {
            await this.dispatchAction(actions[i]!);
        }

        await this.executeWithCondition(actions, condition);
    }

    private async dispatchAction(action: WorkflowAction) {
        switch (action.action) {
            case Action.Move:
                await this.mover.moveToPointOfInterest(
                    (action as MoveAction).coordinates,
                    (action as MoveAction).condition,
                );
                break;

            case Action.Gather:
                await this.gatherer.gather(
                    (action as GatherAction).loops
                );
                break;

            case Action.GatherForTask:
                await this.gatherer.gatherForTask();
                break;

            case Action.Craft:
                await this.crafter.craft(
                    (action as CraftAction).code,
                    (action as CraftAction).quantity,
                    (action as CraftAction).condition,
                );
                break;

            case Action.Recycle:
                await this.crafter.recycle(
                    (action as RecycleAction).code,
                    (action as RecycleAction).quantity
                );
                break;

            case Action.Equip:
                await this.equipper.equip(
                    (action as EquipAction).code,
                    (action as EquipAction).quantity,
                    (action as EquipAction).slot,
                );
                break;

            case Action.Unequip:
                await this.equipper.unequip(
                    (action as UnequipAction).quantity,
                    (action as UnequipAction).slot,
                );
                break;

            case Action.Swap:
                await this.equipper.swap(
                    (action as SwapAction).code,
                );
                break;

            case Action.UseItem:
                await this.itemUser.use(
                    (action as UseItemAction).code,
                    (action as UseItemAction).quantity,
                    (action as UseItemAction).condition,
                );
                break;

            case Action.Rest:
                await this.rester.rest();
                break;

            case Action.Fight:
                await this.fighter.fight(
                    (action as FightAction).loops
                );
                break;

            case Action.GetTask:
                await this.tasker.getTask();
                break;

            case Action.TradeTask:
                await this.tasker.tradeTask(
                    (action as TradeTaskAction).code,
                    (action as TradeTaskAction).quantity,
                );
                break;

            case Action.CompleteTask:
                await this.tasker.completeTask();
                break;

            case Action.ExchangeTask:
                await this.tasker.exchangeTask();
                break;

            case Action.BankDepositAll:
                await this.banker.depositAll();
                break;

            case Action.BankWithdraw:
                await this.banker.withdraw(
                    (action as BankWithdrawAction).code,
                    (action as BankWithdrawAction).quantity,
                    (action as BankWithdrawAction).condition,
                )
                break;

            case Action.SubWorkflow:
                await this.executeWithCondition(
                    (action as SubworkflowAction).actions,
                    (action as SubworkflowAction).condition
                );
                break;
        }
    }
}
