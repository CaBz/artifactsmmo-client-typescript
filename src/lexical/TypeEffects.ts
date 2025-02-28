import {Effects} from "./Effects.js";

export const GatheringEffects: Effects[] = [
    Effects.Alchemy,
    Effects.Fishing,
    Effects.Mining,
    Effects.Woodcutting,
];

export const OtherEffects: Effects[] = [
    Effects.Antipoison,
];

export const StatEffects: Effects[] = [
    Effects.AirAttack,
    Effects.EarthAttack,
    Effects.FireAttack,
    Effects.WaterAttack,
    Effects.CriticalStrike,
    Effects.Damage,
    Effects.AirDamage,
    Effects.EarthDamage,
    Effects.FireDamage,
    Effects.WaterDamage,
    Effects.Haste,
    Effects.Hitpoints,
    Effects.InventorySpace,
    Effects.Prospecting,
    Effects.AirResistance,
    Effects.EarthResistance,
    Effects.FireResistance,
    Effects.WaterResistance,
    Effects.Wisdom,
];

export const BuffEffects: Effects[] = [
    Effects.BoostDamageAir,
    Effects.BoostDamageEarth,
    Effects.BoostDamageFire,
    Effects.BoostDamageWater,
    Effects.BoostHP,
    Effects.BoostResistanceAir,
    Effects.BoostResistanceEarth,
    Effects.BoostResistanceFire,
    Effects.BoostResistanceWater,
];

export const SpecialEffects: Effects[] = [
    Effects.Burn,
    Effects.Healing,
    Effects.Lifesteal,
    Effects.Poison,
    Effects.Reconstitution,
];

export const GoldEffects: Effects[] = [
    Effects.Gold,
];

export const HealEffects: Effects[] = [
    Effects.Heal,
    Effects.Restore,
];

export const TeleportEffects: Effects[] = [
    Effects.TeleportX,
    Effects.TeleportY,
];
