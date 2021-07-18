import { FC, useEffect, useRef } from "react";
import { PerspectiveCamera } from "three";

import { AmmoProvider } from "../../../core/Ammo/AmmoProvider";
import { useBox } from "../../../core/Ammo/hooks/useBox";
import { DefaultCamera } from "../../../core/components/DefaultCamera";

import { useKeyboardControls } from "../../../core/hooks/useKeyboardControls";
import { useMouseControls } from "../../../core/hooks/useMouseControls";

export const Player: FC = () => {
    const {ref, rb} = useBox({mass: 1, size: [0.5,0.5,0.5], position: [1, 1, 1]});
    const cameraRef = useRef<PerspectiveCamera>();

    useEffect(() => {
        AmmoProvider.getApi()
            .then((api) => {
                if(rb) {
                    rb.setAngularFactor(new api.btVector3(0, 1, 0));
                    rb.setFriction(0);
                }
            })
    }, [rb]);

    useMouseControls(rb, cameraRef);
    useKeyboardControls(ref, rb);

    return (
        <mesh ref={ref} >
            <DefaultCamera
                onSetCameraRef={(camera) => cameraRef.current = camera}
                position={[0, 2, 0]}
                rotation={[0, 0, 0]}
            />

            <boxBufferGeometry />
            <meshPhysicalMaterial color='green' />
        </mesh>
    );
}