export class Effect {
    constructor(private readonly data: any) {
        /*
          {
            "name": "Boost HP",
            "code": "boost_hp",
            "description": "Add xHP at the start of the fight and for the duration of the fight.",
            "type": "combat",
            "subtype": "buff"
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

    get level(): number {
        return this.data.level;
    }

    get subtype(): string {
        return this.data.subtype;
    }
}
