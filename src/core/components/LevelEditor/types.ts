import { Euler, Vector3 } from "@react-three/fiber";
import { ThreeEvent } from "@react-three/fiber/dist/declarations/src/core/events";
import { Vector3Tuple } from "three";
import { PlacementsMap } from "./LevelContainer";
import { EditorState } from "./useLevelEditor";

export interface ObjectProps extends EditorObjectProps {
    position?: Vector3;
    rotation?: Euler;
    mass?: number;
    size?: Vector3;
    name?: string;
    targetPlacement?: Placement;
    delay?: number;
    direction?: Vector3Tuple;
}

export interface EditorObjectProps {
    placement: Placement;
    onEditorClick: (e: ThreeEvent<MouseEvent>) => void;
}

export interface Placement {
    id: number;
    alias?: string;
    component: keyof typeof PlacementsMap;
    props: Omit<ObjectProps, keyof EditorObjectProps>;
}

export interface Tool {
    alias?: string;
    name?: string;
    primaryAction: (api: EditorState, from: Vector3Tuple, direction: Vector3Tuple) => void;
    secondaryAction: VoidFunction;
}

export interface PlacementConfig {
    statics: Placement[],
    dynamics: Placement[],
}