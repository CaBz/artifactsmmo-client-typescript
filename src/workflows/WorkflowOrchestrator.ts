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

export interface GetTaskAction {
    action: Action.GetTask;
}

export interface ExecuteTaskAction {
    action: Action.ExecuteTask;
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
    condition: SubworkflowCondition;
}

export enum SubworkflowCondition {
    InventoryFull = 'inventory-full',
    TaskCompleted = 'task-completed',
}

export type WorkflowAction =
    MoveAction
    | GatherAction
    | CraftAction
    | RecycleAction
    | RestAction
    | FightAction
    | GetTaskAction
    | ExecuteTaskAction
    | TradeTaskAction
    | CompleteTaskAction
    | ExchangeTaskAction
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
    GetTask = 'get-task',
    ExecuteTask = 'execute-task',
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
        private readonly banker: Banker,
        private readonly rester: Rester,
        private readonly fighter: Fighter,
        private readonly tasker: Tasker,
        private readonly workflows: Map<string, WorkflowAction[]>,
    ) {
    }

    async findWorkflowAndExecute(name: string, loops: number): Promise<void> {
        if (!this.workflows.has(name)) {
            console.error('\n\n!!!! Need to put a proper workflow name dudelino !!!\n\n\n');
            return;
        }

        const workflowActions = this.workflows.get(name);
        // console.log(workflowActions);

        if (!workflowActions || workflowActions.length === 0) {
            console.error('\n\n!!!! Need to put a proper workflow name dudelino !!!\n\n\n');
            return;
        }

        Utils.logHeadline(`WORKFLOW: ${name}`);

        await this.execute(workflowActions!);

        if ((loops - 1) === 0) {
            return;
        }

        await this.findWorkflowAndExecute(name, loops - 1);
    }

    async execute(actions: WorkflowAction[]): Promise<void> {
        for (var i=0; i<actions.length; i++) {
            await this.dispatchAction(actions[i]!);
        }
    }

    async dispatchAction(action: WorkflowAction) {
        switch (action.action) {
            case Action.Move:
                await this.mover.moveToPointOfInterest(
                    (action as MoveAction).coordinates
                );
                break;

            case Action.Gather:
                await this.gatherer.gather(
                    (action as GatherAction).loops
                );
                break;

            case Action.Craft:
                await this.crafter.craft(
                    (action as CraftAction).code,
                    (action as CraftAction).quantity
                );
                break;

            case Action.Recycle:
                await this.crafter.recycle(
                    (action as RecycleAction).code,
                    (action as RecycleAction).quantity
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

            case Action.ExecuteTask:
                await this.executeTaskWorflow();
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

    async executeWithCondition(actions: WorkflowAction[], condition: string): Promise<void> {
        if (condition === SubworkflowCondition.InventoryFull) {
            const character: Character = await this.characterGateway.status();
            if (character.isInventoryFull()) {
                Utils.errorHeadline('CHARACTER FULL');
                return;
            }
        }

        if (condition === SubworkflowCondition.TaskCompleted) {
            const character: Character = await this.characterGateway.status();
            if (character.isTaskCompleted()) {
                Utils.errorHeadline('TASK PROGRESS COMPLETED');
                return;
            }
        }

        for (let i=0; i<actions.length; i++) {
            await this.dispatchAction(actions[i]!);
        }

        await this.executeWithCondition(actions, condition);
    }

    private async executeTaskWorflow() {
        const character = await this.characterGateway.status();
        const task = character.getTask();

        if (!task) {
            Utils.errorHeadline(`EXECUTE TASK > NO TASK!`);
            return
        }

        if (!taskToPointOfInterest[task.task]) {
            Utils.logHeadline(`CANNOT FIND POI FOR ${task.task}`);

            // Just fallbacking on a random workflow so something happens in case I sleep
            await this.findWorkflowAndExecute('copper-craft', 1);
            return;
        }

        /*
        let recipe: Recipe;
        try {
            Recipes.getFor(task.task);
        } catch {

        }
        */

        const actions: WorkflowAction[] = [];

        let bankPoint: PointOfInterest = PointOfInterest.Bank1;
        let taskMasterPoint: PointOfInterest = PointOfInterest.TaskMasterMonsters;

        switch (task.type) {
            case 'items':
                bankPoint = PointOfInterest.Bank2;
                taskMasterPoint = PointOfInterest.TaskMasterItems;

                // This is garbagio? Move this to the PointOfInterest file?
                const taskToPointOfInterest: any = {
                    [Items.AshWood]:  PointOfInterest.Ash2,
                    [Items.SpruceWood]:  PointOfInterest.Spruce1,
                    [Items.BirchWood]:  PointOfInterest.Birch1,

                    [Items.CopperOre]:  PointOfInterest.Copper,
                    [Items.IronOre]:  PointOfInterest.Iron,

                    [Items.Sunflower]:  PointOfInterest.Sunflower,

                    [Items.Gudgeon]:  PointOfInterest.Gudgeon,
                };

                const subworkflow: SubworkflowAction = {
                    action: Action.SubWorkflow,
                    condition: SubworkflowCondition.TaskCompleted,
                    actions: [
                        {action: Action.Move, coordinates: PointOfInterest.Bank2},
                        {action: Action.BankDepositAll},
                        {action: Action.BankWithdraw, code: task.task, quantity: -1},

                        {action: Action.Move, coordinates: PointOfInterest.TaskMasterItems},
                        {action: Action.TradeTask, code: task.task, quantity: -1},

                        {action: Action.Move, coordinates: PointOfInterest.Bank2},
                        {action: Action.BankDepositAll},

                        {action: Action.Move, coordinates: taskToPointOfInterest[task.task]},
                        {action: Action.Gather, loops: (task.total - task.progress)},
                    ]
                };

                actions.push(subworkflow);

                break;
            case 'monsters':
                bankPoint = PointOfInterest.Bank1;
                taskMasterPoint = PointOfInterest.TaskMasterMonsters;

                throw new Error('Not implemented');
        }

        actions.push({ action: Action.Move, coordinates: bankPoint });
        actions.push({ action: Action.BankDepositAll});
        actions.push({ action: Action.BankWithdraw, code: Items.TasksCoin, quantity: -1})
        actions.push({ action: Action.Move, coordinates: taskMasterPoint });
        actions.push({ action: Action.ExchangeTask });

        Utils.logHeadline(`EXECUTE TASK > ${task.task}`);

        await this.execute(actions);
    }
}
