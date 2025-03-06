import {Mover} from "./services/Mover.js";
import {Gatherer} from "./services/Gatherer.js";
import {Crafter} from "./services/Crafter.js";
import {Banker} from "./services/Banker.js";
import {Rester} from "./services/Rester.js";
import {Fighter} from "./services/Fighter.js";
import {Tasker} from "./services/Tasker.js";
import {CharacterGateway} from "../gateways/CharacterGateway.js";
import {Character} from "../entities/Character.js";
import {PointOfInterest, Workstations} from "../lexical/PointOfInterest.js";
import {Items} from "../lexical/Items.js";
import * as Utils from "../Utils.js";
import {Monsters} from "../lexical/Monsters.js";
import {Recipes} from "../lexical/Recipes.js";
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
    coordinates: PointOfInterest;
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

    async findWorkflowAndExecute(name: string, loops: number): Promise<void> {
        let workflowActions = this.staticWorkflows.get(name);
        if (!workflowActions || workflowActions.length === 0) {
            workflowActions = await this.workflowGenerator.generate(name);
            if (!workflowActions || workflowActions.length === 0) {
                console.error(`Put a proper workflow name from ${WorkflowRegister.name}`);
                return;
            }
        }

        Utils.logHeadline(`WORKFLOW: ${name}`);

        try {
            await this.execute(workflowActions!);
        } catch (e) {
            // Don't crash
            console.error(e);
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

    private async executeWithCondition(actions: WorkflowAction[], condition: string): Promise<void> {
        if (condition === SubworkflowCondition.InventoryFull) {
            const character: Character = await this.characterGateway.status();
            if (character.isInventoryFull()) {
                Utils.errorHeadline('CHARACTER FULL');
                return;
            }
        }

        if (condition === SubworkflowCondition.TaskCompleted) {
            const character: Character = await this.characterGateway.status();
            character.logToConsole(['task']);

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

    private async executeTaskWorflow() {
        const character: Character = await this.characterGateway.status();
        const task = character.getTask();

        if (!task) {
            Utils.errorHeadline(`EXECUTE TASK > NO TASK!`);
            return
        }

        const remainingTask = (task.total - task.progress);

        // FALLBACK WORKFLOW, so the bot is doing something!
        if (!TaskToAction[task.task]) {
            Utils.logHeadline(`CANNOT FIND POI FOR ${task.task}`);

            switch(character.name) {
                case 'Richard_CDL':
                    return this.findWorkflowAndExecute('fight-pig', -1);
                case 'PatatePoil':
                    return this.findWorkflowAndExecute('iron-craft', -1);
                case 'YourBoiBob':
                    return this.findWorkflowAndExecute('iron-craft', -1);
                case 'Ginette':
                    return this.findWorkflowAndExecute('fight-pig', -1);
                case 'BigBooty':
                    return this.findWorkflowAndExecute('fight-cow', -1);
            }

            await this.findWorkflowAndExecute('copper-craft', -1);
            return;
        }

        const taskPoint = TaskToAction[task.task];

        const actions: WorkflowAction[] = [];

        switch (task.type) {
            case 'items':
                const recipeActions: WorkflowAction[] = [];
                try {
                    const recipe = Recipes.getFor(task.task);
                    const craftPoint: PointOfInterest = Workstations[recipe.skill]!;
                    recipeActions.push({ action: Action.Move, coordinates: craftPoint })
                    recipeActions.push({ action: Action.Craft, code: task.task, quantity: remainingTask, condition: CraftActionConditions.DoNotHave })
                } catch {

                }


                actions.push({
                    action: Action.SubWorkflow,
                    condition: SubworkflowCondition.TaskCompleted,
                    actions: [
                        { action: Action.Move, coordinates: PointOfInterest.Bank2 },
                        { action: Action.BankDepositAll },
                        { action: Action.BankWithdraw, code: task.task, quantity: -1 },

                        { action: Action.Move, coordinates: taskPoint, condition: MoveActionCondition.InventoryNotFull },
                        { action: Action.GatherForTask }, // Need to fix this for better dynamically complex recipes

                        ...recipeActions,

                        { action: Action.Move, coordinates: PointOfInterest.TaskMasterItems },
                        { action: Action.TradeTask, code: task.task, quantity: -1 },
                    ]
                });

                break;
            case 'monsters':
                actions.push({
                    action: Action.SubWorkflow,
                    condition: SubworkflowCondition.TaskCompleted,
                    actions: [
                        { action: Action.Move, coordinates: taskPoint },
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

// Temporary mappings until I figure out a better S O L U T I O N
const TaskToAction: any = {
    [Items.CopperOre]:  PointOfInterest.Copper,
    [Items.Copper]:  PointOfInterest.Copper,
    [Items.IronOre]:  PointOfInterest.Iron,
    [Items.Iron]:  PointOfInterest.Iron,
    [Items.Coal]:  PointOfInterest.Coal,
    [Items.GoldOre]:  PointOfInterest.Gold,
    [Items.Gold]:  PointOfInterest.Gold,
    [Items.MithrilOre]:  PointOfInterest.Mithril,
    [Items.Mithril]:  PointOfInterest.Mithril,

    [Items.AshWood]:  PointOfInterest.Ash2,
    [Items.AshPlank]:  PointOfInterest.Ash2,
    [Items.SpruceWood]:  PointOfInterest.Spruce1,
    [Items.SprucePlank]:  PointOfInterest.Spruce1,
    [Items.DeadWood]:  PointOfInterest.DeadTree1,
    [Items.DeadWoodPlank]:  PointOfInterest.DeadTree1,
    [Items.BirchWood]:  PointOfInterest.Birch1,
    [Items.MapleWood]:  PointOfInterest.Maple1,

    [Items.Sunflower]:  PointOfInterest.Sunflower,
    [Items.SmallHealthPotion]:  PointOfInterest.Sunflower,
    [Items.NettleLeaf]:  PointOfInterest.Nettle,
    [Items.GlowstemLeaf]:  PointOfInterest.Glowstem,

    [Items.Gudgeon]:  PointOfInterest.Gudgeon,
    [Items.CookedGudgeon]:  PointOfInterest.Gudgeon,
    [Items.Shrimp]:  PointOfInterest.Shrimp,
    [Items.CookedShrimp]:  PointOfInterest.Shrimp,
    [Items.Trout]:  PointOfInterest.Trout,
    [Items.CookedTrout]:  PointOfInterest.Trout,
    [Items.Bass]:  PointOfInterest.Bass,
    [Items.CookedBass]:  PointOfInterest.Bass,
    [Items.Salmon]:  PointOfInterest.Salmon2,
    [Items.CookedSalmon]:  PointOfInterest.Salmon2,

    [Monsters.Chicken]: PointOfInterest.Chicken,
    [Monsters.YellowSlime]: PointOfInterest.YellowSlime1,
    [Monsters.GreenSlime]: PointOfInterest.GreenSlime1,
    [Monsters.BlueSlime]: PointOfInterest.BlueSlime1,
    [Monsters.RedSlime]: PointOfInterest.RedSlime1,
    [Monsters.Cow]: PointOfInterest.Cow,
    [Monsters.Mushmush]: PointOfInterest.Mushmush1,
    [Monsters.FlyingSerpent]: PointOfInterest.FlyingSerpent1,
    [Monsters.Highwayman]: PointOfInterest.Highwayman,
    [Monsters.Wolf]: PointOfInterest.Wolf1,
    [Monsters.Skeleton]: PointOfInterest.Skeleton1,
    [Monsters.Pig]: PointOfInterest.Pig,
    [Monsters.Ogre]: PointOfInterest.Ogre1,
    [Monsters.Spider]: PointOfInterest.Spider,
};
