import {
    Action, BankWithdrawAction,
    CraftAction,
    FightAction,
    GatherAction,
    MoveAction, SubworkflowAction,
    SubworkflowCondition,
    WorkflowAction,
} from "../Workflows.js";
import {Mover} from "./Mover.js";
import {Gatherer} from "./Gatherer.js";
import {Crafter} from "./Crafter.js";
import {Banker} from "./Banker.js";
import {Rester} from "./Rester.js";
import {Fighter} from "./Fighter.js";
import {CharacterGateway} from "../gateways/CharacterGateway.js";
import {Character} from "../entities/Character.js";
import {logHeadline} from "../Utils.js";
import * as Utils from "../Utils.js";

export class WorkflowOrchestrator {
    constructor(
        private readonly characterGateway: CharacterGateway,
        private readonly mover: Mover,
        private readonly gatherer: Gatherer,
        private readonly crafter: Crafter,
        private readonly banker: Banker,
        private readonly rester: Rester,
        private readonly fighter: Fighter,
        private readonly workflows: Map<string, WorkflowAction[]>,
    ) {
    }

    async findWorkflowAndExecute(name: string, loops: number): Promise<void> {
        if (!this.workflows.has(name)) {
            console.error('\n\n!!!! Need to put a proper workflow name dudelino !!!\n\n\n');
            return;
        }

        const workflowActions = this.workflows.get(name);
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

            case Action.Rest:
                await this.rester.rest();
                break;

            case Action.Fight:
                await this.fighter.fight(
                    (action as FightAction).loops
                );
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
                logHeadline('CHARACTER FULL');
                return;
            }
        }

        for (let i=0; i<actions.length; i++) {
            await this.dispatchAction(actions[i]!);
        }

        await this.executeWithCondition(actions, condition);
    }
}
