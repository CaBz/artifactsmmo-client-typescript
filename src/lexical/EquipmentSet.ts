import {EquippableSlot} from "./EquippableSlot.js";
import {Items} from "./Items.js";

export const FireSet: any = {
    [EquippableSlot.Weapon]: [
        Items.DemoniacDagger, // 40 - attack_fire: 85, critical_strike: 35
        Items.Bloodblade, // 40 - attack_fire: 70, attack_air: 30, critical_strike: 5
        Items.MithrilSword, // 40 - attack_water: 70, attack_fire: 30, critical_strike: 5
        Items.SanguineEdgeofRosen, // 40 - attack_earth: 75, attack_fire: 25, critical_strike: 5
        Items.CursedSceptre, // 35 - attack_fire: 82, critical_strike: 35
        Items.StrangoldSword, // 35 - attack_fire: 45, attack_air: 40, critical_strike: 5
        Items.EnchantedBow, // 30 - attack_fire: 53, attack_water: 15, critical_strike: 35
        Items.ElderwoodStaff, // 30 - attack_water: 40, attack_fire: 40, critical_strike: 5
        Items.DeathKnightSword, // 30 - attack_fire: 37, attack_earth: 37, critical_strike: 24
        Items.VampireBow, // 25 - attack_fire: 36, critical_strike: 35
        Items.SkullWand, // 25 - attack_air: 25, attack_fire: 25, critical_strike: 5
        Items.SkullStaff, // 20 - attack_fire: 40, critical_strike: 5
        Items.HuntingBow, // 20 - attack_air: 15, attack_fire: 14, critical_strike: 35
        Items.Mushstaff, // 15 - attack_fire: 15, attack_earth: 15, critical_strike: 24
        Items.MultislimesSword, // 15 - attack_air: 8, attack_water: 8, attack_fire: 8, attack_earth: 8, critical_strike: 24
        Items.FireBow, // 10 - attack_fire: 17, critical_strike: 35
        Items.FireStaff, // 5 - attack_fire: 16, critical_strike: 5
    ],

    [EquippableSlot.Shield]: [
        Items.FireShield, // 40 - res_fire: 20, res_air: -5
        Items.MithrilShield, // 40 - res_fire: 15, res_air: 15
        Items.GoldShield, // 30 - res_fire: 10, res_earth: 10, res_water: 10, res_air: 10
        Items.SteelShield, // 20 - res_fire: 7, res_earth: 7, res_water: 7, res_air: 7
        Items.SlimeShield, // 10 - res_fire: 4, res_earth: 4, res_water: 4, res_air: 4
        Items.WoodenShield, // 1 - res_fire: 2, res_earth: 2, res_water: 2, res_air: 2
    ],

    [EquippableSlot.Helmet]: [
        Items.CultistHat, // 40 - hp: 200, dmg_fire: 30, dmg_air: 20, critical_strike: 3
        Items.MithrilHelm, // 40 - hp: 200, dmg_water: 30, dmg_fire: 20, prospecting: 20
        Items.CursedHat, // 35 - hp: 170, dmg_fire: 35
        Items.LichCrown, // 30 - hp: 180, critical_strike: 5, wisdom: 20, dmg_fire: 20, dmg_earth: 20
        Items.ObsidianHelmet, // 30 - hp: 170, dmg_fire: 22, dmg_water: 22, prospecting: 30, critical_strike: 3, inventory_space: -25
        Items.RoyalSkeletonHelmet, // 30 - hp: 160, dmg_fire: 20, dmg_air: 20, wisdom: 20
        Items.PiggyHelmet, // 25 - hp: 110, dmg_fire: 20, critical_strike: 3
        Items.TromatisingMask, // 20 - hp: 90, dmg_fire: 16, wisdom: 25
        Items.MushmushWizardHat, // 15 - dmg_fire: 10, dmg_earth: 10, hp: 50, critical_strike: 3
        Items.IronHelm, // 10 - hp: 40, dmg_fire: 5, dmg_earth: 5, res_fire: 4, res_earth: 4
    ],

    [EquippableSlot.BodyArmor]: [
        Items.CultistCloak, // 40 - hp: 180, dmg_air: 28, dmg_fire: 20, res_air: 7, res_water: 7, prospecting: 30
        Items.MithrilPlatebody, // 40 - hp: 180, dmg_fire: 28, dmg_water: 22, res_fire: 7, res_earth: 7, prospecting: 30
        Items.WhiteKnightArmor, // 40 - hp: 180, dmg_earth: 28, dmg_air: 20, res_earth: 7, res_fire: 7, prospecting: 30
        Items.MaleficArmor, // 35 - hp: 170, dmg_fire: 26, res_fire: 10, critical_strike: 5
        Items.StrangoldArmor, // 35 - hp: 150, dmg_air: 24, dmg_water: 18, res_water: 6, res_fire: 6
        Items.ObsidianArmor, // 30 - hp: 180, dmg_earth: 22, dmg_air: 22, res_fire: 5, res_water: 5, inventory_space: -25
        Items.RoyalSkeletonArmor, // 30 - hp: 150, dmg_fire: 20, dmg_air: 20, res_air: 6, res_fire: 6
        Items.BanditArmor, // 25 - hp: 160, dmg_fire: 20, dmg_earth: 20, res_earth: 6, res_water: 6, critical_strike: 5
        Items.LizardSkinArmor, // 25 - hp: 150, dmg_water: 22, res_water: 10, res_fire: 5, prospecting: 30
        Items.PiggyArmor, // 25 - hp: 150, dmg_fire: 22, res_fire: 10, res_earth: 5, wisdom: 30
        Items.SkeletonArmor, // 20 - hp: 90, dmg_fire: 15, dmg_air: 15, res_fire: 5, res_air: 5
        Items.IronArmor, // 10 - hp: 50, dmg_earth: 8, dmg_fire: 8, res_water: 2, res_air: 2
        Items.LeatherArmor, // 10 - hp: 50, dmg_air: 8, dmg_water: 8, res_fire: 2, res_earth: 2
        Items.CopperArmor, // 5 - hp: 25, dmg_earth: 5, dmg_fire: 5
    ],

    [EquippableSlot.LegArmor]: [
        Items.CultistPants, // 40 - hp: 180, haste: 6, dmg_fire: 24, dmg_air: 20, res_fire: 7, res_water: 7
        Items.MithrilPlatelegs, // 40 - hp: 180, haste: 6, dmg_water: 24, dmg_fire: 20, res_air: 7, res_water: 7
        Items.WhiteKnightPants, // 40 - hp: 180, haste: 6, dmg_air: 24, dmg_earth: 20, res_air: 7, res_fire: 7
        Items.Wrathpants, // 40 - hp: 180, haste: 6, dmg_earth: 24, dmg_water: 20, res_fire: 7, res_earth: 7
        Items.RoyalSkeletonPants, // 30 - hp: 150, haste: 5, dmg_fire: 17, dmg_air: 17, res_earth: 7, res_water: 7
        Items.LizardSkinLegsArmor, // 25 - hp: 140, haste: 3, dmg_water: 17, res_water: 6, res_fire: 3
        Items.PiggyPants, // 25 - hp: 140, haste: 3, dmg_fire: 17, res_fire: 6, res_water: 3
        Items.SkeletonPants, // 20 - hp: 80, haste: 2, dmg_fire: 10, dmg_air: 10, res_fire: 6
        Items.IronLegsArmor, // 10 - hp: 50, haste: 1, dmg_fire: 5, dmg_earth: 5
    ],

    [EquippableSlot.Boots]: [
        Items.CultistBoots, // 40 - hp: 160, dmg_fire: 8, dmg_earth: 8, res_air: 8, res_water: 8, haste: 7
        Items.MithrilBoots, // 40 - hp: 160, dmg_air: 8, dmg_water: 8, res_fire: 8, res_earth: 8, haste: 7
        Items.GoldBoots, // 30 - hp: 110, dmg_fire: 5, dmg_air: 5, res_earth: 8, res_air: 8, haste: 7
        Items.LizardBoots, // 30 - hp: 110, dmg_water: 5, dmg_earth: 5, res_air: 8, res_fire: 8, haste: 7
        Items.SteelBoots, // 20 - hp: 80, res_earth: 8, res_fire: 8, haste: 6
        Items.LeatherBoots, // 10 - hp: 40, res_fire: 5, res_earth: 5, haste: 3
    ],

    [EquippableSlot.Amulet]: [
        Items.GreaterRubyAmulet, // 40 - hp: 130, dmg_fire: 30, critical_strike: 3
        Items.MagicStoneAmulet, // 35 - hp: 100, dmg_fire: 20, dmg_air: 10
        Items.MasterfulNecklace, // 35 - hp: 100, dmg_earth: 20, dmg_fire: 10
        Items.LostAmulet, // 30 - hp: 90, dmg_fire: 15, dmg_air: 15
        Items.RubyAmulet, // 25 - hp: 70, dmg_fire: 18
        Items.SkullAmulet, // 20 - hp: 40, dmg_air: 10, dmg_fire: 10
        Items.FireEarthAmulet, // 10 - hp: 20, dmg_fire: 5, dmg_earth: 5
    ],

    [EquippableSlot.Ring1]: [
        Items.CelestRing, // 40 - dmg_fire: 20, dmg_water: 20, prospecting: 30
        Items.SacredRing, // 40 - dmg_fire: 20, dmg_air: 20, prospecting: 30
        Items.RubyRing, // 30 - dmg_fire: 7, dmg: 17, critical_strike: 3
        Items.SkullRing, // 20 - hp: 20, dmg_fire: 11, dmg_air: 11
        Items.FireRing, // 15 - dmg_fire: 8
    ],

    [EquippableSlot.Ring2]: [
        Items.CelestRing, // 40 - dmg_fire: 20, dmg_water: 20, prospecting: 30
        Items.SacredRing, // 40 - dmg_fire: 20, dmg_air: 20, prospecting: 30
        Items.RubyRing, // 30 - dmg_fire: 7, dmg: 17, critical_strike: 3
        Items.SkullRing, // 20 - hp: 20, dmg_fire: 11, dmg_air: 11
        Items.FireRing, // 15 - dmg_fire: 8
    ],

    [EquippableSlot.Artifact1]: [
        Items.RubyBook, // 40 - dmg_fire: 20
    ],

    [EquippableSlot.Artifact2]: [
        Items.RubyBook, // 40 - dmg_fire: 20
    ],

    [EquippableSlot.Artifact3]: [
        Items.RubyBook, // 40 - dmg_fire: 20
    ],
}

