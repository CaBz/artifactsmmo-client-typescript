import {CooldownWaiter} from "./services/CooldownWaiter.js";
import {Mover} from "./services/Mover.js";
import {Gatherer} from "./services/Gatherer.js";
import {Crafter} from "./services/Crafter.js";
import {Banker} from "./services/Banker.js";
import {Rester} from "./services/Rester.js";
import {Fighter} from "./services/Fighter.js";
import {WorkflowOrchestrator} from "./services/WorkflowOrchestrator.js";
import {ArtifactsClient} from "./gateways/ArtifactsClient.js";
import {CharacterGateway} from "./gateways/CharacterGateway.js";
import {WorkflowAction, WorkflowRegister} from "./Workflows.js";

export class Container {
    private instances: Map<string, any> = new Map<string, any>();

    constructor(private readonly characterName: string) {
        this.registerGateways();
        this.registerServices();
        this.registerWorkflows();
        this.registerWorkflowOrchestrator();
    }

    private registerGateways(): void {
        this.instances.set('client', new ArtifactsClient());
        this.instances.set('character-gateway', new CharacterGateway(this.client, this.characterName));
    }

    get client(): ArtifactsClient {
        return this.instances.get('client');
    }

    get characterGateway(): CharacterGateway {
        return this.instances.get('character-gateway');
    }

    private registerServices() {
        this.instances.set('waiter', new CooldownWaiter(this.characterGateway));
        this.instances.set('mover', new Mover(this.waiter, this.characterGateway));
        this.instances.set('gatherer', new Gatherer(this.waiter, this.characterGateway));
        this.instances.set('crafter', new Crafter(this.waiter, this.characterGateway));
        this.instances.set('banker', new Banker(this.waiter, this.characterGateway, this.client));
        this.instances.set('rester', new Rester(this.waiter, this.characterGateway));
        this.instances.set('fighter', new Fighter(this.waiter, this.characterGateway));
    }
    get waiter(): CooldownWaiter {
        return this.instances.get('waiter');
    }

    get mover(): Mover {
        return this.instances.get('mover');
    }

    get gatherer(): Gatherer {
        return this.instances.get('gatherer');
    }

    get crafter(): Crafter {
        return this.instances.get('crafter');
    }

    get banker(): Banker {
        return this.instances.get('banker');
    }

    get rester(): Rester {
        return this.instances.get('rester');
    }

    get fighter(): Fighter {
        return this.instances.get('fighter');
    }

    private registerWorkflowOrchestrator() {
        this.instances.set(
            'workflow-orchestrator',
            new WorkflowOrchestrator(
                this.characterGateway,
                this.mover,
                this.gatherer,
                this.crafter,
                this.banker,
                this.rester,
                this.fighter,
                this.workflows,
            )
        );
    }

    get workflowOrhcestrator(): WorkflowOrchestrator {
        return this.instances.get('workflow-orchestrator');
    }

    private registerWorkflows() {
        this.instances.set('workflows', WorkflowRegister.getWorkflows());
    }

    get workflows(): Map<string, WorkflowAction[]> {
        return this.instances.get('workflows');
    }
}
