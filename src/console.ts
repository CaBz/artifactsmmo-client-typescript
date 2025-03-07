import {Container} from "./Container.js";
import {Items} from "./lexical/Items.js";
import * as Utils from "./Utils.js";
import {Monsters} from "./lexical/Monsters.js";
import {EquippableSlot} from "./lexical/EquippableSlot.js";
import {AllMerchants} from "./lexical/Merchants.js";
import {Skills} from "./lexical/Skills.js";
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
            await container.workflowOrhcestrator.findWorkflowAndExecute(
                consoleParams.shift() || '', // name -> Workflows.ts
                +(consoleParams.shift() || -1) // loops -> -1 = infinity
            );
            console.log(Utils.LINE);
            break;
        case 'status':
            await container.characterGateway.logStatus(consoleParams.shift()?.split(','))
            break;

        case 'bank-status':
            await container.banker.getStatus();
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

        // Just to dump an entity
        case 'resources':
        case 'items':
        case 'npcs':
        case 'badges':
        case 'achievements':
        case 'monsters':
        case 'tasks':
            await container.client.getByEntityAndCode(commandName, consoleParams.shift())
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
                (consoleParams.shift() || '') as Skills,
                consoleParams.shift()
            );
            break;

        // Refresh & Regenerate lexicals
        case 'refresh-dataset': await container.dataLoader.saveDataSets(); break;
        case 'generate': await container.lexicalGenerator.generateAll(); break;
        default:
            break;
    }
}


