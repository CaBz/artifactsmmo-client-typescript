import {EquippableSlot} from "../lexical/EquippableSlot.js";
import {Effects} from "../lexical/Effects.js";

export enum ItemType {
    Resource = 'resource',
    Currency = 'currency',
    Consumable = 'consumable',
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

    get code(): string {
        return this.data.code;
    }

    get level(): string {
        return this.data.level;
    }

    get type(): string {
        return this.data.type;
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
