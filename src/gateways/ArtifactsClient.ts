import { Character } from "../entities/Character.js";
import {ClientException} from "./ClientException.js";
import {MapTile} from "../entities/MapTile.js";
import * as Utils from "../Utils.js";
import {Achievement} from "../entities/Achievement.js";
import {Event} from "../entities/Event.js";

export class ArtifactsClient {
    private serverUrl: string;
    private bearerToken: string;
    private accountName: string;

    constructor() {
        this.serverUrl = process.env['ARTIFACTS_URL']!;
        this.bearerToken = process.env['ARTIFACTS_TOKEN']!;
        this.accountName = process.env['ARTIFACTS_ACCOUNT']!;
    }

    async getAnnouncements(): Promise<void> {
        const result: any = await this.sendRequest('GET', undefined, undefined);
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

    async getBank() {
        const items: any = [];

        let bank = await this.sendRequest('GET', `my/bank`);
        let response = await this.sendRequestWithoutData('GET', `my/bank/items?size=100&page=1`);
        items.push(...response.data);

        while (response.page < response.pages) {
            response = await this.sendRequestWithoutData('GET', `my/bank/items?size=100&page=${response.page + 1}`);
            items.push(...response.data);
        }

        return {bank, items};
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

    async getByEntityAndCode(entity: any, code?: any) {
        let response: any;
        try {
            const path = code ? `${entity}/${code}` : entity;
            response = await this.sendRequest('GET', path);
        } catch (e: any) {
            console.error(`${e.code}: ${e.message}`);
        }

        console.dir(response, { depth: null })
    }

    async getNpcItems(code: string) {
        let data: any = await this.sendRequest('GET', `npcs/${code}/items`);

        const tableHeads = `| ${Utils.formatForMiddle('Item', 20)} | ${Utils.formatForMiddle('Buy', 7)} | ${Utils.formatForMiddle('Sell', 7)} |`;
        const lineSeparator = `|${'-'.repeat(tableHeads.length - 2)}|`;

        console.log(lineSeparator);
        console.log(`| ${Utils.formatForMiddle(`${code} items`, tableHeads.length - 4)} |`);
        console.log(lineSeparator);
        console.log(tableHeads);
        console.log(lineSeparator);

        data.forEach((datum: any) => {
            Utils.logHeadline(`${datum.code.padEnd(20, ' ')} | ${(datum.buy_price || 0).toString().padStart(6, ' ')}g | ${(datum.sell_price || 0).toString().padStart(6, ' ')}g`)
        });

        console.log(lineSeparator);
    }

    async getAccountAchievements(): Promise<void> {
        const result: any = await this.sendRequest('GET', `accounts/${this.accountName}/achievements?size=100`);
        const achievements: Achievement[] = result.map((entry: any) => new Achievement(entry));

        achievements.sort((a, b) => +b.isCompleted() - +a.isCompleted() || a.type.localeCompare(b.type) || a.name.localeCompare(b.name));

        const points = achievements.reduce((points, achievements) => {
            points.total += achievements.points;
            points.current += achievements.isCompleted() ? achievements.points : 0;

            return points;
        }, {current: 0, total: 0});

        const headline =
            `| ${Utils.formatForMiddle('Name', 28)} `
            + `| ${Utils.formatForMiddle('Description', 36)} `
            + `| ${Utils.formatForMiddle('Type', 12)} `
            + `| ${Utils.formatForMiddle('Progress ', 9)} `
            + `| ${Utils.formatForMiddle('Points ', 6)} `
            + `| ${Utils.formatForMiddle('Date Completed', 25)} `
            + `|`;

        const line = `| ${'-'.repeat(headline.length - 4)} |`;

        console.log(line);
        console.log(`| ${Utils.formatForMiddle(`Achievements (${points.current}/${points.total})`, headline.length - 4)} |`)
        console.log(line);
        console.log(headline);
        console.log(line);

        achievements.forEach((achievement: Achievement) => {
            const logger = achievement.isCompleted() ? console.error : console.log;

            const progress = `${achievement.current}/${achievement.total}`;
            const date = achievement.completedAt ? achievement.completedAt.toLocaleString() : '(not completed)';
            logger(
                `| ${achievement.name.padEnd(28, ' ')} `
                + `| ${achievement.description.padEnd(36, ' ')} `
                + `| ${achievement.type.padStart(12, ' ')} `
                + `| ${progress.padStart(9, ' ')} `
                + `| ${achievement.points.toString().padStart(6, ' ')} `
                + `| ${date.padEnd(25, ' ')} `
                + `|`
            );
        });
    }

    async getActiveEvents(): Promise<any> {
        const result = await this.sendRequest('GET', 'events/active?size=100');
        const events: Event[] = result.map((entry: any) => new Event(entry));

        events.forEach((event: Event) => {
            console.log(
                `| ${event.name.padEnd(28, ' ')} `
                + `| x:${event.coordinates.x} y:${event.coordinates.y} `
                + `| ${event.getRemainingActive()}ms `
                + `|`
            );
        });
    }

    async getAllOf(entity: string): Promise<any> {
        const result: any = [];

        console.log(`Fetching ${entity} - page 1/?`);
        let response = await this.sendRequestWithoutData('GET', `${entity}?size=100&page=1`);
        result.push(...response.data);

        while (response.page < response.pages) {
            console.log(`Fetching ${entity} - page ${response.page+1}/${response.pages}`);
            await Utils.sleep(1000);

            response = await this.sendRequestWithoutData('GET', `${entity}?size=100&page=${response.page + 1}`);
            result.push(...response.data);
        }

        return result;
    }

    private async sendRequest(method: string, path: string | undefined, body?: any) {
        const result: any = await this.sendRequestWithoutData(method, path, body);
        return result.data;
    }

    private async sendRequestWithoutData(method: string, path: string | undefined, body?: any) {
        const url: string = `${this.serverUrl}/${path || ''}`;
        const options: any = {
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

        let response: any;
        let result: any;
        try {
            response = await fetch(url, options);
            result = await response.json();
        } catch (error) {
            console.error(error);
            console.log(response);
            throw error;
        }

        if (result?.error) {
            throw new ClientException(result.error.code, result.error.message);
        }

        return result;
    }
}
