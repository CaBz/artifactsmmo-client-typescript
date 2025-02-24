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
    MithrilOre = 'mithril_ore',
    Mithril = 'mithril',

    // Weapongcrafting
    // Gearcrafting

    // Woodcutting
    AshWood = 'ash_wood',
    AshPlank = 'ash_plank',
    SpruceWood = 'spruce_wood',
    SprucePlank = 'spruce_plank',

    // Alchemy
    Sunflower = 'sunflower',
    SmallHealthPotion = 'small_health_potion', // 5 - 3x sunflower
    EathBoostPotion = 'earth_boost_potion', // 10 - 1x yellow_slimeball, 1x sunflower, 1x algae
    AirBoostPotion = 'air_boost_potion', // 10 - 1x green_slimeball, 1x sunflower, 1x algae
    FireBoostPotion = 'fire_boost_potion', // 10 - 1x red_slimeball, 1x sunflower, 1x algae
    WaterBoostPotion = 'water_boost_potion', // 10 - 1x blue_slimeball, 1x sunflower, 1x algae

    NettleLeaf = 'nettle_leaf', // 20
    MinorHealthPotion = 'minor_health_potion', // 20 - 2x nettle_leaf, 1x algae
    SmallAntitode = 'small_antitode', // 20 - 1x milk_bucket, 1x sap, 1x nettle_leaf
    HealthPotion = 'health_potion', // 30 - 2x nettle_leaf, 1x sunflower, 1x sap
    HealthBoostPotion = 'health_boost_potion', // 40 - 1x shrimp, 1x sap, 1x nettle_leaf

    GlowstemLeaf = 'glowsteam_leaf', // 40
    Antitode = 'antitode', // 30 - 2x strangold, 1x maple_sap, 1x glowstem_leaf
    GreaterHealthPotion = 'greater_health_potion', // 35 - 2x glowstem_leaf, 1x egg, 1x algae
    EnchantedHealthPotion = 'enchanted_health_potion', // 40 - 2x glowstem_leaf, 1x sunflower, 1x magic_sap
    EnchantedBoostPotion = 'enchanted_boost_potion', // 40 - 2x glowstem_leaf, 1x bat_wing, 1x magic_sap
    EarthResPotion = 'earth_res_potion', // 40 - 2x yellow_slimeball, 1x maple_sap, 1x glowstem_leaf
    FireResPotion = 'fire_res_potion', // 40 - 2x red_slimeball, 1x maple_sap, 1x glowstem_leaf
    AirhResPotion = 'air_res_potion', // 40 - 2x green_slimeball, 1x maple_sap, 1x glowstem_leaf
    WaterResPotion = 'water_res_potion', // 40 - 2x blue_slimeball, 1x maple_sap, 1x glowstem_leaf

    // Jewelcrafting

    // Fishing
    Algae = 'algae',
    Gudgeon = 'gudgeon',

    // Cooking
    CookedGudgeon = 'cooked_gudgeon', // 1x - 1x gudgeon

    // Monster Drops
    YellowSlimeBall = 'yellow_slimeball',
    GreenSlimeBall = 'green_slimeball',
    RedSlimeBall = 'red_slimeball',
    BlueSlimeBall = 'blue_slimeball',
}
