import * as Utils from "../Utils.js";

export class SkillInfo {
    constructor(private readonly data: any) {
        /*
        {
            "xp": 0,
            "items": [
                {
                    "code": "string",
                    "quantity": 0
                }
            ]
        }
        */
    }

    logToConsole() {
        Utils.errorHeadline(`GAINED > +${this.xp}xp`);
        this.items?.forEach((item: any) => {
            Utils.errorHeadline(`GAINED > ${item.code} x${item.quantity}`);
        });
    }

    get xp(): number {
        return this.data.xp;
    }

    get items(): any[] {
        return this.data.items;
    }
}
