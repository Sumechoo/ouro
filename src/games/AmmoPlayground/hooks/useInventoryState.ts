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
            component: 'Portal',
            props: {
                size: [0.2, 1, 1]
            },
        },
        {
            component: 'ConcaveModel',
            props: {
                name: 'house_01'
            },
        },
        {
            component: 'DecorationModel',
            props: {
                name: 'tree'
            },
        },
        {
            component: 'ConcaveModel',
            props: {
                name: 'garage'
            },
        },
    ],

    addItem: (newItem) => set((state) => ({ items: [...state.items, newItem] })),
    removeItem: (targetItem) => set((state) => set({items: state.items.filter((item) => item !== targetItem)})),
    setActiveIndex: (index) => set({index}),
}));
