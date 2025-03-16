import { PrismaClient } from '@prisma/client'
import {Resource} from "../entities/Resource.js";

export class ResourceRepository {
    private model;

    constructor(private readonly db: PrismaClient) {
        this.model = this.db.resources;
    }

    async getAll(): Promise<Map<string, Resource>> {
        const data = await this.model.findMany({
            select: {code: true, data: true},
        });

        const result: Map<string, Resource> = new Map<string, Resource>();
        data.forEach((datum) => {
            result.set(datum.code, new Resource(datum.data));
        })

        return result;
    }
}
