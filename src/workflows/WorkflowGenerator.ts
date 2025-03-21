import {Action, MoveActionCondition, SubworkflowCondition, WorkflowAction} from "./WorkflowOrchestrator.js";
import {WorkflowFactory} from "./WorkflowFactory.js";
import {Item, ItemSubType, ItemType} from "../entities/Item.js";
import {CharacterGateway} from "../gateways/CharacterGateway.js";
import {Character} from "../entities/Character.js";
import {Recipe, Recipes, ResourceItem} from "../lexical/Recipes.js";
import {Items} from "../lexical/Items.js";
import * as Utils from "../Utils.js";
import {Banker} from "./services/Banker.js";
import {Monsters} from "../lexical/Monsters.js";
import {
    GatherBank,
    PointOfInterest,
    TaskMasterBanks,
    TaskMasters
} from "../lexical/PointOfInterest.js";
import {Container} from "../Container.js";
import {Skills} from "../lexical/Skills.js";
import {Monster} from "../entities/Monster.js";

export class WorkflowGenerator {
    private character: Character;

    constructor(
        private readonly characterGateway: CharacterGateway,
        private readonly banker: Banker,
    ) {
    }

    async generate(name: string): Promise<WorkflowAction[]> {
        const parts = name.split('-');

        const action: string = parts[0] || 'auto';
        const code: string = parts[1] || '';

        this.character = await this.characterGateway.status();

        switch(action) {
            case 'e':
            case 'equip':
                return this.generateEquip(code as Items);
            case 'ca':
            case 'craft_all':
                return this.generateCraft(code as Items, -1);
            case 'c':
            case 'craft':
                return this.generateCraft(code as Items, +(parts[2] || 1));
            case 'rc':
            case 'recraft':
                return this.generateRecraft(code as Items, +(parts[2] || -1));
            case 'g':
            case 'gather':
                return this.generateGather(code as Items);
            case 'gc':
            case 'gather_craft':
                return this.generateGatherCraft(code as Items);
            case 'f':
            case 'fight':
                return this.generateFight(code as Monsters);
            case 'tm':
            case 'task_master':
                return this.generateTask(code);
            case 'auto':
                return this.generateAuto(code);
            default:
                throw new Error(`Unable to generate a workflow with value "${action}"`)
        }
    }

    private generateEquip(inputCode: Items): WorkflowAction[] {
        const codes: Items[] = inputCode.split(',') as Items[];
        let item: Item | undefined;
        let code: Items;

        const actions: WorkflowAction[] = [];
        for (let i=0; i<codes.length; i++) {
            code = codes[i]!;

            item = Container.items.get(code);
            if (!item) {
                throw new Error('Item does not exist');
            }

            actions.push(...WorkflowFactory.withdrawAndEquip([[item.code, 1, item.equippableSlot],]));
        }

        return actions;
    }

    private async generateCraft(inputCode: Items, quantity: number): Promise<WorkflowAction[]> {
        const codes: Items[] = inputCode.split(',') as Items[];

        const actions = [];
        let recipe: Recipe;
        let recipeQuantityFromBank: number;
        let recipeQuantity: number;
        let code: Items;

        const bank: any = await this.banker.getBank();

        for (let i=0; i<codes.length; i++) {
            code = codes[i]!;
            recipe = Recipes.getFor(code);
            recipeQuantityFromBank = this.banker.calculateRecipeQuantityFromBankItems(bank, recipe, this.character.maxInventory);
            recipeQuantity = quantity === -1 ? recipeQuantityFromBank : Math.min(quantity, recipeQuantityFromBank);

            if (recipeQuantity === 0) {
                //throw new Error(`${code} cannot be crafted - Missing recipe items: ${recipe.items.map((item) => `${item.code} x${item.quantity}`).join(',')}`);
                Utils.errorHeadline(`Cannot craft: ${code}`);
                continue;
            }

            actions.push(...WorkflowFactory.withdrawAndCraft(code, recipe, recipeQuantity, false));
        }

        return actions;
    }

