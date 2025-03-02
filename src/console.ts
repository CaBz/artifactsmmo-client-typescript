import {PointOfInterest} from "./lexical/PointOfInterest.js";
import {Container} from "./Container.js";
import {Items} from "./lexical/Items.js";
import * as Utils from "./Utils.js";
import {LexicalGenerator} from "./generators/LexicalGenerator.js";
import {Monsters} from "./lexical/Monsters.js";

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

        case 'swap':
            const code = (consoleParams.shift() || '') as Items;
            await container.banker.withdraw(code, 1);
            await container.equipper.swap(code);
            break;

        case 'monster':
            const tmp = [];
            container.monsters.forEach((monster) => {
                tmp.push(monster);
            });
            tmp.sort((a, b) => a.level - b.level);
            tmp.forEach((monster) => {
                console.log(monster.name, monster.level);
            });
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
            console.log(character.holdsHowManyOf((consoleParams.shift() || '') as Items));
            break;

        case 'refresh-dataset': await container.dataLoader.saveDataSets(); break;
        case 'generate': await container.lexicalGenerator.generateAll(); break;

        case 'simulate':
            const monsterCode = (consoleParams.shift() || '') as Monsters;
            const loops = +(consoleParams.shift() || 1);
            if (loops === 1) {
                await container.simulator.simulateAgainst(monsterCode, 'details');
            } else {
                await container.simulator.simulateAgainstFor(monsterCode, loops);
            }
            break;
        case 'simulate-all':
            await container.simulator.simulateAgainstAllMonsters();
            break;
        case 'analyze-fight':
            await container.simulator.analyzeFightTurn((consoleParams.shift() || '') as Monsters);
            break;
        default:
            console.error('Put a proper command name');
            break;
    }
}


