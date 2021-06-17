import { FC } from "react";
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { TextureLoader } from "three/src/loaders/TextureLoader";
import * as THREE from 'three';
import { BufferGeometry } from "three";

const url = require('../../resources/models/sh1_building_12/mesh.obj');
const textureUrl = require('../../resources/models/sh1_building_12/texture.png');

interface Props {
}

export const Model: FC<Props> = () => {
    const object = useLoader(OBJLoader, url.default) as any;
    const geometry = object.children[0].geometry as BufferGeometry;
    const [ colorMap ] = useLoader(TextureLoader, [textureUrl.default]);

    console.info(object);

    colorMap.magFilter = THREE.NearestFilter;

    return (
        <mesh
            castShadow
            receiveShadow
            geometry={geometry}
            rotation={[0, Math.random() * 360, 0]}
            position={[Math.random() * 20, 0, Math.random() * 20]}
        >
            <meshPhysicalMaterial map={colorMap}/>
        </mesh>
    )
};
