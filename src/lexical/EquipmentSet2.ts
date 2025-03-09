import {EquippableSlot} from "./EquippableSlot.js";
import {Items} from "./Items.js";

export const FireSet: any = {
    [EquippableSlot.Helmet]: [
        Items.PiggyHelmet, // 25 - hp: 110, dmg_fire: 20, critical_strike: 3
        Items.TromatisingMask, // 20 - hp: 90, dmg_fire: 16, wisdom: 25
    ],

    [EquippableSlot.BodyArmor]: [
        Items.PiggyArmor, // 25 - hp: 150, dmg_fire: 22, res_fire: 10, res_earth: 5, wisdom: 30
        Items.SkeletonArmor, // 20 - hp: 90, dmg_fire: 15, dmg_air: 15, res_fire: 5, res_air: 5
    ],

    [EquippableSlot.LegArmor]: [
        Items.PiggyPants, // 25 - hp: 140, haste: 3, dmg_fire: 17, res_fire: 6, res_water: 3
        Items.SkeletonPants, // hp: 80, haste: 2, dmg_fire: 10, dmg_air: 10, res_fire: 6
    ],

    [EquippableSlot.Boots]: [
        Items.SteelBoots, // 20 - hp: 80, res_earth: 8, res_fire: 8, haste: 6
    ],

    [EquippableSlot.Weapon]: [
        Items.VampireBow, // 25 - attack_fire: 36, critical_strike: 35
        Items.SkullWand, // 25 - attack_air: 25, attack_fire: 25, critical_strike: 5
        Items.SkullStaff, // 20 - attack_fire: 40, critical_strike: 5
        Items.HuntingBow, // 20 - attack_air: 15, attack_fire: 14, critical_strike: 35
    ],

    [EquippableSlot.Shield]: [
        Items.SteelShield, // 20 - res_fire: 7, res_earth: 7, res_water: 7, res_air: 7
        Items.WoodenShield, // 1 - res_fire: 2, res_earth: 2, res_water: 2, res_air: 2
    ],

    [EquippableSlot.Amulet]: [
        Items.Ruby, // 25 - hp: 70, dmg_fire: 18
        Items.SkullAmulet, // 20 - hp: 40, dmg_air: 10, dmg_fire: 10
    ],

    [EquippableSlot.Ring1]: [
        Items.SkullRing, // 20 - hp: 20, dmg_fire: 11, dmg_air: 11
    ],

    [EquippableSlot.Ring2]: [
        Items.SkullRing, // 20 - hp: 20, dmg_fire: 11, dmg_air: 11
    ],
}

export const AirSet: any = {
    [EquippableSlot.Helmet]: [
        Items.SkeletonHelmet, // 20 - hp: 90, dmg_air: 16, wisdom: 25
    ],

    [EquippableSlot.BodyArmor]: [
        Items.SerpentSkinArmor, // 25 - hp: 150, dmg_air: 22, res_air: 10, res_earth: 5, wisdom: 30
        Items.SkeletonArmor, // 20 - hp: 90, dmg_fire: 15, dmg_air: 15, res_fire: 5, res_air: 5
    ],

    [EquippableSlot.LegArmor]: [
        Items.SerpentSkinLegsArmor, // 25 - hp: 140, haste: 3, dmg_water: 17, res_water: 6, res_fire: 3
        Items.SkeletonPants, // 20 - hp: 80, haste: 2, dmg_fire: 10, dmg_air: 10, res_fire: 6
    ],

    [EquippableSlot.Boots]: [
        Items.SerpentSkinBoots, // 20 - hp: 80, res_water: 8, res_air: 8, haste: 6
    ],

    [EquippableSlot.Weapon]: [
        Items.SkullWand, // 25 - attack_air: 25, attack_fire: 25, critical_strike: 5
        Items.ForestWhip, // 20 - attack_air: 40, critical_strike: 5
        Items.HuntingBow, // 20 - attack_air: 15, attack_fire: 14, critical_strike: 35

        Items.CopperDagger, // 1 - attack_air: 6, critical_strike: 35
    ],

    [EquippableSlot.Shield]: [
        Items.SteelShield, // 20 - res_fire: 7, res_earth: 7, res_water: 7, res_air: 7
        Items.WoodenShield, // 1 - res_fire: 2, res_earth: 2, res_water: 2, res_air: 2
    ],

    [EquippableSlot.Amulet]: [
        Items.EmeraldAmulet, // 25 - hp: 70, dmg_air: 18
        Items.SkullAmulet, // 20 - hp: 40, dmg_air: 10, dmg_fire: 10
    ],

    [EquippableSlot.Ring1]: [
        Items.SkullRing, // 20 - hp: 20, dmg_fire: 11, dmg_air: 11
    ],

    [EquippableSlot.Ring2]: [
        Items.SkullRing, // 20 - hp: 20, dmg_fire: 11, dmg_air: 11
    ],
}

