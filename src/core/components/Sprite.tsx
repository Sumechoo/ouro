import { useFrame } from "@react-three/fiber";
import { FC, memo, useEffect, useState } from "react";
import { AmmoProvider } from "../Ammo/AmmoProvider";

import { useBox } from "../Ammo/hooks/useBox";
import { ObjectProps } from "./LevelEditor/LevelContainer";

export const Sprite: FC<ObjectProps> = memo(() => {
    const [active, setActive] = useState(false);
    const {ref, rb} = useBox({mass: 1, position: [0,1,0], size: [0.3, 0.3, 0.3]});

    useEffect(() => {
        if (active) {
            const api = AmmoProvider.getApiSync();

            rb?.setLinearVelocity(new api.btVector3(0, 2, 0));
        }
    }, [active, rb]);

    useFrame(() => {
        if (ref.current?.userData.active !== active) {
            setActive(ref.current?.userData.active);
        }
    });

    return (
        <mesh ref={ref}>
            <boxGeometry args={[1,1,1]}/>
            <meshPhysicalMaterial />

            {active && <pointLight position={[0, 0, 0]} intensity={1} distance={2} color='white' />}
        </mesh>
    )
});