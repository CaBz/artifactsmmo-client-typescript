import { PrismaClient } from '@prisma/client'

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
}
