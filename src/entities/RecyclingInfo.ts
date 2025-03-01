import * as Utils from "../Utils.js";

export class RecyclingInfo {
    constructor(private readonly data: any) {
        /*
        {
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
        this.items?.forEach((item: any) => {
            Utils.errorHeadline(`GAINED > ${item.code} x${item.quantity}`);
        });
    }

    get items(): any[] {
        return this.data.items;
    }
}
