import {Container} from "./Container.js";
import * as Utils from "./Utils.js";

const consoleParams = process.argv;
consoleParams.shift(); // process name
consoleParams.shift(); // file name

const characterName = consoleParams.shift()!
const container = await Container.create(characterName);

try {
    console.log(Utils.LINE);
    await container.workflowOrhcestrator.findWorkflowAndExecute(
        consoleParams.shift() || '', // name -> Workflows.ts
        +(consoleParams.shift() || -1) // loops -> -1 = infinity
    );
    console.log(Utils.LINE);
} catch (e) {
    console.log();
    //console.error(`UNHANDLED EXCEPTION: ${e.message}`);
    console.error(e);
    console.log();
}
