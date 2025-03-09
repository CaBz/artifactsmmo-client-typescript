export class Resource {
    constructor(private readonly data: any) {
        /*
          {
            "name": "Ash Tree",
            "code": "ash_tree",
            "skill": "woodcutting",
            "level": 1,
            "drops": [
              {
                "code": "ash_wood",
                "rate": 1,
                "min_quantity": 1,
                "max_quantity": 1
              },
              {
                "code": "sap",
                "rate": 10,
                "min_quantity": 1,
                "max_quantity": 1
              }
            ]
          },
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
