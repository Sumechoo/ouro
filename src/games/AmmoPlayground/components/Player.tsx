import { FC, useEffect } from "react";

import { AmmoProvider } from "../../../core/Ammo/AmmoProvider";
import { useBox } from "../../../core/Ammo/hooks/useBox";
import { DefaultCamera } from "../../../core/components/DefaultCamera";
import { useKeyboardControls } from "../hooks/useKeyboardControls";
import { useMouseControls } from "../hooks/useMouseControls";

export const Player: FC = () => {
    const {ref, rb} = useBox({mass: 1, size: [0.5,0.5,0.5], position: [1, 1, 1]});

    useEffect(() => {
        AmmoProvider.getApi()
            .then((api) => {
                if(rb) {
                    rb.setAngularFactor(new api.btVector3(0, 1, 0));
                    rb.setFriction(0);
                }
            })
    }, [rb])

    useMouseControls(rb);
    useKeyboardControls(ref, rb);

    return (
        <mesh ref={ref} >
            <DefaultCamera
                position={[0, 2, 0]}
                rotation={[0, 0, 0]}
            />

            <boxBufferGeometry />
            <meshPhysicalMaterial color='green' />
        </mesh>
    );
}