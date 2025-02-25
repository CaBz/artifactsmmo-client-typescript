import {PointOfInterest} from "./lexical/PointOfInterest.js";
import {Container} from "./Container.js";
import { promises as fs } from "node:fs";
import {Item} from "./entities/Item.js";
import {loadEverything, mergeEverything} from "./DataLoader.js";
import {MapTile} from "./entities/MapTile.js";
import {Monster} from "./entities/Monster.js";
import {Resource} from "./entities/Resource.js";

const consoleParams = process.argv;
consoleParams.shift(); // process name
consoleParams.shift(); // file name

const characterName = consoleParams.shift()!
const container = new Container(characterName);

const commandName: string = consoleParams.shift() || 'character-status';
await processCommand(commandName);

async function processCommand(commandName: string) {
    switch (commandName) {
        case 'workflow':
            await container.workflowOrhcestrator.findWorkflowAndExecute(
                consoleParams.shift() || '', // name -> Workflows.ts
                +(consoleParams.shift() || -1) // loops -> -1 = infinity
            );
            break;

        case 'status':
            await container.characterGateway.logStatus(consoleParams.shift()?.split(','))
            break;

        case 'bank-status':
            await container.banker.getStatus(!!consoleParams.shift());
            break;

        case 'bank-withdraw':
            await container.banker.withdraw(consoleParams.shift() || '', -1);
            break;

        case 'map-status':
            await container.client.getMap(+(consoleParams.shift() || -1000), +(consoleParams.shift() || -1000));
            break;

        case 'gather':
            await container.gatherer.gather(+(consoleParams.shift() || -1));
            break;

        case 'move':
            await container.mover.moveToCoordinates(+(consoleParams.shift() || -1000), +(consoleParams.shift() || -1000));
            break;

        case 'move-named':
            await container.mover.moveToPointOfInterest((consoleParams.shift() || '') as PointOfInterest);
            break;

        case 'rest':
            await container.rester.rest();
            break;

        case 'fight':
            await container.fighter.fight(+(consoleParams.shift() || 1))
            break;

        case 'announcements':
            await container.client.getAnnouncements();
            break;

        case 'resources':
        case 'items':
        case 'npcs':
        case 'badges':
        case 'achievements':
        case 'monsters':
        case 'tasks':
            await container.client.getByEntityAndCode(commandName, consoleParams.shift())
            break;

        case 'list-fights': await findAllFightSpots(); break;
        case 'data': await loadData(); break;
        case 'merge-all-data': await mergeEverything(); break;
        case 'generate-enums': await generateEnums(); break;

        default:
            console.error('\n\n!!!! Need to put a proper command name dudelino !!!\n\n\n');
            break;
    }
}

// code de marde
async function generateEnums() {
    const data: any = await loadData();
    const items: Map<string, Item> = data[0];
    const maps: MapTile[] = data[1];
    const monsters: Map<string, Monster> = data[2];
    const resources: Map<string, Resource> = data[3];

    const craftableItems = [];

    // -----------
    // ITEMS
    // -----------
    let fileContent = 'export enum Items {\n';
    items.forEach((item) => {
        fileContent += `    ${item.nameForEnum} = '${item.code}',\n`;

        if (item.isCraftable) {
            craftableItems.push(item);
        }
    });
    fileContent += '}\n';
    await fs.writeFile('outputs/Items.ts', fileContent, 'utf8');

    // -----------
    // RECIPES
    // -----------
    fileContent = 'export enum Recipes {\n';
    craftableItems.forEach((item) => {

    });
    fileContent += '}\n';
    await fs.writeFile('outputs/Recipes.ts', fileContent, 'utf8');

    // -----------
    // RESOURCES
    // -----------
    fileContent = 'export enum Resources {\n';
    resources.forEach((resource) => {
        fileContent += `    ${resource.nameForEnum} = '${resource.code}',\n`;
    });
    fileContent += '}\n';
    await fs.writeFile('outputs/Resources.ts', fileContent, 'utf8');

    // -----------
    // MONSTERS
    // -----------
    fileContent = 'export enum Monsters {\n';
    monsters.forEach((monster) => {
        fileContent += `    ${monster.nameForEnum} = '${monster.code}',\n`;
    });
    fileContent += '}\n';
    await fs.writeFile('outputs/Monsters.ts', fileContent, 'utf8');

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
                    identifier = `${entity.code.split('_')[0]}${i}`;
                    identifier = identifier.charAt(0).toUpperCase() + identifier.slice(1)
                    if (!entities.has(identifier)) {
                        break;
                    }
                }
                entities.set(identifier, true);
                console.log(identifier, entity.skill, entity.level, map.coordinates.x, map.coordinates.y);
                break;
            case 'monster':
                break;
            case 'bank':
                break;
            case 'tasks_master':
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

async function findAllFightSpots() {
    // beurk code
    const data: any = await loadData();
    const items: Map<string, Item> = data[0];
    const maps: MapTile[] = data[1];
    const monsters: Map<string, Monster> = data[2];
    const resources: Map<string, Resource> = data[3];

    let map: MapTile;
    const fightSpots = [];
    const resourceSpots = [];

    for (let i=0; i<maps.length; i++) {
        map = maps[i];
        if (map.contentType === 'monster') {
            console.log(monsters.get(map.contentCode));
            return;
            fightSpots.push(map);
        }
    }

    console.log(fightSpots.length);
}

async function loadData() {
    const allData = await loadEverything();

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
