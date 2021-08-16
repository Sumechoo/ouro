import { useFrame } from "@react-three/fiber";
import Ammo from "ammojs-typed";
import { MutableRefObject } from "react";
import { Object3D } from "three";
import { Placement } from "../components/LevelEditor/types";
import { useLevelEditor } from "../components/LevelEditor/useLevelEditor";
import { useCreatureController } from "./useCreatureController";


export const useGenetics = (
    ref: MutableRefObject<Object3D>,
    placement: Placement,
    rb?: Ammo.btRigidBody,
) => {
    const {
        walkForward,
    } = useCreatureController(ref, rb);

    const {player} = useLevelEditor();

    useFrame(() => {
        if (player) {
            ref.current.lookAt(player.position);
            walkForward();
        }
    });
}