export const WaterSet: any = {
    [EquippableSlot.Helmet]: [
        Items.MagicWizardHat, // 20 - hp: 90, dmg_water: 16, wisdom: 25
    ],

    [EquippableSlot.BodyArmor]: [
        Items.LizardSkinArmor, // 25 - hp: 150, dmg_water: 22, res_water: 10, res_fire: 5, prospecting: 30
        Items.SteelArmor, // 20 - hp: 90, dmg_earth: 15, dmg_water: 15, res_earth: 5, res_water: 5
    ],

    [EquippableSlot.LegArmor]: [
        Items.LizardSkinLegsArmor, // 25 - hp: 140, haste: 3, dmg_water: 17, res_water: 6, res_fire: 3
        Items.SteelLegsArmor, // 20 - hp: 80, haste: 2, dmg_water: 10, dmg_earth: 10, res_water: 6
    ],

    [EquippableSlot.Boots]: [
        Items.SerpentSkinBoots, // 20 - hp: 80, res_water: 8, res_air: 8, haste: 6
    ],

    [EquippableSlot.Weapon]: [
        Items.DreadfulStaff, // 25 - attack_water: 25, attack_earth: 25, critical_strike: 5
        Items.Battlestaff, // 20 - attack_water: 40, critical_strike: 5
    ],

    [EquippableSlot.Shield]: [
        Items.SteelShield, // 20 - res_fire: 7, res_earth: 7, res_water: 7, res_air: 7
        Items.WoodenShield, // 1 - res_fire: 2, res_earth: 2, res_water: 2, res_air: 2
    ],

    [EquippableSlot.Amulet]: [
        Items.Sapphire, // 25 - hp: 70, dmg_water: 18
        Items.DreadfulAmulet, // 20 - hp: 40, dmg_water: 10, dmg_earth: 10
    ],

    [EquippableSlot.Ring1]: [
        Items.DreadfulRing, // 20 - hp: 20, dmg_earth: 11, dmg_water: 11
    ],

    [EquippableSlot.Ring2]: [
        Items.DreadfulRing, // 20 - hp: 20, dmg_earth: 11, dmg_water: 11
    ],
}

export const EarthSet: any = {
    [EquippableSlot.Helmet]: [
        Items.SteelHelm, // 20 - hp: 90, dmg_earth: 16
    ],

    [EquippableSlot.BodyArmor]: [
        Items.SteelArmor, // 20 - hp: 90, dmg_earth: 15, dmg_water: 15, res_earth: 5, res_water: 5
        Items.StormforgedArmor, // 25 - hp: 150, dmg_earth: 22, res_earth: 10, res_water: 5, prospecting: 30
        Items.BanditArmor, // 25 - hp: 160, dmg_fire: 20, dmg_earth: 20, res_earth: 6, res_water: 6, critical_strike: 5

        Items.CopperArmor, // 5 - hp: 25, dmg_earth: 5, dmg_fire: 5
    ],

    [EquippableSlot.LegArmor]: [
        Items.StormforgedPants, // 25 - hp: 140, haste: 3, dmg_earth: 17, res_earth: 6, res_water: 3
        Items.SteelLegsArmor, // 20 - hp: 80, haste: 2, dmg_water: 10, dmg_earth: 10, res_water: 6
    ],

    [EquippableSlot.Boots]: [
        Items.SteelBoots, // 20 - hp: 80, res_earth: 8, res_fire: 8, haste: 6
    ],

    [EquippableSlot.Weapon]: [
        Items.WoodenClub, // 25 - attack_earth: 36, critical_strike: 35
        Items.DreadfulStaff, // 25 - attack_water: 25, attack_earth: 25, critical_strike: 5
        Items.SteelBattleaxe, // 20 - attack_earth: 40, critical_strike: 5

        Items.WoodenStaff, // 1 - attack_earth: 8, critical_strike: 5
        Items.WoodenStick, // 1 - attack_earth: 4, critical_strike: 5
    ],

    [EquippableSlot.Shield]: [
        Items.SteelShield, // 20 - res_fire: 7, res_earth: 7, res_water: 7, res_air: 7
        Items.WoodenShield, // 1 - res_fire: 2, res_earth: 2, res_water: 2, res_air: 2
    ],

    [EquippableSlot.Amulet]: [
        Items.TopazAmulet, // 25 - hp: 70, dmg_earth: 18
        Items.DreadfulAmulet, // 20 - hp: 40, dmg_water: 10, dmg_earth: 10
    ],

    [EquippableSlot.Ring1]: [
        Items.DreadfulRing, // 20 - hp: 20, dmg_earth: 11, dmg_water: 11
    ],

    [EquippableSlot.Ring2]: [
        Items.DreadfulRing, // 20 - hp: 20, dmg_earth: 11, dmg_water: 11
    ],
}

export const AllSets: any = {
    [EquippableSlot.Helmet]: [
        Items.CopperHelmet, // 1 - hp: 20, dmg: 3
    ],

    [EquippableSlot.BodyArmor]: [
        Items.CopperBoots, // 1 - hp: 10, wisdom: 10
    ],

    [EquippableSlot.LegArmor]: [
    ],

    [EquippableSlot.Boots]: [
        Items.OldBoots, // hp: 90, haste: 3, wisdom: 70
    ],

    [EquippableSlot.Weapon]: [
    ],

    [EquippableSlot.Shield]: [
    ],

    [EquippableSlot.Amulet]: [
    ],

    [EquippableSlot.Ring1]: [
        Items.RingofChance, // 20 - hp: 30, dmg: 7, prospecting: 30, critical_strike: 4
        Items.SteelRing, // 20 - dmg: 6, wisdom: 30
        Items.CopperRing, // 1 - dmg: 2
    ],

    [EquippableSlot.Ring2]: [
        Items.RingofChance, // 20 - hp: 30, dmg: 7, prospecting: 30, critical_strike: 4
        Items.SteelRing, // 20 - dmg: 6, wisdom: 30
        Items.CopperRing, // 1 - dmg: 2
    ],
}
