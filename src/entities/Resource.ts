export class Resource {
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

    get skill(): string {
        return this.data.skill;
    }

    get level(): number {
        return this.data.level;
    }

    get drops() {
        return this.data.drops;
    }
}
