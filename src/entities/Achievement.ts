export class Achievement {
    constructor(private readonly data: any) {
        /*
        {
          name: 'The French Cheese',
          code: 'the_french_cheese',
          description: 'Use 500 cheeses.',
          points: 2,
          type: 'use',
          target: 'cheese',
          total: 500,
          rewards: { gold: 2000 },
          current: 100,
          completed_at: null
        },
        */
    }

    get name(): string {
        return this.data.name;
    }

    get code(): string {
        return this.data.code;
    }

    get description(): string {
        return this.data.description;
    }

    get points(): number {
        return this.data.points;
    }

    get type(): string {
        return this.data.type;
    }

    get target(): string {
        return this.data.target;
    }

    get total(): number {
        return this.data.total;
    }

    get current(): number {
        return this.data.current;
    }

    get rewards(): any[] {
        return this.data.rewards;
    }

    get completedAt(): Date|undefined {
        return this.data.completed_at ? new Date(this.data.completed_at) : undefined;
    }

    isCompleted(): boolean {
        return this.completedAt != undefined;
    }
}
