import { FC, Suspense, useContext } from "react";
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { BufferGeometry } from "three";

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

export const DecorationModel: FC<ObjectProps> = (props) => {
    return (
        <Suspense fallback={null}>
            <Model {...props} />
        </Suspense>
    )
}
