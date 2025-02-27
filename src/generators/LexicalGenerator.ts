import {Item} from "../entities/Item.js";
import {MapTile} from "../entities/MapTile.js";
import {Monster} from "../entities/Monster.js";
import {Resource} from "../entities/Resource.js";
import {promises as fs} from "fs";
import * as Utils from "../Utils.js";

export class LexicalGenerator {
    static async generateAll() {
        const lexicalFilePath = 'src/lexical';

        let fileContent: string;
        const data: any = await LexicalGenerator.loadData();
        const items: Map<string, Item> = data[0];
        const maps: MapTile[] = data[1];
        const monsters: Map<string, Monster> = data[2];
        const resources: Map<string, Resource> = data[3];

        // -----------
        // ITEMS
        // -----------
        const craftableItems = {
            mining: [],
            woodcutting: [],
            fishing: [],
            weaponcrafting: [],
            gearcrafting: [],
            jewelrycrafting: [],
            cooking: [],
            alchemy: [],
        };

        fileContent = 'export enum Items {\n';
        items.forEach((item) => {
            fileContent += `    ${item.nameForEnum} = '${item.code}',\n`;

            if (item.isCraftable) {
                craftableItems[item.skillToCraft].push(item);
            }
        });
        fileContent += '}\n';
        await fs.writeFile(`${lexicalFilePath}/Items.ts`, fileContent, 'utf8');

        // -----------
        // RECIPES & CRAFTABLE ITEMS
        // -----------
        craftableItems.mining.sort((a: Item, b: Item) => (a.levelToCraft - b.levelToCraft) || a.name.localeCompare(b.name));
        craftableItems.woodcutting.sort((a: Item, b: Item) => (a.levelToCraft - b.levelToCraft) || a.name.localeCompare(b.name));
        craftableItems.fishing.sort((a: Item, b: Item) => (a.levelToCraft - b.levelToCraft) || a.name.localeCompare(b.name));
        craftableItems.weaponcrafting.sort((a: Item, b: Item) => (a.levelToCraft - b.levelToCraft) || a.name.localeCompare(b.name));
        craftableItems.gearcrafting.sort((a: Item, b: Item) => (a.levelToCraft - b.levelToCraft) || a.name.localeCompare(b.name));
        craftableItems.jewelrycrafting.sort((a: Item, b: Item) => (a.levelToCraft - b.levelToCraft) || a.name.localeCompare(b.name));
        craftableItems.cooking.sort((a: Item, b: Item) => (a.levelToCraft - b.levelToCraft) || a.name.localeCompare(b.name));
        craftableItems.alchemy.sort((a: Item, b: Item) => (a.levelToCraft - b.levelToCraft) || a.name.localeCompare(b.name));

        let placeholderRecipes: string = '';
        const placeholderCraftable = {
            mining: '',
            woodcutting: '',
            fishing: '',
            weaponcrafting: '',
            gearcrafting: '',
            jewelrycrafting: '',
            cooking: '',
            alchemy: '',

        };

        let countRecipes = 0;
        const SPACES = `            `;
        Object.entries(craftableItems).forEach(([key, craftItems]: [string, Item[]]) => {
            console.log('-----------------------------------');
            console.log(key.toUpperCase());
            console.log('-----------------------------------');

            placeholderRecipes += `${SPACES}// ${key.toUpperCase()}\n`;

            craftItems.forEach((item: Item) => {
                countRecipes++;
                console.log(`* [${item.levelToCraft}] ${item.code} -> x${item.quantityCrafted}`);

                placeholderRecipes += `${SPACES}case Items.${item.nameForEnum}:\n`;
                placeholderRecipes += `${SPACES}    return RecipeFactory.${key}(${item.levelToCraft}, [\n`;

                placeholderCraftable[key] += `\n    Items.${item.nameForEnum},`;

                item.itemsToCraft.forEach((dataItem: any) => {
                    const item = items.get(dataItem.code)!;
                    console.log(`    - ${item.code} x${dataItem.quantity} -> ${item.type}${item.subType ? ` / ${item.subType}` : ''}`);


                    placeholderRecipes += `${SPACES}        {code: Items.${item.nameForEnum}, quantity: ${dataItem.quantity}},\n`;
                });

                placeholderRecipes += `${SPACES}    ]);\n`
                console.log();
            })
            placeholderRecipes += '\n';

            console.log();
        })
        console.log(`Total recipes: ${countRecipes}`);

        const recipesTemplate = await Utils.readFileRaw('data/templates/Recipes.ts');
        fileContent = recipesTemplate.replace('//{PLACEHOLDER}', placeholderRecipes);
        await fs.writeFile(`${lexicalFilePath}/Recipes.ts`, fileContent, 'utf8');

        const craftableItemsTemplate = await Utils.readFileRaw('data/templates/CraftableItems.ts');
        fileContent = craftableItemsTemplate;
        Object.entries(placeholderCraftable).forEach(([key, placeholder]: [string, string]) => {
            console.log(`//{PLACEHOLDER_${key.toUpperCase()}}`)
            fileContent = fileContent.replace(`/*{PLACEHOLDER_${key.toUpperCase()}}*/`, placeholder + '\n');
        });
        await fs.writeFile(`${lexicalFilePath}/CraftableItems.ts`, fileContent, 'utf8');

        // -----------
        // RESOURCES
        // -----------
        fileContent = 'export enum Resources {\n';
        resources.forEach((resource) => {
            fileContent += `    ${resource.nameForEnum} = '${resource.code}',\n`;
        });
        fileContent += '}\n';
        await fs.writeFile(`${lexicalFilePath}/Resources.ts`, fileContent, 'utf8');

        // -----------
        // MONSTERS
        // -----------
        fileContent = 'export enum Monsters {\n';
        monsters.forEach((monster) => {
            fileContent += `    ${monster.nameForEnum} = '${monster.code}',\n`;
        });
        fileContent += '}\n';
        await fs.writeFile(`${lexicalFilePath}/Monsters.ts`, fileContent, 'utf8');

        return;
        // -----------
        // DON'T KNOW WHERE I'M GOING WITH THIS
        // -----------
        let entities = new Map<string, boolean>();
        let map: MapTile;
        for (let i=0; i<maps.length; i++) {
            map = maps[i] as MapTile;
            if (!map.contentType) {
                continue;
            }

            let entity, identifier;
            switch (map.contentType) {
                case 'resource':
                    entity = resources.get(map.contentCode);
                    for (let i=1; i<10; i++) {
                        identifier = `${entity.nameForEnum}${i}`;
                        if (!entities.has(identifier)) {
                            break;
                        }
                    }
                    entities.set(identifier, true);
                    //console.log(identifier, entity.skill, entity.level, map.coordinates.x, map.coordinates.y);
                    break;
                case 'monster':
                    entity = monsters.get(map.contentCode);
                    for (let i=1; i<10; i++) {
                        identifier = `${entity.nameForEnum}${i}`;
                        if (!entities.has(identifier)) {
                            break;
                        }
                    }
                    entities.set(identifier, true);
                    //console.log(identifier, entity.level, map.coordinates.x, map.coordinates.y);
                    break;
                case 'bank':
                    for (let i=1; i<10; i++) {
                        identifier = map.contentCode.charAt(0).toUpperCase() + map.contentCode.slice(1) + i;
                        if (!entities.has(identifier)) {
                            break;
                        }
                    }
                    entities.set(identifier, true);
                    //console.log(identifier, map.coordinates.x, map.coordinates.y);
                    break;
                case 'tasks_master':
                    console.log(map);
                    break;
                case 'workshop':
                    break;
                case 'npc':
                    break;
                case 'grand_exchange':
                    break;
                default:
                    console.error(map.contentType);
                    break;
            }
        }
    }

    static async loadData() {
        const allData = await Utils.readFile('data/everything.json');

        const items: Map<string, Item> = new Map();
        const maps: MapTile[] = [];
        const monsters: Map<string, Monster> = new Map();
        const resources: Map<string, Resource> = new Map();

        for (let i=0; i<allData.items.length; i++) {
            const item = new Item(allData.items[i]);
            items.set(item.code, item);
        }

        for (let i=0; i<allData.maps.length; i++) {
            const map = new MapTile(allData.maps[i]);
            maps.push(map);
        }

        for (let i=0; i<allData.monsters.length; i++) {
            const monster = new Monster(allData.monsters[i]);
            monsters.set(monster.code, monster);
        }

        for (let i=0; i<allData.resources.length; i++) {
            const resource = new Resource(allData.resources[i]);
            resources.set(resource.code, resource);
        }

        return [items, maps, monsters, resources];
    }
}
