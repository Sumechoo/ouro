import { useFrame } from "@react-three/fiber";
import Ammo from "ammojs-typed";
import { MutableRefObject, useCallback, useEffect } from "react";
import { Object3D, Vector3 } from "three";

import { AmmoProvider } from "../Ammo/AmmoProvider";

const directionVector = new Vector3(0,0,0);
const speedVector = new Vector3(0, 0, 0);

const MOVEMENT_SPEED = 1.5;

interface KeyboardAddon {
    key: string;
    action: VoidFunction;
}

export const useKeyboardControls = (
    ref: MutableRefObject<Object3D | undefined>,
    rb?: Ammo.btRigidBody,
    addons: Array<KeyboardAddon> = [],
) => {
    const keyDownListener = useCallback((event: KeyboardEvent) => {
        switch(event.key) {
            case 'w':
                speedVector.z = -MOVEMENT_SPEED;
                break;
            case 's':
                speedVector.z = MOVEMENT_SPEED;
                break;
            case 'a':
                speedVector.x = -MOVEMENT_SPEED;
                break;
            case 'd':
                speedVector.x = MOVEMENT_SPEED;
                break;
            case ' ':
                AmmoProvider.getApi()
                    .then((api) => {
                        if(rb) {
                            const velocity = rb.getLinearVelocity();
                            rb.setLinearVelocity(new api.btVector3(velocity.x(), 4, velocity.z()));
                        }
                    })
                break;
        }
    }, [rb]);

    const keyUpListener = useCallback((event: KeyboardEvent) => {
        switch(event.key) {
            case 'w':
            case 's':
                speedVector.z = 0;
                break;
            case 'a':
            case 'd':
                speedVector.x = 0;
                break;
        }
    }, []);

    useFrame(async () => {
        if(!ref.current) {
            return;
        }

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
};
