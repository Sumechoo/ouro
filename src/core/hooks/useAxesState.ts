import create from "zustand";
import { TouchItem } from "./useTouchAxes";

interface AxesState {
    touches: TouchItem[];

    setTouches: (touches: TouchItem[]) => void;
}

export const useAxesState = create<AxesState>((set) => ({
    touches: [],

    setTouches: (touches) => set({touches}),
}));