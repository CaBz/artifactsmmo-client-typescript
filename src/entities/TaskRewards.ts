import * as Utils from "../Utils.js";

export class TaskRewards {
    constructor(private readonly data: any) {
        /*
        {
            "items": [
                {
                    "code": "string",
                    "quantity": 1
                }
            ],
            "gold": 0
        }
        */
    }

    get items(): any[] {
        return this.data.items;
    }

    get gold(): number {
        return this.data.gold;
    }

    logToConsole() {
        Utils.errorHeadline(`GAINED > ${this.gold}g`);
        this.items?.forEach((item: any) => {
            Utils.errorHeadline(`GAINED > ${item.code} x${item.quantity}`);
        });
    }
}
