import { useFrame, useThree } from '@react-three/fiber';
import { Camera } from '@react-three/fiber/dist/declarations/src/core/events';
import { RefObject, useRef, useState } from 'react';
import { Vector2, Raycaster, Object3D } from 'three';

const ZERO_2d = new Vector2(0,0);

export const useRaycaster = (camera: RefObject<Camera | undefined>) => {
    const targetRef = useRef<Object3D>();
    const intersectTargets = useThree(({scene}) => scene.children);
    const raycasterRef = useRef(new Raycaster());

    useFrame(() => {
        if (!camera.current) {
            return;
        }

        raycasterRef.current.setFromCamera(ZERO_2d, camera.current);

        const intersectionsResult = raycasterRef.current.intersectObjects(intersectTargets);
        const intersectionObject = intersectionsResult[0]?.object;

        if (intersectionObject && intersectionObject.userData.interactive) {
            const isSame = intersectionObject === targetRef.current;

            if (isSame) {
                intersectionsResult[0].object.scale.set(1.2,1.2,1.2);
            } else {
                targetRef.current?.scale.set(1,1,1);
                targetRef.current = intersectionObject;
            }
        } else {
            targetRef.current?.scale.set(1,1,1);
            targetRef.current = intersectionObject;
        }
    })
}