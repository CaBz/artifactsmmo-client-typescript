import { Character } from "../entities/Character.js";
import {ClientException} from "./ClientException.js";
import {MapTile} from "../entities/MapTile.js";

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

    // https://api.artifactsmmo.com/docs/#/operations/action_move_my__name__action_move_post
    async move(characterName: string, x: number, y: number) {
        return this.sendCharacterAction(characterName, 'move', {x, y});
    }

    // https://api.artifactsmmo.com/docs/#/operations/action_rest_my__name__action_rest_post
    async rest(characterName: string) {
        return this.sendCharacterAction(characterName, 'rest');
    }

    // https://api.artifactsmmo.com/docs/#/operations/action_equip_item_my__name__action_equip_post
    async equip(characterName: string, code: string, quantity: number, slot: string) {
        return this.sendCharacterAction(characterName, 'equip', {code, quantity, slot});
    }

    // https://api.artifactsmmo.com/docs/#/operations/action_unequip_item_my__name__action_unequip_post
    async unequip(characterName: string, quantity: number, slot: string) {
        return this.sendCharacterAction(characterName, 'unequip', {quantity, slot});
    }

    // https://api.artifactsmmo.com/docs/#/operations/action_use_item_my__name__action_use_post
    async use(characterName: string, code: string, quantity: number) {
        return this.sendCharacterAction(characterName, 'use', {code, quantity});
    }

    // https://api.artifactsmmo.com/docs/#/operations/action_fight_my__name__action_fight_post
    async fight(characterName: string) {
        return this.sendCharacterAction(characterName, 'fight');
    }

    // https://api.artifactsmmo.com/docs/#/operations/action_gathering_my__name__action_gathering_post
    async gather(characterName: string) {
        return this.sendCharacterAction(characterName, 'gathering');
    }

    // https://api.artifactsmmo.com/docs/#/operations/action_crafting_my__name__action_crafting_post
    async craft(characterName: string, code: string, quantity: number) {
        return this.sendCharacterAction(characterName, 'crafting', {code, quantity});
    }

    // https://api.artifactsmmo.com/docs/#/operations/action_recycling_my__name__action_recycling_post
    async recycle(characterName: string, code: string, quantity: number) {
        return this.sendCharacterAction(characterName, 'recycling', {code, quantity});
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

    // https://api.artifactsmmo.com/docs/#/operations/action_deposit_bank_my__name__action_bank_deposit_post
    async bankDepositItem(characterName: string, code: string, quantity: number) {
        return this.sendCharacterAction(characterName, 'bank/deposit', {code, quantity});
    }

    // https://api.artifactsmmo.com/docs/#/operations/action_deposit_bank_gold_my__name__action_bank_deposit_gold_post
    async bankDepositGold(characterName: string, quantity: number) {
        return this.sendCharacterAction(characterName, 'bank/deposit/gold', {quantity});
    }

    // https://api.artifactsmmo.com/docs/#/operations/action_withdraw_bank_my__name__action_bank_withdraw_post
    async bankWithdrawItem(characterName: string, code: string, quantity: number) {
        return this.sendCharacterAction(characterName, 'bank/withdraw', {code, quantity});
    }

    // https://api.artifactsmmo.com/docs/#/operations/action_withdraw_bank_gold_my__name__action_bank_withdraw_gold_post
    async bankWithdrawGold(characterName: string, quantity: number) {
        return this.sendCharacterAction(characterName, 'bank/withdraw/gold', {quantity});
    }

    // https://api.artifactsmmo.com/docs/#/operations/action_buy_bank_expansion_my__name__action_bank_buy_expansion_post
    async bankBuyExpansion(characterName: string) {
        return this.sendCharacterAction(characterName, 'bank/buy_expansion');
    }

    // https://api.artifactsmmo.com/docs/#/operations/action_npc_buy_item_my__name__action_npc_buy_post
    async npcBuyItem(characterName: string, code: string, quantity: number) {
        return this.sendCharacterAction(characterName, 'npc/buy', {code, quantity});
    }

    // https://api.artifactsmmo.com/docs/#/operations/action_npc_sell_item_my__name__action_npc_sell_post
    async npcBuySell(characterName: string, code: string, quantity: number) {
        return this.sendCharacterAction(characterName, 'npc/sell', {code, quantity});
    }

    async taskGet(characterName: string) {
        return this.sendCharacterAction(characterName, 'task/new');
    }

    async taskExchange(characterName: string) {
        return this.sendCharacterAction(characterName, 'task/exchange');
    }

    async taskTrade(characterName: string, code: string, quantity: number) {
        return this.sendCharacterAction(characterName, 'task/trade', {code, quantity});
    }

    async taskComplete(characterName: string) {
        return this.sendCharacterAction(characterName, 'task/complete');
    }

    async taskCancel(characterName: string) {
        return this.sendCharacterAction(characterName, 'task/cancel');
    }

    // MAPS
    async getMap(x: number, y: number): Promise<MapTile> {
        const response = await this.sendRequest('GET', `maps/${x}/${y}`);
        const map = new MapTile(response);
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
