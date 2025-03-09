import {ArtifactsClient} from "../gateways/ArtifactsClient.js";
import * as Utils from "../Utils.js";
import {Item} from "../entities/Item.js";
import {MapTile, MapType} from "../entities/MapTile.js";
import {Monster} from "../entities/Monster.js";
import {Resource} from "../entities/Resource.js";
import {Effect} from "../entities/Effect.js";
import {Merchant} from "../entities/Merchant.js";

export class DataLoader {
    private dataSets: string[] = [
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

    constructor(private readonly client: ArtifactsClient, private readonly folder: string, private readonly everythingFile: string) {

    }

    async saveDataSets(): Promise<void> {
        const everything = {

        };

        let entity: string;
        for (var i = 0; i<this.dataSets.length; i++) {
            entity = this.dataSets[i]!;

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

        await Utils.writeFile(`${this.folder}/${this.everythingFile}`, everything);
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
