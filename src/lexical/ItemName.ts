export enum ItemName {
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
    WoodenStick = 'wooden_stick', // TBD ?
    CopperDagger = 'copper_dagger',
    WoodenStaff = 'wooden_staff',
    FireStaff = 'fire_staff', // 5 - red_slimeball 2, ash_plank 5
    StickyDagger = 'sticky_dagger', // 5 - green_slimeball 2, copper 5
    StickySword = 'sticky_sword', // 5 - yellow_slimeball 2, copper 5
    WaterBow = 'water_bow', // 5 - blue_slimeball 2, copper 5
    IronSword = 'iron_sword', // 10 - iron 6, feather 2
    GeaterWoodenStaff = 'greater_wooden_staff', // 10 - spruce_plank 6, blue_slimeball 2
    IronDagger = 'iron_dagger', // 10 - iron 6, feather 2
    FireBow = 'fire_bow', // 10, spruce_plank 6, red_slimeball 2
    MultislimesSword = 'multislimes_sword', // 15 - iron 5, red_slimeball 2, blue_slimeball 2, yellow_slimeball 2, green_slimeball 2, jasper_crystal 1
    MushStaff = 'mushstaff', // 15 - spruce_plank 5, mushroom 4, green_cloth 2, jasper_crystal 1

    // Tools
    IronPickaxe = 'iron_pickaxe', // 10, spruce_plank 2, iron 8, jasper_crystal 1
    IronAxe = 'iron_axe', // 10, spruce_plank 2, iron 8, jasper_crystal 1
    SpruceFishingRod = 'spruce_fishing_rod', // 10, spruce_plank 8, iron 2, jasper_crystal 1

    // Gearcrafting
    WoodenShield = 'wooden_shield', // 1 - ash_plank 6
    SlimeShield = 'slime_shield', // 10 - spruce_plank 6, red_slimeball 3, yellow_slimeball 3, green_slimeball 3, blue_slimeball 3

    Satchel = 'satchel', // 5 - cowhide 5, feather 2, jasper_crystal 1

    CopperBoots = 'copper_boots', // 1 - copper 8
    CopperHelmet = 'copper_helmet', // 1 - copper 6
    CopperLegsArmor = 'copper_legs_armor', // 5 - copper 5, feather 2
    CopperArmor = 'copper_armor', // 5 - copper 5, feather 2
    FeatherCoat = 'feather_coat', // 5 - feather 5, ash_plank 2

    IronBoots = 'iron_boots', // 10 - iron 5, feather 3
    IronArmor = 'iron_armor', // 10 - iron 5, cowhide 3
    IronLegsArmor = 'iron_legs_armor', // 10 - iron 5, cowhide 3
    IronHelm = 'iron_helm', // 10 - iron 5, feather 3

    LeatherBoots = 'leather_boots', // 10 - ash_plank 4, cowhide 4
    LeatherArmor = 'leather_armor', // 10 - spruce_plank 4, cowhide 4
    LeatherHat = 'leather_hat', // 10 - cowhide 5, yellow_slimeball 3
    LeatherGloves = 'leather_gloves', // 10, ash_plank 2, cowhide 8, jasper_crystal 1
    LeatherLegsArmor = 'leather_legs_armor', // 10, spruce_plank 5, cowhide 3

    AdventurerHelmet = 'adventurer_helmet', // 10 - feather 4, cowhide 3, spruce_plank 3, mushroom 4
    AdventurerVest = 'adventurer_vest', // 10 - feather 42, cowhide 36, spruce_plank 4, yellow_slimeball 4
    AdventurerBoots = 'adventurer_boots', // 15 - cowhide 6, wolf_hair 4, mushroom 3, spruce_plank 2
    AdventurerPants = 'adventurer_pants', // 15 - ash_plank 2, cowhide 8, green_cloth 2

    MushmushWizardHat = 'mushmush_wizard_hat', // 15 - cowhide 3, wolf_hair 3, mushroom 5, jasper_crystal 1
    MushmushJacket = 'mushmush_jacket', // 15 - cowhide 4, flying_wing 4, mushroom 6, jasper_crystal 1
    LuckyWizardHat = 'lucky_wizard_hat', // 15 - green_cloth 5, flying_wing 4, green_slimeball 5, jasper_crystal 1

    // Jewelcrafting
    CopperRing = 'copper_ring', // 1 - copper 6
    LifeAmulet = 'life_amulet', // 5 - feather 4, red_slimeball 2
    FireAndEarthAmulet = 'fire_and_earth_amulet', // 10 - iron 4, red_slimeball 2, yellow_slimeball 2
    AirAndWaterAmulet = 'air_and_water_amulet', // 10 - iron 4, green_slimeball 2, blue_slimeball 2
    IronRing = 'iron_ring', // 10 - iron 6, feather 2
    AirRing = 'air_ring', // 15 - iron 5, green_slimeball 4, flying_wing 3
    EarthRing = 'earth_ring', // 15 - iron 5, yellow_slimeball 4, flying_wing 3
    FireRing = 'fire_ring', // 15 - red_slimeball 4, flying_wing 3

    // Non-craftable gear items
    Backpack = 'backpack',
    ForestRing = 'forest_ring',

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
    MapleWood = 'maple_wood',
    MaplePlank = 'maple_plank',

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

    // Fishing
    Algae = 'algae',
    Gudgeon = 'gudgeon',
    Shrimp = 'shrimp',
    GoldenShrimpg = 'golden_shrimp',
    Trout = 'trout',
    Bass = 'bass',
    Salmon = 'salmon',

    // Cooking
    CookedChicken = 'cooked_chicken',
    CookedGudgeon = 'cooked_gudgeon',
    FriendEggs = 'friend_eggs',
    CookedBeef = 'cooked_beef',
    CookedShrimp = 'cooked_shrimp',
    CookedBass = 'cooked_bass',
    CookedTrout = 'cooked_trout',
    CookedSalmon = 'cooked_salmon',
    Cheese = 'cheese', // 10 - milk_bucket 1
    CookedWolfMeat = 'cooked_wolf_meat', // 15, raw_wolf_meat 1

    // Monster Drops
    Apple = 'apple',
    Egg = 'egg',
    GoldenEgg = 'golden_egg',
    RawChicken = 'raw_chicken',
    Feather = 'feather',
    RawBeef = 'raw_beef',
    MilkBucket = 'milk_bucket',
    CowHide = 'cow_hide',
    YellowSlimeBall = 'yellow_slimeball',
    GreenSlimeBall = 'green_slimeball',
    RedSlimeBall = 'red_slimeball',
    BlueSlimeBall = 'blue_slimeball',
    Mushroom = 'mushroom',
    BatWing = 'bat_wing',
    FlyingWing = 'flying_wing',
    SerpentSkin = 'serpent_skin',
    RawWolfMeat = 'raw_wolf_meat',

    // Tasks ???
    TasksCoin = 'tasks_coin',
    JasperCrystal = 'jasper_crystal',
    AstralyteCrystal = 'astralyte_crystal',
    MagicalCure = 'magical_cure',
    EnchantedFabric = 'enchanted_fabric',

    // Other
    SmallBagOfGold = 'small_bag_of_gold', // consumable
    BagOfGold = 'bag_of_gold', // consumable
    RecallPotion = 'recall_potion', // consumable
    SouthBankPotion = 'south_bank_potion', // consumable
}

