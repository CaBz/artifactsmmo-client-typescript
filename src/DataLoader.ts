import {promises as fs} from "fs";
import {Item} from "./entities/Item.js";
import {MapTile} from "./entities/MapTile.js";
import {Monster} from "./entities/Monster.js";
import {Resource} from "./entities/Resource.js";


export async function mergeEverything() {
    const allData = {
        items: [],
        maps: [],
        monsters: [],
        resources: []
    };

    const files = {
        items: ['data/items_1.json', 'data/items_2.json', 'data/items_3.json', 'data/items_4.json'],
        maps: ['data/maps_1.json', 'data/maps_2.json', 'data/maps_3.json', 'data/maps_4.json'],
        monsters: ['data/monsters.json'],
        resources: ['data/resources.json'],
    }

    let json;
    for (let i=0; i<files.items.length; i++) {
        json = await readFile(files.items[i]);
        allData.items = [...allData.items, ...json.data];
    }

    for (let i=0; i<files.maps.length; i++) {
        json = await readFile(files.maps[i]);
        allData.maps = [...allData.maps, ...json.data];
    }

    for (let i=0; i<files.monsters.length; i++) {
        json = await readFile(files.monsters[i]);
        allData.monsters = [...allData.monsters, ...json.data];
    }

    for (let i=0; i<files.resources.length; i++) {
        json = await readFile(files.resources[i]);
        allData.resources = [...allData.resources, ...json.data];
    }

    allData.items.sort((a: any, b: any) => a.name.localeCompare(b.name));
    allData.monsters.sort((a: any, b: any) => a.name.localeCompare(b.name));
    allData.resources.sort((a: any, b: any) => a.name.localeCompare(b.name));

    await writeFile('data/everything.json', allData);
}

export async function loadEverything() {
    return readFile('data/everything.json')
}


export async function readFile(fileName: string) {
    const bufferedData = await fs.readFile(fileName);
    const data = await Buffer.from(bufferedData);

    return JSON.parse(data);
}

export async function writeFile(fileName: string, data: any) {
    await fs.writeFile(fileName, JSON.stringify(data, null, 2));
}
