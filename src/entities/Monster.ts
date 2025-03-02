import {StatEffects} from "../lexical/TypeEffects.js";
import {LINE} from "../Utils.js";

export class Monster {
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

    get level(): number {
        return this.data.level;
    }

    getAllStats() {
        return StatEffects.map((stat) => {
            { return {code: stat, value: this.data[stat] ?? 0}; }
        });
    }
}
