import { PrismaClient } from '@prisma/client'
import {Effect} from "../entities/Effect.js";

export class EffectRepository {
    private model;

    constructor(private readonly db: PrismaClient) {
        this.model = this.db.effects;
    }

    async getAll(): Promise<Map<string, Effect>> {
        const data = await this.model.findMany({
            select: {code: true, data: true},
        });

        const result: Map<string, Effect> = new Map<string, Effect>();
        data.forEach((datum) => {
            result.set(datum.code, new Effect(datum.data));
        })

        return result;
    }
}
