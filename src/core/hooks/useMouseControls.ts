import { WorkerApi } from "@react-three/cannon";
import { MutableRefObject, useCallback, useEffect } from "react";
import { Object3D } from "three";

export const useMouseControls = (api: WorkerApi, ref: MutableRefObject<Object3D | undefined>) => {
    api.fixedRotation?.set(true);

    const mouseEventsHandler = useCallback((e: MouseEvent) => {
        if(!ref.current) {
            return;
        }

        api.angularVelocity.set(0, -e.movementX / 5, 0);
        setTimeout(() => api.angularVelocity.set(0, 0, 0), 0);
    }, [api, ref]);

    useEffect(() => {
        document.addEventListener('mousemove', mouseEventsHandler);
        
        return () => {
            document.removeEventListener('mousemove', mouseEventsHandler);
        }
    }, [mouseEventsHandler]);
}