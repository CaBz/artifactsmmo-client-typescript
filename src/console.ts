import {Container} from "./Container.js";
import {Items} from "./lexical/Items.js";
import * as Utils from "./Utils.js";
import {Monsters} from "./lexical/Monsters.js";
import {EquippableSlot} from "./lexical/EquippableSlot.js";
import {AllMerchants} from "./lexical/Merchants.js";
import {ItemType} from "./entities/Item.js";

const consoleParams = process.argv;
consoleParams.shift(); // process name
consoleParams.shift(); // file name

const characterName = consoleParams.shift()!
const container = await Container.create(characterName);

const commandName: string = consoleParams.shift() || 'character-status';

try {
    await processCommand(commandName);
} catch (e) {
    console.log();
    //console.error(`UNHANDLED EXCEPTION: ${e.message}`);
    console.error(e);
    console.log();
}

async function processCommand(commandName: string) {
    let code: any;
    switch (commandName) {
        case 'workflow':
        case 'w':
        case 'wf':
            console.log(Utils.LINE);
            const taskName = consoleParams.shift() || '';

            await container.taskRepository.updateInitialTask(taskName)
            await container.workflowOrhcestrator.findWorkflowAndExecute(
                taskName, // name -> Workflows.ts
                +(consoleParams.shift() || -1) // loops -> -1 = infinity
            );
            console.log(Utils.LINE);
            break;
        case 'status':
            await container.characterGateway.logStatus(consoleParams.shift()?.split(','))
            break;

        case 'dispatch-events':
            await container.activeEventsDispatcher.start();
            break;

        case 'bank-status':
            await container.banker.getStatus();
            break;

        case 'rest':
            await container.rester.rest();
            break;

        case 'recycle':
            await container.crafter.recycle(
                (consoleParams.shift() || '') as unknown as Items,
                1
            );
            break;

        // Utility function to swap an equipped item from the back
        case 'swap':
            code = (consoleParams.shift() || '') as Items;
            await container.banker.withdraw(code, 1);
            await container.equipper.swap(code);
            break;

        // Show announcements
        case 'announcements':
            await container.client.getAnnouncements();
            break;

        // Show announcements
        case 'pending-tasks':
            console.log(
                await container.taskRepository.getPendingTasks()
            );
            break;

        case 'add-pending-task':
        case 'apt':
            console.log(
                await container.taskRepository.addPendingTask(
                    (consoleParams.shift() || ''),
                    !!consoleParams.shift()
                )
            );
            break;

        // Just to dump an entity
        case 'resources':
        case 'items':
        case 'npcs':
        case 'badges':
        case 'monsters':
        case 'tasks':
            await container.client.getByEntityAndCode(commandName, consoleParams.shift())
            break;

        case 'achievements':
            await container.client.getAccountAchievements();
            break;

        case 'events':
            await container.client.getActiveEvents();
            break;

        // Shows all items sellables/buyables from all npcs
        case 'npc-items':
            AllMerchants.forEach((merchantCode: string) => {
                container.client.getNpcItems(merchantCode);
            });
            break;

        // List all items in a nice table to see effects/recipe items
        case 'list-items':
            container.equipper.logToConsole(
                +(consoleParams.shift() || -1),
                consoleParams.shift() as ItemType | undefined
            );
            break;

        // Just to check how many items the character has on them
        case 'does-it-hold':
            const character = await container.characterGateway.status();
            console.log(character.holdsHowManyOf((consoleParams.shift() || '') as Items));
            break;

        // Simulate a fight with a mob, useful to validate fight simulation logic
        case 'simulate':
            await container.simulator.simulateAgainst(
                (consoleParams.shift() || '') as Monsters,
                'details'
            );
            break;

        // Simulates against a monster with a different item equipped (replace the slot)
        // Allows to compare with current items in all char inventories + bank or ALL items around the level range
        case 'simulate-ultimate':
        case 'sim-ult':
            await container.simulator.simulateUltimate(
                (consoleParams.shift() || '') as Monsters,
                +(consoleParams.shift() || -1),
                consoleParams.shift() === '1',
                consoleParams.shift() === '1',
            );
            break;
        case 'simulate-ultimate-all':
        case 'sim-ult-all':
            await container.simulator.simulateUltimateAll(
                +(consoleParams.shift() || -1),
                consoleParams.shift() === '1'
            );
            break;

        // Simulate against all monsters with current equipment
        // Useful to see what's the highest level monster to fight
        case 'simulate-all':
            await container.simulator.simulateAgainstAllMonsters();
            break;

        // Simulates against a monster with a different item equipped (replace the slot)
        case 'simulate-equipment':
            await container.simulator.simulateWithItemCodeAgainst(
                (consoleParams.shift() || '') as Monsters,
                (consoleParams.shift() || '') as Items
            );
            break;

        // Simulates against a monster to try to find best piece for each slot
        // Will only test for items at current level (or specified) - 9
        case 'simulate-set':
            await container.simulator.findBestSetAgainst(
                (consoleParams.shift() || '') as Monsters,
                +(consoleParams.shift() || -1)
            );
            break;

        // Simulate against a monster to try to find the best piece for a specific slot
        // Level = prevent testing all items
        case 'simulate-best':
            await container.simulator.findBestUsableEquippableSlot(
                (consoleParams.shift() || '') as Monsters,
                (consoleParams.shift() || '') as EquippableSlot,
                +(consoleParams.shift() || 40)
            );
            break;

        // Simulate against a monster to try to find the best piece for a all slots
        // Level = prevent testing all items
        case 'simulate-best-all':
            await container.simulator.findBestUsableEquippables(
                (consoleParams.shift() || '') as Monsters,
                +(consoleParams.shift() || 40)
            );
            break;

        // Allows to check what are the next thing to do to increase a skill
        // Additional params hides non-craftable
        case 'skill-next':
            await container.simulator.findNextToDo(
                consoleParams.shift()
            );
            break;

        // Refresh & Regenerate lexicals
        case 'refresh-all': await container.dataLoader.saveDataSets(); break;
        case 'refresh-events': await container.dataLoader.reloadActiveEvents(); break;
        case 'generate': await container.lexicalGenerator.generateAll(); break;

        default:
            consoleParams.unshift(commandName);
            await processCommand('workflow'); // Funky
            break;
    }
}


