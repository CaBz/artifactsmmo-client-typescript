import {PointOfInterest} from "./lexical/PointOfInterest.js";
import {Container} from "./Container.js";
import {Items} from "./lexical/Items.js";
import * as Utils from "./Utils.js";
import {LexicalGenerator} from "./services/LexicalGenerator.js";
import {DataFileMerger} from "./services/DataFileMerger.js";

const consoleParams = process.argv;
consoleParams.shift(); // process name
consoleParams.shift(); // file name

const characterName = consoleParams.shift()!
const container = new Container(characterName);

const commandName: string = consoleParams.shift() || 'character-status';

try {
    await processCommand(commandName);
} catch (e) {
    console.log();
    console.error(`UNHANDLED EXCEPTION: ${e.message}`);
    console.log();
}

async function processCommand(commandName: string) {
    switch (commandName) {
        case 'workflow':
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
            await container.banker.getStatus(!!consoleParams.shift());
            break;

        case 'bank-withdraw':
            await container.banker.withdraw((consoleParams.shift() || '') as Items, -1);
            break;

        case 'map-status':
            await container.client.getMap(+(consoleParams.shift() || -1000), +(consoleParams.shift() || -1000));
            break;

        case 'gather':
            await container.gatherer.gather(+(consoleParams.shift() || -1));
            break;

        case 'move':
            await container.mover.moveToCoordinates(+(consoleParams.shift() || -1000), +(consoleParams.shift() || -1000));
            break;

        case 'move-named':
            await container.mover.moveToPointOfInterest((consoleParams.shift() || '') as PointOfInterest);
            break;

        case 'rest':
            await container.rester.rest();
            break;

        case 'fight':
            await container.fighter.fight(+(consoleParams.shift() || 1))
            break;

        case 'announcements':
            await container.client.getAnnouncements();
            break;

        case 'resources':
        case 'items':
        case 'npcs':
        case 'badges':
        case 'achievements':
        case 'monsters':
        case 'tasks':
            await container.client.getByEntityAndCode(commandName, consoleParams.shift())
            break;

        case 'does-it-hold':
            const character = await container.characterGateway.status();
            console.log(character.holdsHowManyOf(consoleParams.shift() || ''));

        case 'merge-all-data': await DataFileMerger.mergeEverything(); break;
        case 'generate': await LexicalGenerator.generateAll(); break;

        default:
            console.error('\n\n!!!! Need to put a proper command name dudelino !!!\n\n\n');
            break;
    }
}