    private async generateRecraft(code: Items, quantity: number): Promise<WorkflowAction[]> {
        const recipe: Recipe = Recipes.getFor(code);
        const recipeQuantityFromBank = await this.banker.howManyTimesRecipeCanBeCraft(recipe, this.character.maxInventory);
        const recipeQuantity: number = quantity === -1 ? recipeQuantityFromBank : Math.min(quantity, recipeQuantityFromBank);

        if (recipeQuantity === 0) {
            throw new Error('Cannot craft');
        }

        return WorkflowFactory.withdrawAndCraft(code, recipe, recipeQuantity, true);
    }

    private async generateGather(code: Items): Promise<WorkflowAction[]> {
        const item: Item | undefined = Container.items.get(code);
        if (!item) {
            throw new Error(`Item does not exist: ${code}`);
        }

        return [
            { action: Action.Move, coordinates: code },
            { action: Action.Gather, loops: -1 },

            { action: Action.Move, coordinates: GatherBank[code] || PointOfInterest.Bank1 },
            { action: Action.BankDepositAll },
        ];
    }

    private async generateGatherCraft(code: Items, maximumQuantity?: number): Promise<WorkflowAction[]> {
        const recipe: Recipe = Recipes.getFor(code);
        const recipeQuantity: number = recipe.getQuantityCraftable(this.character.maxInventory);
        if (maximumQuantity === undefined) {
            maximumQuantity = recipeQuantity;
        }
        const quantity = Math.min(maximumQuantity, recipeQuantity); // Maximum items that I can hold for this loop

        const bank = await this.banker.getBank();

        const gathers: ResourceItem[] = [];
        const withdraws: ResourceItem[] = [];

        recipe.items.forEach((item: ResourceItem) => {
            const totalNeeded = item.quantity * quantity;
            const available = (bank[item.code] || 0) + this.character.holdsHowManyOf(item.code);

            const withdraw = Math.min(totalNeeded, available);
            const gather = totalNeeded - withdraw;

            if (withdraw > 0) {
                withdraws.push({ code: item.code, quantity: withdraw });
            }

            if (gather > 0) {
                gathers.push({ code: item.code, quantity: gather });
            }
        });

        return WorkflowFactory.gatherManyAndCraft(recipe, withdraws, gathers);
    }

    private async generateFight(code: Monsters): Promise<WorkflowAction[]> {
        const monster = Container.monsters.get(code);
        if (!monster) {
            throw new Error(`No monster with code ${code}`);
        }

        const actions: WorkflowAction[] = await this.prepareForFight(monster);
        actions.push(
            {
                action: Action.SubWorkflow,
                condition: SubworkflowCondition.NoMoreConsumables,
                actions: [
                    { action: Action.Move, coordinates: code },
                    { action: Action.Rest },
                    { action: Action.Fight, loops: 1, code },
                ],
            },
            { action: Action.Move, coordinates: PointOfInterest.Bank1 },
            { action: Action.BankDepositAll }
        )

        return actions;
    }

