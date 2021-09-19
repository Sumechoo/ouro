import { useFrame } from "@react-three/fiber";
import Ammo from "ammojs-typed";
import { MutableRefObject, useCallback, useEffect, useState } from "react";
import { Object3D, Vector3 } from "three";

import { AmmoProvider } from "../Ammo/AmmoProvider";
import { inverseDebounce } from "../utils";
import { TouchItem } from "./useTouchAxes";

const directionVector = new Vector3(0,0,0);
const speedVector = new Vector3(0, 0, 0);

const MOVEMENT_SPEED = 2.5;

export interface KeyboardAddon {
    key: string;
    action: VoidFunction;
}

export const useKeyboardControls = (
    ref: MutableRefObject<Object3D | undefined>,
    rb?: Ammo.btRigidBody,
    movementTouch?: TouchItem,
    addons: Array<KeyboardAddon> = [],
) => {
    const [crouch, setCrouch] = useState(false);
    const [walk, setWalk] = useState(false);

    const jump = useCallback(inverseDebounce(() => {
        const api = AmmoProvider.getApiSync();

        if(rb) {
            const velocity = rb.getLinearVelocity();
            rb.setLinearVelocity(new api.btVector3(velocity.x(), 4, velocity.z()));
        }
    }, 600), [rb]);

    const keyDownListener = useCallback((event: KeyboardEvent) => {
        switch(event.key) {
            case 'w':
                setWalk(true);
                speedVector.z = -MOVEMENT_SPEED;
                break;
            case 's':
                setWalk(true);
                speedVector.z = MOVEMENT_SPEED;
                break;
            case 'a':
                speedVector.x = -MOVEMENT_SPEED;
                break;
            case 'd':
                speedVector.x = MOVEMENT_SPEED;
                break;
            case ' ':
                jump();
                break;
            case 'Shift':
                setCrouch(true);
                break;
            default:
                addons.forEach(({key, action}) => {
                    if (event.key === key) {
                        action();
                    }
                });
                break;
        }
    }, [addons, jump]);

    const keyUpListener = useCallback((event: KeyboardEvent) => {
        switch(event.key) {
            case 'w':
            case 's':
                setWalk(false);
                speedVector.z = 0;
                break;
            case 'a':
            case 'd':
                setWalk(false);
                speedVector.x = 0;
                break;
            case 'Shift':
                setCrouch(false);
                break;
        }
    }, []);

    useFrame(async () => {
        if(!ref.current) {
            return;
        }

        // if (movementTouch) {
        //     speedVector.z = -(movementTouch.delta.y / 50);
        // } else {
        //     speedVector.z = 0;
        // }

        const api = await AmmoProvider.getApi();

        const lastVelocity = rb?.getLinearVelocity();

        ref.current.getWorldDirection(directionVector);

        rb?.setLinearVelocity(new api.btVector3(
            directionVector.x * speedVector.z,
            lastVelocity?.y() ?? 0,
            directionVector.z * speedVector.z,
        ));
    })

    useEffect(() => {
        document.addEventListener('keydown', keyDownListener);
        document.addEventListener('keyup', keyUpListener);

        return () => {
            document.removeEventListener('keydown', keyDownListener);
            document.removeEventListener('keyup', keyUpListener);
        }
    }, [keyDownListener, keyUpListener]);

    return {
        crouch,
        walk,
    }
};
