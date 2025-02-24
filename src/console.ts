import {PointOfInterest} from "./lexical/PointOfInterest.js";
import {Container} from "./Container.js";

const consoleParams = process.argv;
consoleParams.shift(); // process name
consoleParams.shift(); // file name

const characterName = consoleParams.shift()!
const container = new Container(characterName);

const commandName: string = consoleParams.shift() || 'character-status';
await processCommand(commandName);

async function processCommand(commandName: string) {
    switch (commandName) {
        case 'workflow':
            await container.workflowOrhcestrator.findWorkflowAndExecute(
                consoleParams.shift() || '', // name -> Workflows.ts
                +(consoleParams.shift() || -1) // loops -> -1 = infinity
            );
            break;

        case 'status':
            await container.characterGateway.logStatus(consoleParams.shift()?.split(','))
            break;

        case 'bank-status':
            await container.banker.getStatus(!!consoleParams.shift());
            break;

        case 'bank-withdraw':
            await container.banker.withdraw(consoleParams.shift() || '', -1);
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

        default:
            console.error('\n\n!!!! Need to put a proper command name dudelino !!!\n\n\n');
            break;
    }
}
