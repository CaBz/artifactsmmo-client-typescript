import {WorkflowAction} from "./WorkflowOrchestrator.js";
import {WorkflowFactory} from "./WorkflowFactory.js";
import {Item} from "../entities/Item.js";
import {CharacterGateway} from "../gateways/CharacterGateway.js";
import {Character} from "../entities/Character.js";
import {Recipe, Recipes, ResourceItem} from "../lexical/Recipes.js";
import {Items} from "../lexical/Items.js";
import * as Utils from "../Utils.js";
import {ArtifactsClient} from "../gateways/ArtifactsClient.js";
import {Banker} from "./services/Banker.js";
import {Monsters} from "../lexical/Monsters.js";
import {Simulator} from "./services/Simulator.js";
import {Monster} from "../entities/Monster.js";

export enum WorkflowPrefix {
    Equip = 'equip',
    Craft = 'craft',
    CraftAll = 'craft_all',
    Recraft = 'recraft',
    Gather = 'gather',
    GatherCraft = 'gather_craft',
    Fight = 'fight',
}

export class WorkflowGenerator {
    private character: Character;

    constructor(
        private readonly client: ArtifactsClient,
        private readonly characterGateway: CharacterGateway,
        private readonly banker: Banker,
        private readonly simulator: Simulator,
        private readonly items: Map<string, Item>,
        private readonly monsters: Map<string, Monster>,
    ) {
    }

    async generate(name: string): Promise<WorkflowAction[]> {
        const parts = name.split('-');
        if (parts.length < 2 || parts[0] === '' || parts[1] === '') {
            throw new Error('Need to define the action and item');
        }

        const actionName: string = parts[0]!;
        const code: string = parts[1]!;

        this.character = await this.characterGateway.status();

        Utils.logHeadline(`Generating workflow ${actionName} for ${code}...`);

        switch(actionName) {
            case WorkflowPrefix.Equip:
                return this.generateEquip(code as Items);
            case WorkflowPrefix.CraftAll:
                return this.generateCraft(code as Items, -1);
            case WorkflowPrefix.Craft:
                return this.generateCraft(code as Items, +(parts[2] || 1));
            case WorkflowPrefix.Recraft:
                return this.generateRecraft(code as Items, +(parts[2] || -1));
            case WorkflowPrefix.Gather:
                return this.generateGather(code as Items);
            case WorkflowPrefix.GatherCraft:
                return this.generateGatherCraft(code as Items);
            case WorkflowPrefix.Fight:
                return this.generateFight(code as Monsters);
        }

        return [];
    }

    generateEquip(inputCode: Items): WorkflowAction[] {
        const codes: Items[] = inputCode.split(',') as Items[];
        let item: Item | undefined;
        let code: Items;

        const actions: WorkflowAction[] = [];
        for (let i=0; i<codes.length; i++) {
            code = codes[i]!;

            item = this.items.get(code);
            if (!item) {
                throw new Error('Item does not exist');
            }

            actions.push(...WorkflowFactory.withdrawAndEquip([[item.code, 1, item.equippableSlot],]));
        }

        return actions;
    }

    async generateCraft(inputCode: Items, quantity: number): Promise<WorkflowAction[]> {
        const codes: Items[] = inputCode.split(',') as Items[];

        const actions = [];
        let recipe: Recipe;
        let recipeQuantityFromBank: number;
        let recipeQuantity: number;
        let code: Items;

        for (let i=0; i<codes.length; i++) {
            code = codes[i]!;
            recipe = Recipes.getFor(code);
            recipeQuantityFromBank = await this.banker.howManyTimesRecipeCanBeCraft(recipe, this.character.maxInventory);
            recipeQuantity = quantity === -1 ? recipeQuantityFromBank : Math.min(quantity, recipeQuantityFromBank);

            if (recipeQuantity === 0) {
                throw new Error(`${code} cannot be crafted - Missing recipe items: ${recipe.items.map((item) => `${item.code} x${item.quantity}`).join(',')}`);
            }

            actions.push(...WorkflowFactory.withdrawAndCraft(code, recipe, recipeQuantity, false));
        }

        return actions;
    }

    async generateRecraft(code: Items, quantity: number): Promise<WorkflowAction[]> {
        const recipe: Recipe = Recipes.getFor(code);
        const recipeQuantityFromBank = await this.banker.howManyTimesRecipeCanBeCraft(recipe, this.character.maxInventory);
        const recipeQuantity: number = quantity === -1 ? recipeQuantityFromBank : Math.min(quantity, recipeQuantityFromBank);

        if (recipeQuantity === 0) {
            throw new Error('Cannot craft');
        }

        return WorkflowFactory.withdrawAndCraft(code, recipe, recipeQuantity, true);
    }

    private generateGather(code: Items) {
        const item: Item | undefined = this.items.get(code);
        if (!item) {
            throw new Error('Item does not exist');
        }

        return [];
    }

    private async generateGatherCraft(code: Items): Promise<WorkflowAction[]> {
        const recipe: Recipe = Recipes.getFor(code);
        const quantity: number = recipe.getQuantityCraftable(this.character.maxInventory);
        const bank = await this.banker.getBank();

        const gathers: ResourceItem[] = [];
        const withdraws: ResourceItem[] = [];

        recipe.items.forEach((item: ResourceItem) => {
            const totalNeeded = item.quantity * (quantity - 1);
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

    private generateFight(code: Monsters): Promise<WorkflowAction[]> {
        const monster = this.monsters.get(code);

        // 1. Find best Set?
        // 2. Withdraw Utilities
        // 3. Withdraw Consumables
        // 4. Find POI
        // 5. Fight/Rest Loop (SubWorkflow with condition = no more consumables?
        // Dump all to bank
        // Repeat

    }
}
