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
            component: 'Trigger',
            props: {
                size: [0.2, 1, 1]
            },
        },
    ],

    addItem: (newItem) => set((state) => ({ items: [...state.items, newItem] })),
    removeItem: (targetItem) => set((state) => set({items: state.items.filter((item) => item !== targetItem)})),
    setActiveIndex: (index) => set({index}),
}));
