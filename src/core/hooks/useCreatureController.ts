import { useFrame } from "@react-three/fiber";
import Ammo from "ammojs-typed";
import { MutableRefObject, useCallback, useRef } from "react";
import { Object3D, Vector3 } from "three";

import { AmmoProvider } from "../Ammo/AmmoProvider";
export interface KeyboardAddon {
    key: string;
    action: VoidFunction;
}

export const useCreatureController = (
    ref: MutableRefObject<Object3D | undefined>,
    rb?: Ammo.btRigidBody,
    movementSpeed = 1,
) => {
    const speedVector = useRef(new Vector3(0, 0, 0));
    const directionVector = useRef(new Vector3(0, 0, 0));
    const api = useRef(AmmoProvider.getApiSync());

    const walkForward = useCallback(() => {
        speedVector.current.z = movementSpeed;
    }, [movementSpeed]);

    const walkBackward = useCallback(() => {
        speedVector.current.z = -movementSpeed;
    }, [movementSpeed]);

    const stopWalking = useCallback(() => {
        speedVector.current.z = 0;
    }, [speedVector]);

    const turnLeft = useCallback(() => {
        rb?.setAngularVelocity(new api.current.btVector3(0, 1, 0));
    }, [rb]);

    const turnRight = useCallback(() => {
        rb?.setAngularVelocity(new api.current.btVector3(0, -1, 0));
    }, [rb]);

    const stopTurning = useCallback(() => {
        rb?.setAngularVelocity(new api.current.btVector3(0, 0, 0));
    }, [rb]);

    useFrame(async () => {
        if(!ref.current) {
            return;
        }

        const api = await AmmoProvider.getApi();

        const lastVelocity = rb?.getLinearVelocity();

        ref.current?.getWorldDirection(directionVector.current);

        rb?.setLinearVelocity(new api.btVector3(
            directionVector.current.x * speedVector.current.z,
            lastVelocity?.y() ?? 0,
            directionVector.current.z * speedVector.current.z,
        ));
    });

    return {
        walkForward,
        walkBackward,
        stopWalking,
        turnLeft,
        turnRight,
        stopTurning,
    }
};
