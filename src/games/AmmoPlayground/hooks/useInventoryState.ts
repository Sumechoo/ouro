import create from 'zustand';
import { IdManager } from '../../../core/classes/IdManager';

import { Placement, Tool } from '../../../core/components/LevelEditor/types';

type InventoryItem = Placement | Tool;

interface InventoryState {
    index: number,
    items: InventoryItem[];

    setActiveIndex: (index: number) => void;
    addItem: (item: InventoryItem) => void;
    removeItem: (item: InventoryItem) => void;
}

export const useInventoryState = create<InventoryState>((set) => ({
    index: 0,
    items: [
        {
            alias: 'Gun prototype',
            primaryAction: (levelApi, position, direction) => {
                levelApi.addPlacement({
                    id: IdManager.getNewId(),
                    component: 'Bullet',
                    props: {
                        direction,
                    },
                }, position);
            },
            secondaryAction: () => {},
        },
        {
            id: IdManager.getNewId(),
            alias: 'Tree',
            component: 'DecorationModel',
            props: {
                name: 'tree'
            },
        },
        {
            id: IdManager.getNewId(),
            alias: 'Pine',
            component: 'DecorationModel',
            props: {
                name: 'pine'
            },
        },
        {
            id: IdManager.getNewId(),
            alias: 'Trash Can',
            component: 'CreatureSpawner',
            props: {
                delay: 1000,
                targetPlacement: {
                    id: IdManager.getNewId(),
                    component: 'ConcaveModel',
                    props: {
                        name: 'trashcan'
                    },
                }
            },
        },
        {
            id: IdManager.getNewId(),
            alias: 'Garage',
            component: 'ConcaveModel',
            props: {
                name: 'garage'
            },
        },
        {
            id: IdManager.getNewId(),
            alias: 'Grass',
            component: 'DecorationModel',
            props: {
                name: 'tall_grass'
            },
        },
    ],

    addItem: (newItem) => set((state) => ({ items: [...state.items, newItem] })),
    removeItem: (targetItem) => set((state) => set({items: state.items.filter((item) => item !== targetItem)})),
    setActiveIndex: (index) => set({index}),
}));
