import {WorkflowAction} from "./WorkflowOrchestrator.js";
import {WorkflowFactory} from "./WorkflowFactory.js";
import {Item} from "../entities/Item.js";
import {CharacterGateway} from "../gateways/CharacterGateway.js";
import {Character} from "../entities/Character.js";
import {Recipe, Recipes} from "../lexical/Recipes.js";
import {Items} from "../lexical/Items.js";
import * as Utils from "../Utils.js";
import {ArtifactsClient} from "../gateways/ArtifactsClient.js";
import {Banker} from "./services/Banker.js";

export enum WorkflowPrefix {
    Equip = 'equip',
    Craft = 'craft',
    CraftAll = 'craft_all',
    Recraft = 'recraft',
    Gather = 'gather',
    GatherCraft = 'gather_craft',
}

export class WorkflowGenerator {
    private character: Character;

    constructor(
        private readonly client: ArtifactsClient,
        private readonly characterGateway: CharacterGateway,
        private readonly banker: Banker,
        private readonly items: Map<string, Item>
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
                return this.generateCraft(code as Items, 1);
            case WorkflowPrefix.Craft:
                return this.generateCraft(code as Items, -1);
            case WorkflowPrefix.Recraft:
                return this.generateRecraft(code as Items);
            case WorkflowPrefix.Gather:
                return this.generateGather(code as Items);
            case WorkflowPrefix.GatherCraft:
                return this.generateGatherCraft(code as Items);
        }

        return [];
    }

    generateEquip(code: Items): WorkflowAction[] {
        const item: Item | undefined = this.items.get(code);
        if (!item) {
            throw new Error('Item does not exist');
        }

        return WorkflowFactory.withdrawAndEquip([
            [item.code, 1, item.equippableSlot],
        ]);
    }

    async generateCraft(code: Items, quantity: number): Promise<WorkflowAction[]> {
        const recipe: Recipe = Recipes.getFor(code);
        const recipeQuantity: number = quantity === -1 ? (await this.banker.howManyTimesRecipeCanBeCraft(recipe, this.character.maxInventory)) : 1;

        if (recipeQuantity === 0) {
            throw new Error('Cannot craft');
        }

        return WorkflowFactory.withdrawAndCraft(code, recipe, recipeQuantity, false);
    }

    async generateRecraft(code: Items): Promise<WorkflowAction[]> {
        const recipe: Recipe = Recipes.getFor(code);
        const recipeQuantity: number = await this.banker.howManyTimesRecipeCanBeCraft(recipe, this.character.maxInventory);

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

    private generateGatherCraft(code: Items) {
        const item: Item | undefined = this.items.get(code);
        if (!item) {
            throw new Error('Item does not exist');
        }

        return [];
    }
}