export const CraftableMining: ItemName[] = [
    ItemName.Copper,
    ItemName.Iron,
    ItemName.Steel,
    ItemName.Gold,
    ItemName.Strangold,
    ItemName.Mithril,
];

export const CraftableWeaponcrafting: ItemName[] = [
    ItemName.CopperDagger,
    ItemName.WoodenStaff,
];

export const CraftableWoodcutting: ItemName[] = [
    ItemName.AshPlank,
    ItemName.SprucePlank,
    ItemName.HardwoodPlank,
    ItemName.MaplePlank,
];

export const CraftableAlchemy: ItemName[] = [
    ItemName.SmallHealthPotion,
    ItemName.EathBoostPotion,
    ItemName.AirBoostPotion,
    ItemName.FireBoostPotion,
    ItemName.WaterBoostPotion,
    ItemName.MinorHealthPotion,
    ItemName.SmallAntitode,
    ItemName.HealthPotion,
    ItemName.HealthBoostPotion,
    ItemName.Antitode,
    ItemName.GreaterHealthPotion,
    ItemName.EnchantedHealthPotion,
    ItemName.EnchantedBoostPotion,
    ItemName.EarthResPotion,
    ItemName.FireResPotion,
    ItemName.AirhResPotion,
    ItemName.WaterResPotion,
];

export const CraftableCooking: ItemName[] = [
    ItemName.CookedChicken,
    ItemName.CookedGudgeon,
    ItemName.FriendEggs,
    ItemName.CookedShrimp,
    ItemName.CookedTrout,
    ItemName.CookedBass,
    ItemName.CookedSalmon,
]