    private async generateTask(type: string): Promise<WorkflowAction[]> {

        const task: any = this.character.getTask();

        // Make sure we have a task
        if (!task) {
            Utils.errorHeadline('GOAL: Get Task');
            return [
                { action: Action.Move, coordinates: TaskMasters[type], condition: MoveActionCondition.NoTasks },
                { action: Action.GetTask },
                { action: Action.Move, coordinates: TaskMasterBanks[type] },
                { action: Action.BankDepositAll},
            ];
        }

        // Make sure we turn the task if completed
        if (this.character.isTaskCompleted()) {
            Utils.errorHeadline('GOAL: Complete Task');
            return [
                // Empty your pockets and get all task coins
                { action: Action.Move, coordinates: TaskMasterBanks[task.type] },
                { action: Action.BankDepositAll},
                { action: Action.BankWithdraw, code: Items.TasksCoin, quantity: -1},

                // Turn the task and try to exchange coins
                { action: Action.Move, coordinates: TaskMasters[task.type] },
                { action: Action.CompleteTask },
                { action: Action.ExchangeTask },
            ];
        }

        // If the task is fighting monster, just fight until it's done
        if (task.type === 'monsters') {
            if (this.character.isInventoryFull()) {
                Utils.errorHeadline('GOAL: Dump Inventory');
                return [
                    { action: Action.Move, coordinates: TaskMasterBanks[type] },
                    { action: Action.BankDepositAll},
                ];
            }

            Utils.errorHeadline('GOAL: Prep & Fight');
            return [
                ... await this.prepareForFight(
                    Container.monsters.get(task.task)!
                ),
                {
                    action: Action.SubWorkflow, condition: SubworkflowCondition.TaskCompletedOrNoMoreConsumables,
                    actions: [
                        { action: Action.Move, coordinates: task.task },
                        { action: Action.Rest },
                        { action: Action.Fight, loops: 1, code: task.task as Monsters },
                    ]
                }
            ];
        }

        // Try to get from bank first
        const remainingTask = (task.total - task.progress);
        const maxInventory: number = this.character.maxInventory;
        const inventoryCount: number = this.character.holdsHowManyOf(task.task);
        const bank = await this.banker.getBank();
        const availableQuantity = (bank[task.task] || 0);
        if (availableQuantity > 0) {
            Utils.errorHeadline('GOAL: Withdraw & Trade');
            return [
                { action: Action.Move, coordinates: PointOfInterest.Bank2 },
                { action: Action.BankDepositAll },
                { action: Action.BankWithdraw, code: task.task, quantity: Math.min(this.character.maxInventory, (availableQuantity + inventoryCount), remainingTask) },
                { action: Action.Move, coordinates: PointOfInterest.TaskMasterItems },
                { action: Action.TradeTask, code: task.task, quantity: -1},
            ];
        }

        let taskActions: WorkflowAction[];
        try {
            Utils.errorHeadline('GOAL: Gather & Craft');

            // If it's a recipe, it will gather + craft what's needed
            taskActions = await this.generateGatherCraft(task.task, remainingTask);
        } catch {
            Utils.errorHeadline('GOAL: Gather');

            // If it's not a recipe, it will just go gather as much as it can, trade what's in the inventory and then it loops back into this function
            taskActions = [
                { action: Action.Move, coordinates: task.task },
                { action: Action.Gather, loops: Math.min(maxInventory, (remainingTask - inventoryCount)) },
            ];
        }

        return [
            ... taskActions,
            { action: Action.Move, coordinates: PointOfInterest.TaskMasterItems },
            { action: Action.TradeTask, code: task.task, quantity: -1},
        ];
    }

    private async prepareForFight(monster: Monster): Promise<WorkflowAction[]> {
        let goingToBank: boolean = false;

        const actions: WorkflowAction[] = [];

        // 1. Find best Set?

        // 2. Withdraw Utilities & Equip
        // const poisonDamage: number = monster.getPoisonDamage();
        // if (poisonDamage) {
        //     actions.push(
        //         {action: Action.Move, coordinates: PointOfInterest.Bank1},
        //         {action: Action.BankDepositAll},
        //     )
        // }


        // monster effect to utility mapping
        // find best utility (level) in bank


        // Consumables
        const inventoryConsumables = this.character.getConsumables()
        if (inventoryConsumables.length === 0) {
            const bankItems: any = await this.banker.getFoodConsumables(this.character.level);
            if (bankItems.length > 0) {
                goingToBank = true;

                let remainingSpaces = Math.floor(this.character.maxInventory * 0.8);
                let item: any;
                for (let i = 0; i < bankItems.length; i++) {
                    item = bankItems[i];
                    let withdrawables: number = Math.min(remainingSpaces, item.quantity);

                    actions.push({action: Action.BankWithdraw, code: item.item.code, quantity: withdrawables});

                    remainingSpaces -= withdrawables;
                    if (remainingSpaces <= 0) {
                        break;
                    }
                }
            } else {

            }
        }

        if (goingToBank) {
            actions.unshift(
                {action: Action.Move, coordinates: PointOfInterest.Bank1},
                {action: Action.BankDepositAll},
            )
        }

        return actions;
    }

