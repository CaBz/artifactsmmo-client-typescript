import {ArtifactsClient} from "../gateways/ArtifactsClient.js";
import {MapTile, MapType} from "../entities/MapTile.js";
import { PrismaClient } from '@prisma/client'
import {ItemRepository} from "../repositories/ItemRepository.js";
import {MonsterRepository} from "../repositories/MonsterRepository.js";
import {MapRepository} from "../repositories/MapRepository.js";
import {EffectRepository} from "../repositories/EffectRepository.js";
import {ResourceRepository} from "../repositories/ResourceRepository.js";
import {TaskRepository} from "../repositories/TaskRepository.js";
import {EventRepository} from "../repositories/EventRepository.js";
import {NpcRepository} from "../repositories/NpcRepository.js";
import {Resource} from "../entities/Resource.js";

export class DataLoader {
    constructor(
        private readonly client: ArtifactsClient,
        private readonly dbConnection: PrismaClient,
        private readonly itemRepository: ItemRepository,
        private readonly monsterRepository: MonsterRepository,
        private readonly mapRepository: MapRepository,
        private readonly resourceRepository: ResourceRepository,
        private readonly effectRepository: EffectRepository,
        private readonly eventRepository: EventRepository,
        private readonly npcRepository: NpcRepository,
        private readonly taskRepository: TaskRepository,
    ) { }

    async loadDataFromDb() {
        const resources = await this.resourceRepository.getAll();
        return {
            items: (await this.itemRepository.getAll()),
            monsters: (await this.monsterRepository.getAll()),
            maps: (await this.loadMapsAndActiveEvents(resources)),
            resources: (await this.resourceRepository.getAll()),
            npcs: (await this.npcRepository.getAll()),
            tasks: (await this.taskRepository.getAll()),
            events: (await this.eventRepository.getAll()),
            effects: (await this.effectRepository.getAll()),
        };
    }

    async loadMapsAndActiveEvents(resources: Map<string, Resource>): Promise<Map<string, MapTile>> {
        const result = new Map<string, MapTile>;

        const mapTiles = await this.mapRepository.getAll();
        const activeEvents = await this.eventRepository.getAllActive();
        for (let i=0; i<activeEvents.length; i++) {
            const event = activeEvents[i]!;
            if (event.isExpired) {
                continue;
            }

            mapTiles.push(event.map);
        }

        for (let i=0; i<mapTiles.length; i++) {
            const map = mapTiles[i]!;
            if (!map.hasContent()) {
                continue;
            }

            switch (map.contentType) {
                case MapType.Monster:
                    result.set(map.contentCode, map);
                    break;
                case MapType.Resource:
                    resources.get(map.contentCode)!.drops.forEach((drop: any) => {
                        if (drop.rate === 1) { // Ensures we only set for main resources
                            result.set(drop.code, map);
                        }
                    });
                    break;
                case MapType.Workshop:
                    result.set(`${map.contentType}_${map.contentCode}`, map);
                    break;
                case MapType.Bank:
                    if (!result.has('bank1')) {
                        result.set('bank1', map);
                    } else {
                        result.set('bank2', map);
                    }
                    break;
                case MapType.GrandExchange:
                    result.set(map.contentCode, map);
                    break;
                case MapType.TasksMaster:
                    result.set(`${map.contentType}_${map.contentCode}`, map);
                    break;
                case MapType.NPC:
                    result.set(map.contentCode, map);
                    break;
                default:
                    throw new Error(`Map type unhandled: ${map.contentType}`);
            }
        }

        return result;
    }

    async saveDataSets(): Promise<void> {
        await this.insertEffects(await this.client.getAllOf('effects'));
        await this.insertEvents(await this.client.getAllOf('events'));
        await this.insertActiveEvents(await this.client.getAllOf(`events/active`));
        await this.insertItems(await this.client.getAllOf(`items`));
        await this.insertMaps(await this.client.getAllOf(`maps`));
        await this.insertMonsters(await this.client.getAllOf(`monsters`));
        await this.insertNPCs(await this.client.getAllOf(`npcs`));
        await this.insertResources(await this.client.getAllOf(`resources`));
        await this.insertTasks(await this.client.getAllOf(`tasks/list`));
        await this.insertTaskRewards(await this.client.getAllOf(`tasks/rewards`));
    }

    async reloadActiveEvents(): Promise<void> {
        const data = await this.client.getAllOf('events/active');
        await this.insertActiveEvents(data);
    }

    async insertEffects(data: any) {
        await this.dbConnection.$executeRawUnsafe(`DELETE FROM effects;`);
        for (let i=0; i<data.length; i++) {
            await this.dbConnection.effects.create({
                data: { ...data[i], data: data[i] },
            });
        }
    }

    async insertEvents(data: any) {
        await this.dbConnection.$executeRawUnsafe(`DELETE FROM events`);
        for (let i=0; i<data.length; i++) {
            await this.dbConnection.events.create({
                data: {
                    name: data[i].name,
                    code: data[i].code,
                    skin: data[i].skin,
                    duration: data[i].duration,
                    maps: data[i].maps,
                    rate: data[i].rate,
                    content_type: data[i].content.type,
                    content_code: data[i].content.code,
                    data: data[i],
                }
            });
        }
    }

