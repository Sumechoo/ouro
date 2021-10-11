import { FC, Suspense, useContext, Fragment } from "react";

import { useCollision } from '../Ammo/hooks/useCollision';
import { ObjectProps } from "./LevelEditor/types";
import { ResourceContext } from "./ResourceContext";
import { useMemoizedGeometry } from "../hooks/useMemoizedGeometry";

const Model: FC<ObjectProps> = ({
    position = [0,0,0],
    rotation = [0,0,0],
    name,
    onEditorClick,
}) => {
    const geometryData = useMemoizedGeometry(name);
    const { materials, depthMaterial } = useContext(ResourceContext);

    const {ref} = useCollision({mass: 0, size: [1,1,1], position, rotation, geometryData});

    return (
        <Fragment>
            <mesh
                ref={ref}
                castShadow
                receiveShadow
                geometry={geometryData}
                onClick={onEditorClick}
                customDepthMaterial={depthMaterial}
                material={materials[0]}
            />
        </Fragment>
    )
};

export const ConcaveModel: FC<ObjectProps> = (props) => {
    return (
        <Suspense fallback={null}>
            <Model {...props} />
        </Suspense>
    )
}
