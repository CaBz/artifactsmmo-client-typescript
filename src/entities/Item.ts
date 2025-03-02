import {EquippableSlot} from "../lexical/EquippableSlot.js";

export class Item {
    constructor(private readonly data: any) {
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

    get isCraftable(): boolean {
        return !!this.data.craft;
    }

    get isEquippable(): boolean {
        return !['resource', 'currency', 'consumables'].includes(this.type);
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

    get effects() {
        return this.data.effects;
    }
}
