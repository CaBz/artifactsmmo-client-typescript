import {Item, ItemType} from "../entities/Item.js";
import {Monster} from "../entities/Monster.js";
import {Resource} from "../entities/Resource.js";
import {promises as fs} from "fs";
import * as Utils from "../Utils.js";
import {Effect} from "../entities/Effect.js";
import {Merchant} from "../entities/Merchant.js";
import {AllEquippableSlots, EquippableSlot} from "../lexical/EquippableSlot.js";

export class LexicalGenerator {
    constructor(
        private readonly data: any,
        private readonly templatesFolder: string,
        private readonly lexicalFolder: string) {
    }

    async generateAll() {
        const items: any = await this.generateItems();
        await this.generateRecipesAndCraftables(items.craftables);
        await this.generateEquippables(items.equippables);
        await this.generateEquipmentSets(items.sets);

        await this.generateMonsters();
        await this.generateResources();
        await this.generateEffects();
        await this.generateMaps();
        await this.generateNpcs();

        return;
    }

    private async generateItems() {
        const equippables: any = {};
        const craftables: any = {};
        const sets: any = {
            fire: {},
            air: {},
            water: {},
            earth: {},
            all: {},
        }

        let fileContent = 'export enum Items {\n';
        this.data.items.forEach((item: Item) => {
            fileContent += `    ${item.nameForEnum} = '${item.code}',\n`;

            if (item.isCraftable) {
                if (!craftables[item.skillToCraft]) {
                    craftables[item.skillToCraft] = [];
                }

                craftables[item.skillToCraft].push(item);
            }

            if (item.isEquippable) {
                if (!equippables[item.type]) {
                    equippables[item.type] = [];
                }
                equippables[item.type].push(item);

                let added = false;

                const equippableEffects = item.getAllElementEffects();
                equippableEffects.forEach((element: any) => {
                    const elementName = element.element;

                    if (element.attack > 0 || element.damage > 0 || element.resistance > 0) {
                        if (!sets[elementName][item.type]) {
                            sets[elementName][item.type] = [];
                        }

                        sets[elementName][item.type].push(item);
                        added = true;
                    }
                });

                if (!added && item.getDamage() > 0) {
                    if (!sets.all[item.type]) {
                        sets.all[item.type] = [];
                    }

                    sets.all[item.type].push(item);
                }
            }
        });
        fileContent += '}\n';
        await fs.writeFile(`${this.lexicalFolder}/Items.ts`, fileContent, 'utf8');

        return {
            equippables,
            craftables,
            sets,
        }
    }

    private async generateRecipesAndCraftables(craftables: any) {
        let placeholderRecipes: string = '';
        const placeholderCraftable = { };

        let countRecipes = 0;
        const SPACES = `            `;
        Object.entries(craftables).forEach(([key, craftItems]: [string, Item[]]) => {
            craftItems.sort((a: Item, b: Item) => (a.levelToCraft - b.levelToCraft) || a.name.localeCompare(b.name));
            placeholderRecipes += `${SPACES}// ${key.toUpperCase()}\n`;

            craftItems.forEach((item: Item) => {
                countRecipes++;

                placeholderRecipes += `${SPACES}case Items.${item.nameForEnum}:\n`;
                placeholderRecipes += `${SPACES}    return RecipeFactory.${key}(Items.${item.nameForEnum}, ${item.levelToCraft}, [\n`;

                if (!placeholderCraftable[key]) {
                    placeholderCraftable[key] = '';
                }

                placeholderCraftable[key] += `\n    Items.${item.nameForEnum},`;

                item.itemsToCraft.forEach((dataItem: any) => {
                    const item = this.data.items.get(dataItem.code)!;
                    placeholderRecipes += `${SPACES}        {code: Items.${item.nameForEnum}, quantity: ${dataItem.quantity}},\n`;
                });

                placeholderRecipes += `${SPACES}    ]);\n`
            })
            placeholderRecipes += '\n';
        })

        const recipesTemplate = await Utils.readFileRaw(`${this.templatesFolder}/Recipes.ts`);
        let fileContent = recipesTemplate.replace('//{PLACEHOLDER}', placeholderRecipes);
        await fs.writeFile(`${this.lexicalFolder}/Recipes.ts`, fileContent, 'utf8');

        fileContent = await Utils.readFileRaw(`${this.templatesFolder}/Craftables.ts`);
        Object.entries(placeholderCraftable).forEach(([key, placeholder]: [string, string]) => {
            if (fileContent.indexOf(`/*{PLACEHOLDER_${key.toUpperCase()}}*/`) === -1) {
                console.error(`CRAFTABLES - PLACEHOLDER FOR ${key.toUpperCase()} NOT FOUND`)
            }

            fileContent = fileContent.replace(`/*{PLACEHOLDER_${key.toUpperCase()}}*/`, placeholder + '\n');
        });
        await fs.writeFile(`${this.lexicalFolder}/Craftables.ts`, fileContent, 'utf8');
    }

    private async generateEquippables(equippables: any) {
        const placeholderEquippables = { };

        Object.entries(equippables).forEach(([key, items]: [string, Item[]]) => {

            items.forEach((item: Item) => {
                if (!placeholderEquippables[key]) {
                    placeholderEquippables[key] = '';
                }

                placeholderEquippables[key] += `\n    Items.${item.nameForEnum},`;
            });
        });

        let fileContent = await Utils.readFileRaw(`${this.templatesFolder}/Equippables.ts`);
        Object.entries(placeholderEquippables).forEach(([key, placeholder]: [string, string]) => {
            const placeholdeName = `/*{PLACEHOLDER_${key.toUpperCase()}}*/`;

            if (fileContent.indexOf(placeholdeName) === -1) {
                console.error(`EQUIPPABLES - ${placeholdeName} NOT FOUND`)
            }

            fileContent = fileContent.replace(placeholdeName, placeholder + '\n');
        });
        await fs.writeFile(`${this.lexicalFolder}/Equippables.ts`, fileContent, 'utf8');
    }

