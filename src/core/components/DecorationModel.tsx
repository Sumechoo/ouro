import { FC, useContext, useEffect, useState } from "react";

import { ObjectProps } from "./LevelEditor/types";
import { ResourceContext } from "./ResourceContext";
import { useMemoizedGeometry } from "../hooks/useMemoizedGeometry";
import { InstanceMesh } from "./InstanceMesh";
import { InstancingContext } from "./InstacingConext";

export const DecorationModel: FC<ObjectProps> = ({
    position = [0,0,0],
    rotation = [0,0,0],
    name,
    onEditorClick,
}) => {
    const [index, setIndex] = useState<number | undefined>();
    const geometryData = useMemoizedGeometry(name);
    const { materials, depthMaterial } = useContext(ResourceContext);
    const {addInstance} = useContext(InstancingContext);

    useEffect(() => {
        if (name && index === undefined) {
            setIndex(addInstance(name, position));
        }
    }, [name, position, addInstance, index]);

    return null;

    return (
        <InstanceMesh
            positions={[position]}
            name={name ?? ''}
        />
    );

    return (
        <mesh
            position={position}
            rotation={rotation}
            castShadow
            receiveShadow
            geometry={geometryData}
            onClick={onEditorClick}
            customDepthMaterial={depthMaterial}
            material={materials[0]}
        />
    )
};