    async insertActiveEvents(data: any) {
        await this.dbConnection.$executeRawUnsafe(`DELETE FROM active_events`);
        for (let i=0; i<data.length; i++) {
            await this.dbConnection.active_events.create({
                data: {
                    name: data[i].name,
                    code: data[i].code,
                    map_name: data[i].map.name,
                    map_skin: data[i].map.skin,
                    map_x: data[i].map.x,
                    map_y: data[i].map.y,
                    map_content_code: data[i].map.content.code,
                    map_content_type: data[i].map.content.type,
                    previous_skin: data[i].previous_skin,
                    duration: data[i].duration,
                    expiration: new Date(data[i].expiration),
                    created_at: new Date(data[i].created_at),
                    data: data[i],
                }
            });
        }
    }

    async insertItems(data: any) {
        await this.dbConnection.$executeRawUnsafe(`DELETE FROM items`);
        await this.dbConnection.$executeRawUnsafe(`DELETE FROM item_effects`);
        await this.dbConnection.$executeRawUnsafe(`DELETE FROM recipes`);

        for (let i=0; i<data.length; i++) {
            const craft: any | undefined = data[i].craft;
            await this.dbConnection.items.create({
                data: {
                    name: data[i].name,
                    code: data[i].code,
                    level: data[i].level,
                    type: data[i].type,
                    subtype: data[i].subtype,
                    description: data[i].description,
                    craft_level: craft?.level,
                    craft_skill: craft?.skill,
                    tradeable: data[i].tradeable,
                    data: data[i],
                }
            });

            for (let e=0; e<data[i].effects.length; e++) {
                await this.dbConnection.item_effects.create({
                    data: {
                        item_code: data[i].code,
                        effect_code: data[i].effects[e].code,
                        effect_value: data[i].effects[e].value,
                    }
                });
            }

            if (craft === undefined) {
                continue;
            }

            for (let r=0; r<craft?.items.length; r++) {
                await this.dbConnection.recipes.create({
                    data: {
                        code: data[i].code,
                        item_code: craft.items[r].code,
                        item_quantity: craft.items[r].quantity,
                    }
                });
            }
        }
    }

    async insertMaps(data: any) {
        await this.dbConnection.$executeRawUnsafe(`DELETE FROM maps`);

        for (let i=0; i<data.length; i++) {
            await this.dbConnection.maps.create({
                data: {
                    name: data[i].name,
                    skin: data[i].skin,
                    x: data[i].x,
                    y: data[i].y,
                    content_type: data[i].content?.type,
                    content_code: data[i].content?.code,
                    data: data[i],
                }
            });
        }
    }

    async insertMonsters(data: any) {
        await this.dbConnection.$executeRawUnsafe(`DELETE FROM monsters`);
        await this.dbConnection.$executeRawUnsafe(`DELETE FROM monster_effects`);
        await this.dbConnection.$executeRawUnsafe(`DELETE FROM monster_drops`);

        for (let i=0; i<data.length; i++) {
            const copy = { ...data[i] };

            const effects = data[i].effects;
            delete data[i]['effects'];

            const drops: any[] = data[i].drops;
            delete data[i]['drops'];

            await this.dbConnection.monsters.create({
                data: { ...data[i], data: copy }
            });

            for (let e=0; e<effects.length; e++) {
                await this.dbConnection.monster_effects.create({
                    data: {
                        monster_code: data[i].code,
                        effect_code: effects[e].code,
                        effect_value: effects[e].value,
                    }
                });
            }

            for (let r=0; r<drops.length; r++) {
                await this.dbConnection.monster_drops.create({
                    data: {
                        monster_code: data[i].code,
                        item_code: drops[r].code,
                        rate: drops[r].rate,
                        min_quantity: drops[r].min_quantity,
                        max_quantity: drops[r].max_quantity,
                    }
                });
            }
        }
    }

    async insertNPCs(data: any) {
        await this.dbConnection.$executeRawUnsafe(`DELETE FROM npcs`);
        for (let i=0; i<data.length; i++) {
            await this.dbConnection.npcs.create({
                data: { ...data[i], data: data[i] },
            });
        }
    }

    async insertResources(data: any) {
        await this.dbConnection.$executeRawUnsafe(`DELETE FROM resources`);
        await this.dbConnection.$executeRawUnsafe(`DELETE FROM resource_drops`);
        for (let i=0; i<data.length; i++) {
            const copy = { ...data[i] };
            const drops: any[] = data[i].drops;
            delete data[i]['drops'];

            await this.dbConnection.resources.create({
                data: { ...data[i], data: copy },
            });

            for (let r=0; r<drops.length; r++) {
                await this.dbConnection.resource_drops.create({
                    data: {
                        resource_code: data[i].code,
                        item_code: drops[r].code,
                        rate: drops[r].rate,
                        min_quantity: drops[r].min_quantity,
                        max_quantity: drops[r].max_quantity,
                    }
                });
            }
        }
    }

    async insertTasks(data: any) {
        await this.dbConnection.$executeRawUnsafe(`DELETE FROM tasks`);
        for (let i=0; i<data.length; i++) {
            await this.dbConnection.tasks.create({
                data: {
                    code: data[i].code,
                    level: data[i].level,
                    type: data[i].type,
                    min_quantity: data[i].min_quantity,
                    max_quantity: data[i].max_quantity,
                    skill: data[i].skill,
                    reward_coins: data[i].rewards.items[0].quantity,
                    reward_golds: data[i].rewards.gold,
                    data: data[i],
                }
            });
        }
    }

    async insertTaskRewards(data: any) {
        await this.dbConnection.$executeRawUnsafe(`DELETE FROM task_rewards`);
        for (let i=0; i<data.length; i++) {
            await this.dbConnection.task_rewards.create({
                data: { ...data[i], data: data[i] },
            });
        }
    }
}
