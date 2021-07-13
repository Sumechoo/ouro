import { useFrame } from "@react-three/fiber";
import Ammo from "ammojs-typed";
import { MutableRefObject, useCallback, useEffect } from "react";
import { Object3D, Vector3 } from "three";
import { AmmoProvider } from "../../../core/Ammo/AmmoProvider";

const directionVector = new Vector3(0,0,0);
const speedVector = new Vector3(0, 0, 0);

export const useKeyboardControls = (ref: MutableRefObject<Object3D | undefined>, rb?: Ammo.btRigidBody) => {
    const keyDownListener = useCallback((event: KeyboardEvent) => {
        switch(event.key) {
            case 'w':
                speedVector.z = -10;
                break;
            case 's':
                speedVector.z = 10;
                break;
            case 'a':
                speedVector.x = -10;
                break;
            case 'd':
                speedVector.x = 10;
                break;
        }
    }, []);

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
