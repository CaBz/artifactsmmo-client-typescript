import {DataLoader} from "../generators/DataLoader.js";
import {TaskRepository} from "../repositories/TaskRepository.js";
import * as Utils from "../Utils.js";

export class ActiveEventsDispatcher {
    constructor(
        private readonly dataLoader: DataLoader,
        private readonly taskRepository: TaskRepository
    ) {
    }

    async start(): Promise<void> {
        try {
            await this.fetchActiveEvents();
        } catch (e) {
            console.log(e);

            await Utils.sleep(5000);
            await this.start();
        }
    }

    async fetchActiveEvents() {
        console.log(`[${(new Date()).toLocaleString()}] Fetching active events`);

        const activeEvents = await this.dataLoader.reloadActiveEvents();

        let richardTask = (await this.taskRepository.getCurrentTask('Richard_CDL'))!
        let patatePoilTask = (await this.taskRepository.getCurrentTask('PatatePoil'))!
        let yourBoiBobTask = (await this.taskRepository.getCurrentTask('YourBoiBob'))!
        let ginetteTask = (await this.taskRepository.getCurrentTask('Ginette'))!
        let bigBootyTask = (await this.taskRepository.getCurrentTask('BigBooty'))!

        const events = {
            bandit_camp: false,
            portal_demon: false,
            strange_apparition: false,
            magic_apparition: false,
        };

        for (let i= 0; i<activeEvents.length; i++) {
            const event = activeEvents[i]!;
            events[event.code] = true;

            // RICHARD_CDL
            if (event.code === 'bandit_camp' && richardTask.current_task !== 'f-bandit_lizard' && richardTask.current_task !== 'f-demon') {
                console.log(`[${(new Date()).toLocaleString()}] Dispatching Richard_CDL to bandit_camp to kill bandit lizards`);
                await this.taskRepository.addPendingTask('f-bandit_lizard', true, 'Richard_CDL');
                richardTask.current_task = 'f-bandit_lizard';
            }

            if (event.code === 'portal_demon' && richardTask.current_task !== 'f-demon') {
                console.log(`[${(new Date()).toLocaleString()}] Dispatching Richard_CDL to portal_demon to kill demons`);
                await this.taskRepository.addPendingTask('f-demon', true, 'Richard_CDL');
                richardTask.current_task = 'f-demon';
            }

            // GINETTE
            if (event.code === 'bandit_camp' && ginetteTask.current_task !== 'f-bandit_lizard' && ginetteTask.current_task !== 'f-demon') {
                console.log(`[${(new Date()).toLocaleString()}] Dispatching Ginette to bandit_camp to kill bandit lizards`);
                await this.taskRepository.addPendingTask('f-bandit_lizard', true, 'Ginette');
                ginetteTask.current_task = 'f-bandit_lizard';
            }

            if (event.code === 'portal_demon' && ginetteTask.current_task !== 'f-demon') {
                console.log(`[${(new Date()).toLocaleString()}] Dispatching Ginette to portal_demon to kill demons`);
                await this.taskRepository.addPendingTask('f-demon', true, 'Ginette');
                ginetteTask.current_task = 'f-demon';
            }

            // BIGBOOTY
            if (event.code === 'bandit_camp' && bigBootyTask.current_task !== 'f-bandit_lizard' && bigBootyTask.current_task !== 'f-demon') {
                console.log(`[${(new Date()).toLocaleString()}] Dispatching BigBooty to bandit_camp to kill bandit lizards`);
                await this.taskRepository.addPendingTask('f-bandit_lizard', true, 'BigBooty');
                bigBootyTask.current_task = 'f-bandit_lizard';
            }

            if (event.code === 'portal_demon' && bigBootyTask.current_task !== 'f-demon') {
                console.log(`[${(new Date()).toLocaleString()}] Dispatching BigBooty to portal_demon to kill demons`);
                await this.taskRepository.addPendingTask('f-demon', true, 'BigBooty');
                bigBootyTask.current_task = 'f-demon';
            }

            // PATATEPOIL
            if (event.code === 'strange_apparition' && patatePoilTask.current_task !== 'g-strange_ore') {
                console.log(`[${(new Date()).toLocaleString()}] Dispatching PatatePoil to strange_apparition to gather strange ores`);
                await this.taskRepository.addPendingTask('g-strange_ore', true, 'PatatePoil');
                patatePoilTask.current_task = 'g-strange_ore';
            }

            // YOURBOIBOB
            if (event.code === 'magic_apparition' && yourBoiBobTask.current_task !== 'g-magic_wood') {
                console.log(`[${(new Date()).toLocaleString()}] Dispatching YourBoiBob to magic_apparition to gather magic woods`);
                await this.taskRepository.addPendingTask('g-magic_wood', true, 'YourBoiBob');
                yourBoiBobTask.current_task = 'g-magic_wood';
            }

            if (event.code === 'strange_apparition' && yourBoiBobTask.current_task !== 'g-strange_ore' && yourBoiBobTask.current_task !== 'g-magic_wood') {
                console.log(`[${(new Date()).toLocaleString()}] Dispatching YourBoiBob to strange_apparition to gather strange ores`);
                await this.taskRepository.addPendingTask('g-strange_ore', true, 'YourBoiBob');
                yourBoiBobTask.current_task = 'g-strange_ore';
            }
        }

        // RICHARD CDL
        if (richardTask.current_task === 'f-bandit_lizard' && !events.bandit_camp) {
            console.log(`[${(new Date()).toLocaleString()}] Dispatching Richard_CDL to ${richardTask.initial_task}`);
            await this.taskRepository.addPendingTask(richardTask.initial_task, true, 'Richard_CDL');
        }

        if (richardTask.current_task === 'f-demon' && !events.portal_demon) {
            console.log(`[${(new Date()).toLocaleString()}] Dispatching Richard_CDL to ${richardTask.initial_task}`);
            await this.taskRepository.addPendingTask(richardTask.initial_task, true, 'Richard_CDL');
        }

        // GINETTE
        if (ginetteTask.current_task === 'f-bandit_lizard' && !events.bandit_camp) {
            console.log(`[${(new Date()).toLocaleString()}] Dispatching Ginette to ${ginetteTask.initial_task}`);
            await this.taskRepository.addPendingTask(ginetteTask.initial_task, true, 'Ginette');
        }

        if (ginetteTask.current_task === 'f-demon' && !events.portal_demon) {
            console.log(`[${(new Date()).toLocaleString()}] Dispatching Ginette to ${ginetteTask.initial_task}`);
            await this.taskRepository.addPendingTask(ginetteTask.initial_task, true, 'Ginette');
        }

        // BIGBOOTY
        if (bigBootyTask.current_task === 'f-bandit_lizard' && !events.bandit_camp) {
            console.log(`[${(new Date()).toLocaleString()}] Dispatching BigBooty to ${ginetteTask.initial_task}`);
            await this.taskRepository.addPendingTask(bigBootyTask.initial_task, true, 'BigBooty');
        }

        if (bigBootyTask.current_task === 'f-demon' && !events.portal_demon) {
            console.log(`[${(new Date()).toLocaleString()}] Dispatching BigBooty to ${ginetteTask.initial_task}`);
            await this.taskRepository.addPendingTask(bigBootyTask.initial_task, true, 'BigBooty');
        }

        // PATATEPOIL
        if (patatePoilTask.current_task === 'g-strange_ore' && !events.strange_apparition) {
            console.log(`[${(new Date()).toLocaleString()}] Dispatching PatatePoil to ${patatePoilTask.initial_task}`);
            await this.taskRepository.addPendingTask(patatePoilTask.initial_task, true, 'PatatePoil');
        }

        // YOURBOIBOB
        if (yourBoiBobTask.current_task === 'g-magic_wood' && !events.magic_apparition) {
            console.log(`[${(new Date()).toLocaleString()}] Dispatching YourBoiBob to ${yourBoiBobTask.initial_task}`);
            await this.taskRepository.addPendingTask(yourBoiBobTask.initial_task, true, 'YourBoiBob');
        }

        if (yourBoiBobTask.current_task === 'g-strange_ore' && !events.strange_apparition) {
            console.log(`[${(new Date()).toLocaleString()}] Dispatching YourBoiBob to ${yourBoiBobTask.initial_task}`);
            await this.taskRepository.addPendingTask(yourBoiBobTask.initial_task, true, 'YourBoiBob');
        }

        await Utils.sleep(60000);
        await this.fetchActiveEvents();
    }
}
