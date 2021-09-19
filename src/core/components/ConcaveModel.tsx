import { FC, Suspense, useContext } from "react";
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { BufferGeometry } from "three";

import { useCollision } from '../Ammo/hooks/useCollision';
import { ObjectProps } from "./LevelEditor/types";
import { ResourceContext } from "./ResourceContext";

const Model: FC<ObjectProps> = ({
    position = [0,0,0],
    rotation = [0,0,0],
    name,
    onEditorClick,
}) => {
    const url = `./assets/models/${name}/mesh.obj`;
    const object = useLoader(OBJLoader, url) as any;
    const geometryData = object.children[0].geometry as BufferGeometry;
    const { materials, depthMaterial } = useContext(ResourceContext);

    const {ref} = useCollision({mass: 0, size: [1,1,1], position, rotation, geometryData});

    return (
        <mesh
            ref={ref}
            castShadow
            receiveShadow
            geometry={geometryData}
            onClick={onEditorClick}
            customDepthMaterial={depthMaterial}
            material={materials[0]}
        />
    )
};

export const ConcaveModel: FC<ObjectProps> = (props) => {
    return (
        <Suspense fallback={null}>
            <Model {...props} />
        </Suspense>
    )
}
