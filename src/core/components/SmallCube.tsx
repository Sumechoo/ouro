import { FC, useCallback } from "react";
import { useBox } from '@react-three/cannon';

interface Props {
    id: number;
    onDelete: (id: number) => void;
}

export const SmallCube: FC<Props> = ({id, onDelete}) => {
    const [ref] = useBox(() => ({args: [2, 2, 2], position: [0, 10, 0], mass: 1}));

    const handleDelete = useCallback(() => {
        onDelete(id);
    }, [id, onDelete])

    return (
        <mesh receiveShadow castShadow onClick={handleDelete} ref={ref}>
            <boxBufferGeometry args={[2,2,2]} />
            <meshStandardMaterial color='orange' />
        </mesh>
    )
}