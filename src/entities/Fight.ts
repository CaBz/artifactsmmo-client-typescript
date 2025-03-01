export class Fight {
    constructor(private readonly data: any) {
        /*
        {
            "xp": 0,
            "gold": 0,
            "drops": [
                {
                    "code": "string",
                    "quantity": 0
                }
            ],
            "turns": 0,
            "monster_blocked_hits": {
                "fire": 0,
                "earth": 0,
                "water": 0,
                "air": 0,
                "total": 0
            },
            "player_blocked_hits": {
                "fire": 0,
                "earth": 0,
                "water": 0,
                "air": 0,
                "total": 0
            },
            "logs": [
                "string"
            ],
            "result": "win"
        }
        */
    }

    get xp(): number {
        return this.data.xp;
    }

    get gold(): number {
        return this.data.xp;
    }

    get drops(): any[] {
        return this.data.drops;
    }

    get turns(): number {
        return this.data.result;
    }

    get monsterBlockedHits() {
        return this.data.monster_blocked_hits;
    }

    get playerBlockedHits() {
        return this.data.player_blocked_hits;
    }

    get logs(): string[] {
        return this.data.logs;
    }

    get result(): string {
        return this.data.result;
    }
}