export const AirSet: any = {
    [EquippableSlot.Weapon]: [
        Items.BowfromHell, // 40 - attack_air: 106, critical_strike: 24
        Items.LightningSword, // 40 - attack_air: 50, attack_earth: 22, critical_strike: 35
        Items.Bloodblade, // 40 - attack_fire: 70, attack_air: 30, critical_strike: 5
        Items.FrozenGloves, // 40 - attack_air: 5, alchemy: -30
        Items.MagicBow, // 35 - attack_air: 47, attack_water: 14, critical_strike: 35
        Items.StrangoldSword, // 35 - attack_fire: 45, attack_air: 40, critical_strike: 5
        Items.GoldSword, // 30 - attack_earth: 60, attack_air: 20, critical_strike: 5
        Items.SkullWand, // 25 - attack_air: 25, attack_fire: 25, critical_strike: 5
        Items.ForestWhip, // 20 - attack_air: 40, critical_strike: 5
        Items.HuntingBow, // 20 - attack_air: 15, attack_fire: 14, critical_strike: 35
        Items.HighwaymanDagger, // 15 - attack_air: 23, critical_strike: 35
        Items.MushmushBow, // 15 - attack_air: 12, attack_water: 12, critical_strike: 35
        Items.MultislimesSword, // 15 - attack_air: 8, attack_water: 8, attack_fire: 8, attack_earth: 8, critical_strike: 24
        Items.IronDagger, // 10 - attack_air: 17, critical_strike: 35
        Items.LeatherGloves, // 10 - attack_air: 5, alchemy: -10
        Items.StickyDagger, // 5 - attack_air: 12, critical_strike: 35
        Items.CopperDagger, // 1 - attack_air: 6, critical_strike: 35
    ],

    [EquippableSlot.Shield]: [
        Items.AirShield, // 40 - res_air: 20, res_fire: -5
        Items.MithrilShield, // 40 - res_fire: 15, res_air: 15
        Items.WhiteKnightShield, // 40 - res_earth: 15, res_air: 15
        Items.GoldShield, // 30 - res_fire: 10, res_earth: 10, res_water: 10, res_air: 10
        Items.SteelShield, // 20 - res_fire: 7, res_earth: 7, res_water: 7, res_air: 7
        Items.SlimeShield, // 10 - res_fire: 4, res_earth: 4, res_water: 4, res_air: 4
        Items.WoodenShield, // 1 - res_fire: 2, res_earth: 2, res_water: 2, res_air: 2
    ],

    [EquippableSlot.Helmet]: [
        Items.CultistHat, // 40 - hp: 200, dmg_fire: 30, dmg_air: 20, critical_strike: 3
        Items.HorkHelmet, // 40 - hp: 200, dmg_air: 40, critical_strike: 8, res_water: -5, res_air: -5
        Items.WhiteKnightHelmet, // 40 - hp: 200, dmg_air: 30, dmg_earth: 20, critical_strike: 3
        Items.StrangoldHelmet, // 35 - hp: 170, dmg_air: 22, dmg_water: 22
        Items.GoldMask, // 30 - hp: 160, dmg_earth: 20, dmg_air: 20, wisdom: 20
        Items.RoyalSkeletonHelmet, // 30 - hp: 160, dmg_fire: 20, dmg_air: 20, wisdom: 20
        Items.SkeletonHelmet, // 20 - hp: 90, dmg_air: 16, wisdom: 25
        Items.LuckyWizardHat, // 15 - dmg_air: 10, dmg_water: 10, hp: 50, critical_strike: 3
        Items.LeatherHat, // 10 - hp: 40, dmg_air: 5, dmg_water: 5, res_water: 4, res_air: 4
    ],

    [EquippableSlot.BodyArmor]: [
        Items.CultistCloak, // 40 - hp: 180, dmg_air: 28, dmg_fire: 20, res_air: 7, res_water: 7, prospecting: 30
        Items.WhiteKnightArmor, // 40 - hp: 180, dmg_earth: 28, dmg_air: 20, res_earth: 7, res_fire: 7, prospecting: 30
        Items.Wratharmor, // 40 - hp: 180, dmg_water: 28, dmg_earth: 20, res_water: 7, res_air: 7, prospecting: 30
        Items.StrangoldArmor, // 35 - hp: 150, dmg_air: 24, dmg_water: 18, res_water: 6, res_fire: 6
        Items.ObsidianArmor, // 30 - hp: 180, dmg_earth: 22, dmg_air: 22, res_fire: 5, res_water: 5, inventory_space: -25
        Items.RoyalSkeletonArmor, // 30 - hp: 150, dmg_fire: 20, dmg_air: 20, res_air: 6, res_fire: 6
        Items.SerpentSkinArmor, // 25 - hp: 150, dmg_air: 22, res_air: 10, res_earth: 5, wisdom: 30
        Items.SkeletonArmor, // 20 - hp: 90, dmg_fire: 15, dmg_air: 15, res_fire: 5, res_air: 5
        Items.IronArmor, // 10 - hp: 50, dmg_earth: 8, dmg_fire: 8, res_water: 2, res_air: 2
        Items.LeatherArmor, // 10 - hp: 50, dmg_air: 8, dmg_water: 8, res_fire: 2, res_earth: 2
        Items.FeatherCoat, // 5 - hp: 25, dmg_air: 5, dmg_water: 5
    ],

    [EquippableSlot.LegArmor]: [
        Items.CultistPants, // 40 - hp: 180, haste: 6, dmg_fire: 24, dmg_air: 20, res_fire: 7, res_water: 7
        Items.MithrilPlatelegs, // 40 - hp: 180, haste: 6, dmg_water: 24, dmg_fire: 20, res_air: 7, res_water: 7
        Items.WhiteKnightPants, // 40 - hp: 180, haste: 6, dmg_air: 24, dmg_earth: 20, res_air: 7, res_fire: 7
        Items.StrangoldLegsArmor, // 35 - hp: 150, haste: 5, dmg_air: 18, dmg_water: 20, res_water: 7, res_air: 7
        Items.GoldPlatelegs, // 30 - hp: 150, haste: 5, dmg_earth: 17, dmg_air: 17, res_earth: 7, res_air: 7
        Items.RoyalSkeletonPants, // 30 - hp: 150, haste: 5, dmg_fire: 17, dmg_air: 17, res_earth: 7, res_water: 7
        Items.SerpentSkinLegsArmor, // 25 - hp: 140, haste: 3, dmg_air: 17, res_air: 6, res_earth: 3
        Items.SkeletonPants, // 20 - hp: 80, haste: 2, dmg_fire: 10, dmg_air: 10, res_fire: 6
        Items.LeatherLegsArmor, // 10 - hp: 50, haste: 1, dmg_air: 5, dmg_water: 5
    ],

    [EquippableSlot.Boots]: [
        Items.CultistBoots, // 40 - hp: 160, dmg_fire: 8, dmg_earth: 8, res_air: 8, res_water: 8, haste: 7
        Items.MithrilBoots, // 40 - hp: 160, dmg_air: 8, dmg_water: 8, res_fire: 8, res_earth: 8, haste: 7
        Items.GoldBoots, // 30 - hp: 110, dmg_fire: 5, dmg_air: 5, res_earth: 8, res_air: 8, haste: 7
        Items.LizardBoots, // 30 - hp: 110, dmg_water: 5, dmg_earth: 5, res_air: 8, res_fire: 8, haste: 7
        Items.SerpentSkinBoots, // 20 - hp: 80, res_water: 8, res_air: 8, haste: 6
        Items.IronBoots, // 10 - hp: 40, res_water: 5, res_air: 5, haste: 3
    ],

    [EquippableSlot.Amulet]: [
        Items.GreaterEmeraldAmulet, // 40 - hp: 130, dmg_air: 30, critical_strike: 3
        Items.AncestralTalisman, // 35 - hp: 100, dmg_air: 20, dmg_water: 10
        Items.MagicStoneAmulet, // 35 - hp: 100, dmg_fire: 20, dmg_air: 10
        Items.LostAmulet, // 30 - hp: 90, dmg_fire: 15, dmg_air: 15
        Items.EmeraldAmulet, // 25 - hp: 70, dmg_air: 18
        Items.SkullAmulet, // 20 - hp: 40, dmg_air: 10, dmg_fire: 10
        Items.AirWaterAmulet, // 10 - hp: 20, dmg_water: 5, dmg_air: 5
    ],

    [EquippableSlot.Ring1]: [
        Items.EternityRing, // 40 - dmg_air: 20, dmg_earth: 20, prospecting: 30
        Items.SacredRing, // 40 - dmg_fire: 20, dmg_air: 20, prospecting: 30
        Items.EmeraldRing, // 30 - dmg_air: 7, dmg: 17, critical_strike: 3
        Items.SkullRing, // 20 - hp: 20, dmg_fire: 11, dmg_air: 11
        Items.AirRing, // 15 - dmg_air: 8
    ],

    [EquippableSlot.Ring2]: [
        Items.EternityRing, // 40 - dmg_air: 20, dmg_earth: 20, prospecting: 30
        Items.SacredRing, // 40 - dmg_fire: 20, dmg_air: 20, prospecting: 30
        Items.EmeraldRing, // 30 - dmg_air: 7, dmg: 17, critical_strike: 3
        Items.SkullRing, // 20 - hp: 20, dmg_fire: 11, dmg_air: 11
        Items.AirRing, // 15 - dmg_air: 8
    ],

    [EquippableSlot.Artifact1]: [
        Items.EmeraldBook, // 40 - dmg_air: 20
    ],

    [EquippableSlot.Artifact2]: [
        Items.EmeraldBook, // 40 - dmg_air: 20
    ],

    [EquippableSlot.Artifact3]: [
        Items.EmeraldBook, // 40 - dmg_air: 20
    ],
}

