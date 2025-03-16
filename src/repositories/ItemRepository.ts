import { PrismaClient } from '@prisma/client'
import {Item} from "../entities/Item.js";

export class ItemRepository {
    private model;

    constructor(private readonly db: PrismaClient) {
        this.model = this.db.items;
    }

    async getAll(): Promise<Map<string, Item>> {
        const data = await this.model.findMany({
            select: {code: true, data: true},
        });

        const result: Map<string, Item> = new Map<string, Item>();
        data.forEach((datum) => {
            result.set(datum.code, new Item(datum.data));
        })

        return result;
    }
}
