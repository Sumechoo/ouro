import { FC, Suspense } from "react";
import { useLoader, Vector3 } from "@react-three/fiber";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { TextureLoader } from "three/src/loaders/TextureLoader";
import * as THREE from 'three';
import { BufferGeometry } from "three";
import { useBox } from "../../../core/Ammo/hooks/useBox";

const url = require('../../../resources/models/sh1_building_12/mesh.obj');
const textureUrl = require('../../../resources/models/sh1_building_12/texture.png');

interface Props {
    position?: Vector3;
}

export const Model: FC<Props> = ({
    position = [0,0,0],
}) => {
    const object = useLoader(OBJLoader, url.default) as any;
    const geometry = object.children[0].geometry as BufferGeometry;
    const [ colorMap ] = useLoader(TextureLoader, [textureUrl.default]);

    const {ref} = useBox(0, [1,1,1], position, geometry);

    colorMap.magFilter = THREE.NearestFilter;

    return (
        <mesh
            ref={ref}
            castShadow
            receiveShadow
            geometry={geometry}
        >
            <meshPhysicalMaterial map={colorMap}/>
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
