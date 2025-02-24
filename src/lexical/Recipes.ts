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

            case Item.Strangold:
                return RecipeFactory.mining(35, [
                    { code: Item.GoldOre, quantity: 4 },
                    { code: Item.StrangeOre, quantity: 6 },
                ]);

            case Item.Mithril:
                return RecipeFactory.mining(40, [
                    { code: Item.MithrilOre, quantity: 10 },
                ]);

            // Weapongcrafting
            // Gearcrafting

            // Woodcutting
            case Item.AshPlank:
                return RecipeFactory.woodcutting(1, [
                    { code: Item.AshWood, quantity: 10 },
                ]);
            case Item.SprucePlank:
                return RecipeFactory.woodcutting(10, [
                    { code: Item.SpruceWood, quantity: 10 },
                ]);

            case Item.HardwoodPlank:
                return RecipeFactory.woodcutting(20, [
                    { code: Item.AshWood, quantity: 4 },
                    { code: Item.BirchWood, quantity: 6 },
                ]);

            // Alchemy
            case Item.SmallHealthPotion:
                return RecipeFactory.alchemy(5, [
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
            case Item.FireBoostPotion:
                return RecipeFactory.alchemy(10, [
                    {code: Item.Sunflower, quantity: 1},
                    {code: Item.RedSlimeBall, quantity: 1},
                    {code: Item.Algae, quantity: 1},
                ]);
            case Item.WaterBoostPotion:
                return RecipeFactory.alchemy(10, [
                    {code: Item.Sunflower, quantity: 1},
                    {code: Item.BlueSlimeBall, quantity: 1},
                    {code: Item.Algae, quantity: 1},
                ]);

            case Item.MinorHealthPotion:
                return RecipeFactory.alchemy(20, [
                    {code: Item.NettleLeaf, quantity: 2},
                    {code: Item.Algae, quantity: 1},
                ]);
            case Item.SmallAntitode:
                return RecipeFactory.alchemy(20, [
                    {code: Item.MilkBucket, quantity: 1},
                    {code: Item.Sap, quantity: 1},
                    {code: Item.NettleLeaf, quantity: 1},
                ]);
            case Item.HealthPotion:
                return RecipeFactory.alchemy(30, [
                    {code: Item.NettleLeaf, quantity: 2},
                    {code: Item.Sunflower, quantity: 1},
                    {code: Item.Sap, quantity: 1},
                ]);
            case Item.Antitode:
                return RecipeFactory.alchemy(30, [
                    {code: Item.Strangold, quantity: 2},
                    {code: Item.MapleSap, quantity: 1},
                    {code: Item.GlowstemLeaf, quantity: 1},
                ]);
            case Item.HealthBoostPotion:
                return RecipeFactory.alchemy(40, [
                    {code: Item.Shrimp, quantity: 1},
                    {code: Item.Sap, quantity: 1},
                    {code: Item.NettleLeaf, quantity: 1},
                ]);
            case Item.GreaterHealthPotion:
                return RecipeFactory.alchemy(35, [
                    {code: Item.GlowstemLeaf, quantity: 2},
                    {code: Item.Egg, quantity: 1},
                    {code: Item.Algae, quantity: 1},
                ]);
            case Item.EnchantedHealthPotion:
                return RecipeFactory.alchemy(40, [
                    {code: Item.GlowstemLeaf, quantity: 2},
                    {code: Item.Sunflower, quantity: 1},
                    {code: Item.MagicSap, quantity: 1},
                ]);
            case Item.EnchantedBoostPotion:
                return RecipeFactory.alchemy(40, [
                    {code: Item.GlowstemLeaf, quantity: 2},
                    {code: Item.BatWing, quantity: 1},
                    {code: Item.MagicSap, quantity: 1},
                ]);
            case Item.EarthResPotion:
                return RecipeFactory.alchemy(40, [
                    {code: Item.YellowSlimeBall, quantity: 2},
                    {code: Item.MapleSap, quantity: 1},
                    {code: Item.GlowstemLeaf, quantity: 1},
                ]);
            case Item.FireResPotion:
                return RecipeFactory.alchemy(40, [
                    {code: Item.RedSlimeBall, quantity: 2},
                    {code: Item.MapleSap, quantity: 1},
                    {code: Item.GlowstemLeaf, quantity: 1},
                ]);
            case Item.AirhResPotion:
                return RecipeFactory.alchemy(40, [
                    {code: Item.GreenSlimeBall, quantity: 2},
                    {code: Item.MapleSap, quantity: 1},
                    {code: Item.GlowstemLeaf, quantity: 1},
                ]);
            case Item.WaterResPotion:
                return RecipeFactory.alchemy(40, [
                    {code: Item.BlueSlimeBall, quantity: 2},
                    {code: Item.MapleSap, quantity: 1},
                    {code: Item.GlowstemLeaf, quantity: 1},
                ]);

            // Jewelcrafting
            // Cooking
            // Monster Drops

            default:
                throw new Error(`Recipe for ${item} is'nt defined dudelino!`);
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
