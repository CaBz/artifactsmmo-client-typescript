import {ArtifactsClient} from "./ArtifactsClient.js";
import {Character} from "../entities/Character.js";
import * as Utils from "../Utils.js";

export class CharacterGateway {
    constructor(private readonly client: ArtifactsClient, private readonly character: string) {
    }

    async status() {
        const result = await this.client.getCharacterStatus(this.character);
        return new Character(result);
    }

    async logStatus(sections?: string[]) {
        const character = await this.status();
        character.logToConsole(sections);
    }

    async move(x: number, y: number) {
        const result = await this.client.move(this.character, x, y);
        const character = new Character(result.character);

        return {
            ...result,
            character,
        }
    }

    async gather() {
        const result = await this.client.gather(this.character);
        const character = new Character(result.character);

        character.logToConsole(['status', 'skills', 'inventory']);

        return {
            ...result,
            character,
        }
    }

    async craft(item: string, quantity: number) {
        const result = await this.client.craft(this.character, item, quantity);
        const character = new Character(result.character);

        character.logToConsole(['status', 'skills', 'inventory']);

        return {
            ...result,
            character,
        }
    }

    async recycle(item: string, quantity: number) {
        const result = await this.client.recycle(this.character, item, quantity);
        const character = new Character(result.character);

        character.logToConsole(['status', 'inventory']);

        return {
            ...result,
            character,
        }
    }

    async rest() {
        const result = await this.client.rest(this.character);
        const character = new Character(result.character);

        character.logToConsole(['status']);

        return {...result, character};
    }

    async fight() {
        const result = await this.client.fight(this.character);
        const character = new Character(result.character);
        const fight = result.fight;

        Utils.errorHeadline(`RESULT > ${fight.result} x${fight.turns}`);
        if (fight.result !== 'win')
        {
            return result;
        }

        Utils.errorHeadline(`GAINED > +${fight.xp}xp`);
        Utils.errorHeadline(`GAINED > +${fight.gold}g`);
        fight.drops?.forEach((drop: any) => {
            Utils.errorHeadline(`GAINED > ${drop.code} x${drop.quantity}`);
        });

        character.logToConsole(['status', 'inventory']);

        return result;
    }

    async bankDeposit(item: string, quantity: number) {
        const result = await this.client.bankDeposit(this.character, item, quantity);

        //console.log(result);

        return result;
    }

    async bankWithdraw(item: string, quantity: number) {
        const result = await this.client.bankWithdraw(this.character, item, quantity);

        //console.log(result);

        return result;
    }

    async taskGet() {
        const result = await this.client.taskGet(this.character);

        //console.log(result);

        return result;
    }

    async taskExchange() {
        const result = await this.client.taskExchange(this.character);

        //console.log(result);

        return result;
    }

    async taskTrade(item: string, quantity: number) {
        const result = await this.client.taskTrade(this.character, item, quantity);

        //console.log(result);

        return result;
    }

    async taskComplete() {
        const result = await this.client.taskComplete(this.character);

        //console.log(result);

        return result;
    }

    async taskCancel() {
        const result = await this.client.taskCancel(this.character);

        //console.log(result);

        return result;
    }
}