    private async generateAuto(code: string): Promise<WorkflowAction[]> {
        Utils.errorHeadline(`GOAL: Auto "${code}"`);

        switch (code) {
            case Skills.Fishing: // @TODO: Need to find a way to find the recipe needed for the fish (reverse recipe search)
                 return this.generateAutoForItems(Skills.Fishing, [ItemType.Resource], [ItemSubType.Fishing]);
            case Skills.Alchemy:
                return this.generateAutoForItems(Skills.Alchemy, [ItemType.Resource, ItemType.Utility], [ItemSubType.Alchemy, ItemSubType.Potion]);
            case Skills.Woodcutting:
                return this.generateAutoForItems(Skills.Woodcutting, [ItemType.Resource], [ItemSubType.Plank]);
            case Skills.Mining:
                return this.generateAutoForItems(Skills.Mining, [ItemType.Resource], [ItemSubType.Bar, ItemSubType.Alloy]);
            case Skills.Cooking:
                return this.generateAutoForItems(Skills.Cooking, [ItemType.Consumable], [ItemSubType.Food]);

            case 'foods':
                return this.generateAutoCraftBank(Skills.Cooking);
            case 'ingots':
                return this.generateAutoCraftBank(Skills.Mining);
            case 'potions':
                return this.generateAutoCraftBank(Skills.Alchemy);
            case 'planks':
                return this.generateAutoCraftBank(Skills.Woodcutting);


            case 'all':
            case '': // Weird, but if the value isn't passed, allows to fallback to "all" - Cannot use default
                return this.generateAutoAll();
        }

        throw new Error('Cannot do anything');
    }

    private async generateAutoAll(): Promise<WorkflowAction[]> {
        const skills: any[] = this.character.getSkills();
        skills.push({ name: 'leveling', level: this.character.level, xp: this.character.xp, maxXp: this.character.maxXp });
        skills.sort((a: any, b: any) => a.level - b.level || a.xp - b.xp);

        let skill: any;
        for (let i=0; i<skills.length; i++) {
            skill = skills[i];
            try {
                return await this.generateAuto(skill.name);
            } catch { }
        }

        return [];
    }

    private async generateAutoForItems(name: Skills, types: ItemType[], subTypes: ItemSubType[]): Promise<WorkflowAction[]> {
        Utils.errorHeadline(`AUTO > ${name}`);

        const skill: any = this.character.getSkill(name);
        const items: Item[] = Array.from(Container.items.values()).filter((item) => types.includes(item.type) && subTypes.includes(item.subType) && item.level <= skill.level);
        items.sort((a: any, b: any) => b.level - a.level);

        if (items.length === 0) {
            throw new Error('Nothing can be done, you are doomed.');
        }

        let mostLikelyDoable: Item
        for (let i=0; i<items.length; i++) {
            mostLikelyDoable = items[i]!;

            try {
                if (mostLikelyDoable.isCraftable) {
                    return await this.generateGatherCraft(mostLikelyDoable.code);
                }

                return await this.generateGather(mostLikelyDoable.code);
            }
            catch { }
        }

        throw new Error('Unable to do anything');
    }

    private async generateAutoCraftBank(name: Skills): Promise<WorkflowAction[]> {
        Utils.errorHeadline(`AUTO > Bank`);

        const forbiddenRecipes = [
            Items.Cheese,
            Items.MushroomSoup,
            Items.FishSoup,
            Items.MapleSyrup,
        ]

        const skill: any = this.character.getSkill(name);
        const craftableItems: Item[] = Array.from(Container.items.values()).filter((item: Item) => item.skillToCraft === name && item.levelToCraft <= skill.level && !forbiddenRecipes.includes(item.code));
        craftableItems.sort((a, b) => b.level - a.level);

        let actions: WorkflowAction[] = [];
        for (let i=0; i<craftableItems.length; i++) {
            actions = await this.generateCraft(craftableItems[i]!.code, -1);
            if (actions.length > 0) {
                return actions;
            }
        }

        throw new Error('Nothing cookable');
    }
}
