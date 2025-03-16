import { PrismaClient } from '@prisma/client'
import {Monster} from "../entities/Monster.js";
import {Task} from "../entities/Task.js";
import {TaskRewards} from "../entities/TaskRewards.js";

export class TaskRepository {
    constructor(private readonly db: PrismaClient) {
    }

    async getPendingTasks(characterName: string): Promise<any[]> {
        return this.db.pending_tasks.findMany({
            where: {
                character: characterName,
            },
            orderBy: {
                creationDate: 'asc',
            }
        })
    }

    async getAll(): Promise<Map<string, Task>> {
        const data = await this.db.tasks.findMany({
            select: {code: true, data: true},
        });

        const result: Map<string, Task> = new Map<string, Task>();
        data.forEach((datum) => {
            result.set(datum.code, new Task(datum.data));
        })

        return result;
    }
}
