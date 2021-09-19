import Ammo from "ammojs-typed";
import { MutableRefObject, useCallback, useEffect, useState } from "react";
import { PerspectiveCamera } from "three";

import { rotateRigidbodyByEuler } from "../utils";
import { TouchItem } from "./useTouchAxes";

export const useMouseControls = (
    rb?: Ammo.btRigidBody,
    camera?: MutableRefObject<PerspectiveCamera | undefined>,
    cameraTouch?: TouchItem,
) => {
    const [charging, setCharging] = useState(false);
    const rotateCamera = useCallback(async (x = 0, y = 0) => {
        if(!rb) {
            return;
        }

        rotateRigidbodyByEuler(rb, 0, -x, 0);

        camera?.current?.rotateX(-y);
    }, [rb, camera]);

    const mouseEventsHandler = useCallback(async (e: MouseEvent) => {
        rotateCamera(e.movementX / 200, e.movementY / 200);
    }, [rotateCamera]);

    const mouseDown = useCallback(() => {
        setCharging(true);
    }, []);

    const mouseUp = useCallback(() => {
        setCharging(false);
    }, []);

    useEffect(() => {
        document.addEventListener('mousemove', mouseEventsHandler);
        document.addEventListener('mousedown', mouseDown);
        document.addEventListener('mouseup', mouseUp);

        return () => {
            document.removeEventListener('mousemove', mouseEventsHandler);
            document.removeEventListener('mousedown', mouseDown);
            document.removeEventListener('mouseup', mouseUp);
        }
    }, [mouseUp, mouseDown, mouseEventsHandler]);

    return {
        charging,
    }
}