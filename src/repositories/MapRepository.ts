import { PrismaClient } from '@prisma/client'
import {MapTile} from "../entities/MapTile.js";

export class MapRepository {
    private model;

    constructor(private readonly db: PrismaClient) {
        this.model = this.db.maps;
    }

    async getAll(): Promise<MapTile[]> {
        const data = await this.model.findMany({
            select: {data: true},
        });

        const result: MapTile[] = [];
        data.forEach((datum) => {
            result.push(new MapTile(datum));
        })

        return result;
    }
}
