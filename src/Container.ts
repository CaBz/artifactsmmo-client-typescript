import {Waiter} from "./workflows/services/Waiter.js";
import {Mover} from "./workflows/services/Mover.js";
import {Gatherer} from "./workflows/services/Gatherer.js";
import {Crafter} from "./workflows/services/Crafter.js";
import {Banker} from "./workflows/services/Banker.js";
import {Rester} from "./workflows/services/Rester.js";
import {Fighter} from "./workflows/services/Fighter.js";
import {Tasker} from "./workflows/services/Tasker.js";
import {ArtifactsClient} from "./gateways/ArtifactsClient.js";
import {CharacterGateway} from "./gateways/CharacterGateway.js";
import {WorkflowAction, WorkflowOrchestrator} from "./workflows/WorkflowOrchestrator.js";
import {WorkflowRegister} from "./workflows/WorkflowRegister.js";
import {Equipper} from "./workflows/services/Equipper.js";
import {Item} from "./entities/Item.js";
import {MapTile} from "./entities/MapTile.js";
import {Monster} from "./entities/Monster.js";
import {Resource} from "./entities/Resource.js";
import {LexicalGenerator} from "./generators/LexicalGenerator.js";
import {DataLoader} from "./generators/DataLoader.js";
import {Simulator} from "./workflows/services/Simulator.js";
import {Effect} from "./entities/Effect.js";
import {WorkflowGenerator} from "./workflows/WorkflowGenerator.js";
import {ItemUser} from "./workflows/services/ItemUser.js";

export class Container {
    static async create(charactName: string): Promise<Container> {
        const container = new Container(charactName);
        await container.initialize();

        return container;
    }

    private instances: Map<string, any> = new Map<string, any>();

    constructor(private readonly characterName: string) {
    }

    async initialize(): Promise<void> {
        // Order matters
        this.registerGateways();
        await this.registerGeneratorsAndSets();

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

    private async registerGeneratorsAndSets(): Promise<void> {
        this.instances.set('data-loader', new DataLoader(this.client, 'data', 'everything.json'));
        this.instances.set('data', await this.dataLoader.loadData());

        this.instances.set('lexical-generator', new LexicalGenerator(this.data, 'data/templates', 'src/lexical'));
    }

    get dataLoader(): DataLoader {
        return this.instances.get('data-loader');
    }

    get data() {
        return this.instances.get('data');
    }

    get items(): Map<string, Item> {
        return this.data.items;
    }

    get maps(): MapTile[] {
        return this.data.maps;
    }

    get monsters(): Map<string, Monster> {
        return this.data.monsters;
    }

    get resources(): Map<string, Resource> {
        return this.data.resources;
    }

    get effects(): Map<string, Effect> {
        return this.data.effects;
    }

    get lexicalGenerator(): LexicalGenerator {
        return this.instances.get('lexical-generator');
    }

    private registerServices() {
        this.instances.set('waiter', new Waiter(this.characterGateway));
        this.instances.set('mover', new Mover(this.waiter, this.characterGateway));
        this.instances.set('gatherer', new Gatherer(this.waiter, this.characterGateway));
        this.instances.set('crafter', new Crafter(this.waiter, this.characterGateway));
        this.instances.set('equipper', new Equipper(this.waiter, this.characterGateway, this.items));
        this.instances.set('item-user', new ItemUser(this.waiter, this.characterGateway));
        this.instances.set('banker', new Banker(this.waiter, this.characterGateway, this.client));
        this.instances.set('rester', new Rester(this.waiter, this.characterGateway));
        this.instances.set('fighter', new Fighter(this.waiter, this.characterGateway));
        this.instances.set('tasker', new Tasker(this.waiter, this.characterGateway));
        this.instances.set('simulator', new Simulator(this.client, this.characterGateway, this.monsters, this.items));
    }
    get waiter(): Waiter {
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

    get equipper(): Equipper {
        return this.instances.get('equipper');
    }

    get itemUser(): ItemUser {
        return this.instances.get('item-user');
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

    get tasker(): Tasker {
        return this.instances.get('tasker');
    }

    get simulator(): Simulator {
        return this.instances.get('simulator');
    }

    private registerWorkflowOrchestrator() {
        this.instances.set('workflow-generator', new WorkflowGenerator(this.characterGateway, this.items));
        this.instances.set(
            'workflow-orchestrator',
            new WorkflowOrchestrator(
                this.characterGateway,
                this.mover,
                this.gatherer,
                this.crafter,
                this.equipper,
                this.itemUser,
                this.banker,
                this.rester,
                this.fighter,
                this.tasker,
                this.workflows,
                this.workflowGenerator,
            )
        );
    }

    get workflowGenerator(): WorkflowGenerator {
        return this.instances.get('workflow-generator');
    }

    get workflowOrhcestrator(): WorkflowOrchestrator {
        return this.instances.get('workflow-orchestrator');
    }

    private registerWorkflows() {
        this.instances.set('workflows', WorkflowRegister.create());
    }

    get workflows(): Map<string, WorkflowAction[]> {
        return this.instances.get('workflows');
    }
}
