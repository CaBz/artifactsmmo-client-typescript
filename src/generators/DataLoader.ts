import {ArtifactsClient} from "../gateways/ArtifactsClient.js";
import * as Utils from "../Utils.js";
import {Item} from "../entities/Item.js";
import {MapTile, MapType} from "../entities/MapTile.js";
import {Monster} from "../entities/Monster.js";
import {Resource} from "../entities/Resource.js";
import {Effect} from "../entities/Effect.js";
import {Merchant} from "../entities/Merchant.js";
import {Event} from "../entities/Event.js";
import { PrismaClient } from '@prisma/client'

export class DataLoader {
    constructor(private readonly client: ArtifactsClient, private readonly folder: string, private readonly everythingFile: string, private readonly dbConnection: PrismaClient) {

    }

    async convertJsonToDatabase(): Promise<void> {
        await this.insertEffects(await Utils.readFile(`${this.folder}/effects.json`));
        await this.insertEvents(await Utils.readFile(`${this.folder}/events.json`));
        await this.insertActiveEvents(await Utils.readFile(`${this.folder}/events_active.json`));
        await this.insertItems(await Utils.readFile(`${this.folder}/items.json`));
    }

    async insertEffects(data: any) {
        await this.dbConnection.$executeRawUnsafe(`TRUNCATE effects`);
        for (let i=0; i<data.length; i++) {
            try {
                await this.dbConnection.effects.create({
                    data: data[i]
                })
            } catch (e: any) {
                if (e.code !== 'P2002') {
                    console.error(e);
                }
            }
        }
    }

