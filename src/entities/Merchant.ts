export class Merchant {
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
}
