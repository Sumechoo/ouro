import { useFrame, Vector3 } from "@react-three/fiber";
import { FC, memo, useEffect, useState } from "react";

import { useCollision } from "../Ammo/hooks/useCollision";
import { ObjectProps } from "./LevelEditor/types";

export const Pickable: FC<ObjectProps> = memo(({
    placement,
    position = [0,0,0] as Vector3,
}) => {
    const [active, setActive] = useState(false);
    const {ref} = useCollision({mass: 1, position, size: [0.3, 0.3, 0.3]});

    useEffect(() => {
        ref.current.userData.placement = placement;
    }, [placement, ref]);

    useFrame(() => {
        if (ref.current?.userData.active !== active) {
            setActive(ref.current?.userData.active);
        }
    });

    return (
        <mesh ref={ref} castShadow receiveShadow>
            <boxGeometry args={[1,1,1]}/>
            <meshPhysicalMaterial />
        </mesh>
    )
});