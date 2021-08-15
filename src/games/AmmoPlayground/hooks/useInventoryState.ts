import create from 'zustand';
import { Placement } from '../../../core/components/LevelEditor/types';

interface InventoryState {
    items: Placement[];

    addItem: (item: Placement) => void;
    removeItem: (item: Placement) => void;
}

export const useInventoryState = create<InventoryState>((set) => ({
    items: [],

    addItem: (newItem) => set((state) => ({ items: [...state.items, newItem] })),
    removeItem: (targetItem) => set((state) => set({items: state.items.filter((item) => item !== targetItem)})),
}));
