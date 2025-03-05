import {Skills} from "./Skills.js";
import {Items} from "./Items.js";


export interface ResourceItem {
    code: Items,
    quantity: number,
}

export class Recipe {
    constructor(private readonly data: any) {
    }

    get code(): Items {
        return this.data.code;
    }

    get skill(): Skills {
        return this.data.skill;
    }

    get level(): number {
        return this.data.level;
    }

    get items(): ResourceItem[] {
        return this.data.items;
    }

    getQuantityCraftable(maxInventory: number): number {
        const recipeRequiredItems: number = this.items.reduce((total: number, item: ResourceItem) => total + item.quantity, 0);

        return Math.floor(maxInventory / recipeRequiredItems);
    }
}

export class Recipes {
    static getFor(item: Items): Recipe {
        switch (item) {
//{PLACEHOLDER}
            default:
                throw new Error('RECIPE IS NOT DEFINED');
        }
    }
}

export class RecipeFactory {
    static mining(code: Items, level: number, items: ResourceItem[]): Recipe {
        return new Recipe({ code, skill: Skills.Mining, level, items, });
    }

    static woodcutting(code: Items, level: number, items: ResourceItem[]): Recipe {
        return new Recipe({ code, skill: Skills.Woodcutting, level, items, });
    }

    static fishing(code: Items, level: number, items: ResourceItem[]): Recipe {
        return new Recipe({ code, skill: Skills.Fishing, level, items, });
    }

    static weaponcrafting(code: Items, level: number, items: ResourceItem[]): Recipe {
        return new Recipe({ code, skill: Skills.Weaponcrafting, level, items, });
    }

    static gearcrafting(code: Items, level: number, items: ResourceItem[]): Recipe {
        return new Recipe({ code, skill: Skills.Gearcrafting, level, items, });
    }

    static jewelrycrafting(code: Items, level: number, items: ResourceItem[]): Recipe {
        return new Recipe({ code, skill: Skills.Jewelrycrafting, level, items, });
    }

    static cooking(code: Items, level: number, items: ResourceItem[]): Recipe {
        return new Recipe({ code, skill: Skills.Cooking, level, items, });
    }

    static alchemy(code: Items, level: number, items: ResourceItem[]): Recipe {
        return new Recipe({ code, skill: Skills.Alchemy, level, items, });
    }
}
