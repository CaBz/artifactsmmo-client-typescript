import {Item} from "./Item.js";
import {Skill} from "./Skill.js";

export interface ResourceItem {
    code: Item,
    quantity: number,
}

export interface Recipe {
    skill: Skill,
    level: Number,
    items: ResourceItem[],
}

export class Recipes {
    static getFor(item: Item): Recipe {
        switch (item) {
            // Mining
            case Item.Copper:
                return RecipeFactory.mining(1, [
                    { code: Item.CopperOre, quantity: 10 },
                ]);

            case Item.Iron: // Lv.10
                return RecipeFactory.mining(10, [
                    { code: Item.IronOre, quantity: 10 },
                ]);

            case Item.Steel:
                return RecipeFactory.mining(20, [
                    { code: Item.IronOre, quantity: 4 },
                    { code: Item.Coal, quantity: 7 },
                ]);

            case Item.Gold:
                return RecipeFactory.mining(30, [
                    { code: Item.GoldOre, quantity: 10 },
                ]);

            case Item.Mithril:
                return RecipeFactory.mining(40, [
                    { code: Item.MithrilOre, quantity: 10 },
                ]);

            // Weapongcrafting
            // Gearcrafting
            // Woodcutting
            // Alchemy
            case Item.SmallHealthPotion:
                return RecipeFactory.alchemy(10, [
                    {code: Item.Sunflower, quantity: 3},
                ]);
            case Item.EathBoostPotion:
                return RecipeFactory.alchemy(10, [
                    {code: Item.Sunflower, quantity: 1},
                    {code: Item.YellowSlimeBall, quantity: 1},
                    {code: Item.Algae, quantity: 1},
                ]);
            case Item.AirBoostPotion:
                return RecipeFactory.alchemy(10, [
                    {code: Item.Sunflower, quantity: 1},
                    {code: Item.GreenSlimeBall, quantity: 1},
                    {code: Item.Algae, quantity: 1},
                ]);

            // Jewelcrafting
            // Cooking
            // Monster Drops
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
