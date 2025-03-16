import { PrismaClient } from '@prisma/client'
import {Merchant} from "../entities/Merchant.js";

export class NpcRepository {
    private model;

    constructor(private readonly db: PrismaClient) {
        this.model = this.db.npcs;
    }

    async getAll(): Promise<Map<string, Merchant>> {
        const data = await this.model.findMany({
            select: {code: true, data: true},
        });

        const result: Map<string, Merchant> = new Map<string, Merchant>();
        data.forEach((datum) => {
            result.set(datum.code, new Merchant(datum.data));
        })

        return result;
    }
}
