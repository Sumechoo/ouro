import { WorkerApi } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { MutableRefObject, useCallback, useEffect } from "react";
import { Object3D, Vector3 } from "three";

const directionVector = new Vector3(0,0,0);
const speedVector = new Vector3(0, 0, 0);

export const useKeyboardControls = (api: WorkerApi, ref: MutableRefObject<Object3D | undefined>) => {
    const keyDownListener = useCallback((event: KeyboardEvent) => {
        switch(event.key) {
            case 'w':
                speedVector.z = 1;
                break;
            case 's':
                speedVector.z = -1;
                break;
            case 'a':
                speedVector.x = -0.1;
                break;
            case 'd':
                speedVector.x = 0.1;
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

    useFrame(() => {
        if(!ref.current) {
            return;
        }

        const {x, y, z} = ref.current.position;

        ref.current.getWorldDirection(directionVector);

        api.position.set(
            x - (directionVector.x / 4) * speedVector.z,
            y - (directionVector.y / 4) * speedVector.z,
            z - (directionVector.z / 4) * speedVector.z,
        )
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
