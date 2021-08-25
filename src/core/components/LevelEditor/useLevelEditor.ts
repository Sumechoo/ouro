import { Object3D } from "three";
import create from "zustand";
import { Placement, PlacementConfig } from "./types";

interface EditorState {
    isEnabled: boolean;
    configs: PlacementConfig;
    currentDynamics: Placement[];
    player?: Object3D;
    
    index: number;

    toggle: VoidFunction;
    setPlacementConfigs: (c: PlacementConfig) => void;
    setIndex: (i: number) => void;

    deleteDynamic: (placement: Placement) => void;
    addPlacement: (placement: Placement) => void;
    setPlayer: (player?: Object3D) => void;
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
    setPlacementConfigs: (configs) => set({configs, currentDynamics: configs.dynamics ?? []}),
    setIndex: (index = 0) => set({index}),
    deleteDynamic: (placement) => set((state) => ({currentDynamics: state.currentDynamics.filter((item) => item !== placement)})),
    addPlacement: (placement) => set(({currentDynamics}) => ({currentDynamics: [...currentDynamics, placement]})),
    setPlayer: (player) => set({player}),
}));