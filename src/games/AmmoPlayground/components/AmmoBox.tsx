import { FC } from "react";
import { useBox } from "../../../core/Ammo/hooks/useBox";
import { ObjectProps } from "../../../core/components/LevelEditor/LevelContainer";
import { useDnD } from "../../../core/CrossDnd/hooks/useDnD";

export const AmmoBox: FC<ObjectProps> = ({
    mass = 0,
    size = [1,1,1],
    position = [0,0,0],
    children,
    onEditorClick
}) => {
    const {ref} = useBox({mass, size, position});

    const [startDrag] = useDnD(ref);

    return (
        <mesh
            ref={ref}
            castShadow
            receiveShadow
            onPointerDown={startDrag}
            onClick={onEditorClick}
        >
            <boxGeometry />
            <meshPhysicalMaterial color={mass > 0 ? 'red' : 'blue'} />

            {children}
        </mesh>
    )
}