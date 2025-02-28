import {Skills} from "./Skills.js";
import {Items} from "./Items.js";


export interface ResourceItem {
    code: Items,
    quantity: number,
}

export interface Recipe {
    skill: Skills,
    level: Number,
    items: ResourceItem[],
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
    static mining(level: number, items: ResourceItem[]): Recipe {
        return { skill: Skills.Mining, level, items, };
    }

    static woodcutting(level: number, items: ResourceItem[]): Recipe {
        return { skill: Skills.Woodcutting, level, items, };
    }

    static fishing(level: number, items: ResourceItem[]): Recipe {
        return { skill: Skills.Fishing, level, items, };
    }

    static weaponcrafting(level: number, items: ResourceItem[]): Recipe {
        return { skill: Skills.Weaponcrafting, level, items, };
    }

    static gearcrafting(level: number, items: ResourceItem[]): Recipe {
        return { skill: Skills.Gearcrafting, level, items, };
    }

    static jewelrycrafting(level: number, items: ResourceItem[]): Recipe {
        return { skill: Skills.Jewelrycrafting, level, items, };
    }

    static cooking(level: number, items: ResourceItem[]): Recipe {
        return { skill: Skills.Cooking, level, items, };
    }

    static alchemy(level: number, items: ResourceItem[]): Recipe {
        return { skill: Skills.Alchemy, level, items, };
    }
}
