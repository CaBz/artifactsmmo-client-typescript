import {WorkflowAction} from "./WorkflowOrchestrator.js";
import {WorkflowFactory} from "./WorkflowFactory.js";
import {Item} from "../entities/Item.js";

export class WorkflowGenerator {
    constructor(private readonly items: Map<string, Item>) {
    }

    generate(name: string): WorkflowAction[] {
        const parts = name.split('-');
        if (parts.length < 2) {
            return [];
        }

        if (!parts[1] || parts[1] === '') {
            return [];
        }

        switch(parts[0]) {
            case 'equip':
                return this.generateEquip(parts[1] || '');
        }

        return [];
    }

    generateEquip(name: string): WorkflowAction[] {
        const item: Item = this.items.get(name);
        if (!item) {
            return [];
        }

        return WorkflowFactory.withdrawAndEquip([
            [item.code, 1, item.equippableSlot],
        ]);
    }
}
