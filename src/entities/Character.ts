import {LINE} from "../Utils.js";
import {Items} from "../lexical/Items.js";
import {StatEffects} from "../lexical/TypeEffects.js";

export class Character {
    constructor(private readonly data: any) {
    }

    get name(): string {
        return this.data.name;
    }

    get level(): string {
        return this.data.level;
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

    get raw() {
        return this.data;
    }

    get hp() {
        return this.data.hp;
    }

    get maxHp() {
        return this.data.max_hp;
    }

    getHp() {
        return { hp: this.data.hp, max_hp: this.data.max_hp };
    }

    getXp() {
        return { level: this.data.level, xp: this.data.xp, max_xp: this.data.max_xp };
    }

    getInventory() {
        return this.data.inventory;
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

    logToConsole(sections?: string[]): void {
        const allSections = sections === undefined;

        console.log(LINE);

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
        console.log('|                STATUS              |');
        console.log(LINE);

        const remainingCooldown = this.getRemainingCooldown();

        const namePart = `[Lv.${this.level}] ${this.name}`;
        const coordinates = `x:${this.data.x} y:${this.data.y}`;
        const xpPart = `${this.data.xp}/${this.data.max_xp}xp`;
        const hpPart = `${this.data.hp}/${this.data.max_hp}hp`;
        const goldPart = `${this.data.gold}g`;

        console.log(`| ${namePart.padEnd(20, ' ')} ${hpPart.padStart(13, ' ')} |`);
        console.log(`| ${goldPart.padEnd(12, ' ')} ${xpPart.padStart(21)} |`);
        console.log(`| ${coordinates.padEnd(9, ' ')} ${remainingCooldown.toString().padStart(22, ' ')}ms |`)
        console.log(LINE);
    }

    logStats() {
        console.log('|                STATS               |');
        console.log(LINE);
        this.getStats().forEach((stat) => {
            console.log(`| ${stat.code.padEnd(16, ' ')} | ${stat.value.toString().padStart(15, ' ')} |`)
        });
        console.log(LINE);
    }

    logElements() {
        const elements = ['fire', 'earth', 'water', 'air'];

        console.log('|              ELEMENTS              |');
        console.log(LINE);
        console.log('| Element | Attack | Damage | Resist |');
        console.log('|---------|--------|--------|--------|');
        elements.forEach((element) => {
            const attack = this.data[`attack_${element}`].toString();
            const damage = this.data[`dmg_${element}`].toString();
            const resistance = this.data[`res_${element}`].toString();
            console.log(`| ${element.padEnd(7, ' ')} | ${attack.padStart(6, ' ')} | ${damage.padStart(6, ' ')} | ${resistance.padStart(6, ' ')} |`);
        });
        console.log(LINE);
    }

    logSkills() {
        console.log('|              SKILLS                |');
        console.log(LINE);
        console.log('| Name            | LVL |         XP |')
        console.log('|-----------------|-----|------------|')

        const skills = ['mining', 'woodcutting', 'fishing', 'weaponcrafting', 'gearcrafting', 'jewelrycrafting', 'cooking', 'alchemy'];
        skills.forEach((skill) => {
            const level = this.data[`${skill}_level`];
            const xp = this.data[`${skill}_xp`];

            if (level === 1 && xp === 0) {
                return;
            }

            const maxXp = this.data[`${skill}_max_xp`];
            const xpProgress = `${xp}/${maxXp}`;

            console.log(`| ${skill.padEnd(15, ' ')} | ${level.toString().padStart(3, ' ')} | ${xpProgress.padStart(10)} |`);
        });
        console.log(LINE);
    }

    logEquippedGear(): void {
        console.log('|            EQUIPPED GEAR           |');
        console.log(LINE);

        const gears = ['weapon', 'rune', 'shield', 'helmet', 'body_armor', 'leg_armor', 'boots', 'ring1', 'ring2', 'amulet', 'artifact1', 'artifact2', 'artifact3', 'bag'];
        gears.forEach((gear) => {
            const equipped = this.data[`${gear}_slot`];
            if (!equipped) {
                return;
            }

            console.log(`| ${gear.padEnd(10, ' ')} | ${equipped.padEnd(21, ' ')} |`);
        })
        console.log(LINE);
    }

    logUtilities() {
        console.log('|             UTILITIES              |');
        console.log(LINE);

        this.logUtility(1);
        this.logUtility(2);
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
        console.log('|             INVENTORY              |');
        console.log(LINE);

        let countInventory = 0;
        let inventory;
        for (let i = 0; i < this.data.inventory.length; i++) {
            inventory = this.data.inventory[i];
            countInventory += inventory.quantity

            if (inventory.quantity === 0) {
                continue;
            }

            console.log(`| ${inventory.slot.toString().padStart(2)} | ${inventory.code.padEnd(23, ' ')} | ${inventory.quantity.toString().padStart(3, ' ')} |`);
        }

        console.log(LINE);

        const totalItems = `${countInventory}/${this.data.inventory_max_items}`;
        console.log(`| Total Items: ${totalItems.padStart(21, ' ')} |`);
        console.log(LINE);
    }

    logTask(): void {
        console.log('|               TASK                 |');
        console.log(LINE);

        const task = this.data.task;
        if (task === '') {
            console.log ('No tasks.');
            return;
        }

        console.log(`Task: ${this.data.task} (${this.data.task_type}) -> ${this.data.task_progress}/${this.data.task_total}`);
    }
}
