import {Skill} from "./Skill.js";
import {Items} from "./Items.js";


export interface ResourceItem {
    code: Items,
    quantity: number,
}

export interface Recipe {
    skill: Skill,
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
        return { skill: Skill.Mining, level, items, };
    }

    static woodcutting(level: number, items: ResourceItem[]): Recipe {
        return { skill: Skill.Woodcutting, level, items, };
    }

    static fishing(level: number, items: ResourceItem[]): Recipe {
        return { skill: Skill.Fishing, level, items, };
    }

    static weaponcrafting(level: number, items: ResourceItem[]): Recipe {
        return { skill: Skill.Weaponcrafting, level, items, };
    }

    static gearcrafting(level: number, items: ResourceItem[]): Recipe {
        return { skill: Skill.Gearcrafting, level, items, };
    }

    static jewelrycrafting(level: number, items: ResourceItem[]): Recipe {
        return { skill: Skill.Jewelrycrafting, level, items, };
    }

    static cooking(level: number, items: ResourceItem[]): Recipe {
        return { skill: Skill.Cooking, level, items, };
    }

    static alchemy(level: number, items: ResourceItem[]): Recipe {
        return { skill: Skill.Alchemy, level, items, };
    }
}
