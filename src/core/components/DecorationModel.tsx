import { FC, Suspense } from "react";
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { BufferGeometry, DoubleSide, NearestFilter } from "three";

import { ObjectProps } from "./LevelEditor/types";

const Model: FC<ObjectProps> = ({
    position = [0,0,0],
    rotation = [0,0,0],
    name,
    onEditorClick,
}) => {
    const url = `./assets/models/${name}/mesh.obj`;
    const textureUrl = './assets/textures/texture.png';

    const object = useLoader(OBJLoader, url) as any;
    const geometryData = object.children[0].geometry as BufferGeometry;
    const [ colorMap ] = useLoader(TextureLoader, [textureUrl]);

    colorMap.magFilter = NearestFilter;

    return (
        <mesh
            position={position}
            rotation={rotation}
            castShadow
            receiveShadow
            geometry={geometryData}
            onClick={onEditorClick}
        >
            <meshPhysicalMaterial
                transparent
                map={colorMap}
                side={DoubleSide}
                alphaTest={0.5}
            />
        </mesh>
    )
};

export const DecorationModel: FC<ObjectProps> = (props) => {
    return (
        <Suspense fallback={null}>
            <Model {...props} />
        </Suspense>
    )
}
