import * as Utils from "../Utils.js";
import {Items} from "../lexical/Items.js";
import {StatEffects} from "../lexical/TypeEffects.js";
import {Coordinates} from "../lexical/MapCoordinates.js";
import {AllSkills, Skills} from "../lexical/Skills.js";
import {EquippableSlot} from "../lexical/EquippableSlot.js";
import {ItemType} from "./Item.js";
import {Container} from "../Container.js";

export class Character {
    constructor(private readonly data: any) {
    }

    get name(): string {
        return this.data.name;
    }

    get level(): number {
        return this.data.level;
    }

    get hp() {
        return this.data.hp;
    }

    get gold() {
        return this.data.gold;
    }

    get maxHp() {
        return this.data.max_hp;
    }

    isFullHealth() {
        return this.hp === this.maxHp;
    }

    isInCooldown(): boolean {
        return this.getRemainingCooldown() > 0;
    }

    getRemainingCooldown(): number {
        const now = new Date();
        const cooldownExpiration = new Date(this.data.cooldown_expiration);
        const timeDifference = cooldownExpiration.getTime() - now.getTime();

        return timeDifference > 0 ? timeDifference : 0;
    }

    getCoordinates(): Coordinates {
        return {x: this.data.x, y: this.data.y };
    }

    getInventory() {
        const inventories: any[] = [];

        let inventory;
        for (let i = 0; i < this.data.inventory.length; i++) {
            inventory = this.data.inventory[i];

            if (inventory.quantity === 0) {
                continue;
            }

            inventories.push(inventory);
        }

        return inventories;
    }

    getInventoryWithType(type: ItemType) {
        return this.getInventory()
            .map(entry => ({ item: Container.items.get(entry.code), quantity: entry.quantity}))
            .filter((entry => entry.item?.type === type && entry.item.level <= this.level));
    }

    getConsumables() {
        return this.getInventoryWithType(ItemType.Consumable);
    }

    hasConsumables() {
        return this.getConsumables().length > 0;
    }

    isInventoryFull(): boolean {
       return this.availableInventorySpaces() === 0;
    }

    availableInventorySpaces(): number {
        return +(this.data.inventory_max_items || 0) - this.inventoryCount();
    }

    inventoryCount(): number {
        return this.data.inventory.reduce((total: number, inventory: any) => total + inventory.quantity, 0);
    }

    get maxInventory(): number {
        return this.data.inventory_max_items;
    }

    holdsHowManyOf(item: Items): number {
        let result: number = 0;

        const inventories = this.getInventory();
        for (let i: number=0; i<inventories.length; i++) {
            if (inventories[i].code === item) {
                result += inventories[i].quantity;
            }
        }

        const gears = ['weapon', 'rune', 'shield', 'helmet', 'body_armor', 'leg_armor', 'boots', 'ring1', 'ring2', 'amulet', 'artifact1', 'artifact2', 'artifact3', 'bag'];
        for (let i:number = 0; i<gears.length; i++) {
            if (this.data[`${gears[i]}_slot`] === item) {
                result++;
            }
        }

        return result;
    }

    hasEquipped(item: Items): boolean {
        const gears = ['weapon', 'rune', 'shield', 'helmet', 'body_armor', 'leg_armor', 'boots', 'ring1', 'ring2', 'amulet', 'artifact1', 'artifact2', 'artifact3', 'bag'];
        for (let i:number = 0; i<gears.length; i++) {
            if (this.data[`${gears[i]}_slot`] === item) {
                return true;
            }
        }

        return false;
    }

    getAllStats() {
        return StatEffects.map((stat) => {
            const value = stat === 'hp' ? this.data.max_hp : this.data[stat];

            return {code: stat, value: value ?? 0};
        });
    }

    getStats() {
        const stats = ['speed', 'haste', 'wisdom', 'prospecting', 'critical_strike', 'dmg'];

        return stats.map((stat) => { return {code: stat, value: this.data[stat]}; });
    }

    getEquippedGears() {
        const result = [];
        const gears = ['weapon', 'rune', 'shield', 'helmet', 'body_armor', 'leg_armor', 'boots', 'ring1', 'ring2', 'amulet', 'artifact1', 'artifact2', 'artifact3', 'bag'];
        for (let i:number = 0; i<gears.length; i++) {
            if (!this.data[`${gears[i]}_slot`]) {
                continue;
            }

            result.push(this.data[`${gears[i]}_slot`]);
        }

        return result
    }

    getEquippedGear(slot: EquippableSlot) {
        return this.data[`${slot}_slot`] || undefined;
    }

    getTask() {
        const task = this.data.task;
        if (task === '') {
            return undefined;
        }

        return {
            task: this.data.task,
            type: this.data.task_type,
            progress: this.data.task_progress,
            total: this.data.task_total,
        }
    }

    isTaskCompleted() {
        const task = this.getTask();

        return !task || (task.progress === task.total);
    }

    getSkill(name: Skills) {
        return {
            level: this.data[`${name}_level`],
            xp: this.data[`${name}_xp`],
            maxHp: this.data[`${name}_max_xp`]
        };
    }

    logToConsole(sections?: string[]): void {
        const allSections = sections === undefined;

        console.log(Utils.LINE);

        if (allSections || sections.includes('status')) {
            this.logStatus();
        }

        if (allSections || sections.includes('stats')) {
            this.logStats();
        }

        if (allSections || sections.includes('elements')) {
            this.logElements();
        }

        if (allSections || sections.includes('skills')) {
            this.logSkills();
        }

        if (allSections || sections.includes('gear')) {
            this.logEquippedGear();
        }

        if (allSections || sections.includes('utilities')) {
            this.logUtilities();
        }

        if (allSections || sections.includes('inventory')) {
            this.logInventories();
        }

        if (allSections || sections.includes('task')) {
            this.logTask();
        }
    }

