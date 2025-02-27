import {ArtifactsClient} from "../gateways/ArtifactsClient.js";
import * as Utils from "../Utils.js";

export class DataFetcher {
    constructor(private readonly client: ArtifactsClient, private readonly saveFolder: string) {
    }

    async fetchAndSaveEverything(): Promise<any> {
        // Lazying the URL paths
        const dataSets = [
            'items',
            'monsters',
            'maps',
            'resources',
            'npcs',
            'tasks',
            'tasks/rewards', // too lazy to map this - hacking below to replace the / with _
            'events',
            'effects',
        ];

        const everything = {

        };

        let path: string, entity: string;
        for (var i = 0; i<dataSets.length; i++) {
            path = dataSets[i]!;

            try {
                const data = await this.client.getAllOf(path);
                entity = path.replaceAll('/', '_');

                await Utils.writeFile(`${this.saveFolder}/${entity}.json`, data);

                everything[entity] = data;
                if (entity !== 'maps') {
                    everything[entity].sort((a: any, b: any) => a.code.localeCompare(b.code));
                }
            } catch (e) {
                console.error(e.message);
            }

            await Utils.sleep(1000);
        }

        await Utils.writeFile(`${this.saveFolder}/everything.json`, everything);
    }
}
