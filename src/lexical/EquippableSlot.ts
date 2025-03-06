import {ItemType} from "../entities/Item.js";

export enum EquippableSlot {
    None = 'none',
    Weapon = 'weapon',
    Shield = 'shield',
    Helmet = 'helmet',
    BodyArmor = 'body_armor',
    LegArmor = 'leg_armor',
    Boots = 'boots',
    Ring1 = 'ring1',
    Ring2 = 'ring2',
    Amulet = 'amulet',
    Artifact1 = 'artifact1',
    Artifact2 = 'artifact2',
    Artifact3 = 'artifact3',
    Utility1 = 'utility1',
    Utility2 = 'utility2',
    Bag = 'bag',
    Rune = 'rune',
}

export const EquippableSlotToType: any = {
    [EquippableSlot.Weapon]: ItemType.Weapon,
    [EquippableSlot.Shield]: ItemType.Shield,
    [EquippableSlot.Helmet]: ItemType.Helmet,
    [EquippableSlot.BodyArmor]: ItemType.BodyArmor,
    [EquippableSlot.LegArmor]: ItemType.LegArmor,
    [EquippableSlot.Boots]: ItemType.Boots,
    [EquippableSlot.Ring1]: ItemType.Ring,
    [EquippableSlot.Ring2]: ItemType.Ring,
    [EquippableSlot.Amulet]: ItemType.Amulet,
    [EquippableSlot.Utility1]: ItemType.Utility,
    [EquippableSlot.Utility2]: ItemType.Utility,
}

export const EquippableSlots: EquippableSlot[] = [
    EquippableSlot.Weapon,
    EquippableSlot.Shield,
    EquippableSlot.Helmet,
    EquippableSlot.BodyArmor,
    EquippableSlot.LegArmor,
    EquippableSlot.Boots,
    EquippableSlot.Ring1,
    EquippableSlot.Amulet,
];

export const AllEquippableSlots: EquippableSlot[] = [
    EquippableSlot.Weapon,
    EquippableSlot.Shield,
    EquippableSlot.Helmet,
    EquippableSlot.BodyArmor,
    EquippableSlot.LegArmor,
    EquippableSlot.Boots,
    EquippableSlot.Ring1,
    EquippableSlot.Ring2,
    EquippableSlot.Amulet,
    EquippableSlot.Artifact1,
    EquippableSlot.Artifact2,
    EquippableSlot.Artifact3,
    EquippableSlot.Utility1,
    EquippableSlot.Utility2,
    EquippableSlot.Bag,
    EquippableSlot.Rune,
];
