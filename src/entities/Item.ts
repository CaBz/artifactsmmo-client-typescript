import {EquippableSlot} from "../lexical/EquippableSlot.js";
import {Effects} from "../lexical/Effects.js";
import {Items} from "../lexical/Items.js";

export enum ItemType {
    Amulet = 'amulet',
    Artifact = 'artifact',
    BodyArmor = 'body_armor',
    Boots = 'boots',
    Consumable = 'consumable',
    Currency = 'currency',
    Helmet = 'helmet',
    LegArmor = 'leg_armor',
    Resource = 'resource',
    Ring = 'ring',
    Utility = 'utility',
    Weapon = 'weapon',
    Shield = 'shield',
}

export enum ItemSubType {
    Fishing = 'fishing',
    Plank = 'plank',
    Woodcutting = 'woodcutting',
    Task = 'task',
    Mob = 'mob',
    Mining = 'mining',
    Bar = 'bar',
    PreciousStone = 'precious_stone',
    Food = 'food',
    Alchemy = 'alchemy',
    Sap = 'sap',
    Alloy = 'alloy',
    Potion = 'potion',
    Tool = 'tool',
}

const ItemTypeToWeight = {
    [ItemType.Currency]: 1,
    [ItemType.Resource]: 1000,
    [ItemType.Consumable]: 2000,
    [ItemType.Utility]: 3000,
    [ItemType.Helmet]: 4000,
    [ItemType.BodyArmor]: 5000,
    [ItemType.LegArmor]: 6000,
    [ItemType.Boots]: 7000,
    [ItemType.Weapon]: 8000,
    [ItemType.Shield]: 9000,
    [ItemType.Ring]: 10000,
    [ItemType.Amulet]: 11000,
    [ItemType.Artifact]: 12000,
};

const ItemSubTypeToWeight = {
    [ItemSubType.Task]: 1,
    [ItemSubType.Mob]: 10,

    [ItemSubType.Alchemy]: 11,
    [ItemSubType.Potion]: 12,
    [ItemSubType.Food]: 20,

    [ItemSubType.Fishing]: 30,

    [ItemSubType.Woodcutting]: 40,
    [ItemSubType.Plank]: 50,
    [ItemSubType.Sap]: 60,

    [ItemSubType.Mining]: 70,
    [ItemSubType.Bar]: 80,
    [ItemSubType.Alloy]: 90,
    [ItemSubType.PreciousStone]: 100,

    [ItemSubType.Tool]: 130,
}

export class Item {
    constructor(private readonly data: any) {
        /*
        {
            "name": "Leather Legs Armor",
            "code": "leather_legs_armor",
            "level": 10,
            "type": "leg_armor",
            "subtype": "",
            "description": "",
            "effects": [ { "code": "string", "value": 0 } ],
            "craft": {
                "skill": "gearcrafting",
                "level": 10,
                "items": [ { "code": "string", "quantity": 0 } ],
                quantity: 0
            },
            "tradeable": true
        }
        */
    }

    get name(): string {
        return this.data.name;
    }

    get nameForEnum(): string {
        return this.name.replaceAll(/[^a-zA-Z0-9]/g, '');
    }

    get code(): Items {
        return this.data.code;
    }

    get level(): number {
        return this.data.level;
    }

    get type(): string {
        return this.data.type;
    }

    get typeAndSubtype(): string {
        return this.type + (this.subType ? ` / ${this.subType}` : '');
    }

    get typeAndSubtypeWeight(): number {
        const typeWeight = ItemTypeToWeight[this.type] || 100000;
        const subTypeWeight = ItemSubTypeToWeight[this.subType] || 200;

        return typeWeight + subTypeWeight;
    }

    get subType(): string {
        return this.data.subtype;
    }

    get isTradeable(): boolean {
        return this.data.tradeable;
    }

    get isCraftable(): boolean {
        return !!this.data.craft;
    }

    get isEquippable(): boolean {
        return ![ItemType.Resource, ItemType.Currency, ItemType.Consumable].includes(this.type as ItemType);
    }

    get isConsumable(): boolean {
        return this.type === ItemType.Consumable;
    }

    get equippableSlot(): EquippableSlot {
        if (!this.isEquippable) {
            return EquippableSlot.None;
        }

        if (['ring', 'artifact', 'utility'].includes(this.type)) {
            return `${this.type}1` as EquippableSlot;
        }

        return this.type as EquippableSlot
    }

    get craft() {
        return this.data.craft;
    }

    get skillToCraft(): string {
        return this.data.craft?.skill;
    }

    get levelToCraft(): number {
        return this.data.craft?.level;
    }

    get itemsToCraft(): any[] {
        return this.data.craft?.items;
    }

    get quantityCrafted(): number {
        return this.data.craft?.quantity;
    }

    get effects(): any[] {
        return this.data.effects;
    }

    private _calculatedEffects: any = {}

    getEffectValueFor(name: Effects) {
        if (this._calculatedEffects[name]) {
            return this._calculatedEffects[name]
        }

        let value: number = 0;
        this.effects.forEach((effect) => {
            if (name === effect.code) {
                value += effect.value;
            }
        });

        this._calculatedEffects[name] = value;

        return value;
    }
}