export const WaterSet: any = {
    [EquippableSlot.Weapon]: [
        Items.HellStaff, // 40 - attack_water: 115, critical_strike: 5
        Items.MithrilSword, // 40 - attack_water: 70, attack_fire: 30, critical_strike: 5
        Items.Wrathsword, // 40 - attack_earth: 70, attack_water: 30, critical_strike: 5
        Items.FrozenFishingRod, // 40 - attack_water: 5, fishing: -30
        Items.DiamondSword, // 35 - attack_water: 75, critical_strike: 24
        Items.DreadfulBattleaxe, // 35 - attack_water: 65, attack_earth: 20, critical_strike: 5
        Items.MagicBow, // 35 - attack_air: 47, attack_water: 14, critical_strike: 35
        Items.GreaterDreadfulStaff, // 30 - attack_water: 60, attack_earth: 20, critical_strike: 5
        Items.ElderwoodStaff, // 30 - attack_water: 40, attack_fire: 40, critical_strike: 5
        Items.EnchantedBow, // 30 - attack_fire: 53, attack_water: 15, critical_strike: 35
        Items.GoldFishingRod, // 30 - attack_water: 5, fishing: -20
        Items.DreadfulStaff, // 25 - attack_water: 25, attack_earth: 25, critical_strike: 5
        Items.Battlestaff, // 20 - attack_water: 40, critical_strike: 5
        Items.MushmushBow, // 15 - attack_air: 12, attack_water: 12, critical_strike: 35
        Items.MultislimesSword, // 15 - attack_air: 8, attack_water: 8, attack_fire: 8, attack_earth: 8, critical_strike: 24
        Items.GreaterWoodenStaff, // 10 - attack_water: 24, critical_strike: 5
        Items.SpruceFishingRod, // 10 - attack_water: 5, fishing: -10
        Items.WaterBow, // 5 - attack_water: 16, critical_strike: 35
    ],

    [EquippableSlot.Shield]: [
        Items.WaterShield, // 40 - res_water: 20, res_earth: -10
        Items.DreadfulShield, // 35 - res_water: 15, res_earth: 15, res_fire: -10, res_air: -10
        Items.GoldShield, // 30 - res_fire: 10, res_earth: 10, res_water: 10, res_air: 10
        Items.SteelShield, // 20 - res_fire: 7, res_earth: 7, res_water: 7, res_air: 7
        Items.SlimeShield, // 10 - res_fire: 4, res_earth: 4, res_water: 4, res_air: 4
        Items.WoodenShield, // 1 - res_fire: 2, res_earth: 2, res_water: 2, res_air: 2
    ],

    [EquippableSlot.Helmet]: [
        Items.MithrilHelm, // 40 - hp: 200, dmg_water: 30, dmg_fire: 20, prospecting: 20
        Items.Wrathelmet, // 40 - hp: 200, dmg_earth: 30, dmg_water: 20, prospecting: 20
        Items.JesterHat, // 35 - hp: 150, dmg_water: 15, dmg: 15, critical_strike: 8
        Items.StrangoldHelmet, // 35 - hp: 170, dmg_air: 22, dmg_water: 22
        Items.GoldHelm, // 30 - hp: 160, dmg_water: 20, dmg_earth: 20, wisdom: 20
        Items.ObsidianHelmet, // 30 - hp: 170, dmg_fire: 22, dmg_water: 22, prospecting: 30, critical_strike: 3, inventory_space: -25
        Items.MagicWizardHat, // 20 - hp: 90, dmg_water: 16, wisdom: 25
        Items.LuckyWizardHat, // 15 - dmg_air: 10, dmg_water: 10, hp: 50, critical_strike: 3
        Items.LeatherHat, // 10 - hp: 40, dmg_air: 5, dmg_water: 5, res_water: 4, res_air: 4
    ],

    [EquippableSlot.BodyArmor]: [
        Items.CultistCloak, // 40 - hp: 180, dmg_air: 28, dmg_fire: 20, res_air: 7, res_water: 7, prospecting: 30
        Items.MithrilPlatebody, // 40 - hp: 180, dmg_fire: 28, dmg_water: 22, res_fire: 7, res_earth: 7, prospecting: 30
        Items.Wratharmor, // 40 - hp: 180, dmg_water: 28, dmg_earth: 20, res_water: 7, res_air: 7, prospecting: 30
        Items.DreadfulArmor, // 35 - hp: 170, dmg_water: 26, res_water: 10, critical_strike: 5
        Items.StrangoldArmor, // 35 - hp: 150, dmg_air: 24, dmg_water: 18, res_water: 6, res_fire: 6
        Items.GoldPlatebody, // 30 - hp: 150, dmg_earth: 20, dmg_water: 20, res_water: 6, res_earth: 6
        Items.ObsidianArmor, // 30 - hp: 180, dmg_earth: 22, dmg_air: 22, res_fire: 5, res_water: 5, inventory_space: -25
        Items.BanditArmor, // 25 - hp: 160, dmg_fire: 20, dmg_earth: 20, res_earth: 6, res_water: 6, critical_strike: 5
        Items.LizardSkinArmor, // 25 - hp: 150, dmg_water: 22, res_water: 10, res_fire: 5, prospecting: 30
        Items.StormforgedArmor, // 25 - hp: 150, dmg_earth: 22, res_earth: 10, res_water: 5, prospecting: 30
        Items.SteelArmor, // 20 - hp: 90, dmg_earth: 15, dmg_water: 15, res_earth: 5, res_water: 5
        Items.IronArmor, // 10 - hp: 50, dmg_earth: 8, dmg_fire: 8, res_water: 2, res_air: 2
        Items.LeatherArmor, // 10 - hp: 50, dmg_air: 8, dmg_water: 8, res_fire: 2, res_earth: 2
        Items.FeatherCoat, // 5 - hp: 25, dmg_air: 5, dmg_water: 5
    ],

    [EquippableSlot.LegArmor]: [
        Items.CultistPants, // 40 - hp: 180, haste: 6, dmg_fire: 24, dmg_air: 20, res_fire: 7, res_water: 7
        Items.MithrilPlatelegs, // 40 - hp: 180, haste: 6, dmg_water: 24, dmg_fire: 20, res_air: 7, res_water: 7
        Items.Wrathpants, // 40 - hp: 180, haste: 6, dmg_earth: 24, dmg_water: 20, res_fire: 7, res_earth: 7
        Items.StrangoldLegsArmor, // 35 - hp: 150, haste: 5, dmg_air: 18, dmg_water: 20, res_water: 7, res_air: 7
        Items.ObsidianLegsArmor, // 30 - hp: 170, haste: 3, dmg_water: 18, dmg_earth: 18, critical_strike: 3, inventory_space: -25
        Items.RoyalSkeletonPants, // 30 - hp: 150, haste: 5, dmg_fire: 17, dmg_air: 17, res_earth: 7, res_water: 7
        Items.LizardSkinLegsArmor, // 25 - hp: 140, haste: 3, dmg_water: 17, res_water: 6, res_fire: 3
        Items.PiggyPants, // 25 - hp: 140, haste: 3, dmg_fire: 17, res_fire: 6, res_water: 3
        Items.StormforgedPants, // 25 - hp: 140, haste: 3, dmg_earth: 17, res_earth: 6, res_water: 3
        Items.SteelLegsArmor, // 20 - hp: 80, haste: 2, dmg_water: 10, dmg_earth: 10, res_water: 6
        Items.LeatherLegsArmor, // 10 - hp: 50, haste: 1, dmg_air: 5, dmg_water: 5
    ],

    [EquippableSlot.Boots]: [
        Items.CultistBoots, // 40 - hp: 160, dmg_fire: 8, dmg_earth: 8, res_air: 8, res_water: 8, haste: 7
        Items.MithrilBoots, // 40 - hp: 160, dmg_air: 8, dmg_water: 8, res_fire: 8, res_earth: 8, haste: 7
        Items.LizardBoots, // 30 - hp: 110, dmg_water: 5, dmg_earth: 5, res_air: 8, res_fire: 8, haste: 7
        Items.SerpentSkinBoots, // 20 - hp: 80, res_water: 8, res_air: 8, haste: 6
        Items.IronBoots, // 10 - hp: 40, res_water: 5, res_air: 5, haste: 3
    ],

    [EquippableSlot.Amulet]: [
        Items.GreaterSapphireAmulet, // 40 - hp: 130, dmg_water: 30, critical_strike: 3
        Items.AncestralTalisman, // 35 - hp: 100, dmg_air: 20, dmg_water: 10
        Items.DiamondAmulet, // 35 - hp: 100, dmg_water: 20, dmg_earth: 10
        Items.GreaterDreadfulAmulet, // 30 - hp: 90, dmg_earth: 15, dmg_water: 15
        Items.SapphireAmulet, // 25 - hp: 70, dmg_water: 18
        Items.DreadfulAmulet, // 20 - hp: 40, dmg_water: 10, dmg_earth: 10
        Items.AirWaterAmulet, // 10 - hp: 20, dmg_water: 5, dmg_air: 5
    ],

    [EquippableSlot.Ring1]: [
        Items.CelestRing, // 40 - dmg_fire: 20, dmg_water: 20, prospecting: 30
        Items.DivinityRing, // 40 - dmg_earth: 20, dmg_water: 20, prospecting: 30
        Items.SapphireRing, // 30 - dmg_water: 7, dmg: 17, critical_strike: 3
        Items.DreadfulRing, // 20 - hp: 20, dmg_earth: 11, dmg_water: 11
        Items.WaterRing, // 15 - dmg_water: 8
    ],

    [EquippableSlot.Ring2]: [
        Items.CelestRing, // 40 - dmg_fire: 20, dmg_water: 20, prospecting: 30
        Items.DivinityRing, // 40 - dmg_earth: 20, dmg_water: 20, prospecting: 30
        Items.SapphireRing, // 30 - dmg_water: 7, dmg: 17, critical_strike: 3
        Items.DreadfulRing, // 20 - hp: 20, dmg_earth: 11, dmg_water: 11
        Items.WaterRing, // 15 - dmg_water: 8
    ],

    [EquippableSlot.Artifact1]: [
        Items.SapphireBook, // 40 - dmg_water: 20
    ],

    [EquippableSlot.Artifact2]: [
        Items.SapphireBook, // 40 - dmg_water: 20
    ],

    [EquippableSlot.Artifact3]: [
        Items.SapphireBook, // 40 - dmg_water: 20
    ],
}

