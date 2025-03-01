import {TaskRewards} from "./TaskRewards.js";

export class Task {
    constructor(private readonly data: any) {
        /*
        {
            "code": "string",
            "type": "monsters",
            "total": 0,
            "rewards": {
                "items": [
                    {
                        "code": "string",
                        "quantity": 1
                    }
                ],
                "gold": 0
            }
        }
        */
    }

    get code(): string {
        return this.data.code;
    }

    get type(): string {
        return this.data.type;
    }

    get total(): string {
        return this.data.total;
    }

    get rewards(): TaskRewards {
        return new TaskRewards(this.data.rewards);
    }
}
