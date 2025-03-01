export class Cooldown {
    constructor(private readonly data: any) {
        /*
        {
          "total_seconds": 0,
          "remaining_seconds": 0,
          "started_at": "2019-08-24T14:15:22Z",
          "expiration": "2019-08-24T14:15:22Z",
          "reason": "movement"
        }
        */
    }

    get totalSeconds(): number {
        return this.data.total_seconds;
    }

    get remainingSeconds(): number {
        return this.data.remaining_seconds;
    }

    get startedAt(): Date {
        return new Date(this.data.started_at);
    }

    get expiration(): Date {
        return new Date(this.data.expiration);
    }

    get reason(): string {
        return this.data.reason;
    }
}
