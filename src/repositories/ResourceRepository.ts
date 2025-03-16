import { PrismaClient } from '@prisma/client'
import {Monster} from "../entities/Monster.js";

export class ResourceRepository {
    private model;

    constructor(private readonly db: PrismaClient) {
        this.model = this.db.monsters;
    }

    async getAll(): Promise<Map<string, Monster>> {
        const data = await this.model.findMany({
            select: {code: true, data: true},
        });

        const result: Map<string, Monster> = new Map<string, Monster>();
        data.forEach((datum) => {
            result.set(datum.code, new Monster(datum.data));
        })

        return result;
    }
}
