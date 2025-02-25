import {ItemName} from "./ItemName.js";
import {Skill} from "./Skill.js";

export interface ResourceItem {
    code: ItemName,
    quantity: number,
}

export interface Recipe {
    skill: Skill,
    level: Number,
    items: ResourceItem[],
}

export class Recipes {
    static getFor(item: ItemName): Recipe {
        switch (item) {
            // Mining
            case ItemName.Copper:
                return RecipeFactory.mining(1, [
                    { code: ItemName.CopperOre, quantity: 10 },
                ]);

            case ItemName.Iron: // Lv.10
                return RecipeFactory.mining(10, [
                    { code: ItemName.IronOre, quantity: 10 },
                ]);

            case ItemName.Steel:
                return RecipeFactory.mining(20, [
                    { code: ItemName.IronOre, quantity: 4 },
                    { code: ItemName.Coal, quantity: 7 },
                ]);

            case ItemName.Gold:
                return RecipeFactory.mining(30, [
                    { code: ItemName.GoldOre, quantity: 10 },
                ]);

            case ItemName.Strangold:
                return RecipeFactory.mining(35, [
                    { code: ItemName.GoldOre, quantity: 4 },
                    { code: ItemName.StrangeOre, quantity: 6 },
                ]);

            case ItemName.Mithril:
                return RecipeFactory.mining(40, [
                    { code: ItemName.MithrilOre, quantity: 10 },
                ]);

            // Weapongcrafting
            case ItemName.CopperDagger:
                return RecipeFactory.weaponcrafting(1, [
                    { code: ItemName.Copper, quantity: 6 },
                ]);
            case ItemName.WoodenStaff:
                return RecipeFactory.weaponcrafting(1, [
                    { code: ItemName.WoodenStick, quantity: 1 },
                    { code: ItemName.AshWood, quantity: 4 },
                ]);

            // Gearcrafting

            // Woodcutting
            case ItemName.AshPlank:
                return RecipeFactory.woodcutting(1, [
                    { code: ItemName.AshWood, quantity: 10 },
                ]);
            case ItemName.SprucePlank:
                return RecipeFactory.woodcutting(10, [
                    { code: ItemName.SpruceWood, quantity: 10 },
                ]);
            case ItemName.HardwoodPlank:
                return RecipeFactory.woodcutting(20, [
                    { code: ItemName.AshWood, quantity: 4 },
                    { code: ItemName.BirchWood, quantity: 6 },
                ]);
            case ItemName.MaplePlank:
                return RecipeFactory.woodcutting(40, [
                    { code: ItemName.MapleWood, quantity: 10 },
                ]);

            // Alchemy
            case ItemName.SmallHealthPotion:
                return RecipeFactory.alchemy(5, [
                    {code: ItemName.Sunflower, quantity: 3},
                ]);
            case ItemName.EathBoostPotion:
                return RecipeFactory.alchemy(10, [
                    {code: ItemName.Sunflower, quantity: 1},
                    {code: ItemName.YellowSlimeBall, quantity: 1},
                    {code: ItemName.Algae, quantity: 1},
                ]);
            case ItemName.AirBoostPotion:
                return RecipeFactory.alchemy(10, [
                    {code: ItemName.Sunflower, quantity: 1},
                    {code: ItemName.GreenSlimeBall, quantity: 1},
                    {code: ItemName.Algae, quantity: 1},
                ]);
            case ItemName.FireBoostPotion:
                return RecipeFactory.alchemy(10, [
                    {code: ItemName.Sunflower, quantity: 1},
                    {code: ItemName.RedSlimeBall, quantity: 1},
                    {code: ItemName.Algae, quantity: 1},
                ]);
            case ItemName.WaterBoostPotion:
                return RecipeFactory.alchemy(10, [
                    {code: ItemName.Sunflower, quantity: 1},
                    {code: ItemName.BlueSlimeBall, quantity: 1},
                    {code: ItemName.Algae, quantity: 1},
                ]);

            case ItemName.MinorHealthPotion:
                return RecipeFactory.alchemy(20, [
                    {code: ItemName.NettleLeaf, quantity: 2},
                    {code: ItemName.Algae, quantity: 1},
                ]);
            case ItemName.SmallAntitode:
                return RecipeFactory.alchemy(20, [
                    {code: ItemName.MilkBucket, quantity: 1},
                    {code: ItemName.Sap, quantity: 1},
                    {code: ItemName.NettleLeaf, quantity: 1},
                ]);
            case ItemName.HealthPotion:
                return RecipeFactory.alchemy(30, [
                    {code: ItemName.NettleLeaf, quantity: 2},
                    {code: ItemName.Sunflower, quantity: 1},
                    {code: ItemName.Sap, quantity: 1},
                ]);
            case ItemName.Antitode:
                return RecipeFactory.alchemy(30, [
                    {code: ItemName.Strangold, quantity: 2},
                    {code: ItemName.MapleSap, quantity: 1},
                    {code: ItemName.GlowstemLeaf, quantity: 1},
                ]);
            case ItemName.HealthBoostPotion:
                return RecipeFactory.alchemy(40, [
                    {code: ItemName.Shrimp, quantity: 1},
                    {code: ItemName.Sap, quantity: 1},
                    {code: ItemName.NettleLeaf, quantity: 1},
                ]);
            case ItemName.GreaterHealthPotion:
                return RecipeFactory.alchemy(35, [
                    {code: ItemName.GlowstemLeaf, quantity: 2},
                    {code: ItemName.Egg, quantity: 1},
                    {code: ItemName.Algae, quantity: 1},
                ]);
            case ItemName.EnchantedHealthPotion:
                return RecipeFactory.alchemy(40, [
                    {code: ItemName.GlowstemLeaf, quantity: 2},
                    {code: ItemName.Sunflower, quantity: 1},
                    {code: ItemName.MagicSap, quantity: 1},
                ]);
            case ItemName.EnchantedBoostPotion:
                return RecipeFactory.alchemy(40, [
                    {code: ItemName.GlowstemLeaf, quantity: 2},
                    {code: ItemName.BatWing, quantity: 1},
                    {code: ItemName.MagicSap, quantity: 1},
                ]);
            case ItemName.EarthResPotion:
                return RecipeFactory.alchemy(40, [
                    {code: ItemName.YellowSlimeBall, quantity: 2},
                    {code: ItemName.MapleSap, quantity: 1},
                    {code: ItemName.GlowstemLeaf, quantity: 1},
                ]);
            case ItemName.FireResPotion:
                return RecipeFactory.alchemy(40, [
                    {code: ItemName.RedSlimeBall, quantity: 2},
                    {code: ItemName.MapleSap, quantity: 1},
                    {code: ItemName.GlowstemLeaf, quantity: 1},
                ]);
            case ItemName.AirhResPotion:
                return RecipeFactory.alchemy(40, [
                    {code: ItemName.GreenSlimeBall, quantity: 2},
                    {code: ItemName.MapleSap, quantity: 1},
                    {code: ItemName.GlowstemLeaf, quantity: 1},
                ]);
            case ItemName.WaterResPotion:
                return RecipeFactory.alchemy(40, [
                    {code: ItemName.BlueSlimeBall, quantity: 2},
                    {code: ItemName.MapleSap, quantity: 1},
                    {code: ItemName.GlowstemLeaf, quantity: 1},
                ]);

            // Jewelrycrafting

            // Cooking
            case ItemName.CookedChicken:
                return RecipeFactory.cooking(1, [
                    {code: ItemName.RawChicken, quantity: 1},
                ]);
            case ItemName.CookedGudgeon:
                return RecipeFactory.cooking(1, [
                    {code: ItemName.Gudgeon, quantity: 1},
                ]);
            case ItemName.CookedBeef:
                return RecipeFactory.cooking(1, [
                    {code: ItemName.RawBeef, quantity: 1},
                ]);
            case ItemName.FriendEggs:
                return RecipeFactory.cooking(5, [
                    {code: ItemName.Egg, quantity: 2},
                ]);
            case ItemName.CookedShrimp:
                return RecipeFactory.cooking(10, [
                    {code: ItemName.Shrimp, quantity: 1},
                ]);
            case ItemName.CookedTrout:
                return RecipeFactory.cooking(20, [
                    {code: ItemName.Trout, quantity: 1},
                ]);
            case ItemName.CookedBass:
                return RecipeFactory.cooking(30, [
                    {code: ItemName.Bass, quantity: 1},
                ]);
            case ItemName.CookedSalmon:
                return RecipeFactory.cooking(40, [
                    {code: ItemName.Salmon, quantity: 1},
                ]);

            // Monster Drops

            default:
                throw new Error(`Recipe for ${item} is not defined dudelino!`);
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
