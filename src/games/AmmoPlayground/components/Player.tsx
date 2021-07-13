import { FC, useEffect } from "react";
import { AmmoProvider } from "../../../core/Ammo/AmmoProvider";

import { useBox } from "../../../core/Ammo/hooks/useBox";
import { DefaultCamera } from "../../../core/components/DefaultCamera";
import { useKeyboardControls } from "../hooks/useKeyboardControls";
import { useMouseControls } from "../hooks/useMouseControls";

export const Player: FC = () => {
    const {ref, rb} = useBox(1, [0.5,0.5,0.5], [1, 1, 4]);

    useEffect(() => {
        AmmoProvider.getApi()
            .then((api) => {
                if(rb) {
                    rb.setAngularFactor(new api.btVector3(0, 0, 0));
                    rb.setFriction(0);
                }
            })
    }, [rb])

    useMouseControls(rb);
    useKeyboardControls(ref, rb);

    return (
        <mesh ref={ref} >
            <DefaultCamera
                position={[0, 3, 5]}
                rotation={[-0.3, 0, 0]}
            />

            <boxBufferGeometry />
            <meshPhysicalMaterial color='green' />
        </mesh>
    );
}