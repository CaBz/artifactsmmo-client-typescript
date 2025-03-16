import { PrismaClient } from '@prisma/client'
import {Effect} from "../entities/Effect.js";
import {Event} from "../entities/Event.js";

export class EventRepository {
    private model;

    constructor(private readonly db: PrismaClient) {
        this.model = this.db.events;
    }

    async getAll(): Promise<Map<string, Event>> {
        const data = await this.model.findMany({
            select: {code: true, data: true},
        });

        const result: Map<string, Event> = new Map<string, Event>();
        data.forEach((datum) => {
            result.set(datum.code, new Event(datum.data));
        })

        return result;
    }

    async getAllActive(): Promise<Event[]> {
        const data = await this.db.active_events.findMany({
            select: {data: true},
        });

        const result: Event[] = [];
        data.forEach((datum) => {
            result.push(new Event(datum.data));
        })

        return result;
    }
}
