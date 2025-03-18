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

        let richardTask = (await this.taskRepository.getCurrentTask('Richard_CDL'))?.task || '';
        let patatePoilTask = (await this.taskRepository.getCurrentTask('PatatePoil'))?.task || '';
        let yourBoiBobTask = (await this.taskRepository.getCurrentTask('YourBoiBob'))?.task || '';
        let ginetteTask = (await this.taskRepository.getCurrentTask('Ginette'))?.task || '';
        let bigBootyTask = (await this.taskRepository.getCurrentTask('BigBooty'))?.task || '';

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
            if (event.code === 'bandit_camp' && richardTask !== 'f-bandit_lizard' && richardTask !== 'f-demon') {
                console.log(`[${(new Date()).toLocaleString()}] Dispatching Richard_CDL to bandit_camp to kill bandit lizards`);
                await this.taskRepository.addPendingTask('f-bandit_lizard', true, 'Richard_CDL');
                richardTask = 'f-bandit_lizard';
                continue;
            }

            if (event.code === 'portal_demon' && richardTask !== 'f-demon') {
                console.log(`[${(new Date()).toLocaleString()}] Dispatching Richard_CDL to portal_demon to kill demons`);
                await this.taskRepository.addPendingTask('f-demon', true, 'Richard_CDL');
                richardTask = 'f-demon';
                continue;
            }

            // GINETTE
            if (event.code === 'bandit_camp' && ginetteTask !== 'f-bandit_lizard' && ginetteTask !== 'f-demon') {
                console.log(`[${(new Date()).toLocaleString()}] Dispatching Ginette to bandit_camp to kill bandit lizards`);
                await this.taskRepository.addPendingTask('f-bandit_lizard', true, 'Ginette');
                ginetteTask = 'f-bandit_lizard';
                continue;
            }

            if (event.code === 'portal_demon' && ginetteTask !== 'f-demon') {
                console.log(`[${(new Date()).toLocaleString()}] Dispatching Ginette to portal_demon to kill demons`);
                await this.taskRepository.addPendingTask('f-demon', true, 'Ginette');
                ginetteTask = 'f-demon';
                continue;
            }

            // BIGBOOTY
            if (event.code === 'bandit_camp' && bigBootyTask !== 'f-bandit_lizard' && bigBootyTask !== 'f-demon') {
                console.log(`[${(new Date()).toLocaleString()}] Dispatching Bigbooty to bandit_camp to kill bandit lizards`);
                await this.taskRepository.addPendingTask('f-bandit_lizard', true, 'Bigbooty');
                bigBootyTask = 'f-bandit_lizard';
                continue;
            }

            if (event.code === 'portal_demon' && bigBootyTask !== 'f-demon') {
                console.log(`[${(new Date()).toLocaleString()}] Dispatching Bigbooty to portal_demon to kill demons`);
                await this.taskRepository.addPendingTask('f-demon', true, 'Bigbooty');
                bigBootyTask = 'f-demon';
                continue;
            }

            // PATATEPOIL
            if (event.code === 'strange_apparition' && patatePoilTask !== 'g-strange_ore') {
                console.log(`[${(new Date()).toLocaleString()}] Dispatching PatatePoil to strange_apparition to gather strange ores`);
                await this.taskRepository.addPendingTask('g-strange_ore', true, 'PatatePoil');
                patatePoilTask = 'g-strange_ore';
                continue;
            }

            // YOURBOIBOB
            if (event.code === 'magic_apparition' && yourBoiBobTask !== 'g-magic_wood') {
                console.log(`[${(new Date()).toLocaleString()}] Dispatching YourBoiBob to magic_apparition to gather magic woods`);
                await this.taskRepository.addPendingTask('g-magic_wood', true, 'YourBoiBob');
                yourBoiBobTask = 'g-magic_wood';
            }

            if (event.code === 'strange_apparition' && yourBoiBobTask !== 'g-strange_ore' && yourBoiBobTask !== 'g-magic_wood') {
                console.log(`[${(new Date()).toLocaleString()}] Dispatching YourBoiBob to strange_apparition to gather strange ores`);
                await this.taskRepository.addPendingTask('g-strange_ore', true, 'YourBoiBob');
                yourBoiBobTask = 'g-strange_ore';
            }
        }

        // RICHARD CDL
        if (richardTask === 'f-bandit_lizard' && !events.bandit_camp) {
            console.log(`[${(new Date()).toLocaleString()}] Dispatching Richard_CDL to kill owl bears`);
            await this.taskRepository.addPendingTask('f-owlbear', true, 'Richard_CDL');
        }

        if (richardTask === 'f-demon' && !events.portal_demon) {
            console.log(`[${(new Date()).toLocaleString()}] Dispatching Richard_CDL to kill owl bears`);
            await this.taskRepository.addPendingTask('f-owlbear', true, 'Richard_CDL');
        }

        // GINETTE
        if (ginetteTask === 'f-bandit_lizard' && !events.bandit_camp) {
            console.log(`[${(new Date()).toLocaleString()}] Dispatching Ginette to kill imps`);
            await this.taskRepository.addPendingTask('f-imp', true, 'Ginette');
        }

        if (ginetteTask === 'f-demon' && !events.portal_demon) {
            console.log(`[${(new Date()).toLocaleString()}] Dispatching Ginette to kill imps`);
            await this.taskRepository.addPendingTask('f-imp', true, 'Ginette');
        }

        // BIGBOOTY
        if (bigBootyTask === 'f-bandit_lizard' && !events.bandit_camp) {
            console.log(`[${(new Date()).toLocaleString()}] Dispatching BigBooty to kill death knights`);
            await this.taskRepository.addPendingTask('f-death_knight', true, 'BigBooty');
        }

        if (bigBootyTask === 'f-demon' && !events.portal_demon) {
            console.log(`[${(new Date()).toLocaleString()}] Dispatching BigBooty to kill death knights`);
            await this.taskRepository.addPendingTask('f-death_knight', true, 'BigBooty');
        }

        // PATATEPOIL
        if (patatePoilTask === 'g-strange_ore' && !events.strange_apparition) {
            console.log(`[${(new Date()).toLocaleString()}] Dispatching PatatePoil to gather and craft gold`);
            await this.taskRepository.addPendingTask('gc-cooked_gudgeon', true, 'PatatePoil');
        }

        // YOURBOIBOB
        if (yourBoiBobTask === 'g-magic_wood' && !events.magic_apparition) {
            console.log(`[${(new Date()).toLocaleString()}] Dispatching YourBoiBob to gather and craft gold`);
            await this.taskRepository.addPendingTask('gc-gold', true, 'YourBoiBob');
        }

        if (yourBoiBobTask === 'g-strange_ore' && !events.strange_apparition) {
            console.log(`[${(new Date()).toLocaleString()}] Dispatching YourBoiBob to gather and craft gold`);
            await this.taskRepository.addPendingTask('gc-gold', true, 'YourBoiBob');
        }

        await Utils.sleep(60000);
        await this.fetchActiveEvents();
    }
}