export const EarthSet: any = {
    [EquippableSlot.Weapon]: [
        Items.BladeofHell, // 40 - attack_earth: 115, critical_strike: 5
        Items.SanguineEdgeofRosen, // 40 - attack_earth: 75, attack_fire: 25, critical_strike: 5
        Items.Wrathsword, // 40 - attack_earth: 70, attack_water: 30, critical_strike: 5
        Items.LightningSword, // 40 - attack_air: 50, attack_earth: 22, critical_strike: 35
        Items.FrozenAxe, // 40 - attack_earth: 5, woodcutting: -30
        Items.FrozenPickaxe, // 40 - attack_earth: 5, mining: -30
        Items.DreadfulBattleaxe, // 35 - attack_water: 65, attack_earth: 20, critical_strike: 5
        Items.ObsidianBattleaxe, // 30 - attack_earth: 80, inventory_space: -25, critical_strike: 5
        Items.GoldSword, // 30 - attack_earth: 60, attack_air: 20, critical_strike: 5
        Items.DeathKnightSword, // 30 - attack_fire: 37, attack_earth: 37, critical_strike: 24
        Items.GreaterDreadfulStaff, // 30 - attack_water: 60, attack_earth: 20, critical_strike: 5
        Items.GoldAxe, // 30 - attack_earth: 5, woodcutting: -20
        Items.GoldPickaxe, // 30 - attack_earth: 5, mining: -20
        Items.GoldenGloves, // 30 - attack_earth: 5, alchemy: -20
        Items.WoodenClub, // 25 - attack_earth: 36, critical_strike: 35
        Items.DreadfulStaff, // 25 - attack_water: 25, attack_earth: 25, critical_strike: 5
        Items.SteelBattleaxe, // 20 - attack_earth: 40, critical_strike: 5
        Items.Mushstaff, // 15 - attack_fire: 15, attack_earth: 15, critical_strike: 24
        Items.MultislimesSword, // 15 - attack_air: 8, attack_water: 8, attack_fire: 8, attack_earth: 8, critical_strike: 24
        Items.IronSword, // 10 - attack_earth: 24, critical_strike: 5
        Items.IronAxe, // 10 - attack_earth: 5, woodcutting: -10
        Items.IronPickaxe, // 10 - attack_earth: 5, mining: -10
        Items.StickySword, // 5 - attack_earth: 16, critical_strike: 5
        Items.WoodenStaff, // 1 - attack_earth: 8, critical_strike: 5
        Items.WoodenStick, // 1 - attack_earth: 4, critical_strike: 5
    ],

    [EquippableSlot.Shield]: [
        Items.EarthShield, // 40 - res_earth: 20, res_water: -10
        Items.WhiteKnightShield, // 40 - res_earth: 15, res_air: 15
        Items.DreadfulShield, // 35 - res_water: 15, res_earth: 15, res_fire: -10, res_air: -10
        Items.GoldShield, // 30 - res_fire: 10, res_earth: 10, res_water: 10, res_air: 10
        Items.SteelShield, // 20 - res_fire: 7, res_earth: 7, res_water: 7, res_air: 7
        Items.SlimeShield, // 10 - res_fire: 4, res_earth: 4, res_water: 4, res_air: 4
        Items.WoodenShield, // 1 - res_fire: 2, res_earth: 2, res_water: 2, res_air: 2
    ],

    [EquippableSlot.Helmet]: [
        Items.BatwingHelmet, // 40 - hp: 200, dmg_earth: 40, critical_strike: 8, res_fire: -5, res_earth: -5
        Items.WhiteKnightHelmet, // 40 - hp: 200, dmg_air: 30, dmg_earth: 20, critical_strike: 3
        Items.Wrathelmet, // 40 - hp: 200, dmg_earth: 30, dmg_water: 20, prospecting: 20
        Items.GoldHelm, // 30 - hp: 160, dmg_water: 20, dmg_earth: 20, wisdom: 20
        Items.GoldMask, // 30 - hp: 160, dmg_earth: 20, dmg_air: 20, wisdom: 20
        Items.LichCrown, // 30 - hp: 180, critical_strike: 5, wisdom: 20, dmg_fire: 20, dmg_earth: 20
        Items.SteelHelm, // 20 - hp: 90, dmg_earth: 16
        Items.MushmushWizardHat, // 15 - dmg_fire: 10, dmg_earth: 10, hp: 50, critical_strike: 3
        Items.IronHelm, // 10 - hp: 40, dmg_fire: 5, dmg_earth: 5, res_fire: 4, res_earth: 4
    ],

    [EquippableSlot.BodyArmor]: [
        Items.MithrilPlatebody, // 40 - hp: 180, dmg_fire: 28, dmg_water: 22, res_fire: 7, res_earth: 7, prospecting: 30
        Items.WhiteKnightArmor, // 40 - hp: 180, dmg_earth: 28, dmg_air: 20, res_earth: 7, res_fire: 7, prospecting: 30
        Items.Wratharmor, // 40 - hp: 180, dmg_water: 28, dmg_earth: 20, res_water: 7, res_air: 7, prospecting: 30
        Items.GoldPlatebody, // 30 - hp: 150, dmg_earth: 20, dmg_water: 20, res_water: 6, res_earth: 6
        Items.ObsidianArmor, // 30 - hp: 180, dmg_earth: 22, dmg_air: 22, res_fire: 5, res_water: 5, inventory_space: -25
        Items.BanditArmor, // 25 - hp: 160, dmg_fire: 20, dmg_earth: 20, res_earth: 6, res_water: 6, critical_strike: 5
        Items.PiggyArmor, // 25 - hp: 150, dmg_fire: 22, res_fire: 10, res_earth: 5, wisdom: 30
        Items.SerpentSkinArmor, // 25 - hp: 150, dmg_air: 22, res_air: 10, res_earth: 5, wisdom: 30
        Items.StormforgedArmor, // 25 - hp: 150, dmg_earth: 22, res_earth: 10, res_water: 5, prospecting: 30
        Items.SteelArmor, // 20 - hp: 90, dmg_earth: 15, dmg_water: 15, res_earth: 5, res_water: 5
        Items.IronArmor, // 10 - hp: 50, dmg_earth: 8, dmg_fire: 8, res_water: 2, res_air: 2
        Items.LeatherArmor, // 10 - hp: 50, dmg_air: 8, dmg_water: 8, res_fire: 2, res_earth: 2
        Items.CopperArmor, // 5 - hp: 25, dmg_earth: 5, dmg_fire: 5
    ],

    [EquippableSlot.LegArmor]: [
        Items.WhiteKnightPants, // 40 - hp: 180, haste: 6, dmg_air: 24, dmg_earth: 20, res_air: 7, res_fire: 7
        Items.Wrathpants, // 40 - hp: 180, haste: 6, dmg_earth: 24, dmg_water: 20, res_fire: 7, res_earth: 7
        Items.AncientJean, // 35 - hp: 150, haste: 5, dmg_earth: 22, res_earth: 10, res_fire: -10, critical_strike: 6
        Items.GoldPlatelegs, // 30 - hp: 150, haste: 5, dmg_earth: 17, dmg_air: 17, res_earth: 7, res_air: 7
        Items.ObsidianLegsArmor, // 30 - hp: 170, haste: 3, dmg_water: 18, dmg_earth: 18, critical_strike: 3, inventory_space: -25
        Items.RoyalSkeletonPants, // 30 - hp: 150, haste: 5, dmg_fire: 17, dmg_air: 17, res_earth: 7, res_water: 7
        Items.SerpentSkinLegsArmor, // 25 - hp: 140, haste: 3, dmg_air: 17, res_air: 6, res_earth: 3
        Items.StormforgedPants, // 25 - hp: 140, haste: 3, dmg_earth: 17, res_earth: 6, res_water: 3
        Items.SteelLegsArmor, // 20 - hp: 80, haste: 2, dmg_water: 10, dmg_earth: 10, res_water: 6
        Items.IronLegsArmor, // 10 - hp: 50, haste: 1, dmg_fire: 5, dmg_earth: 5
    ],

    [EquippableSlot.Boots]: [
        Items.CultistBoots, // 40 - hp: 160, dmg_fire: 8, dmg_earth: 8, res_air: 8, res_water: 8, haste: 7
        Items.MithrilBoots, // 40 - hp: 160, dmg_air: 8, dmg_water: 8, res_fire: 8, res_earth: 8, haste: 7
        Items.GoldBoots, // 30 - hp: 110, dmg_fire: 5, dmg_air: 5, res_earth: 8, res_air: 8, haste: 7
        Items.LizardBoots, // 30 - hp: 110, dmg_water: 5, dmg_earth: 5, res_air: 8, res_fire: 8, haste: 7
        Items.SteelBoots, // 20 - hp: 80, res_earth: 8, res_fire: 8, haste: 6
        Items.LeatherBoots, // 10 - hp: 40, res_fire: 5, res_earth: 5, haste: 3
    ],

    [EquippableSlot.Amulet]: [
        Items.GreaterTopazAmulet, // 40 - hp: 130, dmg_earth: 30, critical_strike: 3
        Items.DiamondAmulet, // 35 - hp: 100, dmg_water: 20, dmg_earth: 10
        Items.MasterfulNecklace, // 35 - hp: 100, dmg_earth: 20, dmg_fire: 10
        Items.GreaterDreadfulAmulet, // 30 - hp: 90, dmg_earth: 15, dmg_water: 15
        Items.TopazAmulet, // 25 - hp: 70, dmg_earth: 18
        Items.DreadfulAmulet, // 20 - hp: 40, dmg_water: 10, dmg_earth: 10
        Items.FireEarthAmulet, // 10 - hp: 20, dmg_fire: 5, dmg_earth: 5
    ],

    [EquippableSlot.Ring1]: [
        Items.DivinityRing, // 40 - dmg_earth: 20, dmg_water: 20, prospecting: 30
        Items.EternityRing, // 40 - dmg_air: 20, dmg_earth: 20, prospecting: 30
        Items.TopazRing, // 30 - dmg_earth: 7, dmg: 17, critical_strike: 3
        Items.DreadfulRing, // 20 - hp: 20, dmg_earth: 11, dmg_water: 11
        Items.EarthRing, // 15 - dmg_earth: 8
    ],

    [EquippableSlot.Ring2]: [
        Items.DivinityRing, // 40 - dmg_earth: 20, dmg_water: 20, prospecting: 30
        Items.EternityRing, // 40 - dmg_air: 20, dmg_earth: 20, prospecting: 30
        Items.TopazRing, // 30 - dmg_earth: 7, dmg: 17, critical_strike: 3
        Items.DreadfulRing, // 20 - hp: 20, dmg_earth: 11, dmg_water: 11
        Items.EarthRing, // 15 - dmg_earth: 8
    ],

    [EquippableSlot.Artifact1]: [
        Items.TopazBook, // 40 - dmg_earth: 20
    ],

    [EquippableSlot.Artifact2]: [
        Items.TopazBook, // 40 - dmg_earth: 20
    ],

    [EquippableSlot.Artifact3]: [
        Items.TopazBook, // 40 - dmg_earth: 20
    ],
}

