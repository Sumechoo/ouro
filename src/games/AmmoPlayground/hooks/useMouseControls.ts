import Ammo from "ammojs-typed";

import { useCallback, useEffect } from "react";
import { AmmoProvider } from "../../../core/Ammo/AmmoProvider";

export const useMouseControls = (rb?: Ammo.btRigidBody, camera?: THREE.Camera) => {
    const mouseEventsHandler = useCallback(async (e: MouseEvent) => {
        if(!rb) {
            return;
        }

        const api = await AmmoProvider.getApi();

        rb.setAngularFactor(new api.btVector3(0, 1, 0));
        rb.setAngularVelocity(new api.btVector3(0, -e.movementX / 2, 0));
        rb.setAngularFactor(new api.btVector3(0, 0, 0));

        camera?.rotateY(e.movementY);

        // const api = await AmmoProvider.getApi();

        // const transform = rb.getWorldTransform();
        // const oldRotation = transform.getRotation();
        // const vector = oldRotation.getAxis();
        // const angle = oldRotation.getAngle();
    
        // oldRotation.setY(oldRotation.y() - e.movementX / 500);

        // transform.setRotation(oldRotation);
        // rb.setWorldTransform(transform);
    }, [rb]);

    useEffect(() => {
        document.addEventListener('mousemove', mouseEventsHandler);
        
        return () => {
            document.removeEventListener('mousemove', mouseEventsHandler);
        }
    }, [mouseEventsHandler]);
}