import {Mover} from "./services/Mover.js";
import {Gatherer} from "./services/Gatherer.js";
import {Crafter} from "./services/Crafter.js";
import {Banker} from "./services/Banker.js";
import {Rester} from "./services/Rester.js";
import {Fighter} from "./services/Fighter.js";
import {Tasker} from "./services/Tasker.js";
import {CharacterGateway} from "../gateways/CharacterGateway.js";
import {Character, EquippableSlot} from "../entities/Character.js";
import {PointOfInterest} from "../lexical/PointOfInterest.js";
import {Items} from "../lexical/Items.js";
import * as Utils from "../Utils.js";
import {Monsters} from "../lexical/Monsters.js";
import {Recipe, Recipes} from "../lexical/Recipes.js";

export interface MoveAction {
    action: Action.Move;
    coordinates: PointOfInterest;
}

export interface GatherAction {
    action: Action.Gather;
    loops: number;
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
    | EquipAction
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
    Equip = 'equip',
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
                await this.crafter.equip(
                    (action as EquipAction).code,
                    (action as EquipAction).quantity,
                    (action as EquipAction).slot,
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

            if (character.isInventoryFull()) {
                Utils.errorHeadline('TASK > CHARACTER FULL');
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

        // This is garbagio? Move this to the PointOfInterest file?
        const taskToAction: any = {
            [Items.AshWood]:  PointOfInterest.Ash2,
            [Items.SpruceWood]:  PointOfInterest.Spruce1,
            [Items.BirchWood]:  PointOfInterest.Birch1,

            [Items.CopperOre]:  PointOfInterest.Copper,
            [Items.IronOre]:  PointOfInterest.Iron,

            [Items.Sunflower]:  PointOfInterest.Sunflower,

            [Items.Gudgeon]:  PointOfInterest.Gudgeon,

            [Monsters.Chicken]: PointOfInterest.Chicken,
            [Monsters.GreenSlime]: PointOfInterest.GreenSlime1,
            [Monsters.YellowSlime]: PointOfInterest.YellowSlime1,
            [Monsters.BlueSlime]: PointOfInterest.BlueSlime1,
            [Monsters.RedSlime]: PointOfInterest.RedSlime1,
        };


        let recipe: Recipe;
        try {
            Recipes.getFor(task.task);
        } catch {

        }

        // Figure out how to kickstart a gather + craft loop
        if (recipe) {

        }

        if (!taskToAction[task.task]) {
            Utils.logHeadline(`CANNOT FIND POI FOR ${task.task}`);

            // Just fallbacking on a random workflow so something happens in case I sleep
            if (task.type === 'items') {
                await this.findWorkflowAndExecute('copper-craft', -1);
                return;
            }

            await this.findWorkflowAndExecute('fight-red_slime1', -1)
            return;
        }

        const taskPoint = taskToAction[task.task];

        const actions: WorkflowAction[] = [];

        switch (task.type) {
            case 'items':
                actions.push({
                    action: Action.SubWorkflow,
                    condition: SubworkflowCondition.TaskCompleted,
                    actions: [
                        { action: Action.Move, coordinates: PointOfInterest.Bank2 },
                        { action: Action.BankDepositAll },

                        // Steps for the "items" Task Action
                        { action: Action.BankWithdraw, code: task.task, quantity: -1 },
                        { action: Action.Move, coordinates: PointOfInterest.TaskMasterItems },
                        { action: Action.TradeTask, code: task.task, quantity: -1 },

                        { action: Action.Move, coordinates: PointOfInterest.Bank2 },
                        { action: Action.BankDepositAll },

                        { action: Action.Move, coordinates: taskPoint },
                        { action: Action.Gather, loops: (task.total - task.progress) },
                    ]
                });

                break;
            case 'monsters':
                actions.push({ action: Action.Move, coordinates: taskPoint });
                actions.push({
                    action: Action.SubWorkflow,
                    condition: SubworkflowCondition.TaskCompleted,
                    actions: [
                        { action: Action.Rest },
                        { action: Action.Fight, loops: 1 },
                    ]
                });
                break;
        }

        Utils.logHeadline(`EXECUTE TASK > ${task.task} x${(task.total - task.progress)}`);
        await this.execute(actions);
    }
}

enum TaskActionType {
    Gather = 'gather',
    Fight = 'fight',
    Craft = 'craft',
}

interface GatherTaskAction {
    type: TaskActionType.Gather;
    gatherPoint: PointOfInterest;
    bankPoint: PointOfInterest;
}

interface FightTaskAction {
    type: TaskActionType.Fight;
    fightPoint: PointOfInterest;
    bankPoint: PointOfInterest;
}

interface CraftTaskAction {
    type: TaskActionType.Craft;
    workshopPoint: PointOfInterest;
    bankPoint: PointOfInterest;

    itemActions: TaskAction[];
}

type TaskAction = GatherTaskAction | FightTaskAction | CraftTaskAction;

class TaskActionFactory {

    // Notes: Just need to keep it to one nested level at most, the recursivity should take care of managing task delegation until there's nothing to do
    // Gather tasks = Go somewhere, gather, come back, give, go to bank, drop shits, rinse & repeat until completed
    // Craft tasks = Go to bank, drop all, withdraw what's needed, go to work station, craft, rinse & repeat until completed or lack of items
        // if lack of items (resources) => trigger the gather tasks for a specific quantity for each items
        // if lack of items (craft items) => trigger similar flow from step 1
        // if lack of items (monster drops) => move to fight point, fight until enough drops

    static createFor(task: string): TaskAction {
        throw new Error('Not implemented');
    }
}
