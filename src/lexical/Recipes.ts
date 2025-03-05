import {Skills} from "./Skills.js";
import {Items} from "./Items.js";


export interface ResourceItem {
    code: Items,
    quantity: number,
}

export interface Recipe {
    skill: Skills,
    level: number,
    items: ResourceItem[],
}

export class Recipes {
    static getFor(item: Items): Recipe {
        switch (item) {
            // GEARCRAFTING
            case Items.CopperBoots:
                return RecipeFactory.gearcrafting(1, [
                    {code: Items.Copper, quantity: 8},
                ]);
            case Items.CopperHelmet:
                return RecipeFactory.gearcrafting(1, [
                    {code: Items.Copper, quantity: 6},
                ]);
            case Items.WoodenShield:
                return RecipeFactory.gearcrafting(1, [
                    {code: Items.AshPlank, quantity: 6},
                ]);
            case Items.CopperArmor:
                return RecipeFactory.gearcrafting(5, [
                    {code: Items.Copper, quantity: 5},
                    {code: Items.Feather, quantity: 2},
                ]);
            case Items.CopperLegsArmor:
                return RecipeFactory.gearcrafting(5, [
                    {code: Items.Copper, quantity: 5},
                    {code: Items.Feather, quantity: 2},
                ]);
            case Items.FeatherCoat:
                return RecipeFactory.gearcrafting(5, [
                    {code: Items.Feather, quantity: 5},
                    {code: Items.AshPlank, quantity: 2},
                ]);
            case Items.Satchel:
                return RecipeFactory.gearcrafting(5, [
                    {code: Items.Cowhide, quantity: 5},
                    {code: Items.Feather, quantity: 2},
                    {code: Items.JasperCrystal, quantity: 1},
                ]);
            case Items.AdventurerHelmet:
                return RecipeFactory.gearcrafting(10, [
                    {code: Items.Feather, quantity: 4},
                    {code: Items.Cowhide, quantity: 3},
                    {code: Items.SprucePlank, quantity: 3},
                    {code: Items.Mushroom, quantity: 4},
                ]);
            case Items.AdventurerVest:
                return RecipeFactory.gearcrafting(10, [
                    {code: Items.Feather, quantity: 2},
                    {code: Items.Cowhide, quantity: 6},
                    {code: Items.SprucePlank, quantity: 4},
                    {code: Items.YellowSlimeball, quantity: 4},
                ]);
            case Items.IronArmor:
                return RecipeFactory.gearcrafting(10, [
                    {code: Items.Iron, quantity: 5},
                    {code: Items.Cowhide, quantity: 3},
                ]);
            case Items.IronBoots:
                return RecipeFactory.gearcrafting(10, [
                    {code: Items.Iron, quantity: 5},
                    {code: Items.Feather, quantity: 3},
                ]);
            case Items.IronHelm:
                return RecipeFactory.gearcrafting(10, [
                    {code: Items.Iron, quantity: 5},
                    {code: Items.Feather, quantity: 3},
                ]);
            case Items.IronLegsArmor:
                return RecipeFactory.gearcrafting(10, [
                    {code: Items.Iron, quantity: 5},
                    {code: Items.Cowhide, quantity: 3},
                ]);
            case Items.LeatherArmor:
                return RecipeFactory.gearcrafting(10, [
                    {code: Items.SprucePlank, quantity: 4},
                    {code: Items.Cowhide, quantity: 4},
                ]);
            case Items.LeatherBoots:
                return RecipeFactory.gearcrafting(10, [
                    {code: Items.AshPlank, quantity: 4},
                    {code: Items.Cowhide, quantity: 4},
                ]);
            case Items.LeatherHat:
                return RecipeFactory.gearcrafting(10, [
                    {code: Items.Cowhide, quantity: 5},
                    {code: Items.YellowSlimeball, quantity: 3},
                ]);
            case Items.LeatherLegsArmor:
                return RecipeFactory.gearcrafting(10, [
                    {code: Items.SprucePlank, quantity: 5},
                    {code: Items.Cowhide, quantity: 3},
                ]);
            case Items.SlimeShield:
                return RecipeFactory.gearcrafting(10, [
                    {code: Items.SprucePlank, quantity: 6},
                    {code: Items.RedSlimeball, quantity: 3},
                    {code: Items.YellowSlimeball, quantity: 3},
                    {code: Items.GreenSlimeball, quantity: 3},
                    {code: Items.BlueSlimeball, quantity: 3},
                ]);
            case Items.AdventurerBoots:
                return RecipeFactory.gearcrafting(15, [
                    {code: Items.Cowhide, quantity: 6},
                    {code: Items.Wolfhair, quantity: 4},
                    {code: Items.Mushroom, quantity: 3},
                    {code: Items.SprucePlank, quantity: 2},
                ]);
            case Items.AdventurerPants:
                return RecipeFactory.gearcrafting(15, [
                    {code: Items.AshPlank, quantity: 2},
                    {code: Items.Cowhide, quantity: 8},
                    {code: Items.GreenCloth, quantity: 2},
                ]);
            case Items.LuckyWizardHat:
                return RecipeFactory.gearcrafting(15, [
                    {code: Items.GreenCloth, quantity: 5},
                    {code: Items.FlyingWing, quantity: 4},
                    {code: Items.GreenSlimeball, quantity: 5},
                    {code: Items.JasperCrystal, quantity: 1},
                ]);
            case Items.MushmushJacket:
                return RecipeFactory.gearcrafting(15, [
                    {code: Items.Cowhide, quantity: 4},
                    {code: Items.FlyingWing, quantity: 4},
                    {code: Items.Mushroom, quantity: 6},
                    {code: Items.JasperCrystal, quantity: 1},
                ]);
            case Items.MushmushWizardHat:
                return RecipeFactory.gearcrafting(15, [
                    {code: Items.Cowhide, quantity: 3},
                    {code: Items.Wolfhair, quantity: 3},
                    {code: Items.Mushroom, quantity: 5},
                    {code: Items.JasperCrystal, quantity: 1},
                ]);
            case Items.MagicWizardHat:
                return RecipeFactory.gearcrafting(20, [
                    {code: Items.OgreSkin, quantity: 2},
                    {code: Items.Wolfhair, quantity: 4},
                    {code: Items.BlueSlimeball, quantity: 10},
                    {code: Items.HardwoodPlank, quantity: 2},
                ]);
            case Items.SerpentSkinBoots:
                return RecipeFactory.gearcrafting(20, [
                    {code: Items.HardwoodPlank, quantity: 6},
                    {code: Items.SpiderLeg, quantity: 3},
                    {code: Items.SerpentSkin, quantity: 4},
                    {code: Items.GreenCloth, quantity: 2},
                ]);
            case Items.SkeletonArmor:
                return RecipeFactory.gearcrafting(20, [
                    {code: Items.SkeletonBone, quantity: 6},
                    {code: Items.WolfBone, quantity: 3},
                    {code: Items.PigSkin, quantity: 2},
                    {code: Items.Steel, quantity: 4},
                ]);
            case Items.SkeletonHelmet:
                return RecipeFactory.gearcrafting(20, [
                    {code: Items.SkeletonSkull, quantity: 1},
                    {code: Items.SkeletonBone, quantity: 3},
                    {code: Items.WolfBone, quantity: 2},
                    {code: Items.Iron, quantity: 7},
                ]);
            case Items.SkeletonPants:
                return RecipeFactory.gearcrafting(20, [
                    {code: Items.WolfBone, quantity: 3},
                    {code: Items.SkeletonBone, quantity: 3},
                    {code: Items.Wolfhair, quantity: 2},
                    {code: Items.AshPlank, quantity: 7},
                ]);
            case Items.SteelArmor:
                return RecipeFactory.gearcrafting(20, [
                    {code: Items.Steel, quantity: 7},
                    {code: Items.GreenCloth, quantity: 2},
                    {code: Items.PigSkin, quantity: 4},
                    {code: Items.SpiderLeg, quantity: 2},
                ]);
            case Items.SteelBoots:
                return RecipeFactory.gearcrafting(20, [
                    {code: Items.HardwoodPlank, quantity: 3},
                    {code: Items.Steel, quantity: 6},
                    {code: Items.OgreEye, quantity: 4},
                    {code: Items.OgreSkin, quantity: 2},
                ]);
            case Items.SteelHelm:
                return RecipeFactory.gearcrafting(20, [
                    {code: Items.Steel, quantity: 8},
                    {code: Items.OgreSkin, quantity: 3},
                    {code: Items.WolfBone, quantity: 2},
                    {code: Items.FlyingWing, quantity: 3},
                ]);
            case Items.SteelLegsArmor:
                return RecipeFactory.gearcrafting(20, [
                    {code: Items.Steel, quantity: 7},
                    {code: Items.SkeletonSkull, quantity: 2},
                    {code: Items.Feather, quantity: 4},
                    {code: Items.PigSkin, quantity: 2},
                ]);
            case Items.SteelShield:
                return RecipeFactory.gearcrafting(20, [
                    {code: Items.Steel, quantity: 6},
                    {code: Items.SerpentSkin, quantity: 4},
                    {code: Items.WolfBone, quantity: 3},
                    {code: Items.OgreEye, quantity: 2},
                ]);
            case Items.TromatisingMask:
                return RecipeFactory.gearcrafting(20, [
                    {code: Items.Steel, quantity: 7},
                    {code: Items.PigSkin, quantity: 3},
                    {code: Items.FlyingWing, quantity: 2},
                    {code: Items.SkeletonBone, quantity: 3},
                ]);
            case Items.LizardSkinArmor:
                return RecipeFactory.gearcrafting(25, [
                    {code: Items.LizardSkin, quantity: 5},
                    {code: Items.DeadWoodPlank, quantity: 5},
                    {code: Items.OgreSkin, quantity: 4},
                    {code: Items.JasperCrystal, quantity: 2},
                ]);
            case Items.LizardSkinLegsArmor:
                return RecipeFactory.gearcrafting(25, [
                    {code: Items.LizardSkin, quantity: 5},
                    {code: Items.FlyingWing, quantity: 5},
                    {code: Items.OgreEye, quantity: 4},
                    {code: Items.JasperCrystal, quantity: 2},
                ]);
            case Items.PiggyArmor:
                return RecipeFactory.gearcrafting(25, [
                    {code: Items.PigSkin, quantity: 5},
                    {code: Items.DeadWoodPlank, quantity: 5},
                    {code: Items.OgreSkin, quantity: 4},
                    {code: Items.JasperCrystal, quantity: 2},
                ]);
            case Items.PiggyHelmet:
                return RecipeFactory.gearcrafting(25, [
                    {code: Items.Steel, quantity: 6},
                    {code: Items.PigSkin, quantity: 6},
                    {code: Items.CyclopsEye, quantity: 2},
                    {code: Items.VampireBlood, quantity: 2},
                ]);
            case Items.PiggyPants:
                return RecipeFactory.gearcrafting(25, [
                    {code: Items.PigSkin, quantity: 5},
                    {code: Items.HardwoodPlank, quantity: 4},
                    {code: Items.SerpentSkin, quantity: 4},
                    {code: Items.JasperCrystal, quantity: 2},
                ]);
            case Items.SerpentSkinArmor:
                return RecipeFactory.gearcrafting(25, [
                    {code: Items.SerpentSkin, quantity: 5},
                    {code: Items.SkeletonBone, quantity: 5},
                    {code: Items.VampireBlood, quantity: 4},
                    {code: Items.JasperCrystal, quantity: 1},
                ]);
            case Items.SerpentSkinLegsArmor:
                return RecipeFactory.gearcrafting(25, [
                    {code: Items.SerpentSkin, quantity: 5},
                    {code: Items.OgreSkin, quantity: 5},
                    {code: Items.WolfBone, quantity: 4},
                    {code: Items.JasperCrystal, quantity: 1},
                ]);
            case Items.StormforgedArmor:
                return RecipeFactory.gearcrafting(25, [
                    {code: Items.LizardSkin, quantity: 5},
                    {code: Items.DeadWoodPlank, quantity: 5},
                    {code: Items.OgreEye, quantity: 4},
                    {code: Items.JasperCrystal, quantity: 2},
                ]);
            case Items.StormforgedPants:
                return RecipeFactory.gearcrafting(25, [
                    {code: Items.LizardEye, quantity: 4},
                    {code: Items.WolfBone, quantity: 5},
                    {code: Items.OgreSkin, quantity: 5},
                    {code: Items.JasperCrystal, quantity: 2},
                ]);
            case Items.ConjurerCloak:
                return RecipeFactory.gearcrafting(30, [
                    {code: Items.Obsidian, quantity: 6},
                    {code: Items.CyclopsEye, quantity: 5},
                    {code: Items.OwlbearHair, quantity: 4},
                    {code: Items.DemonHorn, quantity: 4},
                    {code: Items.EnchantedFabric, quantity: 1},
                ]);
            case Items.ConjurerSkirt:
                return RecipeFactory.gearcrafting(30, [
                    {code: Items.Obsidian, quantity: 6},
                    {code: Items.VampireTooth, quantity: 4},
                    {code: Items.OwlbearClaw, quantity: 3},
                    {code: Items.LizardEye, quantity: 4},
                    {code: Items.RedCloth, quantity: 3},
                ]);
            case Items.FlyingBoots:
                return RecipeFactory.gearcrafting(30, [
                    {code: Items.DeadWoodPlank, quantity: 8},
                    {code: Items.LizardEye, quantity: 4},
                    {code: Items.DemoniacDust, quantity: 4},
                    {code: Items.OwlbearHair, quantity: 3},
                    {code: Items.MagicalCure, quantity: 1},
                ]);
            case Items.GoldBoots:
                return RecipeFactory.gearcrafting(30, [
                    {code: Items.Gold, quantity: 8},
                    {code: Items.VampireBlood, quantity: 4},
                    {code: Items.LizardEye, quantity: 3},
                    {code: Items.OwlbearHair, quantity: 4},
                    {code: Items.MagicalCure, quantity: 1},
                ]);
            case Items.GoldHelm:
                return RecipeFactory.gearcrafting(30, [
                    {code: Items.Gold, quantity: 8},
                    {code: Items.DemonHorn, quantity: 2},
                    {code: Items.DemoniacDust, quantity: 3},
                    {code: Items.VampireTooth, quantity: 3},
                    {code: Items.OwlbearHair, quantity: 4},
                ]);
            case Items.GoldMask:
                return RecipeFactory.gearcrafting(30, [
                    {code: Items.Gold, quantity: 8},
                    {code: Items.RedCloth, quantity: 2},
                    {code: Items.OwlbearClaw, quantity: 4},
                    {code: Items.DemonHorn, quantity: 2},
                    {code: Items.SkeletonSkull, quantity: 4},
                ]);
            case Items.GoldPlatebody:
                return RecipeFactory.gearcrafting(30, [
                    {code: Items.Gold, quantity: 8},
                    {code: Items.OwlbearHair, quantity: 3},
                    {code: Items.RedCloth, quantity: 3},
                    {code: Items.DemoniacDust, quantity: 4},
                    {code: Items.DemonHorn, quantity: 2},
                ]);
            case Items.GoldPlatelegs:
                return RecipeFactory.gearcrafting(30, [
                    {code: Items.Gold, quantity: 8},
                    {code: Items.LizardEye, quantity: 3},
                    {code: Items.RedCloth, quantity: 3},
                    {code: Items.VampireTooth, quantity: 4},
                    {code: Items.OgreSkin, quantity: 2},
                ]);
            case Items.GoldShield:
                return RecipeFactory.gearcrafting(30, [
                    {code: Items.DeadWoodPlank, quantity: 7},
                    {code: Items.Gold, quantity: 7},
                    {code: Items.DemonHorn, quantity: 4},
                    {code: Items.Sapphire, quantity: 1},
                    {code: Items.MagicalCure, quantity: 1},
                ]);
            case Items.LizardBoots:
                return RecipeFactory.gearcrafting(30, [
                    {code: Items.DeadWoodPlank, quantity: 8},
                    {code: Items.LizardSkin, quantity: 4},
                    {code: Items.DemoniacDust, quantity: 4},
                    {code: Items.OwlbearClaw, quantity: 3},
                    {code: Items.MagicalCure, quantity: 1},
                ]);
            case Items.ObsidianArmor:
                return RecipeFactory.gearcrafting(30, [
                    {code: Items.Obsidian, quantity: 6},
                    {code: Items.Ruby, quantity: 1},
                    {code: Items.SpiderLeg, quantity: 5},
                    {code: Items.DemonHorn, quantity: 4},
                    {code: Items.DemoniacDust, quantity: 4},
                ]);
            case Items.ObsidianHelmet:
                return RecipeFactory.gearcrafting(30, [
                    {code: Items.Obsidian, quantity: 6},
                    {code: Items.Emerald, quantity: 1},
                    {code: Items.OwlbearHair, quantity: 3},
                    {code: Items.LizardSkin, quantity: 5},
                    {code: Items.VampireTooth, quantity: 5},
                ]);
            case Items.ObsidianLegsArmor:
                return RecipeFactory.gearcrafting(30, [
                    {code: Items.Obsidian, quantity: 6},
                    {code: Items.Sapphire, quantity: 1},
                    {code: Items.OwlbearClaw, quantity: 3},
                    {code: Items.LizardEye, quantity: 5},
                    {code: Items.RedCloth, quantity: 5},
                ]);
            case Items.RoyalSkeletonArmor:
                return RecipeFactory.gearcrafting(30, [
                    {code: Items.Gold, quantity: 8},
                    {code: Items.SkeletonArmor, quantity: 1},
                    {code: Items.RedCloth, quantity: 3},
                    {code: Items.DemoniacDust, quantity: 3},
                ]);
            case Items.RoyalSkeletonHelmet:
                return RecipeFactory.gearcrafting(30, [
                    {code: Items.Gold, quantity: 8},
                    {code: Items.SkeletonHelmet, quantity: 1},
                    {code: Items.OwlbearClaw, quantity: 4},
                    {code: Items.CyclopsEye, quantity: 4},
                ]);
            case Items.RoyalSkeletonPants:
                return RecipeFactory.gearcrafting(30, [
                    {code: Items.Gold, quantity: 8},
                    {code: Items.SkeletonPants, quantity: 1},
                    {code: Items.OwlbearHair, quantity: 3},
                    {code: Items.VampireBlood, quantity: 3},
                ]);
            case Items.AncientJean:
                return RecipeFactory.gearcrafting(35, [
                    {code: Items.MagicalPlank, quantity: 6},
                    {code: Items.MagicalCure, quantity: 2},
                    {code: Items.CursedBook, quantity: 3},
                    {code: Items.Obsidian, quantity: 4},
                    {code: Items.LizardSkin, quantity: 5},
                ]);
            case Items.CursedHat:
                return RecipeFactory.gearcrafting(35, [
                    {code: Items.CursedPlank, quantity: 8},
                    {code: Items.MaleficCloth, quantity: 2},
                    {code: Items.CursedBook, quantity: 4},
                    {code: Items.OwlbearHair, quantity: 4},
                    {code: Items.Diamond, quantity: 1},
                    {code: Items.EnchantedFabric, quantity: 1},
                ]);
            case Items.DreadfulArmor:
                return RecipeFactory.gearcrafting(35, [
                    {code: Items.Obsidian, quantity: 8},
                    {code: Items.MaleficCloth, quantity: 2},
                    {code: Items.OgreEye, quantity: 5},
                    {code: Items.GoblinEye, quantity: 4},
                    {code: Items.EnchantedFabric, quantity: 1},
                ]);
            case Items.DreadfulShield:
                return RecipeFactory.gearcrafting(35, [
                    {code: Items.Obsidian, quantity: 8},
                    {code: Items.GoblinEye, quantity: 5},
                    {code: Items.CursedBook, quantity: 5},
                    {code: Items.Ruby, quantity: 1},
                    {code: Items.AstralyteCrystal, quantity: 1},
                ]);
            case Items.EnchanterBoots:
                return RecipeFactory.gearcrafting(35, [
                    {code: Items.MagicalPlank, quantity: 8},
                    {code: Items.MaleficCloth, quantity: 2},
                    {code: Items.LizardEye, quantity: 4},
                    {code: Items.OwlbearClaw, quantity: 5},
                    {code: Items.EnchantedFabric, quantity: 1},
                ]);
            case Items.EnchanterPants:
                return RecipeFactory.gearcrafting(35, [
                    {code: Items.MagicalPlank, quantity: 8},
                    {code: Items.DemonHorn, quantity: 2},
                    {code: Items.CursedBook, quantity: 3},
                    {code: Items.OwlbearClaw, quantity: 4},
                    {code: Items.SpiderLeg, quantity: 2},
                    {code: Items.EnchantedFabric, quantity: 1},
                ]);
            case Items.JesterHat:
                return RecipeFactory.gearcrafting(35, [
                    {code: Items.CursedPlank, quantity: 8},
                    {code: Items.VampireTooth, quantity: 2},
                    {code: Items.CursedBook, quantity: 4},
                    {code: Items.OwlbearHair, quantity: 4},
                    {code: Items.Diamond, quantity: 1},
                    {code: Items.EnchantedFabric, quantity: 1},
                ]);
            case Items.MaleficArmor:
                return RecipeFactory.gearcrafting(35, [
                    {code: Items.MagicalPlank, quantity: 8},
                    {code: Items.MaleficCloth, quantity: 2},
                    {code: Items.OwlbearHair, quantity: 4},
                    {code: Items.MagicStone, quantity: 3},
                    {code: Items.MagicalCure, quantity: 2},
                ]);
            case Items.StrangoldArmor:
                return RecipeFactory.gearcrafting(35, [
                    {code: Items.Strangold, quantity: 8},
                    {code: Items.OwlbearHair, quantity: 3},
                    {code: Items.MagicStone, quantity: 3},
                    {code: Items.DemonHorn, quantity: 4},
                    {code: Items.MagicalCure, quantity: 2},
                ]);
            case Items.StrangoldHelmet:
                return RecipeFactory.gearcrafting(35, [
                    {code: Items.Strangold, quantity: 7},
                    {code: Items.DemoniacDust, quantity: 4},
                    {code: Items.MagicStone, quantity: 3},
                    {code: Items.LizardSkin, quantity: 4},
                    {code: Items.Diamond, quantity: 1},
                    {code: Items.MagicalCure, quantity: 1},
                ]);
            case Items.StrangoldLegsArmor:
                return RecipeFactory.gearcrafting(35, [
                    {code: Items.Strangold, quantity: 8},
                    {code: Items.MagicalCure, quantity: 2},
                    {code: Items.CursedBook, quantity: 3},
                    {code: Items.OgreEye, quantity: 4},
                    {code: Items.RedCloth, quantity: 3},
                ]);
            case Items.AirShield:
                return RecipeFactory.gearcrafting(40, [
                    {code: Items.Strangold, quantity: 6},
                    {code: Items.Emerald, quantity: 1},
                    {code: Items.GreenSlimeball, quantity: 20},
                    {code: Items.WolfriderHair, quantity: 5},
                    {code: Items.RosenbloodElixir, quantity: 1},
                ]);
            case Items.BatwingHelmet:
                return RecipeFactory.gearcrafting(40, [
                    {code: Items.Strangold, quantity: 6},
                    {code: Items.Topaz, quantity: 1},
                    {code: Items.RosenbloodElixir, quantity: 1},
                    {code: Items.BatWing, quantity: 5},
                    {code: Items.OrcSkin, quantity: 5},
                    {code: Items.EnchantedFabric, quantity: 2},
                ]);
            case Items.CultistBoots:
                return RecipeFactory.gearcrafting(40, [
                    {code: Items.MaplePlank, quantity: 7},
                    {code: Items.MaleficCloth, quantity: 2},
                    {code: Items.HellhoundHair, quantity: 4},
                    {code: Items.OrcSkin, quantity: 5},
                    {code: Items.EnchantedFabric, quantity: 2},
                ]);
            case Items.CultistCloak:
                return RecipeFactory.gearcrafting(40, [
                    {code: Items.MaplePlank, quantity: 8},
                    {code: Items.MaleficCloth, quantity: 2},
                    {code: Items.RedCloth, quantity: 3},
                    {code: Items.HellhoundBone, quantity: 4},
                    {code: Items.AstralyteCrystal, quantity: 2},
                ]);
            case Items.CultistHat:
                return RecipeFactory.gearcrafting(40, [
                    {code: Items.MaplePlank, quantity: 8},
                    {code: Items.MaleficCloth, quantity: 1},
                    {code: Items.HellhoundHair, quantity: 5},
                    {code: Items.OrcSkin, quantity: 4},
                    {code: Items.AstralyteCrystal, quantity: 2},
                ]);
            case Items.CultistPants:
                return RecipeFactory.gearcrafting(40, [
                    {code: Items.CursedPlank, quantity: 8},
                    {code: Items.MaleficCloth, quantity: 2},
                    {code: Items.WolfriderHair, quantity: 3},
                    {code: Items.HellhoundHair, quantity: 3},
                    {code: Items.MagicalCure, quantity: 4},
                ]);
            case Items.EarthShield:
                return RecipeFactory.gearcrafting(40, [
                    {code: Items.Strangold, quantity: 6},
                    {code: Items.Topaz, quantity: 1},
                    {code: Items.YellowSlimeball, quantity: 20},
                    {code: Items.BatWing, quantity: 3},
                    {code: Items.RosenbloodElixir, quantity: 1},
                ]);
            case Items.FireShield:
                return RecipeFactory.gearcrafting(40, [
                    {code: Items.Strangold, quantity: 6},
                    {code: Items.Ruby, quantity: 1},
                    {code: Items.RedSlimeball, quantity: 20},
                    {code: Items.OrcSkin, quantity: 5},
                    {code: Items.RosenbloodElixir, quantity: 1},
                ]);
            case Items.HellArmor:
                return RecipeFactory.gearcrafting(40, [
                    {code: Items.CursedPlank, quantity: 8},
                    {code: Items.EfreetCloth, quantity: 4},
                    {code: Items.RosenbloodElixir, quantity: 1},
                    {code: Items.DemoniacDust, quantity: 3},
                    {code: Items.DemonHorn, quantity: 4},
                ]);
            case Items.HellLegsArmor:
                return RecipeFactory.gearcrafting(40, [
                    {code: Items.MaplePlank, quantity: 8},
                    {code: Items.DemonHorn, quantity: 2},
                    {code: Items.EfreetCloth, quantity: 4},
                    {code: Items.MaleficCloth, quantity: 2},
                    {code: Items.HellhoundBone, quantity: 4},
                ]);
            case Items.HorkHelmet:
                return RecipeFactory.gearcrafting(40, [
                    {code: Items.Strangold, quantity: 7},
                    {code: Items.OrcSkin, quantity: 4},
                    {code: Items.RosenbloodElixir, quantity: 1},
                    {code: Items.BatWing, quantity: 3},
                    {code: Items.JasperCrystal, quantity: 5},
                ]);
            case Items.MithrilBoots:
                return RecipeFactory.gearcrafting(40, [
                    {code: Items.Mithril, quantity: 7},
                    {code: Items.Diamond, quantity: 1},
                    {code: Items.HellhoundHair, quantity: 5},
                    {code: Items.GoblinEye, quantity: 5},
                    {code: Items.EnchantedFabric, quantity: 2},
                ]);
            case Items.MithrilHelm:
                return RecipeFactory.gearcrafting(40, [
                    {code: Items.Mithril, quantity: 8},
                    {code: Items.Diamond, quantity: 1},
                    {code: Items.GoblinTooth, quantity: 3},
                    {code: Items.VampireBlood, quantity: 3},
                    {code: Items.JasperCrystal, quantity: 5},
                ]);
            case Items.MithrilPlatebody:
                return RecipeFactory.gearcrafting(40, [
                    {code: Items.Mithril, quantity: 8},
                    {code: Items.OrcSkin, quantity: 3},
                    {code: Items.BatWing, quantity: 3},
                    {code: Items.GoblinTooth, quantity: 4},
                    {code: Items.EnchantedFabric, quantity: 2},
                ]);
            case Items.MithrilPlatelegs:
                return RecipeFactory.gearcrafting(40, [
                    {code: Items.Mithril, quantity: 8},
                    {code: Items.LizardEye, quantity: 2},
                    {code: Items.DemoniacDust, quantity: 3},
                    {code: Items.VampireTooth, quantity: 3},
                    {code: Items.OwlbearHair, quantity: 4},
                ]);
            case Items.MithrilShield:
                return RecipeFactory.gearcrafting(40, [
                    {code: Items.Mithril, quantity: 7},
                    {code: Items.LizardSkin, quantity: 3},
                    {code: Items.CyclopsEye, quantity: 3},
                    {code: Items.HellhoundHair, quantity: 3},
                    {code: Items.GoblinEye, quantity: 4},
                ]);
            case Items.WaterShield:
                return RecipeFactory.gearcrafting(40, [
                    {code: Items.Strangold, quantity: 6},
                    {code: Items.Sapphire, quantity: 1},
                    {code: Items.BlueSlimeball, quantity: 20},
                    {code: Items.HellhoundBone, quantity: 3},
                    {code: Items.RosenbloodElixir, quantity: 1},
                ]);
            case Items.WhiteKnightArmor:
                return RecipeFactory.gearcrafting(40, [
                    {code: Items.Mithril, quantity: 8},
                    {code: Items.MagicStone, quantity: 3},
                    {code: Items.HellhoundHair, quantity: 3},
                    {code: Items.WolfriderHair, quantity: 4},
                    {code: Items.EnchantedFabric, quantity: 2},
                ]);
            case Items.WhiteKnightHelmet:
                return RecipeFactory.gearcrafting(40, [
                    {code: Items.Mithril, quantity: 8},
                    {code: Items.Diamond, quantity: 1},
                    {code: Items.HellhoundBone, quantity: 4},
                    {code: Items.OrcSkin, quantity: 3},
                    {code: Items.OwlbearClaw, quantity: 4},
                ]);
            case Items.WhiteKnightPants:
                return RecipeFactory.gearcrafting(40, [
                    {code: Items.Mithril, quantity: 8},
                    {code: Items.HellhoundHair, quantity: 3},
                    {code: Items.WolfriderHair, quantity: 3},
                    {code: Items.GoblinTooth, quantity: 4},
                    {code: Items.AstralyteCrystal, quantity: 2},
                ]);
            case Items.WhiteKnightShield:
                return RecipeFactory.gearcrafting(40, [
                    {code: Items.MaplePlank, quantity: 7},
                    {code: Items.LizardEye, quantity: 3},
                    {code: Items.WolfriderHair, quantity: 3},
                    {code: Items.HellhoundHair, quantity: 3},
                    {code: Items.GoblinEye, quantity: 4},
                ]);
            case Items.Wratharmor:
                return RecipeFactory.gearcrafting(40, [
                    {code: Items.Mithril, quantity: 8},
                    {code: Items.RosenbloodElixir, quantity: 1},
                    {code: Items.GoblinEye, quantity: 4},
                    {code: Items.HellhoundBone, quantity: 5},
                    {code: Items.EnchantedFabric, quantity: 2},
                ]);
            case Items.Wrathelmet:
                return RecipeFactory.gearcrafting(40, [
                    {code: Items.Mithril, quantity: 8},
                    {code: Items.RosenbloodElixir, quantity: 1},
                    {code: Items.WolfriderHair, quantity: 4},
                    {code: Items.CursedBook, quantity: 5},
                    {code: Items.AstralyteCrystal, quantity: 2},
                ]);
            case Items.Wrathpants:
                return RecipeFactory.gearcrafting(40, [
                    {code: Items.Mithril, quantity: 8},
                    {code: Items.BatWing, quantity: 3},
                    {code: Items.GoblinTooth, quantity: 4},
                    {code: Items.HellhoundBone, quantity: 3},
                    {code: Items.EnchantedFabric, quantity: 2},
                ]);

            // JEWELRYCRAFTING
            case Items.CopperRing:
                return RecipeFactory.jewelrycrafting(1, [
                    {code: Items.Copper, quantity: 6},
                ]);
            case Items.LifeAmulet:
                return RecipeFactory.jewelrycrafting(5, [
                    {code: Items.Feather, quantity: 4},
                    {code: Items.RedSlimeball, quantity: 2},
                ]);
            case Items.AirWaterAmulet:
                return RecipeFactory.jewelrycrafting(10, [
                    {code: Items.Iron, quantity: 4},
                    {code: Items.GreenSlimeball, quantity: 2},
                    {code: Items.BlueSlimeball, quantity: 2},
                ]);
            case Items.FireEarthAmulet:
                return RecipeFactory.jewelrycrafting(10, [
                    {code: Items.Iron, quantity: 4},
                    {code: Items.RedSlimeball, quantity: 2},
                    {code: Items.YellowSlimeball, quantity: 2},
                ]);
            case Items.IronRing:
                return RecipeFactory.jewelrycrafting(10, [
                    {code: Items.Iron, quantity: 6},
                    {code: Items.Feather, quantity: 2},
                ]);
            case Items.AirRing:
                return RecipeFactory.jewelrycrafting(15, [
                    {code: Items.Iron, quantity: 5},
                    {code: Items.GreenSlimeball, quantity: 4},
                    {code: Items.FlyingWing, quantity: 3},
                ]);
            case Items.EarthRing:
                return RecipeFactory.jewelrycrafting(15, [
                    {code: Items.Iron, quantity: 5},
                    {code: Items.YellowSlimeball, quantity: 4},
                    {code: Items.FlyingWing, quantity: 3},
                ]);
            case Items.FireRing:
                return RecipeFactory.jewelrycrafting(15, [
                    {code: Items.Iron, quantity: 5},
                    {code: Items.RedSlimeball, quantity: 4},
                    {code: Items.FlyingWing, quantity: 3},
                ]);
            case Items.LifeRing:
                return RecipeFactory.jewelrycrafting(15, [
                    {code: Items.Iron, quantity: 5},
                    {code: Items.Feather, quantity: 3},
                    {code: Items.Mushroom, quantity: 3},
                ]);
            case Items.WaterRing:
                return RecipeFactory.jewelrycrafting(15, [
                    {code: Items.Iron, quantity: 5},
                    {code: Items.BlueSlimeball, quantity: 4},
                    {code: Items.FlyingWing, quantity: 3},
                ]);
            case Items.WisdomAmulet:
                return RecipeFactory.jewelrycrafting(15, [
                    {code: Items.SprucePlank, quantity: 4},
                    {code: Items.GreenCloth, quantity: 3},
                    {code: Items.SerpentSkin, quantity: 3},
                    {code: Items.JasperCrystal, quantity: 1},
                ]);
            case Items.DreadfulAmulet:
                return RecipeFactory.jewelrycrafting(20, [
                    {code: Items.HardwoodPlank, quantity: 6},
                    {code: Items.OgreEye, quantity: 4},
                    {code: Items.PigSkin, quantity: 3},
                    {code: Items.FlyingWing, quantity: 2},
                ]);
            case Items.DreadfulRing:
                return RecipeFactory.jewelrycrafting(20, [
                    {code: Items.Steel, quantity: 7},
                    {code: Items.OgreEye, quantity: 4},
                    {code: Items.CyclopsEye, quantity: 3},
                    {code: Items.JasperCrystal, quantity: 1},
                ]);
            case Items.RingofChance:
                return RecipeFactory.jewelrycrafting(20, [
                    {code: Items.JasperCrystal, quantity: 1},
                    {code: Items.Steel, quantity: 6},
                    {code: Items.RedSlimeball, quantity: 2},
                    {code: Items.BlueSlimeball, quantity: 2},
                    {code: Items.PigSkin, quantity: 4},
                ]);
            case Items.SkullAmulet:
                return RecipeFactory.jewelrycrafting(20, [
                    {code: Items.HardwoodPlank, quantity: 7},
                    {code: Items.SkeletonSkull, quantity: 3},
                    {code: Items.Wolfhair, quantity: 3},
                    {code: Items.SerpentSkin, quantity: 2},
                ]);
            case Items.SkullRing:
                return RecipeFactory.jewelrycrafting(20, [
                    {code: Items.Steel, quantity: 4},
                    {code: Items.WolfBone, quantity: 4},
                    {code: Items.SkeletonSkull, quantity: 1},
                    {code: Items.JasperCrystal, quantity: 2},
                ]);
            case Items.SteelRing:
                return RecipeFactory.jewelrycrafting(20, [
                    {code: Items.Steel, quantity: 7},
                    {code: Items.SkeletonBone, quantity: 3},
                    {code: Items.Cowhide, quantity: 2},
                    {code: Items.SerpentSkin, quantity: 3},
                ]);
            case Items.EmeraldAmulet:
                return RecipeFactory.jewelrycrafting(25, [
                    {code: Items.HardwoodPlank, quantity: 8},
                    {code: Items.Emerald, quantity: 1},
                    {code: Items.Wolfhair, quantity: 5},
                    {code: Items.JasperCrystal, quantity: 2},
                ]);
            case Items.RubyAmulet:
                return RecipeFactory.jewelrycrafting(25, [
                    {code: Items.HardwoodPlank, quantity: 8},
                    {code: Items.Ruby, quantity: 1},
                    {code: Items.Wolfhair, quantity: 5},
                    {code: Items.JasperCrystal, quantity: 2},
                ]);
            case Items.SapphireAmulet:
                return RecipeFactory.jewelrycrafting(25, [
                    {code: Items.HardwoodPlank, quantity: 8},
                    {code: Items.Sapphire, quantity: 1},
                    {code: Items.Wolfhair, quantity: 5},
                    {code: Items.JasperCrystal, quantity: 2},
                ]);
            case Items.TopazAmulet:
                return RecipeFactory.jewelrycrafting(25, [
                    {code: Items.HardwoodPlank, quantity: 8},
                    {code: Items.Topaz, quantity: 1},
                    {code: Items.Wolfhair, quantity: 5},
                    {code: Items.JasperCrystal, quantity: 2},
                ]);
            case Items.EmeraldRing:
                return RecipeFactory.jewelrycrafting(30, [
                    {code: Items.Gold, quantity: 8},
                    {code: Items.Obsidian, quantity: 4},
                    {code: Items.Emerald, quantity: 1},
                    {code: Items.VampireBlood, quantity: 5},
                    {code: Items.MagicalCure, quantity: 2},
                ]);
            case Items.GoldRing:
                return RecipeFactory.jewelrycrafting(30, [
                    {code: Items.Gold, quantity: 8},
                    {code: Items.DeadWoodPlank, quantity: 3},
                    {code: Items.WolfBone, quantity: 3},
                    {code: Items.VampireBlood, quantity: 3},
                    {code: Items.SkeletonBone, quantity: 3},
                ]);
            case Items.GreaterDreadfulAmulet:
                return RecipeFactory.jewelrycrafting(30, [
                    {code: Items.Gold, quantity: 8},
                    {code: Items.DreadfulAmulet, quantity: 1},
                    {code: Items.CyclopsEye, quantity: 4},
                    {code: Items.OgreEye, quantity: 4},
                    {code: Items.RedCloth, quantity: 3},
                ]);
            case Items.LostAmulet:
                return RecipeFactory.jewelrycrafting(30, [
                    {code: Items.Gold, quantity: 8},
                    {code: Items.Obsidian, quantity: 4},
                    {code: Items.CyclopsEye, quantity: 4},
                    {code: Items.DemoniacDust, quantity: 3},
                    {code: Items.RedCloth, quantity: 3},
                ]);
            case Items.ProspectingAmulet:
                return RecipeFactory.jewelrycrafting(30, [
                    {code: Items.DeadWoodPlank, quantity: 4},
                    {code: Items.SpiderLeg, quantity: 3},
                    {code: Items.OgreSkin, quantity: 6},
                    {code: Items.OwlbearHair, quantity: 4},
                    {code: Items.MagicalCure, quantity: 1},
                ]);
            case Items.RoyalSkeletonRing:
                return RecipeFactory.jewelrycrafting(30, [
                    {code: Items.Gold, quantity: 8},
                    {code: Items.OwlbearClaw, quantity: 3},
                    {code: Items.VampireTooth, quantity: 3},
                    {code: Items.SpiderLeg, quantity: 2},
                    {code: Items.OgreSkin, quantity: 4},
                ]);
            case Items.RubyRing:
                return RecipeFactory.jewelrycrafting(30, [
                    {code: Items.Gold, quantity: 8},
                    {code: Items.Obsidian, quantity: 4},
                    {code: Items.Ruby, quantity: 1},
                    {code: Items.VampireBlood, quantity: 5},
                    {code: Items.MagicalCure, quantity: 2},
                ]);
            case Items.SapphireRing:
                return RecipeFactory.jewelrycrafting(30, [
                    {code: Items.Gold, quantity: 8},
                    {code: Items.Obsidian, quantity: 4},
                    {code: Items.Sapphire, quantity: 1},
                    {code: Items.VampireBlood, quantity: 5},
                    {code: Items.MagicalCure, quantity: 2},
                ]);
            case Items.TopazRing:
                return RecipeFactory.jewelrycrafting(30, [
                    {code: Items.Gold, quantity: 8},
                    {code: Items.Obsidian, quantity: 4},
                    {code: Items.Topaz, quantity: 1},
                    {code: Items.VampireBlood, quantity: 5},
                    {code: Items.MagicalCure, quantity: 2},
                ]);
            case Items.AncestralTalisman:
                return RecipeFactory.jewelrycrafting(35, [
                    {code: Items.MagicalPlank, quantity: 8},
                    {code: Items.Diamond, quantity: 1},
                    {code: Items.CursedBook, quantity: 4},
                    {code: Items.GoblinTooth, quantity: 5},
                    {code: Items.AstralyteCrystal, quantity: 2},
                ]);
            case Items.DiamondAmulet:
                return RecipeFactory.jewelrycrafting(35, [
                    {code: Items.MagicalPlank, quantity: 8},
                    {code: Items.Diamond, quantity: 1},
                    {code: Items.Obsidian, quantity: 5},
                    {code: Items.CursedBook, quantity: 4},
                    {code: Items.MagicalCure, quantity: 2},
                ]);
            case Items.MagicStoneAmulet:
                return RecipeFactory.jewelrycrafting(35, [
                    {code: Items.Strangold, quantity: 6},
                    {code: Items.MaleficCloth, quantity: 2},
                    {code: Items.MagicStone, quantity: 5},
                    {code: Items.LizardSkin, quantity: 5},
                    {code: Items.MagicalCure, quantity: 2},
                ]);
            case Items.MaleficRing:
                return RecipeFactory.jewelrycrafting(35, [
                    {code: Items.Strangold, quantity: 8},
                    {code: Items.CursedPlank, quantity: 4},
                    {code: Items.Ruby, quantity: 2},
                    {code: Items.LizardEye, quantity: 2},
                    {code: Items.OwlbearClaw, quantity: 2},
                    {code: Items.AstralyteCrystal, quantity: 2},
                ]);
            case Items.MasterfulNecklace:
                return RecipeFactory.jewelrycrafting(35, [
                    {code: Items.Strangold, quantity: 6},
                    {code: Items.MaleficCloth, quantity: 2},
                    {code: Items.MagicStone, quantity: 5},
                    {code: Items.GoblinTooth, quantity: 5},
                    {code: Items.AstralyteCrystal, quantity: 2},
                ]);
            case Items.CelestRing:
                return RecipeFactory.jewelrycrafting(40, [
                    {code: Items.Strangold, quantity: 8},
                    {code: Items.MaplePlank, quantity: 4},
                    {code: Items.Ruby, quantity: 2},
                    {code: Items.Sapphire, quantity: 2},
                    {code: Items.EfreetCloth, quantity: 2},
                    {code: Items.AstralyteCrystal, quantity: 2},
                ]);
            case Items.DivinityRing:
                return RecipeFactory.jewelrycrafting(40, [
                    {code: Items.Strangold, quantity: 8},
                    {code: Items.MaplePlank, quantity: 4},
                    {code: Items.Topaz, quantity: 2},
                    {code: Items.Sapphire, quantity: 2},
                    {code: Items.EfreetCloth, quantity: 2},
                    {code: Items.AstralyteCrystal, quantity: 2},
                ]);
            case Items.EternityRing:
                return RecipeFactory.jewelrycrafting(40, [
                    {code: Items.Strangold, quantity: 8},
                    {code: Items.MaplePlank, quantity: 4},
                    {code: Items.Topaz, quantity: 2},
                    {code: Items.Emerald, quantity: 2},
                    {code: Items.EfreetCloth, quantity: 2},
                    {code: Items.AstralyteCrystal, quantity: 2},
                ]);
            case Items.GreaterEmeraldAmulet:
                return RecipeFactory.jewelrycrafting(40, [
                    {code: Items.MaplePlank, quantity: 8},
                    {code: Items.EmeraldAmulet, quantity: 1},
                    {code: Items.Emerald, quantity: 2},
                    {code: Items.HellhoundBone, quantity: 6},
                    {code: Items.AstralyteCrystal, quantity: 2},
                ]);
            case Items.GreaterRubyAmulet:
                return RecipeFactory.jewelrycrafting(40, [
                    {code: Items.MaplePlank, quantity: 8},
                    {code: Items.RubyAmulet, quantity: 1},
                    {code: Items.Ruby, quantity: 2},
                    {code: Items.HellhoundBone, quantity: 6},
                    {code: Items.AstralyteCrystal, quantity: 2},
                ]);
            case Items.GreaterSapphireAmulet:
                return RecipeFactory.jewelrycrafting(40, [
                    {code: Items.MaplePlank, quantity: 8},
                    {code: Items.SapphireAmulet, quantity: 1},
                    {code: Items.Sapphire, quantity: 2},
                    {code: Items.HellhoundBone, quantity: 6},
                    {code: Items.AstralyteCrystal, quantity: 2},
                ]);
            case Items.GreaterTopazAmulet:
                return RecipeFactory.jewelrycrafting(40, [
                    {code: Items.MaplePlank, quantity: 8},
                    {code: Items.TopazAmulet, quantity: 1},
                    {code: Items.Topaz, quantity: 2},
                    {code: Items.HellhoundBone, quantity: 6},
                    {code: Items.AstralyteCrystal, quantity: 2},
                ]);
            case Items.SacredRing:
                return RecipeFactory.jewelrycrafting(40, [
                    {code: Items.Strangold, quantity: 8},
                    {code: Items.MaplePlank, quantity: 4},
                    {code: Items.Ruby, quantity: 2},
                    {code: Items.Emerald, quantity: 2},
                    {code: Items.EfreetCloth, quantity: 2},
                    {code: Items.AstralyteCrystal, quantity: 2},
                ]);

            // ALCHEMY
            case Items.SmallHealthPotion:
                return RecipeFactory.alchemy(5, [
                    {code: Items.Sunflower, quantity: 3},
                ]);
            case Items.AirBoostPotion:
                return RecipeFactory.alchemy(10, [
                    {code: Items.GreenSlimeball, quantity: 1},
                    {code: Items.Sunflower, quantity: 1},
                    {code: Items.Algae, quantity: 1},
                ]);
            case Items.EarthBoostPotion:
                return RecipeFactory.alchemy(10, [
                    {code: Items.YellowSlimeball, quantity: 1},
                    {code: Items.Sunflower, quantity: 1},
                    {code: Items.Algae, quantity: 1},
                ]);
            case Items.FireBoostPotion:
                return RecipeFactory.alchemy(10, [
                    {code: Items.RedSlimeball, quantity: 1},
                    {code: Items.Sunflower, quantity: 1},
                    {code: Items.Algae, quantity: 1},
                ]);
            case Items.WaterBoostPotion:
                return RecipeFactory.alchemy(10, [
                    {code: Items.BlueSlimeball, quantity: 1},
                    {code: Items.Sunflower, quantity: 1},
                    {code: Items.Algae, quantity: 1},
                ]);
            case Items.MinorHealthPotion:
                return RecipeFactory.alchemy(20, [
                    {code: Items.NettleLeaf, quantity: 2},
                    {code: Items.Algae, quantity: 1},
                ]);
            case Items.SmallAntidote:
                return RecipeFactory.alchemy(20, [
                    {code: Items.MilkBucket, quantity: 1},
                    {code: Items.Sap, quantity: 1},
                    {code: Items.NettleLeaf, quantity: 1},
                ]);
            case Items.Antidote:
                return RecipeFactory.alchemy(30, [
                    {code: Items.Strangold, quantity: 2},
                    {code: Items.MapleSap, quantity: 1},
                    {code: Items.GlowstemLeaf, quantity: 1},
                ]);
            case Items.HealthPotion:
                return RecipeFactory.alchemy(30, [
                    {code: Items.NettleLeaf, quantity: 2},
                    {code: Items.Sunflower, quantity: 1},
                    {code: Items.Sap, quantity: 1},
                ]);
            case Items.GreaterHealthPotion:
                return RecipeFactory.alchemy(35, [
                    {code: Items.GlowstemLeaf, quantity: 2},
                    {code: Items.Egg, quantity: 1},
                    {code: Items.Algae, quantity: 1},
                ]);
            case Items.AirResPotion:
                return RecipeFactory.alchemy(40, [
                    {code: Items.GreenSlimeball, quantity: 2},
                    {code: Items.MapleSap, quantity: 1},
                    {code: Items.GlowstemLeaf, quantity: 1},
                ]);
            case Items.EarthResPotion:
                return RecipeFactory.alchemy(40, [
                    {code: Items.YellowSlimeball, quantity: 2},
                    {code: Items.MapleSap, quantity: 1},
                    {code: Items.GlowstemLeaf, quantity: 1},
                ]);
            case Items.EnchantedBoostPotion:
                return RecipeFactory.alchemy(40, [
                    {code: Items.GlowstemLeaf, quantity: 2},
                    {code: Items.BatWing, quantity: 1},
                    {code: Items.MagicSap, quantity: 1},
                ]);
            case Items.EnchantedHealthPotion:
                return RecipeFactory.alchemy(40, [
                    {code: Items.GlowstemLeaf, quantity: 2},
                    {code: Items.Sunflower, quantity: 1},
                    {code: Items.MagicSap, quantity: 1},
                ]);
            case Items.FireResPotion:
                return RecipeFactory.alchemy(40, [
                    {code: Items.RedSlimeball, quantity: 2},
                    {code: Items.MapleSap, quantity: 1},
                    {code: Items.GlowstemLeaf, quantity: 1},
                ]);
            case Items.HealthBoostPotion:
                return RecipeFactory.alchemy(40, [
                    {code: Items.Shrimp, quantity: 1},
                    {code: Items.Sap, quantity: 1},
                    {code: Items.NettleLeaf, quantity: 2},
                ]);
            case Items.WaterResPotion:
                return RecipeFactory.alchemy(40, [
                    {code: Items.BlueSlimeball, quantity: 2},
                    {code: Items.MapleSap, quantity: 1},
                    {code: Items.GlowstemLeaf, quantity: 1},
                ]);

            // COOKING
            case Items.CookedChicken:
                return RecipeFactory.cooking(1, [
                    {code: Items.RawChicken, quantity: 1},
                ]);
            case Items.CookedGudgeon:
                return RecipeFactory.cooking(1, [
                    {code: Items.Gudgeon, quantity: 1},
                ]);
            case Items.CookedBeef:
                return RecipeFactory.cooking(5, [
                    {code: Items.RawBeef, quantity: 1},
                ]);
            case Items.FriedEggs:
                return RecipeFactory.cooking(5, [
                    {code: Items.Egg, quantity: 2},
                ]);
            case Items.Cheese:
                return RecipeFactory.cooking(10, [
                    {code: Items.MilkBucket, quantity: 1},
                ]);
            case Items.CookedShrimp:
                return RecipeFactory.cooking(10, [
                    {code: Items.Shrimp, quantity: 1},
                ]);
            case Items.CookedWolfMeat:
                return RecipeFactory.cooking(15, [
                    {code: Items.RawWolfMeat, quantity: 1},
                ]);
            case Items.MushroomSoup:
                return RecipeFactory.cooking(15, [
                    {code: Items.Mushroom, quantity: 2},
                ]);
            case Items.ApplePie:
                return RecipeFactory.cooking(20, [
                    {code: Items.Apple, quantity: 2},
                    {code: Items.Egg, quantity: 1},
                ]);
            case Items.CookedTrout:
                return RecipeFactory.cooking(20, [
                    {code: Items.Trout, quantity: 1},
                ]);
            case Items.CookedBass:
                return RecipeFactory.cooking(30, [
                    {code: Items.Bass, quantity: 1},
                ]);
            case Items.CookedHellhoundMeat:
                return RecipeFactory.cooking(40, [
                    {code: Items.RawHellhoundMeat, quantity: 1},
                ]);
            case Items.CookedSalmon:
                return RecipeFactory.cooking(40, [
                    {code: Items.Salmon, quantity: 1},
                ]);
            case Items.FishSoup:
                return RecipeFactory.cooking(40, [
                    {code: Items.MilkBucket, quantity: 1},
                    {code: Items.Salmon, quantity: 1},
                    {code: Items.Trout, quantity: 1},
                ]);
            case Items.MapleSyrup:
                return RecipeFactory.cooking(40, [
                    {code: Items.MapleSap, quantity: 2},
                ]);

            // WOODCUTTING
            case Items.AshPlank:
                return RecipeFactory.woodcutting(1, [
                    {code: Items.AshWood, quantity: 10},
                ]);
            case Items.SprucePlank:
                return RecipeFactory.woodcutting(10, [
                    {code: Items.SpruceWood, quantity: 10},
                ]);
            case Items.HardwoodPlank:
                return RecipeFactory.woodcutting(20, [
                    {code: Items.AshWood, quantity: 4},
                    {code: Items.BirchWood, quantity: 6},
                ]);
            case Items.DeadWoodPlank:
                return RecipeFactory.woodcutting(30, [
                    {code: Items.DeadWood, quantity: 10},
                ]);
            case Items.Sap:
                return RecipeFactory.woodcutting(30, [
                    {code: Items.AshWood, quantity: 5},
                    {code: Items.SpruceWood, quantity: 5},
                    {code: Items.DeadWood, quantity: 5},
                ]);
            case Items.CursedPlank:
                return RecipeFactory.woodcutting(35, [
                    {code: Items.CursedWood, quantity: 10},
                ]);
            case Items.MagicSap:
                return RecipeFactory.woodcutting(35, [
                    {code: Items.MagicWood, quantity: 15},
                ]);
            case Items.MagicalPlank:
                return RecipeFactory.woodcutting(35, [
                    {code: Items.DeadWood, quantity: 4},
                    {code: Items.MagicWood, quantity: 6},
                ]);
            case Items.MaplePlank:
                return RecipeFactory.woodcutting(40, [
                    {code: Items.MapleWood, quantity: 10},
                ]);
            case Items.MapleSap:
                return RecipeFactory.woodcutting(40, [
                    {code: Items.MapleWood, quantity: 15},
                ]);

            // WEAPONCRAFTING
            case Items.CopperDagger:
                return RecipeFactory.weaponcrafting(1, [
                    {code: Items.Copper, quantity: 6},
                ]);
            case Items.WoodenStaff:
                return RecipeFactory.weaponcrafting(1, [
                    {code: Items.WoodenStick, quantity: 1},
                    {code: Items.AshWood, quantity: 4},
                ]);
            case Items.FireStaff:
                return RecipeFactory.weaponcrafting(5, [
                    {code: Items.RedSlimeball, quantity: 2},
                    {code: Items.AshPlank, quantity: 5},
                ]);
            case Items.StickyDagger:
                return RecipeFactory.weaponcrafting(5, [
                    {code: Items.Copper, quantity: 5},
                    {code: Items.GreenSlimeball, quantity: 2},
                ]);
            case Items.StickySword:
                return RecipeFactory.weaponcrafting(5, [
                    {code: Items.YellowSlimeball, quantity: 2},
                    {code: Items.Copper, quantity: 5},
                ]);
            case Items.WaterBow:
                return RecipeFactory.weaponcrafting(5, [
                    {code: Items.BlueSlimeball, quantity: 2},
                    {code: Items.AshPlank, quantity: 5},
                ]);
            case Items.FireBow:
                return RecipeFactory.weaponcrafting(10, [
                    {code: Items.SprucePlank, quantity: 6},
                    {code: Items.RedSlimeball, quantity: 2},
                ]);
            case Items.GreaterWoodenStaff:
                return RecipeFactory.weaponcrafting(10, [
                    {code: Items.SprucePlank, quantity: 6},
                    {code: Items.BlueSlimeball, quantity: 2},
                ]);
            case Items.IronAxe:
                return RecipeFactory.weaponcrafting(10, [
                    {code: Items.SprucePlank, quantity: 2},
                    {code: Items.Iron, quantity: 8},
                    {code: Items.JasperCrystal, quantity: 1},
                ]);
            case Items.IronDagger:
                return RecipeFactory.weaponcrafting(10, [
                    {code: Items.Iron, quantity: 6},
                    {code: Items.Feather, quantity: 2},
                ]);
            case Items.IronPickaxe:
                return RecipeFactory.weaponcrafting(10, [
                    {code: Items.SprucePlank, quantity: 2},
                    {code: Items.Iron, quantity: 8},
                    {code: Items.JasperCrystal, quantity: 1},
                ]);
            case Items.IronSword:
                return RecipeFactory.weaponcrafting(10, [
                    {code: Items.Iron, quantity: 6},
                    {code: Items.Feather, quantity: 2},
                ]);
            case Items.LeatherGloves:
                return RecipeFactory.weaponcrafting(10, [
                    {code: Items.AshPlank, quantity: 2},
                    {code: Items.Cowhide, quantity: 8},
                    {code: Items.JasperCrystal, quantity: 1},
                ]);
            case Items.SpruceFishingRod:
                return RecipeFactory.weaponcrafting(10, [
                    {code: Items.SprucePlank, quantity: 8},
                    {code: Items.Iron, quantity: 2},
                    {code: Items.JasperCrystal, quantity: 1},
                ]);
            case Items.MultislimesSword:
                return RecipeFactory.weaponcrafting(15, [
                    {code: Items.Iron, quantity: 5},
                    {code: Items.RedSlimeball, quantity: 2},
                    {code: Items.BlueSlimeball, quantity: 2},
                    {code: Items.YellowSlimeball, quantity: 2},
                    {code: Items.GreenSlimeball, quantity: 2},
                    {code: Items.JasperCrystal, quantity: 1},
                ]);
            case Items.MushmushBow:
                return RecipeFactory.weaponcrafting(15, [
                    {code: Items.SprucePlank, quantity: 5},
                    {code: Items.Wolfhair, quantity: 2},
                    {code: Items.Mushroom, quantity: 4},
                    {code: Items.JasperCrystal, quantity: 1},
                ]);
            case Items.Mushstaff:
                return RecipeFactory.weaponcrafting(15, [
                    {code: Items.SprucePlank, quantity: 5},
                    {code: Items.Mushroom, quantity: 4},
                    {code: Items.GreenCloth, quantity: 2},
                    {code: Items.JasperCrystal, quantity: 1},
                ]);
            case Items.Battlestaff:
                return RecipeFactory.weaponcrafting(20, [
                    {code: Items.HardwoodPlank, quantity: 6},
                    {code: Items.Steel, quantity: 4},
                    {code: Items.WolfBone, quantity: 3},
                    {code: Items.BlueSlimeball, quantity: 5},
                ]);
            case Items.ForestWhip:
                return RecipeFactory.weaponcrafting(20, [
                    {code: Items.GreenSlimeball, quantity: 2},
                    {code: Items.Wolfhair, quantity: 5},
                    {code: Items.OgreEye, quantity: 4},
                    {code: Items.HardwoodPlank, quantity: 4},
                ]);
            case Items.HuntingBow:
                return RecipeFactory.weaponcrafting(20, [
                    {code: Items.HardwoodPlank, quantity: 5},
                    {code: Items.GreenCloth, quantity: 4},
                    {code: Items.OgreSkin, quantity: 3},
                    {code: Items.PigSkin, quantity: 3},
                ]);
            case Items.SkullStaff:
                return RecipeFactory.weaponcrafting(20, [
                    {code: Items.SkeletonSkull, quantity: 1},
                    {code: Items.SkeletonBone, quantity: 4},
                    {code: Items.Steel, quantity: 5},
                    {code: Items.HardwoodPlank, quantity: 5},
                ]);
            case Items.SteelBattleaxe:
                return RecipeFactory.weaponcrafting(20, [
                    {code: Items.Steel, quantity: 4},
                    {code: Items.HardwoodPlank, quantity: 4},
                    {code: Items.SkeletonBone, quantity: 4},
                    {code: Items.Wolfhair, quantity: 4},
                ]);
            case Items.DreadfulStaff:
                return RecipeFactory.weaponcrafting(25, [
                    {code: Items.CyclopsEye, quantity: 4},
                    {code: Items.VampireBlood, quantity: 5},
                    {code: Items.HardwoodPlank, quantity: 6},
                    {code: Items.JasperCrystal, quantity: 1},
                ]);
            case Items.SkullWand:
                return RecipeFactory.weaponcrafting(25, [
                    {code: Items.HardwoodPlank, quantity: 4},
                    {code: Items.SkeletonSkull, quantity: 3},
                    {code: Items.VampireTooth, quantity: 2},
                    {code: Items.SpiderLeg, quantity: 3},
                    {code: Items.JasperCrystal, quantity: 1},
                ]);
            case Items.VampireBow:
                return RecipeFactory.weaponcrafting(25, [
                    {code: Items.Steel, quantity: 4},
                    {code: Items.VampireBlood, quantity: 4},
                    {code: Items.SpiderLeg, quantity: 4},
                    {code: Items.LizardEye, quantity: 2},
                    {code: Items.MagicalCure, quantity: 1},
                ]);
            case Items.ElderwoodStaff:
                return RecipeFactory.weaponcrafting(30, [
                    {code: Items.DeadWoodPlank, quantity: 5},
                    {code: Items.LizardSkin, quantity: 4},
                    {code: Items.CyclopsEye, quantity: 5},
                    {code: Items.RedCloth, quantity: 3},
                    {code: Items.SkeletonSkull, quantity: 3},
                ]);
            case Items.EnchantedBow:
                return RecipeFactory.weaponcrafting(30, [
                    {code: Items.Gold, quantity: 8},
                    {code: Items.SpiderLeg, quantity: 3},
                    {code: Items.DemonHorn, quantity: 2},
                    {code: Items.OgreEye, quantity: 4},
                    {code: Items.RedCloth, quantity: 3},
                ]);
            case Items.GoldAxe:
                return RecipeFactory.weaponcrafting(30, [
                    {code: Items.DeadWoodPlank, quantity: 2},
                    {code: Items.Gold, quantity: 7},
                    {code: Items.Ruby, quantity: 1},
                    {code: Items.MagicalCure, quantity: 2},
                    {code: Items.RedCloth, quantity: 3},
                ]);
            case Items.GoldFishingRod:
                return RecipeFactory.weaponcrafting(30, [
                    {code: Items.DeadWoodPlank, quantity: 2},
                    {code: Items.Gold, quantity: 7},
                    {code: Items.Sapphire, quantity: 1},
                    {code: Items.MagicalCure, quantity: 2},
                    {code: Items.OwlbearClaw, quantity: 3},
                ]);
            case Items.GoldPickaxe:
                return RecipeFactory.weaponcrafting(30, [
                    {code: Items.DeadWoodPlank, quantity: 2},
                    {code: Items.Gold, quantity: 7},
                    {code: Items.Topaz, quantity: 1},
                    {code: Items.MagicalCure, quantity: 2},
                    {code: Items.DemonHorn, quantity: 2},
                ]);
            case Items.GoldSword:
                return RecipeFactory.weaponcrafting(30, [
                    {code: Items.Gold, quantity: 8},
                    {code: Items.VampireBlood, quantity: 4},
                    {code: Items.RedCloth, quantity: 3},
                    {code: Items.DemonHorn, quantity: 2},
                    {code: Items.DeadWoodPlank, quantity: 3},
                ]);
            case Items.GoldenGloves:
                return RecipeFactory.weaponcrafting(30, [
                    {code: Items.DeadWoodPlank, quantity: 7},
                    {code: Items.Obsidian, quantity: 2},
                    {code: Items.Emerald, quantity: 1},
                    {code: Items.MagicalCure, quantity: 2},
                    {code: Items.DemoniacDust, quantity: 3},
                ]);
            case Items.GreaterDreadfulStaff:
                return RecipeFactory.weaponcrafting(30, [
                    {code: Items.DeadWoodPlank, quantity: 5},
                    {code: Items.DreadfulStaff, quantity: 1},
                    {code: Items.OgreEye, quantity: 4},
                    {code: Items.CyclopsEye, quantity: 5},
                    {code: Items.RedCloth, quantity: 3},
                ]);
            case Items.ObsidianBattleaxe:
                return RecipeFactory.weaponcrafting(30, [
                    {code: Items.Obsidian, quantity: 7},
                    {code: Items.DeadWoodPlank, quantity: 4},
                    {code: Items.LizardSkin, quantity: 3},
                    {code: Items.CyclopsEye, quantity: 3},
                    {code: Items.DemoniacDust, quantity: 3},
                ]);
            case Items.CursedSceptre:
                return RecipeFactory.weaponcrafting(35, [
                    {code: Items.MagicalPlank, quantity: 8},
                    {code: Items.CursedBook, quantity: 3},
                    {code: Items.MagicStone, quantity: 3},
                    {code: Items.MaleficCloth, quantity: 3},
                    {code: Items.Diamond, quantity: 1},
                    {code: Items.MagicalCure, quantity: 2},
                ]);
            case Items.DiamondSword:
                return RecipeFactory.weaponcrafting(35, [
                    {code: Items.MagicalPlank, quantity: 7},
                    {code: Items.GoblinEye, quantity: 3},
                    {code: Items.SpiderLeg, quantity: 3},
                    {code: Items.MagicStone, quantity: 3},
                    {code: Items.Diamond, quantity: 1},
                    {code: Items.MagicalCure, quantity: 2},
                ]);
            case Items.DreadfulBattleaxe:
                return RecipeFactory.weaponcrafting(35, [
                    {code: Items.MagicalPlank, quantity: 7},
                    {code: Items.LizardEye, quantity: 4},
                    {code: Items.GoblinEye, quantity: 3},
                    {code: Items.GoblinTooth, quantity: 3},
                    {code: Items.JasperCrystal, quantity: 3},
                ]);
            case Items.MagicBow:
                return RecipeFactory.weaponcrafting(35, [
                    {code: Items.MagicalPlank, quantity: 7},
                    {code: Items.MagicStone, quantity: 3},
                    {code: Items.LizardSkin, quantity: 3},
                    {code: Items.Wolfhair, quantity: 3},
                    {code: Items.Sapphire, quantity: 1},
                    {code: Items.MagicalCure, quantity: 2},
                ]);
            case Items.StrangoldSword:
                return RecipeFactory.weaponcrafting(35, [
                    {code: Items.Strangold, quantity: 7},
                    {code: Items.GoblinTooth, quantity: 3},
                    {code: Items.DemoniacDust, quantity: 3},
                    {code: Items.MagicStone, quantity: 4},
                    {code: Items.MagicalCure, quantity: 2},
                ]);
            case Items.BladeofHell:
                return RecipeFactory.weaponcrafting(40, [
                    {code: Items.Strangold, quantity: 9},
                    {code: Items.EfreetCloth, quantity: 3},
                    {code: Items.BrokenSword, quantity: 1},
                    {code: Items.BookfromHell, quantity: 1},
                    {code: Items.OrcSkin, quantity: 6},
                ]);
            case Items.Bloodblade:
                return RecipeFactory.weaponcrafting(40, [
                    {code: Items.Mithril, quantity: 8},
                    {code: Items.GoblinTooth, quantity: 5},
                    {code: Items.WolfriderHair, quantity: 4},
                    {code: Items.BrokenSword, quantity: 1},
                    {code: Items.AstralyteCrystal, quantity: 2},
                ]);
            case Items.BowfromHell:
                return RecipeFactory.weaponcrafting(40, [
                    {code: Items.MagicalPlank, quantity: 8},
                    {code: Items.EfreetCloth, quantity: 3},
                    {code: Items.DemonHorn, quantity: 3},
                    {code: Items.BookfromHell, quantity: 1},
                    {code: Items.DemoniacDust, quantity: 4},
                ]);
            case Items.DemoniacDagger:
                return RecipeFactory.weaponcrafting(40, [
                    {code: Items.Strangold, quantity: 8},
                    {code: Items.EfreetCloth, quantity: 3},
                    {code: Items.Obsidian, quantity: 4},
                    {code: Items.BookfromHell, quantity: 1},
                    {code: Items.CursedBook, quantity: 4},
                ]);
            case Items.HellStaff:
                return RecipeFactory.weaponcrafting(40, [
                    {code: Items.CursedPlank, quantity: 8},
                    {code: Items.EfreetCloth, quantity: 3},
                    {code: Items.Obsidian, quantity: 4},
                    {code: Items.BookfromHell, quantity: 1},
                    {code: Items.DemoniacDust, quantity: 4},
                ]);
            case Items.LightningSword:
                return RecipeFactory.weaponcrafting(40, [
                    {code: Items.MaplePlank, quantity: 7},
                    {code: Items.GoblinEye, quantity: 5},
                    {code: Items.HellhoundHair, quantity: 4},
                    {code: Items.BrokenSword, quantity: 1},
                    {code: Items.MagicalCure, quantity: 3},
                ]);
            case Items.MithrilSword:
                return RecipeFactory.weaponcrafting(40, [
                    {code: Items.Mithril, quantity: 7},
                    {code: Items.MagicStone, quantity: 3},
                    {code: Items.BatWing, quantity: 4},
                    {code: Items.WolfriderHair, quantity: 3},
                    {code: Items.BrokenSword, quantity: 1},
                    {code: Items.AstralyteCrystal, quantity: 2},
                ]);
            case Items.Wrathsword:
                return RecipeFactory.weaponcrafting(40, [
                    {code: Items.Mithril, quantity: 7},
                    {code: Items.OrcSkin, quantity: 5},
                    {code: Items.BatWing, quantity: 4},
                    {code: Items.BrokenSword, quantity: 1},
                    {code: Items.MagicalCure, quantity: 3},
                ]);

            // MINING
            case Items.Copper:
                return RecipeFactory.mining(1, [
                    {code: Items.CopperOre, quantity: 10},
                ]);
            case Items.Iron:
                return RecipeFactory.mining(10, [
                    {code: Items.IronOre, quantity: 10},
                ]);
            case Items.Emerald:
                return RecipeFactory.mining(20, [
                    {code: Items.EmeraldStone, quantity: 10},
                ]);
            case Items.Ruby:
                return RecipeFactory.mining(20, [
                    {code: Items.RubyStone, quantity: 10},
                ]);
            case Items.Sapphire:
                return RecipeFactory.mining(20, [
                    {code: Items.SapphireStone, quantity: 10},
                ]);
            case Items.Steel:
                return RecipeFactory.mining(20, [
                    {code: Items.IronOre, quantity: 3},
                    {code: Items.Coal, quantity: 7},
                ]);
            case Items.Topaz:
                return RecipeFactory.mining(20, [
                    {code: Items.TopazStone, quantity: 10},
                ]);
            case Items.Gold:
                return RecipeFactory.mining(30, [
                    {code: Items.GoldOre, quantity: 10},
                ]);
            case Items.Obsidian:
                return RecipeFactory.mining(30, [
                    {code: Items.PieceofObsidian, quantity: 4},
                ]);
            case Items.Diamond:
                return RecipeFactory.mining(35, [
                    {code: Items.DiamondStone, quantity: 10},
                ]);
            case Items.Strangold:
                return RecipeFactory.mining(35, [
                    {code: Items.GoldOre, quantity: 4},
                    {code: Items.StrangeOre, quantity: 6},
                ]);
            case Items.Mithril:
                return RecipeFactory.mining(40, [
                    {code: Items.MithrilOre, quantity: 10},
                ]);


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
