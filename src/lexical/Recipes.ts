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
            // GEARCRAFTING
            case Items.CopperBoots:
                return RecipeFactory.gearcrafting(Items.CopperBoots, 1, [
                    {code: Items.Copper, quantity: 8},
                ]);
            case Items.CopperHelmet:
                return RecipeFactory.gearcrafting(Items.CopperHelmet, 1, [
                    {code: Items.Copper, quantity: 6},
                ]);
            case Items.WoodenShield:
                return RecipeFactory.gearcrafting(Items.WoodenShield, 1, [
                    {code: Items.AshPlank, quantity: 6},
                ]);
            case Items.CopperArmor:
                return RecipeFactory.gearcrafting(Items.CopperArmor, 5, [
                    {code: Items.Copper, quantity: 5},
                    {code: Items.Feather, quantity: 2},
                ]);
            case Items.CopperLegsArmor:
                return RecipeFactory.gearcrafting(Items.CopperLegsArmor, 5, [
                    {code: Items.Copper, quantity: 5},
                    {code: Items.Feather, quantity: 2},
                ]);
            case Items.FeatherCoat:
                return RecipeFactory.gearcrafting(Items.FeatherCoat, 5, [
                    {code: Items.Feather, quantity: 5},
                    {code: Items.AshPlank, quantity: 2},
                ]);
            case Items.Satchel:
                return RecipeFactory.gearcrafting(Items.Satchel, 5, [
                    {code: Items.Cowhide, quantity: 5},
                    {code: Items.Feather, quantity: 2},
                    {code: Items.JasperCrystal, quantity: 1},
                ]);
            case Items.AdventurerHelmet:
                return RecipeFactory.gearcrafting(Items.AdventurerHelmet, 10, [
                    {code: Items.Feather, quantity: 4},
                    {code: Items.Cowhide, quantity: 3},
                    {code: Items.SprucePlank, quantity: 3},
                    {code: Items.Mushroom, quantity: 4},
                ]);
            case Items.AdventurerVest:
                return RecipeFactory.gearcrafting(Items.AdventurerVest, 10, [
                    {code: Items.Feather, quantity: 2},
                    {code: Items.Cowhide, quantity: 6},
                    {code: Items.SprucePlank, quantity: 4},
                    {code: Items.YellowSlimeball, quantity: 4},
                ]);
            case Items.IronArmor:
                return RecipeFactory.gearcrafting(Items.IronArmor, 10, [
                    {code: Items.Iron, quantity: 5},
                    {code: Items.Cowhide, quantity: 3},
                ]);
            case Items.IronBoots:
                return RecipeFactory.gearcrafting(Items.IronBoots, 10, [
                    {code: Items.Iron, quantity: 5},
                    {code: Items.Feather, quantity: 3},
                ]);
            case Items.IronHelm:
                return RecipeFactory.gearcrafting(Items.IronHelm, 10, [
                    {code: Items.Iron, quantity: 5},
                    {code: Items.Feather, quantity: 3},
                ]);
            case Items.IronLegsArmor:
                return RecipeFactory.gearcrafting(Items.IronLegsArmor, 10, [
                    {code: Items.Iron, quantity: 5},
                    {code: Items.Cowhide, quantity: 3},
                ]);
            case Items.LeatherArmor:
                return RecipeFactory.gearcrafting(Items.LeatherArmor, 10, [
                    {code: Items.SprucePlank, quantity: 4},
                    {code: Items.Cowhide, quantity: 4},
                ]);
            case Items.LeatherBoots:
                return RecipeFactory.gearcrafting(Items.LeatherBoots, 10, [
                    {code: Items.AshPlank, quantity: 4},
                    {code: Items.Cowhide, quantity: 4},
                ]);
            case Items.LeatherHat:
                return RecipeFactory.gearcrafting(Items.LeatherHat, 10, [
                    {code: Items.Cowhide, quantity: 5},
                    {code: Items.YellowSlimeball, quantity: 3},
                ]);
            case Items.LeatherLegsArmor:
                return RecipeFactory.gearcrafting(Items.LeatherLegsArmor, 10, [
                    {code: Items.SprucePlank, quantity: 5},
                    {code: Items.Cowhide, quantity: 3},
                ]);
            case Items.SlimeShield:
                return RecipeFactory.gearcrafting(Items.SlimeShield, 10, [
                    {code: Items.SprucePlank, quantity: 6},
                    {code: Items.RedSlimeball, quantity: 3},
                    {code: Items.YellowSlimeball, quantity: 3},
                    {code: Items.GreenSlimeball, quantity: 3},
                    {code: Items.BlueSlimeball, quantity: 3},
                ]);
            case Items.AdventurerBoots:
                return RecipeFactory.gearcrafting(Items.AdventurerBoots, 15, [
                    {code: Items.Cowhide, quantity: 6},
                    {code: Items.Wolfhair, quantity: 4},
                    {code: Items.Mushroom, quantity: 3},
                    {code: Items.SprucePlank, quantity: 2},
                ]);
            case Items.AdventurerPants:
                return RecipeFactory.gearcrafting(Items.AdventurerPants, 15, [
                    {code: Items.AshPlank, quantity: 2},
                    {code: Items.Cowhide, quantity: 8},
                    {code: Items.GreenCloth, quantity: 2},
                ]);
            case Items.LuckyWizardHat:
                return RecipeFactory.gearcrafting(Items.LuckyWizardHat, 15, [
                    {code: Items.GreenCloth, quantity: 5},
                    {code: Items.FlyingWing, quantity: 4},
                    {code: Items.GreenSlimeball, quantity: 5},
                    {code: Items.JasperCrystal, quantity: 1},
                ]);
            case Items.MushmushJacket:
                return RecipeFactory.gearcrafting(Items.MushmushJacket, 15, [
                    {code: Items.Cowhide, quantity: 4},
                    {code: Items.FlyingWing, quantity: 4},
                    {code: Items.Mushroom, quantity: 6},
                    {code: Items.JasperCrystal, quantity: 1},
                ]);
            case Items.MushmushWizardHat:
                return RecipeFactory.gearcrafting(Items.MushmushWizardHat, 15, [
                    {code: Items.Cowhide, quantity: 3},
                    {code: Items.Wolfhair, quantity: 3},
                    {code: Items.Mushroom, quantity: 5},
                    {code: Items.JasperCrystal, quantity: 1},
                ]);
            case Items.MagicWizardHat:
                return RecipeFactory.gearcrafting(Items.MagicWizardHat, 20, [
                    {code: Items.OgreSkin, quantity: 2},
                    {code: Items.Wolfhair, quantity: 4},
                    {code: Items.BlueSlimeball, quantity: 10},
                    {code: Items.HardwoodPlank, quantity: 2},
                ]);
            case Items.SerpentSkinBoots:
                return RecipeFactory.gearcrafting(Items.SerpentSkinBoots, 20, [
                    {code: Items.HardwoodPlank, quantity: 6},
                    {code: Items.SpiderLeg, quantity: 3},
                    {code: Items.SerpentSkin, quantity: 4},
                    {code: Items.GreenCloth, quantity: 2},
                ]);
            case Items.SkeletonArmor:
                return RecipeFactory.gearcrafting(Items.SkeletonArmor, 20, [
                    {code: Items.SkeletonBone, quantity: 6},
                    {code: Items.WolfBone, quantity: 3},
                    {code: Items.PigSkin, quantity: 2},
                    {code: Items.Steel, quantity: 4},
                ]);
            case Items.SkeletonHelmet:
                return RecipeFactory.gearcrafting(Items.SkeletonHelmet, 20, [
                    {code: Items.SkeletonSkull, quantity: 1},
                    {code: Items.SkeletonBone, quantity: 3},
                    {code: Items.WolfBone, quantity: 2},
                    {code: Items.Iron, quantity: 7},
                ]);
            case Items.SkeletonPants:
                return RecipeFactory.gearcrafting(Items.SkeletonPants, 20, [
                    {code: Items.WolfBone, quantity: 3},
                    {code: Items.SkeletonBone, quantity: 3},
                    {code: Items.Wolfhair, quantity: 2},
                    {code: Items.AshPlank, quantity: 7},
                ]);
            case Items.SteelArmor:
                return RecipeFactory.gearcrafting(Items.SteelArmor, 20, [
                    {code: Items.Steel, quantity: 7},
                    {code: Items.GreenCloth, quantity: 2},
                    {code: Items.PigSkin, quantity: 4},
                    {code: Items.SpiderLeg, quantity: 2},
                ]);
            case Items.SteelBoots:
                return RecipeFactory.gearcrafting(Items.SteelBoots, 20, [
                    {code: Items.HardwoodPlank, quantity: 3},
                    {code: Items.Steel, quantity: 6},
                    {code: Items.OgreEye, quantity: 4},
                    {code: Items.OgreSkin, quantity: 2},
                ]);
            case Items.SteelHelm:
                return RecipeFactory.gearcrafting(Items.SteelHelm, 20, [
                    {code: Items.Steel, quantity: 8},
                    {code: Items.OgreSkin, quantity: 3},
                    {code: Items.WolfBone, quantity: 2},
                    {code: Items.FlyingWing, quantity: 3},
                ]);
            case Items.SteelLegsArmor:
                return RecipeFactory.gearcrafting(Items.SteelLegsArmor, 20, [
                    {code: Items.Steel, quantity: 7},
                    {code: Items.SkeletonSkull, quantity: 2},
                    {code: Items.Feather, quantity: 4},
                    {code: Items.PigSkin, quantity: 2},
                ]);
            case Items.SteelShield:
                return RecipeFactory.gearcrafting(Items.SteelShield, 20, [
                    {code: Items.Steel, quantity: 6},
                    {code: Items.SerpentSkin, quantity: 4},
                    {code: Items.WolfBone, quantity: 3},
                    {code: Items.OgreEye, quantity: 2},
                ]);
            case Items.TromatisingMask:
                return RecipeFactory.gearcrafting(Items.TromatisingMask, 20, [
                    {code: Items.Steel, quantity: 7},
                    {code: Items.PigSkin, quantity: 3},
                    {code: Items.FlyingWing, quantity: 2},
                    {code: Items.SkeletonBone, quantity: 3},
                ]);
            case Items.LizardSkinArmor:
                return RecipeFactory.gearcrafting(Items.LizardSkinArmor, 25, [
                    {code: Items.LizardSkin, quantity: 5},
                    {code: Items.DeadWoodPlank, quantity: 5},
                    {code: Items.OgreSkin, quantity: 4},
                    {code: Items.JasperCrystal, quantity: 2},
                ]);
            case Items.LizardSkinLegsArmor:
                return RecipeFactory.gearcrafting(Items.LizardSkinLegsArmor, 25, [
                    {code: Items.LizardSkin, quantity: 5},
                    {code: Items.FlyingWing, quantity: 5},
                    {code: Items.OgreEye, quantity: 4},
                    {code: Items.JasperCrystal, quantity: 2},
                ]);
            case Items.PiggyArmor:
                return RecipeFactory.gearcrafting(Items.PiggyArmor, 25, [
                    {code: Items.PigSkin, quantity: 5},
                    {code: Items.DeadWoodPlank, quantity: 5},
                    {code: Items.OgreSkin, quantity: 4},
                    {code: Items.JasperCrystal, quantity: 2},
                ]);
            case Items.PiggyHelmet:
                return RecipeFactory.gearcrafting(Items.PiggyHelmet, 25, [
                    {code: Items.Steel, quantity: 6},
                    {code: Items.PigSkin, quantity: 6},
                    {code: Items.CyclopsEye, quantity: 2},
                    {code: Items.VampireBlood, quantity: 2},
                ]);
            case Items.PiggyPants:
                return RecipeFactory.gearcrafting(Items.PiggyPants, 25, [
                    {code: Items.PigSkin, quantity: 5},
                    {code: Items.HardwoodPlank, quantity: 4},
                    {code: Items.SerpentSkin, quantity: 4},
                    {code: Items.JasperCrystal, quantity: 2},
                ]);
            case Items.SerpentSkinArmor:
                return RecipeFactory.gearcrafting(Items.SerpentSkinArmor, 25, [
                    {code: Items.SerpentSkin, quantity: 5},
                    {code: Items.SkeletonBone, quantity: 5},
                    {code: Items.VampireBlood, quantity: 4},
                    {code: Items.JasperCrystal, quantity: 1},
                ]);
            case Items.SerpentSkinLegsArmor:
                return RecipeFactory.gearcrafting(Items.SerpentSkinLegsArmor, 25, [
                    {code: Items.SerpentSkin, quantity: 5},
                    {code: Items.OgreSkin, quantity: 5},
                    {code: Items.WolfBone, quantity: 4},
                    {code: Items.JasperCrystal, quantity: 1},
                ]);
            case Items.StormforgedArmor:
                return RecipeFactory.gearcrafting(Items.StormforgedArmor, 25, [
                    {code: Items.LizardSkin, quantity: 5},
                    {code: Items.DeadWoodPlank, quantity: 5},
                    {code: Items.OgreEye, quantity: 4},
                    {code: Items.JasperCrystal, quantity: 2},
                ]);
            case Items.StormforgedPants:
                return RecipeFactory.gearcrafting(Items.StormforgedPants, 25, [
                    {code: Items.LizardEye, quantity: 4},
                    {code: Items.WolfBone, quantity: 5},
                    {code: Items.OgreSkin, quantity: 5},
                    {code: Items.JasperCrystal, quantity: 2},
                ]);
            case Items.ConjurerCloak:
                return RecipeFactory.gearcrafting(Items.ConjurerCloak, 30, [
                    {code: Items.Obsidian, quantity: 6},
                    {code: Items.CyclopsEye, quantity: 5},
                    {code: Items.OwlbearHair, quantity: 4},
                    {code: Items.DemonHorn, quantity: 4},
                    {code: Items.EnchantedFabric, quantity: 1},
                ]);
            case Items.ConjurerSkirt:
                return RecipeFactory.gearcrafting(Items.ConjurerSkirt, 30, [
                    {code: Items.Obsidian, quantity: 6},
                    {code: Items.VampireTooth, quantity: 4},
                    {code: Items.OwlbearClaw, quantity: 3},
                    {code: Items.LizardEye, quantity: 4},
                    {code: Items.RedCloth, quantity: 3},
                ]);
            case Items.FlyingBoots:
                return RecipeFactory.gearcrafting(Items.FlyingBoots, 30, [
                    {code: Items.DeadWoodPlank, quantity: 8},
                    {code: Items.LizardEye, quantity: 4},
                    {code: Items.DemoniacDust, quantity: 4},
                    {code: Items.OwlbearHair, quantity: 3},
                    {code: Items.MagicalCure, quantity: 1},
                ]);
            case Items.GoldBoots:
                return RecipeFactory.gearcrafting(Items.GoldBoots, 30, [
                    {code: Items.Gold, quantity: 8},
                    {code: Items.VampireBlood, quantity: 4},
                    {code: Items.LizardEye, quantity: 3},
                    {code: Items.OwlbearHair, quantity: 4},
                    {code: Items.MagicalCure, quantity: 1},
                ]);
            case Items.GoldHelm:
                return RecipeFactory.gearcrafting(Items.GoldHelm, 30, [
                    {code: Items.Gold, quantity: 8},
                    {code: Items.DemonHorn, quantity: 2},
                    {code: Items.DemoniacDust, quantity: 3},
                    {code: Items.VampireTooth, quantity: 3},
                    {code: Items.OwlbearHair, quantity: 4},
                ]);
            case Items.GoldMask:
                return RecipeFactory.gearcrafting(Items.GoldMask, 30, [
                    {code: Items.Gold, quantity: 8},
                    {code: Items.RedCloth, quantity: 2},
                    {code: Items.OwlbearClaw, quantity: 4},
                    {code: Items.DemonHorn, quantity: 2},
                    {code: Items.SkeletonSkull, quantity: 4},
                ]);
            case Items.GoldPlatebody:
                return RecipeFactory.gearcrafting(Items.GoldPlatebody, 30, [
                    {code: Items.Gold, quantity: 8},
                    {code: Items.OwlbearHair, quantity: 3},
                    {code: Items.RedCloth, quantity: 3},
                    {code: Items.DemoniacDust, quantity: 4},
                    {code: Items.DemonHorn, quantity: 2},
                ]);
            case Items.GoldPlatelegs:
                return RecipeFactory.gearcrafting(Items.GoldPlatelegs, 30, [
                    {code: Items.Gold, quantity: 8},
                    {code: Items.LizardEye, quantity: 3},
                    {code: Items.RedCloth, quantity: 3},
                    {code: Items.VampireTooth, quantity: 4},
                    {code: Items.OgreSkin, quantity: 2},
                ]);
            case Items.GoldShield:
                return RecipeFactory.gearcrafting(Items.GoldShield, 30, [
                    {code: Items.DeadWoodPlank, quantity: 7},
                    {code: Items.Gold, quantity: 7},
                    {code: Items.DemonHorn, quantity: 4},
                    {code: Items.Sapphire, quantity: 1},
                    {code: Items.MagicalCure, quantity: 1},
                ]);
            case Items.LizardBoots:
                return RecipeFactory.gearcrafting(Items.LizardBoots, 30, [
                    {code: Items.DeadWoodPlank, quantity: 8},
                    {code: Items.LizardSkin, quantity: 4},
                    {code: Items.DemoniacDust, quantity: 4},
                    {code: Items.OwlbearClaw, quantity: 3},
                    {code: Items.MagicalCure, quantity: 1},
                ]);
            case Items.ObsidianArmor:
                return RecipeFactory.gearcrafting(Items.ObsidianArmor, 30, [
                    {code: Items.Obsidian, quantity: 6},
                    {code: Items.Ruby, quantity: 1},
                    {code: Items.SpiderLeg, quantity: 5},
                    {code: Items.DemonHorn, quantity: 4},
                    {code: Items.DemoniacDust, quantity: 4},
                ]);
            case Items.ObsidianHelmet:
                return RecipeFactory.gearcrafting(Items.ObsidianHelmet, 30, [
                    {code: Items.Obsidian, quantity: 6},
                    {code: Items.Emerald, quantity: 1},
                    {code: Items.OwlbearHair, quantity: 3},
                    {code: Items.LizardSkin, quantity: 5},
                    {code: Items.VampireTooth, quantity: 5},
                ]);
            case Items.ObsidianLegsArmor:
                return RecipeFactory.gearcrafting(Items.ObsidianLegsArmor, 30, [
                    {code: Items.Obsidian, quantity: 6},
                    {code: Items.Sapphire, quantity: 1},
                    {code: Items.OwlbearClaw, quantity: 3},
                    {code: Items.LizardEye, quantity: 5},
                    {code: Items.RedCloth, quantity: 5},
                ]);
            case Items.RoyalSkeletonArmor:
                return RecipeFactory.gearcrafting(Items.RoyalSkeletonArmor, 30, [
                    {code: Items.Gold, quantity: 8},
                    {code: Items.SkeletonArmor, quantity: 1},
                    {code: Items.RedCloth, quantity: 3},
                    {code: Items.DemoniacDust, quantity: 3},
                ]);
            case Items.RoyalSkeletonHelmet:
                return RecipeFactory.gearcrafting(Items.RoyalSkeletonHelmet, 30, [
                    {code: Items.Gold, quantity: 8},
                    {code: Items.SkeletonHelmet, quantity: 1},
                    {code: Items.OwlbearClaw, quantity: 4},
                    {code: Items.CyclopsEye, quantity: 4},
                ]);
            case Items.RoyalSkeletonPants:
                return RecipeFactory.gearcrafting(Items.RoyalSkeletonPants, 30, [
                    {code: Items.Gold, quantity: 8},
                    {code: Items.SkeletonPants, quantity: 1},
                    {code: Items.OwlbearHair, quantity: 3},
                    {code: Items.VampireBlood, quantity: 3},
                ]);
            case Items.AncientJean:
                return RecipeFactory.gearcrafting(Items.AncientJean, 35, [
                    {code: Items.MagicalPlank, quantity: 6},
                    {code: Items.MagicalCure, quantity: 2},
                    {code: Items.CursedBook, quantity: 3},
                    {code: Items.Obsidian, quantity: 4},
                    {code: Items.LizardSkin, quantity: 5},
                ]);
            case Items.CursedHat:
                return RecipeFactory.gearcrafting(Items.CursedHat, 35, [
                    {code: Items.CursedPlank, quantity: 8},
                    {code: Items.MaleficCloth, quantity: 2},
                    {code: Items.CursedBook, quantity: 4},
                    {code: Items.OwlbearHair, quantity: 4},
                    {code: Items.Diamond, quantity: 1},
                    {code: Items.EnchantedFabric, quantity: 1},
                ]);
            case Items.DreadfulArmor:
                return RecipeFactory.gearcrafting(Items.DreadfulArmor, 35, [
                    {code: Items.Obsidian, quantity: 8},
                    {code: Items.MaleficCloth, quantity: 2},
                    {code: Items.OgreEye, quantity: 5},
                    {code: Items.GoblinEye, quantity: 4},
                    {code: Items.EnchantedFabric, quantity: 1},
                ]);
            case Items.DreadfulShield:
                return RecipeFactory.gearcrafting(Items.DreadfulShield, 35, [
                    {code: Items.Obsidian, quantity: 8},
                    {code: Items.GoblinEye, quantity: 5},
                    {code: Items.CursedBook, quantity: 5},
                    {code: Items.Ruby, quantity: 1},
                    {code: Items.AstralyteCrystal, quantity: 1},
                ]);
            case Items.EnchanterBoots:
                return RecipeFactory.gearcrafting(Items.EnchanterBoots, 35, [
                    {code: Items.MagicalPlank, quantity: 8},
                    {code: Items.MaleficCloth, quantity: 2},
                    {code: Items.LizardEye, quantity: 4},
                    {code: Items.OwlbearClaw, quantity: 5},
                    {code: Items.EnchantedFabric, quantity: 1},
                ]);
            case Items.EnchanterPants:
                return RecipeFactory.gearcrafting(Items.EnchanterPants, 35, [
                    {code: Items.MagicalPlank, quantity: 8},
                    {code: Items.DemonHorn, quantity: 2},
                    {code: Items.CursedBook, quantity: 3},
                    {code: Items.OwlbearClaw, quantity: 4},
                    {code: Items.SpiderLeg, quantity: 2},
                    {code: Items.EnchantedFabric, quantity: 1},
                ]);
            case Items.JesterHat:
                return RecipeFactory.gearcrafting(Items.JesterHat, 35, [
                    {code: Items.CursedPlank, quantity: 8},
                    {code: Items.VampireTooth, quantity: 2},
                    {code: Items.CursedBook, quantity: 4},
                    {code: Items.OwlbearHair, quantity: 4},
                    {code: Items.Diamond, quantity: 1},
                    {code: Items.EnchantedFabric, quantity: 1},
                ]);
            case Items.MaleficArmor:
                return RecipeFactory.gearcrafting(Items.MaleficArmor, 35, [
                    {code: Items.MagicalPlank, quantity: 8},
                    {code: Items.MaleficCloth, quantity: 2},
                    {code: Items.OwlbearHair, quantity: 4},
                    {code: Items.MagicStone, quantity: 3},
                    {code: Items.MagicalCure, quantity: 2},
                ]);
            case Items.StrangoldArmor:
                return RecipeFactory.gearcrafting(Items.StrangoldArmor, 35, [
                    {code: Items.Strangold, quantity: 8},
                    {code: Items.OwlbearHair, quantity: 3},
                    {code: Items.MagicStone, quantity: 3},
                    {code: Items.DemonHorn, quantity: 4},
                    {code: Items.MagicalCure, quantity: 2},
                ]);
            case Items.StrangoldHelmet:
                return RecipeFactory.gearcrafting(Items.StrangoldHelmet, 35, [
                    {code: Items.Strangold, quantity: 7},
                    {code: Items.DemoniacDust, quantity: 4},
                    {code: Items.MagicStone, quantity: 3},
                    {code: Items.LizardSkin, quantity: 4},
                    {code: Items.Diamond, quantity: 1},
                    {code: Items.MagicalCure, quantity: 1},
                ]);
            case Items.StrangoldLegsArmor:
                return RecipeFactory.gearcrafting(Items.StrangoldLegsArmor, 35, [
                    {code: Items.Strangold, quantity: 8},
                    {code: Items.MagicalCure, quantity: 2},
                    {code: Items.CursedBook, quantity: 3},
                    {code: Items.OgreEye, quantity: 4},
                    {code: Items.RedCloth, quantity: 3},
                ]);
            case Items.AirShield:
                return RecipeFactory.gearcrafting(Items.AirShield, 40, [
                    {code: Items.Strangold, quantity: 6},
                    {code: Items.Emerald, quantity: 1},
                    {code: Items.GreenSlimeball, quantity: 20},
                    {code: Items.WolfriderHair, quantity: 5},
                    {code: Items.RosenbloodElixir, quantity: 1},
                ]);
            case Items.BatwingHelmet:
                return RecipeFactory.gearcrafting(Items.BatwingHelmet, 40, [
                    {code: Items.Strangold, quantity: 6},
                    {code: Items.Topaz, quantity: 1},
                    {code: Items.RosenbloodElixir, quantity: 1},
                    {code: Items.BatWing, quantity: 5},
                    {code: Items.OrcSkin, quantity: 5},
                    {code: Items.EnchantedFabric, quantity: 2},
                ]);
            case Items.CultistBoots:
                return RecipeFactory.gearcrafting(Items.CultistBoots, 40, [
                    {code: Items.MaplePlank, quantity: 7},
                    {code: Items.MaleficCloth, quantity: 2},
                    {code: Items.HellhoundHair, quantity: 4},
                    {code: Items.OrcSkin, quantity: 5},
                    {code: Items.EnchantedFabric, quantity: 2},
                ]);
            case Items.CultistCloak:
                return RecipeFactory.gearcrafting(Items.CultistCloak, 40, [
                    {code: Items.MaplePlank, quantity: 8},
                    {code: Items.MaleficCloth, quantity: 2},
                    {code: Items.RedCloth, quantity: 3},
                    {code: Items.HellhoundBone, quantity: 4},
                    {code: Items.AstralyteCrystal, quantity: 2},
                ]);
            case Items.CultistHat:
                return RecipeFactory.gearcrafting(Items.CultistHat, 40, [
                    {code: Items.MaplePlank, quantity: 8},
                    {code: Items.MaleficCloth, quantity: 1},
                    {code: Items.HellhoundHair, quantity: 5},
                    {code: Items.OrcSkin, quantity: 4},
                    {code: Items.AstralyteCrystal, quantity: 2},
                ]);
            case Items.CultistPants:
                return RecipeFactory.gearcrafting(Items.CultistPants, 40, [
                    {code: Items.CursedPlank, quantity: 8},
                    {code: Items.MaleficCloth, quantity: 2},
                    {code: Items.WolfriderHair, quantity: 3},
                    {code: Items.HellhoundHair, quantity: 3},
                    {code: Items.MagicalCure, quantity: 4},
                ]);
            case Items.EarthShield:
                return RecipeFactory.gearcrafting(Items.EarthShield, 40, [
                    {code: Items.Strangold, quantity: 6},
                    {code: Items.Topaz, quantity: 1},
                    {code: Items.YellowSlimeball, quantity: 20},
                    {code: Items.BatWing, quantity: 3},
                    {code: Items.RosenbloodElixir, quantity: 1},
                ]);
            case Items.FireShield:
                return RecipeFactory.gearcrafting(Items.FireShield, 40, [
                    {code: Items.Strangold, quantity: 6},
                    {code: Items.Ruby, quantity: 1},
                    {code: Items.RedSlimeball, quantity: 20},
                    {code: Items.OrcSkin, quantity: 5},
                    {code: Items.RosenbloodElixir, quantity: 1},
                ]);
            case Items.HellArmor:
                return RecipeFactory.gearcrafting(Items.HellArmor, 40, [
                    {code: Items.CursedPlank, quantity: 8},
                    {code: Items.EfreetCloth, quantity: 4},
                    {code: Items.RosenbloodElixir, quantity: 1},
                    {code: Items.DemoniacDust, quantity: 3},
                    {code: Items.DemonHorn, quantity: 4},
                ]);
            case Items.HellLegsArmor:
                return RecipeFactory.gearcrafting(Items.HellLegsArmor, 40, [
                    {code: Items.MaplePlank, quantity: 8},
                    {code: Items.DemonHorn, quantity: 2},
                    {code: Items.EfreetCloth, quantity: 4},
                    {code: Items.MaleficCloth, quantity: 2},
                    {code: Items.HellhoundBone, quantity: 4},
                ]);
            case Items.HorkHelmet:
                return RecipeFactory.gearcrafting(Items.HorkHelmet, 40, [
                    {code: Items.Strangold, quantity: 7},
                    {code: Items.OrcSkin, quantity: 4},
                    {code: Items.RosenbloodElixir, quantity: 1},
                    {code: Items.BatWing, quantity: 3},
                    {code: Items.JasperCrystal, quantity: 5},
                ]);
            case Items.MithrilBoots:
                return RecipeFactory.gearcrafting(Items.MithrilBoots, 40, [
                    {code: Items.Mithril, quantity: 7},
                    {code: Items.Diamond, quantity: 1},
                    {code: Items.HellhoundHair, quantity: 5},
                    {code: Items.GoblinEye, quantity: 5},
                    {code: Items.EnchantedFabric, quantity: 2},
                ]);
            case Items.MithrilHelm:
                return RecipeFactory.gearcrafting(Items.MithrilHelm, 40, [
                    {code: Items.Mithril, quantity: 8},
                    {code: Items.Diamond, quantity: 1},
                    {code: Items.GoblinTooth, quantity: 3},
                    {code: Items.VampireBlood, quantity: 3},
                    {code: Items.JasperCrystal, quantity: 5},
                ]);
            case Items.MithrilPlatebody:
                return RecipeFactory.gearcrafting(Items.MithrilPlatebody, 40, [
                    {code: Items.Mithril, quantity: 8},
                    {code: Items.OrcSkin, quantity: 3},
                    {code: Items.BatWing, quantity: 3},
                    {code: Items.GoblinTooth, quantity: 4},
                    {code: Items.EnchantedFabric, quantity: 2},
                ]);
            case Items.MithrilPlatelegs:
                return RecipeFactory.gearcrafting(Items.MithrilPlatelegs, 40, [
                    {code: Items.Mithril, quantity: 8},
                    {code: Items.LizardEye, quantity: 2},
                    {code: Items.DemoniacDust, quantity: 3},
                    {code: Items.VampireTooth, quantity: 3},
                    {code: Items.OwlbearHair, quantity: 4},
                ]);
            case Items.MithrilShield:
                return RecipeFactory.gearcrafting(Items.MithrilShield, 40, [
                    {code: Items.Mithril, quantity: 7},
                    {code: Items.LizardSkin, quantity: 3},
                    {code: Items.CyclopsEye, quantity: 3},
                    {code: Items.HellhoundHair, quantity: 3},
                    {code: Items.GoblinEye, quantity: 4},
                ]);
            case Items.WaterShield:
                return RecipeFactory.gearcrafting(Items.WaterShield, 40, [
                    {code: Items.Strangold, quantity: 6},
                    {code: Items.Sapphire, quantity: 1},
                    {code: Items.BlueSlimeball, quantity: 20},
                    {code: Items.HellhoundBone, quantity: 3},
                    {code: Items.RosenbloodElixir, quantity: 1},
                ]);
            case Items.WhiteKnightArmor:
                return RecipeFactory.gearcrafting(Items.WhiteKnightArmor, 40, [
                    {code: Items.Mithril, quantity: 8},
                    {code: Items.MagicStone, quantity: 3},
                    {code: Items.HellhoundHair, quantity: 3},
                    {code: Items.WolfriderHair, quantity: 4},
                    {code: Items.EnchantedFabric, quantity: 2},
                ]);
            case Items.WhiteKnightHelmet:
                return RecipeFactory.gearcrafting(Items.WhiteKnightHelmet, 40, [
                    {code: Items.Mithril, quantity: 8},
                    {code: Items.Diamond, quantity: 1},
                    {code: Items.HellhoundBone, quantity: 4},
                    {code: Items.OrcSkin, quantity: 3},
                    {code: Items.OwlbearClaw, quantity: 4},
                ]);
            case Items.WhiteKnightPants:
                return RecipeFactory.gearcrafting(Items.WhiteKnightPants, 40, [
                    {code: Items.Mithril, quantity: 8},
                    {code: Items.HellhoundHair, quantity: 3},
                    {code: Items.WolfriderHair, quantity: 3},
                    {code: Items.GoblinTooth, quantity: 4},
                    {code: Items.AstralyteCrystal, quantity: 2},
                ]);
            case Items.WhiteKnightShield:
                return RecipeFactory.gearcrafting(Items.WhiteKnightShield, 40, [
                    {code: Items.MaplePlank, quantity: 7},
                    {code: Items.LizardEye, quantity: 3},
                    {code: Items.WolfriderHair, quantity: 3},
                    {code: Items.HellhoundHair, quantity: 3},
                    {code: Items.GoblinEye, quantity: 4},
                ]);
            case Items.Wratharmor:
                return RecipeFactory.gearcrafting(Items.Wratharmor, 40, [
                    {code: Items.Mithril, quantity: 8},
                    {code: Items.RosenbloodElixir, quantity: 1},
                    {code: Items.GoblinEye, quantity: 4},
                    {code: Items.HellhoundBone, quantity: 5},
                    {code: Items.EnchantedFabric, quantity: 2},
                ]);
            case Items.Wrathelmet:
                return RecipeFactory.gearcrafting(Items.Wrathelmet, 40, [
                    {code: Items.Mithril, quantity: 8},
                    {code: Items.RosenbloodElixir, quantity: 1},
                    {code: Items.WolfriderHair, quantity: 4},
                    {code: Items.CursedBook, quantity: 5},
                    {code: Items.AstralyteCrystal, quantity: 2},
                ]);
            case Items.Wrathpants:
                return RecipeFactory.gearcrafting(Items.Wrathpants, 40, [
                    {code: Items.Mithril, quantity: 8},
                    {code: Items.BatWing, quantity: 3},
                    {code: Items.GoblinTooth, quantity: 4},
                    {code: Items.HellhoundBone, quantity: 3},
                    {code: Items.EnchantedFabric, quantity: 2},
                ]);

            // JEWELRYCRAFTING
            case Items.CopperRing:
                return RecipeFactory.jewelrycrafting(Items.CopperRing, 1, [
                    {code: Items.Copper, quantity: 6},
                ]);
            case Items.LifeAmulet:
                return RecipeFactory.jewelrycrafting(Items.LifeAmulet, 5, [
                    {code: Items.Feather, quantity: 4},
                    {code: Items.RedSlimeball, quantity: 2},
                ]);
            case Items.AirWaterAmulet:
                return RecipeFactory.jewelrycrafting(Items.AirWaterAmulet, 10, [
                    {code: Items.Iron, quantity: 4},
                    {code: Items.GreenSlimeball, quantity: 2},
                    {code: Items.BlueSlimeball, quantity: 2},
                ]);
            case Items.FireEarthAmulet:
                return RecipeFactory.jewelrycrafting(Items.FireEarthAmulet, 10, [
                    {code: Items.Iron, quantity: 4},
                    {code: Items.RedSlimeball, quantity: 2},
                    {code: Items.YellowSlimeball, quantity: 2},
                ]);
            case Items.IronRing:
                return RecipeFactory.jewelrycrafting(Items.IronRing, 10, [
                    {code: Items.Iron, quantity: 6},
                    {code: Items.Feather, quantity: 2},
                ]);
            case Items.AirRing:
                return RecipeFactory.jewelrycrafting(Items.AirRing, 15, [
                    {code: Items.Iron, quantity: 5},
                    {code: Items.GreenSlimeball, quantity: 4},
                    {code: Items.FlyingWing, quantity: 3},
                ]);
            case Items.EarthRing:
                return RecipeFactory.jewelrycrafting(Items.EarthRing, 15, [
                    {code: Items.Iron, quantity: 5},
                    {code: Items.YellowSlimeball, quantity: 4},
                    {code: Items.FlyingWing, quantity: 3},
                ]);
            case Items.FireRing:
                return RecipeFactory.jewelrycrafting(Items.FireRing, 15, [
                    {code: Items.Iron, quantity: 5},
                    {code: Items.RedSlimeball, quantity: 4},
                    {code: Items.FlyingWing, quantity: 3},
                ]);
            case Items.LifeRing:
                return RecipeFactory.jewelrycrafting(Items.LifeRing, 15, [
                    {code: Items.Iron, quantity: 5},
                    {code: Items.Feather, quantity: 3},
                    {code: Items.Mushroom, quantity: 3},
                ]);
            case Items.WaterRing:
                return RecipeFactory.jewelrycrafting(Items.WaterRing, 15, [
                    {code: Items.Iron, quantity: 5},
                    {code: Items.BlueSlimeball, quantity: 4},
                    {code: Items.FlyingWing, quantity: 3},
                ]);
            case Items.WisdomAmulet:
                return RecipeFactory.jewelrycrafting(Items.WisdomAmulet, 15, [
                    {code: Items.SprucePlank, quantity: 4},
                    {code: Items.GreenCloth, quantity: 3},
                    {code: Items.SerpentSkin, quantity: 3},
                    {code: Items.JasperCrystal, quantity: 1},
                ]);
            case Items.DreadfulAmulet:
                return RecipeFactory.jewelrycrafting(Items.DreadfulAmulet, 20, [
                    {code: Items.HardwoodPlank, quantity: 6},
                    {code: Items.OgreEye, quantity: 4},
                    {code: Items.PigSkin, quantity: 3},
                    {code: Items.FlyingWing, quantity: 2},
                ]);
            case Items.DreadfulRing:
                return RecipeFactory.jewelrycrafting(Items.DreadfulRing, 20, [
                    {code: Items.Steel, quantity: 7},
                    {code: Items.OgreEye, quantity: 4},
                    {code: Items.CyclopsEye, quantity: 3},
                    {code: Items.JasperCrystal, quantity: 1},
                ]);
            case Items.RingofChance:
                return RecipeFactory.jewelrycrafting(Items.RingofChance, 20, [
                    {code: Items.JasperCrystal, quantity: 1},
                    {code: Items.Steel, quantity: 6},
                    {code: Items.RedSlimeball, quantity: 2},
                    {code: Items.BlueSlimeball, quantity: 2},
                    {code: Items.PigSkin, quantity: 4},
                ]);
            case Items.SkullAmulet:
                return RecipeFactory.jewelrycrafting(Items.SkullAmulet, 20, [
                    {code: Items.HardwoodPlank, quantity: 7},
                    {code: Items.SkeletonSkull, quantity: 3},
                    {code: Items.Wolfhair, quantity: 3},
                    {code: Items.SerpentSkin, quantity: 2},
                ]);
            case Items.SkullRing:
                return RecipeFactory.jewelrycrafting(Items.SkullRing, 20, [
                    {code: Items.Steel, quantity: 4},
                    {code: Items.WolfBone, quantity: 4},
                    {code: Items.SkeletonSkull, quantity: 1},
                    {code: Items.JasperCrystal, quantity: 2},
                ]);
            case Items.SteelRing:
                return RecipeFactory.jewelrycrafting(Items.SteelRing, 20, [
                    {code: Items.Steel, quantity: 7},
                    {code: Items.SkeletonBone, quantity: 3},
                    {code: Items.Cowhide, quantity: 2},
                    {code: Items.SerpentSkin, quantity: 3},
                ]);
            case Items.EmeraldAmulet:
                return RecipeFactory.jewelrycrafting(Items.EmeraldAmulet, 25, [
                    {code: Items.HardwoodPlank, quantity: 8},
                    {code: Items.Emerald, quantity: 1},
                    {code: Items.Wolfhair, quantity: 5},
                    {code: Items.JasperCrystal, quantity: 2},
                ]);
            case Items.RubyAmulet:
                return RecipeFactory.jewelrycrafting(Items.RubyAmulet, 25, [
                    {code: Items.HardwoodPlank, quantity: 8},
                    {code: Items.Ruby, quantity: 1},
                    {code: Items.Wolfhair, quantity: 5},
                    {code: Items.JasperCrystal, quantity: 2},
                ]);
            case Items.SapphireAmulet:
                return RecipeFactory.jewelrycrafting(Items.SapphireAmulet, 25, [
                    {code: Items.HardwoodPlank, quantity: 8},
                    {code: Items.Sapphire, quantity: 1},
                    {code: Items.Wolfhair, quantity: 5},
                    {code: Items.JasperCrystal, quantity: 2},
                ]);
            case Items.TopazAmulet:
                return RecipeFactory.jewelrycrafting(Items.TopazAmulet, 25, [
                    {code: Items.HardwoodPlank, quantity: 8},
                    {code: Items.Topaz, quantity: 1},
                    {code: Items.Wolfhair, quantity: 5},
                    {code: Items.JasperCrystal, quantity: 2},
                ]);
            case Items.EmeraldRing:
                return RecipeFactory.jewelrycrafting(Items.EmeraldRing, 30, [
                    {code: Items.Gold, quantity: 8},
                    {code: Items.Obsidian, quantity: 4},
                    {code: Items.Emerald, quantity: 1},
                    {code: Items.VampireBlood, quantity: 5},
                    {code: Items.MagicalCure, quantity: 2},
                ]);
            case Items.GoldRing:
                return RecipeFactory.jewelrycrafting(Items.GoldRing, 30, [
                    {code: Items.Gold, quantity: 8},
                    {code: Items.DeadWoodPlank, quantity: 3},
                    {code: Items.WolfBone, quantity: 3},
                    {code: Items.VampireBlood, quantity: 3},
                    {code: Items.SkeletonBone, quantity: 3},
                ]);
            case Items.GreaterDreadfulAmulet:
                return RecipeFactory.jewelrycrafting(Items.GreaterDreadfulAmulet, 30, [
                    {code: Items.Gold, quantity: 8},
                    {code: Items.DreadfulAmulet, quantity: 1},
                    {code: Items.CyclopsEye, quantity: 4},
                    {code: Items.OgreEye, quantity: 4},
                    {code: Items.RedCloth, quantity: 3},
                ]);
            case Items.LostAmulet:
                return RecipeFactory.jewelrycrafting(Items.LostAmulet, 30, [
                    {code: Items.Gold, quantity: 8},
                    {code: Items.Obsidian, quantity: 4},
                    {code: Items.CyclopsEye, quantity: 4},
                    {code: Items.DemoniacDust, quantity: 3},
                    {code: Items.RedCloth, quantity: 3},
                ]);
            case Items.ProspectingAmulet:
                return RecipeFactory.jewelrycrafting(Items.ProspectingAmulet, 30, [
                    {code: Items.DeadWoodPlank, quantity: 4},
                    {code: Items.SpiderLeg, quantity: 3},
                    {code: Items.OgreSkin, quantity: 6},
                    {code: Items.OwlbearHair, quantity: 4},
                    {code: Items.MagicalCure, quantity: 1},
                ]);
            case Items.RoyalSkeletonRing:
                return RecipeFactory.jewelrycrafting(Items.RoyalSkeletonRing, 30, [
                    {code: Items.Gold, quantity: 8},
                    {code: Items.OwlbearClaw, quantity: 3},
                    {code: Items.VampireTooth, quantity: 3},
                    {code: Items.SpiderLeg, quantity: 2},
                    {code: Items.OgreSkin, quantity: 4},
                ]);
            case Items.RubyRing:
                return RecipeFactory.jewelrycrafting(Items.RubyRing, 30, [
                    {code: Items.Gold, quantity: 8},
                    {code: Items.Obsidian, quantity: 4},
                    {code: Items.Ruby, quantity: 1},
                    {code: Items.VampireBlood, quantity: 5},
                    {code: Items.MagicalCure, quantity: 2},
                ]);
            case Items.SapphireRing:
                return RecipeFactory.jewelrycrafting(Items.SapphireRing, 30, [
                    {code: Items.Gold, quantity: 8},
                    {code: Items.Obsidian, quantity: 4},
                    {code: Items.Sapphire, quantity: 1},
                    {code: Items.VampireBlood, quantity: 5},
                    {code: Items.MagicalCure, quantity: 2},
                ]);
            case Items.TopazRing:
                return RecipeFactory.jewelrycrafting(Items.TopazRing, 30, [
                    {code: Items.Gold, quantity: 8},
                    {code: Items.Obsidian, quantity: 4},
                    {code: Items.Topaz, quantity: 1},
                    {code: Items.VampireBlood, quantity: 5},
                    {code: Items.MagicalCure, quantity: 2},
                ]);
            case Items.AncestralTalisman:
                return RecipeFactory.jewelrycrafting(Items.AncestralTalisman, 35, [
                    {code: Items.MagicalPlank, quantity: 8},
                    {code: Items.Diamond, quantity: 1},
                    {code: Items.CursedBook, quantity: 4},
                    {code: Items.GoblinTooth, quantity: 5},
                    {code: Items.AstralyteCrystal, quantity: 2},
                ]);
            case Items.DiamondAmulet:
                return RecipeFactory.jewelrycrafting(Items.DiamondAmulet, 35, [
                    {code: Items.MagicalPlank, quantity: 8},
                    {code: Items.Diamond, quantity: 1},
                    {code: Items.Obsidian, quantity: 5},
                    {code: Items.CursedBook, quantity: 4},
                    {code: Items.MagicalCure, quantity: 2},
                ]);
            case Items.MagicStoneAmulet:
                return RecipeFactory.jewelrycrafting(Items.MagicStoneAmulet, 35, [
                    {code: Items.Strangold, quantity: 6},
                    {code: Items.MaleficCloth, quantity: 2},
                    {code: Items.MagicStone, quantity: 5},
                    {code: Items.LizardSkin, quantity: 5},
                    {code: Items.MagicalCure, quantity: 2},
                ]);
            case Items.MaleficRing:
                return RecipeFactory.jewelrycrafting(Items.MaleficRing, 35, [
                    {code: Items.Strangold, quantity: 8},
                    {code: Items.CursedPlank, quantity: 4},
                    {code: Items.Ruby, quantity: 2},
                    {code: Items.LizardEye, quantity: 2},
                    {code: Items.OwlbearClaw, quantity: 2},
                    {code: Items.AstralyteCrystal, quantity: 2},
                ]);
            case Items.MasterfulNecklace:
                return RecipeFactory.jewelrycrafting(Items.MasterfulNecklace, 35, [
                    {code: Items.Strangold, quantity: 6},
                    {code: Items.MaleficCloth, quantity: 2},
                    {code: Items.MagicStone, quantity: 5},
                    {code: Items.GoblinTooth, quantity: 5},
                    {code: Items.AstralyteCrystal, quantity: 2},
                ]);
            case Items.CelestRing:
                return RecipeFactory.jewelrycrafting(Items.CelestRing, 40, [
                    {code: Items.Strangold, quantity: 8},
                    {code: Items.MaplePlank, quantity: 4},
                    {code: Items.Ruby, quantity: 2},
                    {code: Items.Sapphire, quantity: 2},
                    {code: Items.EfreetCloth, quantity: 2},
                    {code: Items.AstralyteCrystal, quantity: 2},
                ]);
            case Items.DivinityRing:
                return RecipeFactory.jewelrycrafting(Items.DivinityRing, 40, [
                    {code: Items.Strangold, quantity: 8},
                    {code: Items.MaplePlank, quantity: 4},
                    {code: Items.Topaz, quantity: 2},
                    {code: Items.Sapphire, quantity: 2},
                    {code: Items.EfreetCloth, quantity: 2},
                    {code: Items.AstralyteCrystal, quantity: 2},
                ]);
            case Items.EternityRing:
                return RecipeFactory.jewelrycrafting(Items.EternityRing, 40, [
                    {code: Items.Strangold, quantity: 8},
                    {code: Items.MaplePlank, quantity: 4},
                    {code: Items.Topaz, quantity: 2},
                    {code: Items.Emerald, quantity: 2},
                    {code: Items.EfreetCloth, quantity: 2},
                    {code: Items.AstralyteCrystal, quantity: 2},
                ]);
            case Items.GreaterEmeraldAmulet:
                return RecipeFactory.jewelrycrafting(Items.GreaterEmeraldAmulet, 40, [
                    {code: Items.MaplePlank, quantity: 8},
                    {code: Items.EmeraldAmulet, quantity: 1},
                    {code: Items.Emerald, quantity: 2},
                    {code: Items.HellhoundBone, quantity: 6},
                    {code: Items.AstralyteCrystal, quantity: 2},
                ]);
            case Items.GreaterRubyAmulet:
                return RecipeFactory.jewelrycrafting(Items.GreaterRubyAmulet, 40, [
                    {code: Items.MaplePlank, quantity: 8},
                    {code: Items.RubyAmulet, quantity: 1},
                    {code: Items.Ruby, quantity: 2},
                    {code: Items.HellhoundBone, quantity: 6},
                    {code: Items.AstralyteCrystal, quantity: 2},
                ]);
            case Items.GreaterSapphireAmulet:
                return RecipeFactory.jewelrycrafting(Items.GreaterSapphireAmulet, 40, [
                    {code: Items.MaplePlank, quantity: 8},
                    {code: Items.SapphireAmulet, quantity: 1},
                    {code: Items.Sapphire, quantity: 2},
                    {code: Items.HellhoundBone, quantity: 6},
                    {code: Items.AstralyteCrystal, quantity: 2},
                ]);
            case Items.GreaterTopazAmulet:
                return RecipeFactory.jewelrycrafting(Items.GreaterTopazAmulet, 40, [
                    {code: Items.MaplePlank, quantity: 8},
                    {code: Items.TopazAmulet, quantity: 1},
                    {code: Items.Topaz, quantity: 2},
                    {code: Items.HellhoundBone, quantity: 6},
                    {code: Items.AstralyteCrystal, quantity: 2},
                ]);
            case Items.SacredRing:
                return RecipeFactory.jewelrycrafting(Items.SacredRing, 40, [
                    {code: Items.Strangold, quantity: 8},
                    {code: Items.MaplePlank, quantity: 4},
                    {code: Items.Ruby, quantity: 2},
                    {code: Items.Emerald, quantity: 2},
                    {code: Items.EfreetCloth, quantity: 2},
                    {code: Items.AstralyteCrystal, quantity: 2},
                ]);

            // ALCHEMY
            case Items.SmallHealthPotion:
                return RecipeFactory.alchemy(Items.SmallHealthPotion, 5, [
                    {code: Items.Sunflower, quantity: 3},
                ]);
            case Items.AirBoostPotion:
                return RecipeFactory.alchemy(Items.AirBoostPotion, 10, [
                    {code: Items.GreenSlimeball, quantity: 1},
                    {code: Items.Sunflower, quantity: 1},
                    {code: Items.Algae, quantity: 1},
                ]);
            case Items.EarthBoostPotion:
                return RecipeFactory.alchemy(Items.EarthBoostPotion, 10, [
                    {code: Items.YellowSlimeball, quantity: 1},
                    {code: Items.Sunflower, quantity: 1},
                    {code: Items.Algae, quantity: 1},
                ]);
            case Items.FireBoostPotion:
                return RecipeFactory.alchemy(Items.FireBoostPotion, 10, [
                    {code: Items.RedSlimeball, quantity: 1},
                    {code: Items.Sunflower, quantity: 1},
                    {code: Items.Algae, quantity: 1},
                ]);
            case Items.WaterBoostPotion:
                return RecipeFactory.alchemy(Items.WaterBoostPotion, 10, [
                    {code: Items.BlueSlimeball, quantity: 1},
                    {code: Items.Sunflower, quantity: 1},
                    {code: Items.Algae, quantity: 1},
                ]);
            case Items.MinorHealthPotion:
                return RecipeFactory.alchemy(Items.MinorHealthPotion, 20, [
                    {code: Items.NettleLeaf, quantity: 2},
                    {code: Items.Algae, quantity: 1},
                ]);
            case Items.SmallAntidote:
                return RecipeFactory.alchemy(Items.SmallAntidote, 20, [
                    {code: Items.MilkBucket, quantity: 1},
                    {code: Items.Sap, quantity: 1},
                    {code: Items.NettleLeaf, quantity: 1},
                ]);
            case Items.Antidote:
                return RecipeFactory.alchemy(Items.Antidote, 30, [
                    {code: Items.Strangold, quantity: 2},
                    {code: Items.MapleSap, quantity: 1},
                    {code: Items.GlowstemLeaf, quantity: 1},
                ]);
            case Items.HealthPotion:
                return RecipeFactory.alchemy(Items.HealthPotion, 30, [
                    {code: Items.NettleLeaf, quantity: 2},
                    {code: Items.Sunflower, quantity: 1},
                    {code: Items.Sap, quantity: 1},
                ]);
            case Items.GreaterHealthPotion:
                return RecipeFactory.alchemy(Items.GreaterHealthPotion, 35, [
                    {code: Items.GlowstemLeaf, quantity: 2},
                    {code: Items.Egg, quantity: 1},
                    {code: Items.Algae, quantity: 1},
                ]);
            case Items.AirResPotion:
                return RecipeFactory.alchemy(Items.AirResPotion, 40, [
                    {code: Items.GreenSlimeball, quantity: 2},
                    {code: Items.MapleSap, quantity: 1},
                    {code: Items.GlowstemLeaf, quantity: 1},
                ]);
            case Items.EarthResPotion:
                return RecipeFactory.alchemy(Items.EarthResPotion, 40, [
                    {code: Items.YellowSlimeball, quantity: 2},
                    {code: Items.MapleSap, quantity: 1},
                    {code: Items.GlowstemLeaf, quantity: 1},
                ]);
            case Items.EnchantedBoostPotion:
                return RecipeFactory.alchemy(Items.EnchantedBoostPotion, 40, [
                    {code: Items.GlowstemLeaf, quantity: 2},
                    {code: Items.BatWing, quantity: 1},
                    {code: Items.MagicSap, quantity: 1},
                ]);
            case Items.EnchantedHealthPotion:
                return RecipeFactory.alchemy(Items.EnchantedHealthPotion, 40, [
                    {code: Items.GlowstemLeaf, quantity: 2},
                    {code: Items.Sunflower, quantity: 1},
                    {code: Items.MagicSap, quantity: 1},
                ]);
            case Items.FireResPotion:
                return RecipeFactory.alchemy(Items.FireResPotion, 40, [
                    {code: Items.RedSlimeball, quantity: 2},
                    {code: Items.MapleSap, quantity: 1},
                    {code: Items.GlowstemLeaf, quantity: 1},
                ]);
            case Items.HealthBoostPotion:
                return RecipeFactory.alchemy(Items.HealthBoostPotion, 40, [
                    {code: Items.Shrimp, quantity: 1},
                    {code: Items.Sap, quantity: 1},
                    {code: Items.NettleLeaf, quantity: 2},
                ]);
            case Items.WaterResPotion:
                return RecipeFactory.alchemy(Items.WaterResPotion, 40, [
                    {code: Items.BlueSlimeball, quantity: 2},
                    {code: Items.MapleSap, quantity: 1},
                    {code: Items.GlowstemLeaf, quantity: 1},
                ]);

            // COOKING
            case Items.CookedChicken:
                return RecipeFactory.cooking(Items.CookedChicken, 1, [
                    {code: Items.RawChicken, quantity: 1},
                ]);
            case Items.CookedGudgeon:
                return RecipeFactory.cooking(Items.CookedGudgeon, 1, [
                    {code: Items.Gudgeon, quantity: 1},
                ]);
            case Items.CookedBeef:
                return RecipeFactory.cooking(Items.CookedBeef, 5, [
                    {code: Items.RawBeef, quantity: 1},
                ]);
            case Items.FriedEggs:
                return RecipeFactory.cooking(Items.FriedEggs, 5, [
                    {code: Items.Egg, quantity: 2},
                ]);
            case Items.Cheese:
                return RecipeFactory.cooking(Items.Cheese, 10, [
                    {code: Items.MilkBucket, quantity: 1},
                ]);
            case Items.CookedShrimp:
                return RecipeFactory.cooking(Items.CookedShrimp, 10, [
                    {code: Items.Shrimp, quantity: 1},
                ]);
            case Items.CookedWolfMeat:
                return RecipeFactory.cooking(Items.CookedWolfMeat, 15, [
                    {code: Items.RawWolfMeat, quantity: 1},
                ]);
            case Items.MushroomSoup:
                return RecipeFactory.cooking(Items.MushroomSoup, 15, [
                    {code: Items.Mushroom, quantity: 2},
                ]);
            case Items.ApplePie:
                return RecipeFactory.cooking(Items.ApplePie, 20, [
                    {code: Items.Apple, quantity: 2},
                    {code: Items.Egg, quantity: 1},
                ]);
            case Items.CookedTrout:
                return RecipeFactory.cooking(Items.CookedTrout, 20, [
                    {code: Items.Trout, quantity: 1},
                ]);
            case Items.CookedBass:
                return RecipeFactory.cooking(Items.CookedBass, 30, [
                    {code: Items.Bass, quantity: 1},
                ]);
            case Items.CookedHellhoundMeat:
                return RecipeFactory.cooking(Items.CookedHellhoundMeat, 40, [
                    {code: Items.RawHellhoundMeat, quantity: 1},
                ]);
            case Items.CookedSalmon:
                return RecipeFactory.cooking(Items.CookedSalmon, 40, [
                    {code: Items.Salmon, quantity: 1},
                ]);
            case Items.FishSoup:
                return RecipeFactory.cooking(Items.FishSoup, 40, [
                    {code: Items.MilkBucket, quantity: 1},
                    {code: Items.Salmon, quantity: 1},
                    {code: Items.Trout, quantity: 1},
                ]);
            case Items.MapleSyrup:
                return RecipeFactory.cooking(Items.MapleSyrup, 40, [
                    {code: Items.MapleSap, quantity: 2},
                ]);

            // WOODCUTTING
            case Items.AshPlank:
                return RecipeFactory.woodcutting(Items.AshPlank, 1, [
                    {code: Items.AshWood, quantity: 10},
                ]);
            case Items.SprucePlank:
                return RecipeFactory.woodcutting(Items.SprucePlank, 10, [
                    {code: Items.SpruceWood, quantity: 10},
                ]);
            case Items.HardwoodPlank:
                return RecipeFactory.woodcutting(Items.HardwoodPlank, 20, [
                    {code: Items.AshWood, quantity: 4},
                    {code: Items.BirchWood, quantity: 6},
                ]);
            case Items.DeadWoodPlank:
                return RecipeFactory.woodcutting(Items.DeadWoodPlank, 30, [
                    {code: Items.DeadWood, quantity: 10},
                ]);
            case Items.Sap:
                return RecipeFactory.woodcutting(Items.Sap, 30, [
                    {code: Items.AshWood, quantity: 5},
                    {code: Items.SpruceWood, quantity: 5},
                    {code: Items.DeadWood, quantity: 5},
                ]);
            case Items.CursedPlank:
                return RecipeFactory.woodcutting(Items.CursedPlank, 35, [
                    {code: Items.CursedWood, quantity: 10},
                ]);
            case Items.MagicSap:
                return RecipeFactory.woodcutting(Items.MagicSap, 35, [
                    {code: Items.MagicWood, quantity: 15},
                ]);
            case Items.MagicalPlank:
                return RecipeFactory.woodcutting(Items.MagicalPlank, 35, [
                    {code: Items.DeadWood, quantity: 4},
                    {code: Items.MagicWood, quantity: 6},
                ]);
            case Items.MaplePlank:
                return RecipeFactory.woodcutting(Items.MaplePlank, 40, [
                    {code: Items.MapleWood, quantity: 10},
                ]);
            case Items.MapleSap:
                return RecipeFactory.woodcutting(Items.MapleSap, 40, [
                    {code: Items.MapleWood, quantity: 15},
                ]);

            // WEAPONCRAFTING
            case Items.CopperDagger:
                return RecipeFactory.weaponcrafting(Items.CopperDagger, 1, [
                    {code: Items.Copper, quantity: 6},
                ]);
            case Items.WoodenStaff:
                return RecipeFactory.weaponcrafting(Items.WoodenStaff, 1, [
                    {code: Items.WoodenStick, quantity: 1},
                    {code: Items.AshWood, quantity: 4},
                ]);
            case Items.FireStaff:
                return RecipeFactory.weaponcrafting(Items.FireStaff, 5, [
                    {code: Items.RedSlimeball, quantity: 2},
                    {code: Items.AshPlank, quantity: 5},
                ]);
            case Items.StickyDagger:
                return RecipeFactory.weaponcrafting(Items.StickyDagger, 5, [
                    {code: Items.Copper, quantity: 5},
                    {code: Items.GreenSlimeball, quantity: 2},
                ]);
            case Items.StickySword:
                return RecipeFactory.weaponcrafting(Items.StickySword, 5, [
                    {code: Items.YellowSlimeball, quantity: 2},
                    {code: Items.Copper, quantity: 5},
                ]);
            case Items.WaterBow:
                return RecipeFactory.weaponcrafting(Items.WaterBow, 5, [
                    {code: Items.BlueSlimeball, quantity: 2},
                    {code: Items.AshPlank, quantity: 5},
                ]);
            case Items.FireBow:
                return RecipeFactory.weaponcrafting(Items.FireBow, 10, [
                    {code: Items.SprucePlank, quantity: 6},
                    {code: Items.RedSlimeball, quantity: 2},
                ]);
            case Items.GreaterWoodenStaff:
                return RecipeFactory.weaponcrafting(Items.GreaterWoodenStaff, 10, [
                    {code: Items.SprucePlank, quantity: 6},
                    {code: Items.BlueSlimeball, quantity: 2},
                ]);
            case Items.IronAxe:
                return RecipeFactory.weaponcrafting(Items.IronAxe, 10, [
                    {code: Items.SprucePlank, quantity: 2},
                    {code: Items.Iron, quantity: 8},
                    {code: Items.JasperCrystal, quantity: 1},
                ]);
            case Items.IronDagger:
                return RecipeFactory.weaponcrafting(Items.IronDagger, 10, [
                    {code: Items.Iron, quantity: 6},
                    {code: Items.Feather, quantity: 2},
                ]);
            case Items.IronPickaxe:
                return RecipeFactory.weaponcrafting(Items.IronPickaxe, 10, [
                    {code: Items.SprucePlank, quantity: 2},
                    {code: Items.Iron, quantity: 8},
                    {code: Items.JasperCrystal, quantity: 1},
                ]);
            case Items.IronSword:
                return RecipeFactory.weaponcrafting(Items.IronSword, 10, [
                    {code: Items.Iron, quantity: 6},
                    {code: Items.Feather, quantity: 2},
                ]);
            case Items.LeatherGloves:
                return RecipeFactory.weaponcrafting(Items.LeatherGloves, 10, [
                    {code: Items.AshPlank, quantity: 2},
                    {code: Items.Cowhide, quantity: 8},
                    {code: Items.JasperCrystal, quantity: 1},
                ]);
            case Items.SpruceFishingRod:
                return RecipeFactory.weaponcrafting(Items.SpruceFishingRod, 10, [
                    {code: Items.SprucePlank, quantity: 8},
                    {code: Items.Iron, quantity: 2},
                    {code: Items.JasperCrystal, quantity: 1},
                ]);
            case Items.MultislimesSword:
                return RecipeFactory.weaponcrafting(Items.MultislimesSword, 15, [
                    {code: Items.Iron, quantity: 5},
                    {code: Items.RedSlimeball, quantity: 2},
                    {code: Items.BlueSlimeball, quantity: 2},
                    {code: Items.YellowSlimeball, quantity: 2},
                    {code: Items.GreenSlimeball, quantity: 2},
                    {code: Items.JasperCrystal, quantity: 1},
                ]);
            case Items.MushmushBow:
                return RecipeFactory.weaponcrafting(Items.MushmushBow, 15, [
                    {code: Items.SprucePlank, quantity: 5},
                    {code: Items.Wolfhair, quantity: 2},
                    {code: Items.Mushroom, quantity: 4},
                    {code: Items.JasperCrystal, quantity: 1},
                ]);
            case Items.Mushstaff:
                return RecipeFactory.weaponcrafting(Items.Mushstaff, 15, [
                    {code: Items.SprucePlank, quantity: 5},
                    {code: Items.Mushroom, quantity: 4},
                    {code: Items.GreenCloth, quantity: 2},
                    {code: Items.JasperCrystal, quantity: 1},
                ]);
            case Items.Battlestaff:
                return RecipeFactory.weaponcrafting(Items.Battlestaff, 20, [
                    {code: Items.HardwoodPlank, quantity: 6},
                    {code: Items.Steel, quantity: 4},
                    {code: Items.WolfBone, quantity: 3},
                    {code: Items.BlueSlimeball, quantity: 5},
                ]);
            case Items.ForestWhip:
                return RecipeFactory.weaponcrafting(Items.ForestWhip, 20, [
                    {code: Items.GreenSlimeball, quantity: 2},
                    {code: Items.Wolfhair, quantity: 5},
                    {code: Items.OgreEye, quantity: 4},
                    {code: Items.HardwoodPlank, quantity: 4},
                ]);
            case Items.HuntingBow:
                return RecipeFactory.weaponcrafting(Items.HuntingBow, 20, [
                    {code: Items.HardwoodPlank, quantity: 5},
                    {code: Items.GreenCloth, quantity: 4},
                    {code: Items.OgreSkin, quantity: 3},
                    {code: Items.PigSkin, quantity: 3},
                ]);
            case Items.SkullStaff:
                return RecipeFactory.weaponcrafting(Items.SkullStaff, 20, [
                    {code: Items.SkeletonSkull, quantity: 1},
                    {code: Items.SkeletonBone, quantity: 4},
                    {code: Items.Steel, quantity: 5},
                    {code: Items.HardwoodPlank, quantity: 5},
                ]);
            case Items.SteelBattleaxe:
                return RecipeFactory.weaponcrafting(Items.SteelBattleaxe, 20, [
                    {code: Items.Steel, quantity: 4},
                    {code: Items.HardwoodPlank, quantity: 4},
                    {code: Items.SkeletonBone, quantity: 4},
                    {code: Items.Wolfhair, quantity: 4},
                ]);
            case Items.DreadfulStaff:
                return RecipeFactory.weaponcrafting(Items.DreadfulStaff, 25, [
                    {code: Items.CyclopsEye, quantity: 4},
                    {code: Items.VampireBlood, quantity: 5},
                    {code: Items.HardwoodPlank, quantity: 6},
                    {code: Items.JasperCrystal, quantity: 1},
                ]);
            case Items.SkullWand:
                return RecipeFactory.weaponcrafting(Items.SkullWand, 25, [
                    {code: Items.HardwoodPlank, quantity: 4},
                    {code: Items.SkeletonSkull, quantity: 3},
                    {code: Items.VampireTooth, quantity: 2},
                    {code: Items.SpiderLeg, quantity: 3},
                    {code: Items.JasperCrystal, quantity: 1},
                ]);
            case Items.VampireBow:
                return RecipeFactory.weaponcrafting(Items.VampireBow, 25, [
                    {code: Items.Steel, quantity: 4},
                    {code: Items.VampireBlood, quantity: 4},
                    {code: Items.SpiderLeg, quantity: 4},
                    {code: Items.LizardEye, quantity: 2},
                    {code: Items.MagicalCure, quantity: 1},
                ]);
            case Items.ElderwoodStaff:
                return RecipeFactory.weaponcrafting(Items.ElderwoodStaff, 30, [
                    {code: Items.DeadWoodPlank, quantity: 5},
                    {code: Items.LizardSkin, quantity: 4},
                    {code: Items.CyclopsEye, quantity: 5},
                    {code: Items.RedCloth, quantity: 3},
                    {code: Items.SkeletonSkull, quantity: 3},
                ]);
            case Items.EnchantedBow:
                return RecipeFactory.weaponcrafting(Items.EnchantedBow, 30, [
                    {code: Items.Gold, quantity: 8},
                    {code: Items.SpiderLeg, quantity: 3},
                    {code: Items.DemonHorn, quantity: 2},
                    {code: Items.OgreEye, quantity: 4},
                    {code: Items.RedCloth, quantity: 3},
                ]);
            case Items.GoldAxe:
                return RecipeFactory.weaponcrafting(Items.GoldAxe, 30, [
                    {code: Items.DeadWoodPlank, quantity: 2},
                    {code: Items.Gold, quantity: 7},
                    {code: Items.Ruby, quantity: 1},
                    {code: Items.MagicalCure, quantity: 2},
                    {code: Items.RedCloth, quantity: 3},
                ]);
            case Items.GoldFishingRod:
                return RecipeFactory.weaponcrafting(Items.GoldFishingRod, 30, [
                    {code: Items.DeadWoodPlank, quantity: 2},
                    {code: Items.Gold, quantity: 7},
                    {code: Items.Sapphire, quantity: 1},
                    {code: Items.MagicalCure, quantity: 2},
                    {code: Items.OwlbearClaw, quantity: 3},
                ]);
            case Items.GoldPickaxe:
                return RecipeFactory.weaponcrafting(Items.GoldPickaxe, 30, [
                    {code: Items.DeadWoodPlank, quantity: 2},
                    {code: Items.Gold, quantity: 7},
                    {code: Items.Topaz, quantity: 1},
                    {code: Items.MagicalCure, quantity: 2},
                    {code: Items.DemonHorn, quantity: 2},
                ]);
            case Items.GoldSword:
                return RecipeFactory.weaponcrafting(Items.GoldSword, 30, [
                    {code: Items.Gold, quantity: 8},
                    {code: Items.VampireBlood, quantity: 4},
                    {code: Items.RedCloth, quantity: 3},
                    {code: Items.DemonHorn, quantity: 2},
                    {code: Items.DeadWoodPlank, quantity: 3},
                ]);
            case Items.GoldenGloves:
                return RecipeFactory.weaponcrafting(Items.GoldenGloves, 30, [
                    {code: Items.DeadWoodPlank, quantity: 7},
                    {code: Items.Obsidian, quantity: 2},
                    {code: Items.Emerald, quantity: 1},
                    {code: Items.MagicalCure, quantity: 2},
                    {code: Items.DemoniacDust, quantity: 3},
                ]);
            case Items.GreaterDreadfulStaff:
                return RecipeFactory.weaponcrafting(Items.GreaterDreadfulStaff, 30, [
                    {code: Items.DeadWoodPlank, quantity: 5},
                    {code: Items.DreadfulStaff, quantity: 1},
                    {code: Items.OgreEye, quantity: 4},
                    {code: Items.CyclopsEye, quantity: 5},
                    {code: Items.RedCloth, quantity: 3},
                ]);
            case Items.ObsidianBattleaxe:
                return RecipeFactory.weaponcrafting(Items.ObsidianBattleaxe, 30, [
                    {code: Items.Obsidian, quantity: 7},
                    {code: Items.DeadWoodPlank, quantity: 4},
                    {code: Items.LizardSkin, quantity: 3},
                    {code: Items.CyclopsEye, quantity: 3},
                    {code: Items.DemoniacDust, quantity: 3},
                ]);
            case Items.CursedSceptre:
                return RecipeFactory.weaponcrafting(Items.CursedSceptre, 35, [
                    {code: Items.MagicalPlank, quantity: 8},
                    {code: Items.CursedBook, quantity: 3},
                    {code: Items.MagicStone, quantity: 3},
                    {code: Items.MaleficCloth, quantity: 3},
                    {code: Items.Diamond, quantity: 1},
                    {code: Items.MagicalCure, quantity: 2},
                ]);
            case Items.DiamondSword:
                return RecipeFactory.weaponcrafting(Items.DiamondSword, 35, [
                    {code: Items.MagicalPlank, quantity: 7},
                    {code: Items.GoblinEye, quantity: 3},
                    {code: Items.SpiderLeg, quantity: 3},
                    {code: Items.MagicStone, quantity: 3},
                    {code: Items.Diamond, quantity: 1},
                    {code: Items.MagicalCure, quantity: 2},
                ]);
            case Items.DreadfulBattleaxe:
                return RecipeFactory.weaponcrafting(Items.DreadfulBattleaxe, 35, [
                    {code: Items.MagicalPlank, quantity: 7},
                    {code: Items.LizardEye, quantity: 4},
                    {code: Items.GoblinEye, quantity: 3},
                    {code: Items.GoblinTooth, quantity: 3},
                    {code: Items.JasperCrystal, quantity: 3},
                ]);
            case Items.MagicBow:
                return RecipeFactory.weaponcrafting(Items.MagicBow, 35, [
                    {code: Items.MagicalPlank, quantity: 7},
                    {code: Items.MagicStone, quantity: 3},
                    {code: Items.LizardSkin, quantity: 3},
                    {code: Items.Wolfhair, quantity: 3},
                    {code: Items.Sapphire, quantity: 1},
                    {code: Items.MagicalCure, quantity: 2},
                ]);
            case Items.StrangoldSword:
                return RecipeFactory.weaponcrafting(Items.StrangoldSword, 35, [
                    {code: Items.Strangold, quantity: 7},
                    {code: Items.GoblinTooth, quantity: 3},
                    {code: Items.DemoniacDust, quantity: 3},
                    {code: Items.MagicStone, quantity: 4},
                    {code: Items.MagicalCure, quantity: 2},
                ]);
            case Items.BladeofHell:
                return RecipeFactory.weaponcrafting(Items.BladeofHell, 40, [
                    {code: Items.Strangold, quantity: 9},
                    {code: Items.EfreetCloth, quantity: 3},
                    {code: Items.BrokenSword, quantity: 1},
                    {code: Items.BookfromHell, quantity: 1},
                    {code: Items.OrcSkin, quantity: 6},
                ]);
            case Items.Bloodblade:
                return RecipeFactory.weaponcrafting(Items.Bloodblade, 40, [
                    {code: Items.Mithril, quantity: 8},
                    {code: Items.GoblinTooth, quantity: 5},
                    {code: Items.WolfriderHair, quantity: 4},
                    {code: Items.BrokenSword, quantity: 1},
                    {code: Items.AstralyteCrystal, quantity: 2},
                ]);
            case Items.BowfromHell:
                return RecipeFactory.weaponcrafting(Items.BowfromHell, 40, [
                    {code: Items.MagicalPlank, quantity: 8},
                    {code: Items.EfreetCloth, quantity: 3},
                    {code: Items.DemonHorn, quantity: 3},
                    {code: Items.BookfromHell, quantity: 1},
                    {code: Items.DemoniacDust, quantity: 4},
                ]);
            case Items.DemoniacDagger:
                return RecipeFactory.weaponcrafting(Items.DemoniacDagger, 40, [
                    {code: Items.Strangold, quantity: 8},
                    {code: Items.EfreetCloth, quantity: 3},
                    {code: Items.Obsidian, quantity: 4},
                    {code: Items.BookfromHell, quantity: 1},
                    {code: Items.CursedBook, quantity: 4},
                ]);
            case Items.HellStaff:
                return RecipeFactory.weaponcrafting(Items.HellStaff, 40, [
                    {code: Items.CursedPlank, quantity: 8},
                    {code: Items.EfreetCloth, quantity: 3},
                    {code: Items.Obsidian, quantity: 4},
                    {code: Items.BookfromHell, quantity: 1},
                    {code: Items.DemoniacDust, quantity: 4},
                ]);
            case Items.LightningSword:
                return RecipeFactory.weaponcrafting(Items.LightningSword, 40, [
                    {code: Items.MaplePlank, quantity: 7},
                    {code: Items.GoblinEye, quantity: 5},
                    {code: Items.HellhoundHair, quantity: 4},
                    {code: Items.BrokenSword, quantity: 1},
                    {code: Items.MagicalCure, quantity: 3},
                ]);
            case Items.MithrilSword:
                return RecipeFactory.weaponcrafting(Items.MithrilSword, 40, [
                    {code: Items.Mithril, quantity: 7},
                    {code: Items.MagicStone, quantity: 3},
                    {code: Items.BatWing, quantity: 4},
                    {code: Items.WolfriderHair, quantity: 3},
                    {code: Items.BrokenSword, quantity: 1},
                    {code: Items.AstralyteCrystal, quantity: 2},
                ]);
            case Items.Wrathsword:
                return RecipeFactory.weaponcrafting(Items.Wrathsword, 40, [
                    {code: Items.Mithril, quantity: 7},
                    {code: Items.OrcSkin, quantity: 5},
                    {code: Items.BatWing, quantity: 4},
                    {code: Items.BrokenSword, quantity: 1},
                    {code: Items.MagicalCure, quantity: 3},
                ]);

            // MINING
            case Items.Copper:
                return RecipeFactory.mining(Items.Copper, 1, [
                    {code: Items.CopperOre, quantity: 10},
                ]);
            case Items.Iron:
                return RecipeFactory.mining(Items.Iron, 10, [
                    {code: Items.IronOre, quantity: 10},
                ]);
            case Items.Emerald:
                return RecipeFactory.mining(Items.Emerald, 20, [
                    {code: Items.EmeraldStone, quantity: 10},
                ]);
            case Items.Ruby:
                return RecipeFactory.mining(Items.Ruby, 20, [
                    {code: Items.RubyStone, quantity: 10},
                ]);
            case Items.Sapphire:
                return RecipeFactory.mining(Items.Sapphire, 20, [
                    {code: Items.SapphireStone, quantity: 10},
                ]);
            case Items.Steel:
                return RecipeFactory.mining(Items.Steel, 20, [
                    {code: Items.IronOre, quantity: 3},
                    {code: Items.Coal, quantity: 7},
                ]);
            case Items.Topaz:
                return RecipeFactory.mining(Items.Topaz, 20, [
                    {code: Items.TopazStone, quantity: 10},
                ]);
            case Items.Gold:
                return RecipeFactory.mining(Items.Gold, 30, [
                    {code: Items.GoldOre, quantity: 10},
                ]);
            case Items.Obsidian:
                return RecipeFactory.mining(Items.Obsidian, 30, [
                    {code: Items.PieceofObsidian, quantity: 4},
                ]);
            case Items.Diamond:
                return RecipeFactory.mining(Items.Diamond, 35, [
                    {code: Items.DiamondStone, quantity: 10},
                ]);
            case Items.Strangold:
                return RecipeFactory.mining(Items.Strangold, 35, [
                    {code: Items.GoldOre, quantity: 4},
                    {code: Items.StrangeOre, quantity: 6},
                ]);
            case Items.Mithril:
                return RecipeFactory.mining(Items.Mithril, 40, [
                    {code: Items.MithrilOre, quantity: 10},
                ]);


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
