import { Euler, Vector3 } from "@react-three/fiber";
import { ThreeEvent } from "@react-three/fiber/dist/declarations/src/core/events";
import { PlacementsMap } from "./LevelContainer";

export interface ObjectProps extends EditorObjectProps {
    position?: Vector3;
    rotation?: Euler;
    mass?: number;
    size?: Vector3;
    name?: string;
}

export interface EditorObjectProps {
    placement: Placement;
    onEditorClick: (e: ThreeEvent<MouseEvent>) => void;
}

export interface Placement {
    component: keyof typeof PlacementsMap;
    props: Omit<ObjectProps, keyof EditorObjectProps>;
}

export interface PlacementConfig {
    statics: Placement[],
    dynamics: Placement[],
}