import create from "zustand";
import { PlacementConfig } from "./LevelContainer";

interface EditorState {
    isEnabled: boolean;
    configs: PlacementConfig[];
    index: number;

    toggle: VoidFunction;
    setPlacementConfigs: (c: PlacementConfig[]) => void;
    setIndex: (i: number) => void; 
}

export const useLevelEditor = create<EditorState>((set) => ({
    isEnabled: true,
    configs: [],
    index: 0,

    toggle: () => set((state) => ({isEnabled: !state.isEnabled})),
    setPlacementConfigs: (configs: PlacementConfig[]) => set({configs}),
    setIndex: (index = 0) => set({index}),
}));