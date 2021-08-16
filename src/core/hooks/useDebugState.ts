import create from "zustand";

export const useDebugState = create<Record<string, any>>((set) => ({
    setDebugData: (key = '', value = '') => set({[key]: value}),
}));
