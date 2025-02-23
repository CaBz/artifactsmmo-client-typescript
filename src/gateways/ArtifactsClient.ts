import { Character } from "../entities/Character.js";
import {ClientException} from "./ClientException.js";
import {Map} from "../entities/Map.js";

export class ArtifactsClient {
    private serverUrl: string;
    private bearerToken: string;

    constructor() {
        this.serverUrl = process.env['ARTIFACTS_URL']!;
        this.bearerToken = process.env['ARTIFACTS_TOKEN']!;
    }

    async getAnnouncements() {
        const result = this.sendRequest('GET', undefined, undefined);
        console.log(result);
    }

    async getCharacterStatus(characterName: string): Promise<Character> {
        return this.sendRequest('GET', `characters/${characterName}`);
    }

    async move(characterName: string, x: number, y: number) {
        return this.sendCharacterAction(characterName, 'move', {x, y});
    }

    async gather(characterName: string) {
        return this.sendCharacterAction(characterName, 'gathering');
    }

    async craft(characterName: string, code: string, quantity: number) {
        return this.sendCharacterAction(characterName, 'crafting', {code, quantity});
    }

    async rest(characterName: string) {
        return this.sendCharacterAction(characterName, 'rest');
    }

    async fight(characterName: string) {
        return this.sendCharacterAction(characterName, 'fight');
    }

    async sendCharacterAction(characterName: string, actionName: string, body?: any) {
        return this.sendRequest('POST', `my/${characterName}/action/${actionName}`, body);
    }

    async getByEntityAndCode(entity: any, code?: any) {
        let response;
        try {
            const path = code ? `${entity}/${code}` : entity;
            response = await this.sendRequest('GET', path);
        } catch (e) {
            console.error(`${e.code}: ${e.message}`);
        }

        console.dir(response, { depth: null })
    }

    async getBank(withItems?: any) {
        if (withItems) {
            return this.sendRequest('GET', 'my/bank/items');
        }

        return this.sendRequest('GET', 'my/bank');
    }

    async bankQuery(code: string) {
        return this.sendRequest('GET', `my/bank/items?item_code=${code}`);
    }

    async bankDeposit(characterName: string, code: string, quantity: number) {
        return this.sendCharacterAction(characterName, 'bank/deposit', {code, quantity});
    }

    async bankWithdraw(characterName: string, code: string, quantity: number) {
        return this.sendCharacterAction(characterName, 'bank/withdraw', {code, quantity});
    }

    // MAPS
    async getMap(x: number, y: number): Promise<Map> {
        const response = await this.sendRequest('GET', `maps/${x}/${y}`);
        const map = new Map(response);
        console.log(map);

        return map;
    }

    private async sendRequest(method: string, path: string | undefined, body?: any) {
        const url = (`${this.serverUrl}/${path || ''}`);
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer ' + this.bearerToken,
                'User-Agent': 'from mars',
            }
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        let response;
        let result;
        try {
            response = await fetch(url, options);
            result = await response.json();
        } catch (error) {
            console.error(error);
            throw error;
        }

        if (result?.error) {
            throw new ClientException(result.error.code, result.error.message);
        }

        return result.data;
    }
}
