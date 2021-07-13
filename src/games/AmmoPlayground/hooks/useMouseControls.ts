import Ammo from "ammojs-typed";
import { useCallback, useEffect } from "react";

export const useMouseControls = (rb?: Ammo.btRigidBody) => {
    const mouseEventsHandler = useCallback((e: MouseEvent) => {
        if(!rb) {
            return;
        }

        const transform = rb.getWorldTransform();
        const oldRotation = transform.getRotation();

        oldRotation.setY(oldRotation.y() - e.movementX / 500);

        transform.setRotation(oldRotation);
        rb.setWorldTransform(transform);
    }, [rb]);

    useEffect(() => {
        document.addEventListener('mousemove', mouseEventsHandler);
        
        return () => {
            document.removeEventListener('mousemove', mouseEventsHandler);
        }
    }, [mouseEventsHandler]);
}