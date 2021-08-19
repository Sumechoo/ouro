import { FC } from "react";
import { useCollision } from "../Ammo/hooks/useCollision";
import { ObjectProps } from "./LevelEditor/types";

export const Trigger: FC<ObjectProps> = ({
    position = [0,0,0],
    size = [1, 1, 1],
}) => {
    const {ref} = useCollision({
        mass: 0,
        position,
        size,
        isTrigger: true,
    });

    return (
        <mesh ref={ref}>
            <boxBufferGeometry />
            <meshBasicMaterial transparent opacity={0.5} color='green' />
        </mesh>
    )
}