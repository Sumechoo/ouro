import { FC, useCallback, useState } from "react";
import { useBox } from '@react-three/cannon';
import { ThreeEvent } from "@react-three/fiber/dist/declarations/src/core/events";

interface Props {
    id: number;
    onDelete: (id: number) => void;
}

export const SmallCube: FC<Props> = ({id, onDelete}) => {
    const [hovered, setHovered] = useState(false);
    const scale = hovered ? 1.2 : 1;
    const color = hovered ? 'orange' : 'lightblue';
    const [ref] = useBox(() => ({args: [2, 2, 2], position: [0, 10, 0], mass: 1}));

    const handleDelete = useCallback((e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();

        onDelete(id);
    }, [id, onDelete])

    return (
        <mesh
            receiveShadow
            castShadow
            onClick={handleDelete}
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
            ref={ref}
            scale={[scale, scale, scale]}
        >
            <boxBufferGeometry args={[2,2,2]} />
            <meshStandardMaterial color={color} />
        </mesh>
    )
}