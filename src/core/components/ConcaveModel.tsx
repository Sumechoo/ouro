import { FC, Suspense } from "react";
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { BufferGeometry, DoubleSide, NearestFilter } from "three";

import { useCollision } from '../Ammo/hooks/useCollision';
import { ObjectProps } from "./LevelEditor/types";

export const Model: FC<ObjectProps> = ({
    position = [0,0,0],
    rotation = [0,0,0],
    name,
    onEditorClick,
}) => {
    const url = `./assets/models/${name}/mesh.obj`;
    const textureUrl = `./assets/models/${name}/texture.png`;

    const object = useLoader(OBJLoader, url) as any;
    const geometryData = object.children[0].geometry as BufferGeometry;
    const [ colorMap ] = useLoader(TextureLoader, [textureUrl]);

    const {ref} = useCollision({mass: 0, size: [1,1,1], position, rotation, geometryData});

    colorMap.magFilter = NearestFilter;

    return (
        <mesh
            ref={ref}
            castShadow
            receiveShadow
            geometry={geometryData}
            onClick={onEditorClick}
        >
            <meshPhysicalMaterial
                transparent
                map={colorMap}
                roughnessMap={colorMap}
                side={DoubleSide}
            />
        </mesh>
    )
};

export const ConcaveModel: FC<ObjectProps> = (props) => {
    return (
        <Suspense fallback={null}>
            <Model {...props} />
        </Suspense>
    )
}
