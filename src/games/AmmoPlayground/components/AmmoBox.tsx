import { Vector3 } from "@react-three/fiber";
import { FC } from "react";
import { useBox } from "../../../core/Ammo/hooks/useBox";

interface Props {
    mass?: number;
    size?: Vector3;
    position?: Vector3;
}

export const AmmoBox: FC<Props> = ({
    mass = 0,
    size = [1,1,1],
    position = [0,0,0],
    children
}) => {
    const {ref} = useBox({mass, size, position});

    return (
        <mesh ref={ref} castShadow receiveShadow>
            <boxGeometry />
            <meshPhysicalMaterial color={mass > 0 ? 'red' : 'blue'} />

            {children}
        </mesh>
    )
}