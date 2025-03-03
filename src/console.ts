import {PointOfInterest} from "./lexical/PointOfInterest.js";
import {Container} from "./Container.js";
import {Items} from "./lexical/Items.js";
import * as Utils from "./Utils.js";
import {Monsters} from "./lexical/Monsters.js";
import {EquippableSlot} from "./lexical/EquippableSlot.js";
import {Recipes} from "./lexical/Recipes.js";
import {AllMerchants, Merchants} from "./lexical/Merchants.js";

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

        case 'bank-withdraw':
            await container.banker.withdraw((consoleParams.shift() || '') as Items, -1);
            break;

        case 'map-status':
            await container.client.getMap(+(consoleParams.shift() || -1000), +(consoleParams.shift() || -1000));
            break;

        case 'recipe':
            console.log(Recipes.getFor((consoleParams.shift() || '') as Items));
            break;

        case 'gather':
            await container.gatherer.gather(+(consoleParams.shift() || -1));
            break;

        case 'swap':
            code = (consoleParams.shift() || '') as Items;
            await container.banker.withdraw(code, 1);
            await container.equipper.swap(code);
            break;

        case 'monster':
            const tmp: any = [];
            container.monsters.forEach((monster) => {
                tmp.push(monster);
            });
            tmp.sort((a: any, b: any) => a.level - b.level);
            tmp.forEach((monster: any) => {
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

        case 'rest-consume':
            await container.rester.restoreFromConsumables(await container.characterGateway.status());
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

        case 'npc-items':
            AllMerchants.forEach((merchantCode: string) => {
                container.client.getNpcItems(merchantCode);
            });
            break;

        case 'does-it-hold':
            const character = await container.characterGateway.status();
            console.log(character.holdsHowManyOf((consoleParams.shift() || '') as Items));
            break;

        case 'refresh-dataset': await container.dataLoader.saveDataSets(); break;
        case 'generate': await container.lexicalGenerator.generateAll(); break;

        case 'simulate':
            code = (consoleParams.shift() || '') as Monsters;
            const loops = +(consoleParams.shift() || 1);
            if (loops === 1) {
                await container.simulator.simulateAgainst(code, 'details');
            } else {
                await container.simulator.simulateAgainstFor(code, loops);
            }
            break;
        case 'simulate-all':
            await container.simulator.simulateAgainstAllMonsters();
            break;
        case 'simulate-equipment':
            await container.simulator.simulateWithItemCodeAgainst((consoleParams.shift() || '') as Monsters, (consoleParams.shift() || '') as Items);
            break;
        case 'simulate-best':
            await container.simulator.findBestUsableEquippableSlot((consoleParams.shift() || '') as Monsters, (consoleParams.shift() || '') as EquippableSlot);
            break;
        case 'simulate-best-all':
            await container.simulator.findBestUsableEquippables((consoleParams.shift() || '') as Monsters);
            break;
        case 'analyze-fight':
            await container.simulator.analyzeFightTurn((consoleParams.shift() || '') as Monsters);
            break;
        default:
            console.error('Put a proper command name');
            break;
    }
}


