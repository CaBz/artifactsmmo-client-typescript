import {DataLoader} from "../generators/DataLoader.js";
import {TaskRepository} from "../repositories/TaskRepository.js";
import * as Utils from "../Utils.js";
import {Character} from "../entities/Character.js";
import {Simulator} from "../simulations/Simulator.js";
import {ArtifactsClient} from "../gateways/ArtifactsClient.js";

export class ActiveEventsDispatcher {
    private characters: Character[];

    constructor(
        private readonly dataLoader: DataLoader,
        private readonly taskRepository: TaskRepository,
        private readonly simulator: Simulator,
        private readonly client: ArtifactsClient,
    ) {
    }

    async start(): Promise<void> {
        this.characters = await this.client.getAllCharacterStatus();
        try {
            await this.fetchActiveEvents();
        } catch (e) {
            console.log(e);

            await Utils.sleep(5000);
            await this.start();
        }
    }

    getNow(): string {
        return `[${(new Date()).toLocaleString()}];`
    }

    async fetchActiveEvents() {
        console.log(`${this.getNow()} Fetching active events`);

        const activeEvents = await this.dataLoader.reloadActiveEvents();
        const characterTasks = await this.taskRepository.getAllCharacterTasks();

        const events: any = {};
        activeEvents.forEach((event) => {
            events[event.code] = true;
        });

        const fighters = [
            'Richard_CDL',
            'Ginette',
            'BigBooty',
        ];

        const fighterEvents: any = {
            'bandit_camp': 'f-bandit_lizard',
            'portal_demon': 'f-demon',
        }

        const gatherers = [
            'PatatePoil',
            'YourBoiBob',
        ];

        const gathererEvents: any = {
            'strange_apparition': 'g-strange_ore',
            'magic_apparition': 'g-magic_wood',
        }

        const supportedEvents: any = {
            ... fighterEvents,
            ... gathererEvents,
        };


        for (let i= 0; i<activeEvents.length; i++) {
            const event = activeEvents[i]!;

            const eventAction = supportedEvents[event.code] || undefined;
            if (!eventAction) {
                continue;
            }

            if (fighterEvents[event.code]) {
                for (let f = 0; f < fighters.length; f++) {
                    const fighter = fighters[f]!;
                    const fighterTask = characterTasks.get(fighter);

                    if (Object.values(fighterEvents).includes(fighterTask.current_task)) {
                        continue;
                    }

                    console.log(`${this.getNow()} Dispatching ${fighter} to ${event.code} to kill ${event.map.contentCode}`);
                    await this.taskRepository.addPendingTask(eventAction, true, fighter);
                    fighterTask.current_task = eventAction;
                }

                continue;
            }

            if (gathererEvents[event.code]) {
                for (let f = 0; f < gatherers.length; f++) {
                    const gatherer = gatherers[f]!;
                    const gathererTask = characterTasks.get(gatherer);

                    if (Object.values(gathererEvents).includes(gathererTask.current_task)) {
                        continue;
                    }

                    console.log(`${this.getNow()} Dispatching ${gatherer} to ${event.code} to gather ${event.map.contentCode}`);
                    await this.taskRepository.addPendingTask(eventAction, true, gatherer);
                    gathererTask.current_task = eventAction;
                }
            }
        }

        const reverseMappings: any = {
            'f-bandit_lizard': 'bandit_camp',
            'f-demon': 'portal_demon',
            'g-strange_ore': 'strange_apparition',
            'g-magic_wood': 'magic_apparition',
        }

        for (let i =0; i<this.characters.length; i++) {
            const character: Character = this.characters[i]!;
            const characterTask: any = characterTasks.get(character.name);

            const eventName = reverseMappings[characterTask.current_task] || undefined;
            if (!eventName) {
                continue;
            }

            if (events[eventName]) {
                continue;
            }

            console.log(`${this.getNow()} Dispatching ${character.name} back to ${characterTask.initial_task}`);
            await this.taskRepository.addPendingTask(characterTask.initial_task, true, character.name);
        }

        await Utils.sleep(60000);
        await this.fetchActiveEvents();
    }
}
