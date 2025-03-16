import { PrismaClient } from '@prisma/client'
import {Items} from "../lexical/Items.js";
import {Item} from "../entities/Item.js";

export class ItemRepository {
    constructor(private readonly db: PrismaClient) {
    }

    async get(code: Items): Promise<Item> {
        const itemData = await this.db.items.findFirstOrThrow({
            where: { code }
        });

        return new Item(itemData.data);
    }
}
