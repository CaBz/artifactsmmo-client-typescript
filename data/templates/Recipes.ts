import {Skills} from "./Skills.js";
import {Items} from "./Items.js";


export interface ResourceItem {
    code: Items,
    quantity: number,
}

export class Recipe {
    constructor(private readonly data: any) {
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
        return new Recipe({ skill: Skills.Mining, level, items, });
    }

    static woodcutting(level: number, items: ResourceItem[]): Recipe {
        return new Recipe({ skill: Skills.Woodcutting, level, items, });
    }

    static fishing(level: number, items: ResourceItem[]): Recipe {
        return new Recipe({ skill: Skills.Fishing, level, items, });
    }

    static weaponcrafting(level: number, items: ResourceItem[]): Recipe {
        return new Recipe({ skill: Skills.Weaponcrafting, level, items, });
    }

    static gearcrafting(level: number, items: ResourceItem[]): Recipe {
        return new Recipe({ skill: Skills.Gearcrafting, level, items, });
    }

    static jewelrycrafting(level: number, items: ResourceItem[]): Recipe {
        return new Recipe({ skill: Skills.Jewelrycrafting, level, items, });
    }

    static cooking(level: number, items: ResourceItem[]): Recipe {
        return new Recipe({ skill: Skills.Cooking, level, items, });
    }

    static alchemy(level: number, items: ResourceItem[]): Recipe {
        return new Recipe({ skill: Skills.Alchemy, level, items, });
    }
}