    logStatus() {
        Utils.logHeadline(Utils.formatForMiddle('STATUS', 35));
        console.log(Utils.LINE);

        const remainingCooldown = this.getRemainingCooldown();

        const namePart = `[Lv.${this.level}] ${this.name}`;
        const coordinates = `x:${this.data.x} y:${this.data.y}`;
        const xpPart = `${this.data.xp}/${this.data.max_xp}xp`;
        const hpPart = `${this.data.hp}/${this.data.max_hp}hp`;
        const goldPart = `${this.data.gold}g`;

        console.log(`| ${namePart.padEnd(20, ' ')} ${hpPart.padStart(14, ' ')} |`);
        console.log(`| ${goldPart.padEnd(12, ' ')} ${xpPart.padStart(22)} |`);
        console.log(`| ${coordinates.padEnd(9, ' ')} ${remainingCooldown.toString().padStart(23, ' ')}ms |`)
        console.log(Utils.LINE);
    }

    logStats() {
        Utils.logHeadline(Utils.formatForMiddle('STATS', 35));
        console.log(Utils.LINE);
        this.getStats().forEach((stat) => {
            console.log(`| ${stat.code.padEnd(16, ' ')} | ${stat.value.toString().padStart(16, ' ')} |`)
        });
        console.log(Utils.LINE);
    }

    logElements() {
        const elements = ['fire', 'earth', 'water', 'air'];

        Utils.logHeadline(Utils.formatForMiddle('ELEMENTS', 35));
        console.log(Utils.LINE);
        console.log('| Element | Attack | Damage |  Resist |');
        console.log('|---------|--------|--------|---------|');
        elements.forEach((element) => {
            const attack = this.data[`attack_${element}`].toString();
            const damage = this.data[`dmg_${element}`].toString();
            const resistance = this.data[`res_${element}`].toString();
            console.log(`| ${element.padEnd(7, ' ')} | ${attack.padStart(6, ' ')} | ${damage.padStart(6, ' ')} | ${resistance.padStart(7, ' ')} |`);
        });
        console.log(Utils.LINE);
    }

    logSkills() {
        Utils.logHeadline(Utils.formatForMiddle('SKILLS', 35));
        console.log(Utils.LINE);
        console.log('| Name            | LVL |          XP |')
        console.log('|-----------------|-----|-------------|')

        AllSkills.forEach((skill) => {
            const level = this.data[`${skill}_level`];
            const xp = this.data[`${skill}_xp`];

            if (level === 1 && xp === 0) {
                return;
            }

            const maxXp = this.data[`${skill}_max_xp`];
            const xpProgress = `${xp}/${maxXp}`;

            console.log(`| ${skill.padEnd(15, ' ')} | ${level.toString().padStart(3, ' ')} | ${xpProgress.padStart(11)} |`);
        });
        console.log(Utils.LINE);
    }

    logEquippedGear(): void {
        Utils.logHeadline(Utils.formatForMiddle('EQUIPPED GEAR', 35));
        console.log(Utils.LINE);

        const gears = ['weapon', 'rune', 'shield', 'helmet', 'body_armor', 'leg_armor', 'boots', 'ring1', 'ring2', 'amulet', 'artifact1', 'artifact2', 'artifact3', 'bag'];
        gears.forEach((gear) => {
            const equipped = this.data[`${gear}_slot`];
            if (!equipped) {
                return;
            }

            console.log(`| ${gear.padEnd(10, ' ')} | ${equipped.padEnd(22, ' ')} |`);
        })
        console.log(Utils.LINE);
    }

    logUtilities() {
        Utils.logHeadline(Utils.formatForMiddle('UTILITIES', 35));
        console.log(Utils.LINE);

        this.logUtility(1);
        this.logUtility(2);

        console.log(Utils.LINE);
    }

    logUtility(position: number): void {
        const slot = this.data[`utility${position}_slot`];
        const quantity = this.data[`utility${position}_slot_quantity`];
        if (slot === '' && quantity === 0) {
            return;
        }

        console.log(`Utility #${position}: ${slot} (${quantity})`);
    }

    logInventories() {
        const usedSpaces = this.inventoryCount();

        Utils.logHeadline(Utils.formatForMiddle(`INVENTORY (${usedSpaces}/${this.maxInventory})`, 35));
        console.log(Utils.LINE);

        if (usedSpaces === 0) {
            return;
        }

        let inventory;
        for (let i = 0; i < this.data.inventory.length; i++) {
            inventory = this.data.inventory[i];

            if (inventory.quantity === 0) {
                continue;
            }

            console.log(`| ${inventory.slot.toString().padStart(2)} | ${inventory.code.padEnd(24, ' ')} | ${inventory.quantity.toString().padStart(3, ' ')} |`);
        }
        console.log(Utils.LINE);
    }

    logTask(): void {
        const task = this.data.task;
        if (task === '') {
            return;
        }

        const remaining = this.data.task_total - this.data.task_progress;

        Utils.logHeadline(Utils.formatForMiddle(`TASK (${this.data.task_progress}/${this.data.task_total})`, 35));
        console.log(Utils.LINE);

        const taskWord: string = this.data.task_type === 'items' ? 'Give' : 'Kill'

        Utils.logHeadline(`${taskWord}: ${this.data.task} -> ${remaining} left`);

        console.log(Utils.LINE);
    }
}
