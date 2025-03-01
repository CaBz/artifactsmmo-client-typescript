import {ArtifactsClient} from "./ArtifactsClient.js";
import {Character} from "../entities/Character.js";
import * as Utils from "../Utils.js";
import {Cooldown} from "../entities/Cooldown.js";
import {MapTile} from "../entities/MapTile.js";
import {Item} from "../entities/Item.js";
import {Fight} from "../entities/Fight.js";
import {SkillInfo} from "../entities/SkillInfo.js";
import {RecyclingInfo} from "../entities/RecyclingInfo.js";
import {Task} from "../entities/Task.js";
import {TaskRewards} from "../entities/TaskRewards.js";

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
            cooldown: new Cooldown(result.cooldown),
            destination: new MapTile(result.destination),
            character,
        }
    }

    async rest() {
        const result = await this.client.rest(this.character);
        const character = new Character(result.character);
        const cooldown = new Cooldown(result.cooldown);

        character.logToConsole(['status']);

        return {
            cooldown,
            hpRestored: result.hpRestored,
            character,
        };
    }

    async equip(item: string, quantity: number, slot: string) {
        const result = await this.client.equip(this.character, item, quantity, slot);
        const character = new Character(result.character);

        character.logToConsole(['status', 'gear', 'inventory']);

        return {
            cooldown: new Cooldown(result.cooldown),
            slot: result.slot,
            item: new Item(result.item),
            character,
        }
    }

    async unequip(quantity: number, slot: string) {
        const result = await this.client.unequip(this.character, quantity, slot);
        const character = new Character(result.character);

        character.logToConsole(['status', 'gear', 'inventory']);

        return {
            cooldown: new Cooldown(result.cooldown),
            slot: result.slot,
            item: new Item(result.item),
            character,
        }
    }

    async use(item: string, quantity: number) {
        const result = await this.client.use(this.character, item, quantity);
        const character = new Character(result.character);

        character.logToConsole(['status', 'inventory']);

        return {
            cooldown: new Cooldown(result.cooldown),
            item: new Item(result.item),
            character,
        }
    }

    async fight() {
        const result = await this.client.fight(this.character);
        const character = new Character(result.character);
        const fight = new Fight(result.fight);

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

        return {
            cooldown: new Cooldown(result.cooldown),
            fight,
            character,
        };
    }

    async gather() {
        const result = await this.client.gather(this.character);
        const character = new Character(result.character);
        const details = new SkillInfo(result.details);

        character.logToConsole(['status', 'skills', 'inventory']);
        details.logToConsole();

        return {
            cooldown: new Cooldown(result.cooldown),
            details,
            character,
        }
    }

    async craft(item: string, quantity: number) {
        const result = await this.client.craft(this.character, item, quantity);
        const character = new Character(result.character);
        const details = new SkillInfo(result.details);

        character.logToConsole(['status', 'skills', 'inventory']);
        details.logToConsole();

        return {
            cooldown: new Cooldown(result.cooldown),
            details,
            character,
        }
    }

    async recycle(item: string, quantity: number) {
        const result = await this.client.recycle(this.character, item, quantity);
        const character = new Character(result.character);
        const details = new RecyclingInfo(result.details);

        character.logToConsole(['status', 'inventory']);
        details.logToConsole();

        return {
            cooldown: new Cooldown(result.cooldown),
            details,
            character,
        }
    }

    // BANK ACTIONS
    async bankDepositGold(quantity: number) {
        const result = await this.client.bankDepositGold(this.character, quantity);

        return {
            cooldown: new Cooldown(result.cooldown),
            bankGold: result.bank.quantity,
            character: new Character(result),
        };
    }

    async bankDeposit(item: string, quantity: number) {
        const result = await this.client.bankDepositItem(this.character, item, quantity);

        return {
            cooldown: new Cooldown(result.cooldown),
            item: new Item(result.item),
            bank: result.bank, // SimpleItemschema
            character: new Character(result),
        };
    }

    async bankWithdraw(item: string, quantity: number) {
        const result = await this.client.bankWithdrawItem(this.character, item, quantity);

        return {
            cooldown: new Cooldown(result.cooldown),
            item: new Item(result.item),
            bank: result.bank, // SimpleItemschema
            character: new Character(result),
        };
    }

    async bankWithdrawGold(quantity: number) {
        const result = await this.client.bankWithdrawGold(this.character, quantity);

        return {
            cooldown: new Cooldown(result.cooldown),
            bankGold: result.bank.quantity,
            character: new Character(result),
        };
    }

    async taskGet() {
        const result = await this.client.taskGet(this.character);
        const character = new Character(result.character);
        character.logToConsole(['status', 'inventory', 'task']);

        return {
            cooldown: new Cooldown(result.cooldown),
            task: new Task(result.task),
            character,
        }
    }

    async taskExchange() {
        const result = await this.client.taskExchange(this.character);
        const character = new Character(result.character);
        const rewards = new TaskRewards(result.rewards);

        character.logToConsole(['status', 'inventory']);
        rewards.logToConsole();

        return {
            cooldown: new Cooldown(result.cooldown),
            rewards,
            character,
        };
    }

    async taskTrade(item: string, quantity: number) {
        const result = await this.client.taskTrade(this.character, item, quantity);
        const character = new Character(result.character);
        character.logToConsole(['inventory', 'task']);

        return {
            cooldown: new Cooldown(result.cooldown),
            trade: result.trade,
            character,
        };
    }

    async taskComplete() {
        const result = await this.client.taskComplete(this.character);
        const character = new Character(result.character);
        const rewards = new TaskRewards(result.rewards);

        character.logToConsole(['status', 'inventory']);
        rewards.logToConsole();

        return {
            cooldown: new Cooldown(result.cooldown),
            rewards,
            character,
        };
    }

    async taskCancel() {
        const result = await this.client.taskCancel(this.character);
        const character = new Character(result.character);
        character.logToConsole(['status', 'inventory']);

        return {
            cooldown: new Cooldown(result.cooldown),
            character,
        }
    }
}
