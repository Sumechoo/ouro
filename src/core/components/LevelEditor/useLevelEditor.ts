import create from "zustand";
import { Placement, PlacementConfig } from "./types";

interface EditorState {
    isEnabled: boolean;
    configs: PlacementConfig;
    currentDynamics: Placement[];
    
    index: number;

    toggle: VoidFunction;
    setPlacementConfigs: (c: PlacementConfig) => void;
    setIndex: (i: number) => void;

    deleteDynamic: (placement: Placement) => void;
    addPlacement: (placement: Placement) => void;
}

export const useLevelEditor = create<EditorState>((set) => ({
    isEnabled: true,
    configs: {
        statics: [],
        dynamics: [],
    },
    currentDynamics: [],
    index: 0,

    toggle: () => set((state) => ({isEnabled: !state.isEnabled})),
    setPlacementConfigs: (configs: PlacementConfig) => set({configs, currentDynamics: configs.dynamics ?? []}),
    setIndex: (index = 0) => set({index}),
    deleteDynamic: (placement) => set((state) => ({currentDynamics: state.currentDynamics.filter((item) => item !== placement)})),
    addPlacement: (placement) => set(({currentDynamics}) => ({currentDynamics: [...currentDynamics, placement]})),
}));