    private async generateEquipmentSets(sets: any) {
        const placeholders: any = {
            fire: AllEquippableSlots.reduce((obj: any, entry) => {
                obj[entry] = ''
                return obj;
            }, {}),
            air: AllEquippableSlots.reduce((obj: any, entry) => {
                obj[entry] = ''
                return obj;
            }, {}),
            water: AllEquippableSlots.reduce((obj: any, entry) => {
                obj[entry] = ''
                return obj;
            }, {}),
            earth: AllEquippableSlots.reduce((obj: any, entry) => {
                obj[entry] = ''
                return obj;
            }, {}),
            all: AllEquippableSlots.reduce((obj: any, entry) => {
                obj[entry] = ''
                return obj;
            }, {}),
        }

        let fileContent = await Utils.readFileRaw(`${this.templatesFolder}/EquipmentSet.ts`);

        Object.entries(sets).forEach(([element, elementSets]: [string, ItemType[]]) => {
            Object.entries(elementSets).forEach(([type, typeItems]: [string, Item[]]) => {
                typeItems.sort((a, b) => b.level - a.level || b.getElementEffects(element).attack - a.getElementEffects(element).attack);

                typeItems.forEach((item: Item) => {
                    // console.log(`${element} - ${type} - ${item.level} - ${item.name} - ${item.effectsToString()}`);

                    const itemString =`\n        Items.${item.nameForEnum}, // ${item.level} - ${item.effectsToString()}`;

                    if (type === 'ring') {
                        placeholders[element][EquippableSlot.Ring1] += itemString;
                        placeholders[element][EquippableSlot.Ring2] += itemString;
                        return;
                    }

                    if (type === 'artifact') {
                        placeholders[element][EquippableSlot.Artifact1] += itemString;
                        placeholders[element][EquippableSlot.Artifact2] += itemString;
                        placeholders[element][EquippableSlot.Artifact3] += itemString;
                        return;
                    }

                    placeholders[element][item.equippableSlot] += itemString;
                });
            });
        });

        Object.entries(placeholders).forEach(([element, types]: [string, any]) => {
            Object.entries(types).forEach(([type, placeholder]: [string, string]) => {
                const placeholderString = `/*{PLACEHOLDER_${type.toUpperCase()}_${element.toUpperCase()}}*/`;
                console.log(placeholderString);
                fileContent = fileContent.replace(placeholderString, placeholder);
            });
        });

        await fs.writeFile(`${this.lexicalFolder}/EquipmentSet.ts`, fileContent, 'utf8');
    }

    private async generateMonsters() {
        let fileContent = 'export enum Monsters {\n';
        this.data.monsters.forEach((monster: Monster) => {
            fileContent += `    ${monster.nameForEnum} = '${monster.code}',\n`;
        });
        fileContent += '}\n';
        await fs.writeFile(`${this.lexicalFolder}/Monsters.ts`, fileContent, 'utf8');
    }

    private async generateResources() {
        let fileContent = 'export enum Resources {\n';
        this.data.resources.forEach((resource: Resource) => {
            fileContent += `    ${resource.nameForEnum} = '${resource.code}',\n`;
        });
        fileContent += '}\n';
        await fs.writeFile(`${this.lexicalFolder}/Resources.ts`, fileContent, 'utf8');
    }

    private async generateEffects() {
        const placeholderEffects: { [key: string]: string; } = { };

        let fileContent = 'export enum Effects {\n';
        this.data.effects.forEach((effect: Effect) => {
            if (!placeholderEffects[effect.subtype]) {
                placeholderEffects[effect.subtype] = '';
            }

            placeholderEffects[effect.subtype] += `\n    Effects.${effect.nameForEnum},`;

            fileContent += `    ${effect.nameForEnum} = '${effect.code}',\n`;
        });
        fileContent += '}\n';
        await fs.writeFile(`${this.lexicalFolder}/Effects.ts`, fileContent, 'utf8');

        fileContent = await Utils.readFileRaw(`${this.templatesFolder}/TypeEffects.ts`);
        Object.entries(placeholderEffects).forEach(([key, value]) => {
            fileContent = fileContent.replace(`/*{PLACEHOLDER_${key.toUpperCase()}}*/`, value + '\n');
        });

        await fs.writeFile(`${this.lexicalFolder}/TypeEffects.ts`, fileContent, 'utf8');
    }

    private async generateMaps() {
        // @TODO: Need to generate a mapping of positions for each gathering spot (resource)
        // @TODO: Need to generate a mapping of positions for each working station
        // @TODO: Need to generate a mapping of positions for each monster
        // @TODO: Need to generate a mapping of positions for each npcs


        // -----------
        // DON'T KNOW WHERE I'M GOING WITH THIS
        // -----------
        /*let entities = new Map<string, boolean>();
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
        }*/
    }

    private async generateNpcs() {
        let allMerchants = '\nexport const AllMerchants: Merchants[] = [\n';
        let fileContent = 'export enum Merchants {\n';
        this.data.npcs.forEach((npc: Merchant) => {
            fileContent += `    ${npc.nameForEnum} = '${npc.code}',\n`;
            allMerchants += `    Merchants.${npc.nameForEnum},\n`;
        });
        allMerchants += '];\n';
        fileContent += '}\n' + allMerchants;
        await fs.writeFile(`${this.lexicalFolder}/Merchants.ts`, fileContent, 'utf8');
    }
}
