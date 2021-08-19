import { useFrame } from "@react-three/fiber";
import Ammo from "ammojs-typed";
import { MutableRefObject, useState } from "react";
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
        walkBackward,
    } = useCreatureController(ref, rb, 2);
    const [fear, setFear] = useState(false);

    const {player} = useLevelEditor();

    useFrame(() => {
        if (!player) {
            return null;
        }

        const distance = ref.current.position.distanceTo(player.position);

        if (distance < 2) {
            setFear(true);
        } else if (distance > 5) {
            setFear(false);
        } 

        ref.current.lookAt(player.position);
        if (fear) {
            walkBackward();
        } else {
            walkForward();

        }
    });
}