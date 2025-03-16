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
import {Simulator} from "./simulations/Simulator.js";
import {Effect} from "./entities/Effect.js";
import {WorkflowGenerator} from "./workflows/WorkflowGenerator.js";
import {ItemUser} from "./workflows/services/ItemUser.js";
import { PrismaClient } from '@prisma/client'
import {TaskRepository} from "./repositories/TaskRepository.js";
import {ItemRepository} from "./repositories/ItemRepository.js";
import {MonsterRepository} from "./repositories/MonsterRepository.js";
import {MapRepository} from "./repositories/MapRepository.js";
import {ResourceRepository} from "./repositories/ResourceRepository.js";
import {EffectRepository} from "./repositories/EffectRepository.js";
import {EventRepository} from "./repositories/EventRepository.js";
import {NpcRepository} from "./repositories/NpcRepository.js";
import {Merchant} from "./entities/Merchant.js";
import {Event} from "./entities/Event.js";

export class Container {
    static items: Map<string, Item>;
    static monsters: Map<string, Monster>;
    static maps: Map<string, MapTile>;
    static taskRepository: TaskRepository;

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
        this.registerWorkflowOrchestrator();
        this.registerSimulations();
    }

    private registerGateways(): void {
        this.instances.set('db-connection', new PrismaClient({ errorFormat: 'pretty', }));
        this.instances.set('item-repository', new ItemRepository(this.dbConnection));
        this.instances.set('monster-repository', new MonsterRepository(this.dbConnection));
        this.instances.set('map-repository', new MapRepository(this.dbConnection));
        this.instances.set('resource-repository', new ResourceRepository(this.dbConnection));
        this.instances.set('effect-repository', new EffectRepository(this.dbConnection));
        this.instances.set('event-repository', new EventRepository(this.dbConnection));
        this.instances.set('npc-repository', new NpcRepository(this.dbConnection));
        this.instances.set('task-repository', new TaskRepository(this.dbConnection, this.characterName));
        Container.taskRepository = this.taskRepository;

        this.instances.set('client', new ArtifactsClient());
        this.instances.set('character-gateway', new CharacterGateway(this.client, this.characterName));
    }

    get client(): ArtifactsClient {
        return this.instances.get('client');
    }

    get characterGateway(): CharacterGateway {
        return this.instances.get('character-gateway');
    }

    get dbConnection(): PrismaClient {
        return this.instances.get('db-connection');
    }

    get itemRepository(): ItemRepository {
        return this.instances.get('item-repository');
    }

    get monsterRepository(): MonsterRepository {
        return this.instances.get('monster-repository');
    }

    get mapRepository(): MapRepository {
        return this.instances.get('map-repository');
    }

    get resourceRepository(): ResourceRepository {
        return this.instances.get('resource-repository');
    }

    get effectRepository(): EffectRepository {
        return this.instances.get('effect-repository');
    }

    get eventRepository(): EventRepository {
        return this.instances.get('event-repository');
    }

    get npcRepository(): NpcRepository {
        return this.instances.get('npc-repository');
    }

    get taskRepository(): TaskRepository {
        return this.instances.get('task-repository');
    }

    private async registerGeneratorsAndSets(): Promise<void> {
        this.instances.set('data-loader', new DataLoader(
            this.client,
            this.dbConnection,
            this.itemRepository,
            this.monsterRepository,
            this.mapRepository,
            this.resourceRepository,
            this.effectRepository,
            this.eventRepository,
            this.npcRepository,
            this.taskRepository,
        ));

        this.instances.set('data', await this.dataLoader.loadDataFromDb());
        Container.items = this.items;
        Container.monsters = this.monsters;
        Container.maps = this.maps;

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

    get maps(): Map<string, MapTile> {
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

    get npcs(): Map<string, Merchant> {
        return this.data.npcs;
    }

    get events(): Map<string, Event> {
        return this.data.events;
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
        this.instances.set('banker', new Banker(this.waiter, this.characterGateway, this.client, this.items));
        this.instances.set('rester', new Rester(this.waiter, this.characterGateway, this.itemUser, this.items));
        this.instances.set('fighter', new Fighter(this.waiter, this.characterGateway));
        this.instances.set('tasker', new Tasker(this.waiter, this.characterGateway));
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

    private registerWorkflowOrchestrator() {
        this.instances.set('workflows', WorkflowRegister.create());
        this.instances.set('workflow-generator', new WorkflowGenerator(
            this.characterGateway,
            this.banker,
        ));

        this.instances.set(
            'workflow-orchestrator',
            new WorkflowOrchestrator(
                this.characterName,
                this.taskRepository,
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

    get workflows(): Map<string, WorkflowAction[]> {
        return this.instances.get('workflows');
    }

    get workflowGenerator(): WorkflowGenerator {
        return this.instances.get('workflow-generator');
    }

    get workflowOrhcestrator(): WorkflowOrchestrator {
        return this.instances.get('workflow-orchestrator');
    }

    private registerSimulations() {
        this.instances.set('simulator', new Simulator(this.client, this.characterGateway, this.banker));
    }

    get simulator(): Simulator {
        return this.instances.get('simulator');
    }
}
