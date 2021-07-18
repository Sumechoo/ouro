import { Vector3 } from "@react-three/fiber";
import { FC } from "react";
import { useBox } from "../../../core/Ammo/hooks/useBox";
import { useDnD } from "../../../core/CrossDnd/hooks/useDnD";

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

    const [startDrag] = useDnD(ref);

    return (
        <mesh
            ref={ref}
            castShadow
            receiveShadow
            onPointerDown={startDrag}
        >
            <boxGeometry />
            <meshPhysicalMaterial color={mass > 0 ? 'red' : 'blue'} />

            {children}
        </mesh>
    )
}