    async insertEvents(data: any) {
        await this.dbConnection.$executeRawUnsafe(`TRUNCATE events`);
        for (let i=0; i<data.length; i++) {
            try {
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
                    }
                })
            } catch (e: any) {
                if (e.code !== 'P2002') {
                    console.error(e);
                }
            }
        }
    }

    async insertActiveEvents(data: any) {
        await this.dbConnection.$executeRawUnsafe(`TRUNCATE active_events`);
        for (let i=0; i<data.length; i++) {
            try {
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
                    }
                })
            } catch (e: any) {
                if (e.code !== 'P2002') {
                    console.error(e);
                }
            }
        }
    }

    async insertItems(data: any) {
        await this.dbConnection.$executeRawUnsafe(`TRUNCATE items`);
        await this.dbConnection.$executeRawUnsafe(`TRUNCATE item_effects`);
        await this.dbConnection.$executeRawUnsafe(`TRUNCATE recipes`);

        for (let i=0; i<data.length; i++) {
            const craft: any | undefined = data[i].craft;
            try {
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
                    }
                });
            } catch (e: any) {
                if (e.code !== 'P2002') {
                    console.error(e);
                }
            }

            for (let e=0; e<data[i].effects.length; e++) {
                try {
                    await this.dbConnection.item_effects.create({
                        data: {
                            item_code: data[i].code,
                            effect_code: data[i].effects[e].code,
                            effect_value: data[i].effects[e].value,
                        }
                    });
                } catch (e: any) {
                    if (e.code !== 'P2002') {
                        console.error(e);
                    }
                }
            }

            if (craft === undefined) {
                continue;
            }

            for (let r=0; r<craft.items.length; i++)
            try {
                await this.dbConnection.recipes.create({
                    data: {
                        code: data[i].code,
                        item_code: craft[r].code,
                        item_quantity: craft[r].quantity,
                    }
                });
            } catch (e: any) {
                if (e.code !== 'P2002') {
                    console.error(e);
                }
            }
        }
    }

    async reloadActiveEvents(): Promise<void> {
        const dataSets = [
            'events_active',
        ];
        const allData = await Utils.readFile(`${this.folder}/${this.everythingFile}`);

        await this.getAndSaveDataSets(dataSets, allData);

        await Utils.writeFile(`${this.folder}/${this.everythingFile}`, allData);
    }

    async saveDataSets(): Promise<void> {
        const dataSets = [
            'items',
            'monsters',
            'maps',
            'resources',
            'npcs',
            'tasks_list',
            'tasks_rewards',
            'events',
            'events_active',
            'effects',
        ];

        const allData = {};

        await this.getAndSaveDataSets(dataSets, allData);

        await Utils.writeFile(`${this.folder}/${this.everythingFile}`, allData);
    }

    async getAndSaveDataSets(dataSets: string[], everything: {}): Promise<void> {
        let entity: string;
        for (var i = 0; i<dataSets.length; i++) {
            entity = dataSets[i]!;

            try {
                const data = await this.client.getAllOf(entity.replace('_', '/'));

                await Utils.writeFile(`${this.folder}/${entity}.json`, data);

                everything[entity] = data;
                if (entity !== 'maps') {
                    everything[entity].sort((a: any, b: any) => a.code.localeCompare(b.code));
                }
            } catch (e) {
                console.error(e.message);
            }

            await Utils.sleep(1000);
        }
    }

    async loadData() {
        const result = {
            items: new Map<string, Item>(),
            monsters: new Map<string, Monster>(),
            maps: new Map<string, MapTile>,
            resources: new Map<string, Resource>(),
            npcs: new Map<string, Merchant>(),
            tasks_list: [],
            tasks_rewards: [],
            events: [],
            events_active: [],
            effects: new Map<string, Effect>(),
        };

        const allData = await Utils.readFile(`${this.folder}/${this.everythingFile}`);

        for (let i=0; i<allData.items.length; i++) {
            const item = new Item(allData.items[i]);
            result.items.set(item.code, item);
        }

        for (let i=0; i<allData.monsters.length; i++) {
            const monster = new Monster(allData.monsters[i]);
            result.monsters.set(monster.code, monster);
        }

        for (let i=0; i<allData.resources.length; i++) {
            const resource = new Resource(allData.resources[i]);
            result.resources.set(resource.code, resource);
        }

        for (let i=0; i<allData.effects.length; i++) {
            const effect = new Effect(allData.effects[i]);
            result.effects.set(effect.code, effect);
        }

        for (let i=0; i<allData.npcs.length; i++) {
            const merchant = new Merchant(allData.npcs[i]);
            result.npcs.set(merchant.code, merchant);
        }

        // Add events to the maps
        for (let i=0; i<allData.events_active.length; i++) {
            const event = new Event(allData.events_active[i]);
            if (event.isExpired) {
                continue;
            }

            allData.maps.push(event.mapData);
        }

        for (let i=0; i<allData.maps.length; i++) {
            const map = new MapTile(allData.maps[i]);
            if (!map.hasContent()) {
                continue;
            }

            switch (map.contentType) {
                case MapType.Monster:
                    result.maps.set(map.contentCode, map);
                    break;
                case MapType.Resource:
                    result.resources.get(map.contentCode).drops.forEach((drop) => {
                        if (drop.rate === 1) { // Ensures we only set for main resources
                            result.maps.set(drop.code, map);
                        }
                    });
                    break;
                case MapType.Workshop:
                    result.maps.set(`${map.contentType}_${map.contentCode}`, map);
                    break;
                case MapType.Bank:
                    if (!result.maps.has('bank1')) {
                        result.maps.set('bank1', map);
                    } else {
                        result.maps.set('bank2', map);
                    }
                    break;
                case MapType.GrandExchange:
                    result.maps.set(map.contentCode, map);
                    break;
                case MapType.TasksMaster:
                    result.maps.set(`${map.contentType}_${map.contentCode}`, map);
                    break;
                case MapType.NPC:
                    result.maps.set(map.contentCode, map);
                    break;
                default:
                    throw new Error(`Map type unhandled: ${map.contentType}`);
            }
        }

        return result;
    }
}
