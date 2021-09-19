import create from 'zustand';
import { Placement } from '../../../core/components/LevelEditor/types';

interface InventoryState {
    index: number,
    items: Placement[];

    setActiveIndex: (index: number) => void;
    addItem: (item: Placement) => void;
    removeItem: (item: Placement) => void;
}

export const useInventoryState = create<InventoryState>((set) => ({
    index: 0,
    items: [
        {
            alias: 'Level Portal', 
            component: 'Portal',
            props: {
                size: [0.2, 1, 1]
            },
        },
        {
            alias: 'Tree',
            component: 'DecorationModel',
            props: {
                name: 'tree'
            },
        },
        {
            alias: 'Garage',
            component: 'ConcaveModel',
            props: {
                name: 'garage'
            },
        },
        {
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
