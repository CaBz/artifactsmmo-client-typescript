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

    get type(): string {
        return this.data.type;
    }

    get subType(): string {
        return this.data.subtype;
    }

    get isCraftable(): boolean {
        return !!this.data.craft;
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
}
