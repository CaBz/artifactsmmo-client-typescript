import { PrismaClient } from '@prisma/client'
import {Task} from "../entities/Task.js";

export class TaskRepository {
    constructor(private readonly db: PrismaClient, private readonly characterName: string) {
    }

    async updateCurrentTask(task: string) {
        return this.db.character_tasks.upsert({
            where: {
                character: this.characterName,
            },
            update: {
                current_task: task,
            },
            create: {
                character: this.characterName,
                current_task: task,
                initial_task: task,
            }
        })
    }

    async updateInitialTask(task: string) {
        return this.db.character_tasks.upsert({
            where: {
                character: this.characterName,
            },
            update: {
                initial_task: task,
            },
            create: {
                character: this.characterName,
                current_task: task,
                initial_task: task,
            }
        })
    }

    async checkForImmediateTask(): Promise<void> {
        const tasks = await this.getPendingTasks()
        for (let i=0; i<tasks.length; i++) {
            const task = tasks[i]!;
            if (task.is_immediate) {
                await this.deletePreviousPendingTask(task.id);
                throw new Error(`New task: ${task.name}`);
            }
        }
    }

    async addPendingTask(name: string, isImmediate: boolean, character?: string) {
        return this.db.pending_tasks.create({
            data: {
                character: character || this.characterName,
                name,
                is_immediate: isImmediate,
                is_in_progress: false,
                is_refresh_events: true,
            },
        });
    }

    async getPendingTasks() {
        return this.db.pending_tasks.findMany({
            where: {
                character: this.characterName,
            },
            orderBy: {
                creation_date: 'asc',
            }
        })
    }

    async getCurrentTask(character?: string) {
        return this.db.character_tasks.findFirst({
            where: {
                character: character || this.characterName,
            }
        })
    }

    async confirmPendingTask(taskId: number) {
        return this.db.pending_tasks.delete({
            where: {
                id: taskId,
            }
        })
    }

    async deletePreviousPendingTask(taskId: number) {
        return this.db.pending_tasks.deleteMany({
            where: {
                character: this.characterName,
                id: { lt: taskId }
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
