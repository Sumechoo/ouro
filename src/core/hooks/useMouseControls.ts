import Ammo from "ammojs-typed";
import { MutableRefObject, useCallback, useEffect } from "react";
import { PerspectiveCamera } from "three";

import { AmmoProvider } from "../Ammo/AmmoProvider";

export const useMouseControls = (rb?: Ammo.btRigidBody, camera?: MutableRefObject<PerspectiveCamera | undefined>) => {
    const mouseEventsHandler = useCallback(async (e: MouseEvent) => {
        if(!rb) {
            return;
        }

        const api = await AmmoProvider.getApi();

        rb.setAngularFactor(new api.btVector3(0, 1, 0));
        rb.setAngularVelocity(new api.btVector3(0, -e.movementX / 2, 0));
        rb.setFriction(0);

        camera?.current?.rotateX(-e.movementY / 200);
    }, [rb, camera]);

    useEffect(() => {
        document.addEventListener('mousemove', mouseEventsHandler);
        return () => document.removeEventListener('mousemove', mouseEventsHandler);
    }, [mouseEventsHandler]);
}