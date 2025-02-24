export enum Item {
    // Mining
    CopperOre = 'copper_ore',
    Copper = 'copper',
    IronOre = 'iron_ore',
    Iron = 'iron',
    Coal = 'coal',
    Steel = 'steel',
    GoldOre = 'gold_ore',
    Gold = 'gold',
    StrangeOre = 'strange_ore',
    Strangold = 'strangold',
    MithrilOre = 'mithril_ore',
    Mithril = 'mithril',

    // Weapongcrafting
    // Gearcrafting

    // Woodcutting
    Sap = 'sap',
    AshWood = 'ash_wood',
    AshPlank = 'ash_plank',
    SpruceWood = 'spruce_wood',
    SprucePlank = 'spruce_plank',
    BirchWood = 'birch_wood',
    HardwoodPlank = 'hardwood_plank',
    MagicSap = 'magic_sap',
    MapleSap = 'maple_sap',

    // Alchemy
    Sunflower = 'sunflower',
    SmallHealthPotion = 'small_health_potion',
    EathBoostPotion = 'earth_boost_potion',
    AirBoostPotion = 'air_boost_potion',
    FireBoostPotion = 'fire_boost_potion',
    WaterBoostPotion = 'water_boost_potion',

    NettleLeaf = 'nettle_leaf',
    MinorHealthPotion = 'minor_health_potion',
    SmallAntitode = 'small_antitode',
    HealthPotion = 'health_potion',
    HealthBoostPotion = 'health_boost_potion',

    GlowstemLeaf = 'glowsteam_leaf',
    Antitode = 'antitode',
    GreaterHealthPotion = 'greater_health_potion',
    EnchantedHealthPotion = 'enchanted_health_potion',
    EnchantedBoostPotion = 'enchanted_boost_potion',
    EarthResPotion = 'earth_res_potion',
    FireResPotion = 'fire_res_potion',
    AirhResPotion = 'air_res_potion',
    WaterResPotion = 'water_res_potion',

    // Jewelcrafting

    // Fishing
    Algae = 'algae',
    Gudgeon = 'gudgeon',
    Shrimp = 'shrimp',
    GoldenShrimpg = 'golden_shrimp',

    // Cooking
    CookedChicken = 'cooked_chicken',
    CookedGudgeon = 'cooked_gudgeon',
    FriendEggs = 'friend_eggs',
    CookedShrimp = 'cooked_shrimp',

    // Monster Drops
    Egg = 'egg',
    RawChicken = 'raw_chicken',
    MilkBucket = 'milk_bucket',
    YellowSlimeBall = 'yellow_slimeball',
    GreenSlimeBall = 'green_slimeball',
    RedSlimeBall = 'red_slimeball',
    BlueSlimeBall = 'blue_slimeball',
    BatWing = 'bat_wing',
}

export const AlchemyCraftable: Item[] = [
    Item.SmallHealthPotion,
    Item.EathBoostPotion,
    Item.AirBoostPotion,
    Item.FireBoostPotion,
    Item.WaterBoostPotion,
    Item.MinorHealthPotion,
    Item.SmallAntitode,
    Item.HealthPotion,
    Item.HealthBoostPotion,
    Item.Antitode,
    Item.GreaterHealthPotion,
    Item.EnchantedHealthPotion,
    Item.EnchantedBoostPotion,
    Item.EarthResPotion,
    Item.FireResPotion,
    Item.AirhResPotion,
    Item.WaterResPotion,
];

export const CookingCraftable: Item[] = [
    Item.CookedChicken,
    Item.CookedGudgeon,
    Item.FriendEggs,
    Item.CookedShrimp,
]