export const AllSet: any = {
    [EquippableSlot.Weapon]: [
    ],

    [EquippableSlot.Shield]: [
    ],

    [EquippableSlot.Helmet]: [
        Items.WolfEars, // 15 - hp: 60, dmg: 6, wisdom: 50, prospecting: 50
        Items.AdventurerHelmet, // 10 - hp: 50, dmg: 5, wisdom: 15
        Items.CopperHelmet, // 1 - hp: 20, dmg: 3
    ],

    [EquippableSlot.BodyArmor]: [
        Items.HellArmor, // 40 - hp: 250, dmg: 30, critical_strike: 5, res_water: -10, res_fire: -10, res_air: -10, res_earth: -10
        Items.ConjurerCloak, // 30 - hp: 150, dmg: 18, critical_strike: 5, wisdom: 50
        Items.MushmushJacket, // 15 - hp: 60, dmg: 10, critical_strike: 3, wisdom: 10
        Items.AdventurerVest, // 10 - hp: 60, dmg: 6, wisdom: 20
    ],

    [EquippableSlot.LegArmor]: [
        Items.HellLegsArmor, // 40 - hp: 240, haste: 7, dmg: 25, critical_strike: 7, res_fire: -10, res_air: -10, res_earth: -10, res_water: -10
        Items.EnchanterPants, // 35 - hp: 150, dmg: 16, prospecting: 120, haste: 5
        Items.ConjurerSkirt, // 30 - hp: 180, haste: 5, dmg: 15, critical_strike: 5, wisdom: 50
        Items.AdventurerPants, // 15 - hp: 60, wisdom: 20, dmg: 5
        Items.CopperLegsArmor, // 5 - hp: 25, dmg: 2
    ],

    [EquippableSlot.Boots]: [
        Items.EnchanterBoots, // 35 - hp: 110, dmg: 5, prospecting: 120, haste: 7
        Items.FlyingBoots, // 30 - hp: 80, dmg: 4, critical_strike: 5, haste: 7
    ],

    [EquippableSlot.Amulet]: [
        Items.ProspectingAmulet, // 30 - hp: 100, prospecting: 100, dmg: 5
    ],

    [EquippableSlot.Ring1]: [
        Items.MaleficRing, // 35 - dmg: 14, critical_strike: 6, prospecting: 30
        Items.GoldRing, // 30 - dmg: 8, prospecting: 30
        Items.RoyalSkeletonRing, // 30 - wisdom: 50, dmg: 8
        Items.RingofChance, // 20 - hp: 30, dmg: 7, prospecting: 30, critical_strike: 4
        Items.SteelRing, // 20 - dmg: 6, wisdom: 30
        Items.ForestRing, // 10 - hp: 20, dmg: 3, wisdom: 15
        Items.IronRing, // 10 - dmg: 4
        Items.CopperRing, // 1 - dmg: 2
    ],

    [EquippableSlot.Ring2]: [
        Items.MaleficRing, // 35 - dmg: 14, critical_strike: 6, prospecting: 30
        Items.GoldRing, // 30 - dmg: 8, prospecting: 30
        Items.RoyalSkeletonRing, // 30 - wisdom: 50, dmg: 8
        Items.RingofChance, // 20 - hp: 30, dmg: 7, prospecting: 30, critical_strike: 4
        Items.SteelRing, // 20 - dmg: 6, wisdom: 30
        Items.ForestRing, // 10 - hp: 20, dmg: 3, wisdom: 15
        Items.IronRing, // 10 - dmg: 4
        Items.CopperRing, // 1 - dmg: 2
    ],

    [EquippableSlot.Artifact1]: [
        Items.MaleficCrystal, // 35 - dmg: 5
    ],

    [EquippableSlot.Artifact2]: [
        Items.MaleficCrystal, // 35 - dmg: 5
    ],

    [EquippableSlot.Artifact3]: [
        Items.MaleficCrystal, // 35 - dmg: 5
    ],
}
