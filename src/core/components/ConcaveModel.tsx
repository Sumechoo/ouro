import { FC, Suspense } from "react";
import { Euler, useLoader, Vector3 } from "@react-three/fiber";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { TextureLoader } from "three/src/loaders/TextureLoader";
import * as THREE from 'three';
import { BufferGeometry } from "three";

import { useBox } from '../Ammo/hooks/useBox';

interface Props {
    name: string;

    position?: Vector3;
    rotation?: Euler;
}

export const Model: FC<Props> = ({
    position = [0,0,0],
    rotation = [0,0,0],
    name,
}) => {
    const url = `./assets/models/${name}/mesh.obj`;
    const textureUrl = `./assets/models/${name}/texture.png`;

    const object = useLoader(OBJLoader, url) as any;
    const geometryData = object.children[0].geometry as BufferGeometry;
    const [ colorMap ] = useLoader(TextureLoader, [textureUrl]);

    const {ref} = useBox({mass: 0, size: [1,1,1], position, rotation, geometryData});

    colorMap.magFilter = THREE.NearestFilter;

    return (
        <mesh
            ref={ref}
            castShadow
            receiveShadow
            geometry={geometryData}
        >
            <meshStandardMaterial transparent map={colorMap} roughnessMap={colorMap} />
        </mesh>
    )
};

export const ConcaveModel: FC<Props> = (props) => {
    return (
        <Suspense fallback={null}>
            <Model {...props} />
        </Suspense>
    )
}
