import { useFrame, useThree } from '@react-three/fiber';
import { RefObject, useRef, useState } from 'react';
import { Vector2, Raycaster, Object3D, Camera } from 'three';
import create from 'zustand';

const ZERO_2d = new Vector2(0,0);

interface RaycasterState {
    activeObject?: Object3D;

    setActiveObject: (obj?: Object3D) => void;
}

export const useRaycasterState = create<RaycasterState>((set) => ({
    setActiveObject: (activeObject) => set({activeObject}),
}));

export const useRaycaster = (camera: RefObject<Camera | undefined>, watchForStatic = false) => {
    const previousRef = useRef<Object3D>();
    const intersectTargets = useThree(({scene}) => scene.children);
    const raycasterRef = useRef(new Raycaster());
    const [activeObject, setActiveObject] = useState<Object3D>();

    raycasterRef.current.far = 1.6;

    useFrame(() => {
        if (!camera.current) {
            return;
        }

        raycasterRef.current.setFromCamera(ZERO_2d, camera.current);

        const intersectionsResult = raycasterRef.current.intersectObjects(intersectTargets);
        const intersectionObject = intersectionsResult[0]?.object;

        if (intersectionObject) {
            const isDifferent = previousRef.current !== intersectionObject;
            const isDynamic = watchForStatic || intersectionObject.userData.dynamic;

            if (isDifferent && isDynamic) {
                previousRef.current && (previousRef.current.userData.active = false);
                previousRef.current = intersectionObject;
                previousRef.current.userData.active = true;
                setActiveObject(intersectionObject);
            }
            
        } else {
            previousRef.current && (previousRef.current.userData.active = false);
            previousRef.current = undefined;
            setActiveObject(undefined);
        }
    });

    return {
        activeObject,
    }
}