import { useLoader } from "@react-three/fiber";
import { BufferGeometry } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

const cache: Record<string, BufferGeometry> = {};

export const useMemoizedGeometry = (name = '') : BufferGeometry | undefined => {
    const url = `./assets/models/${name}/mesh.obj`;
    const object = useLoader(OBJLoader, url) as any;
    const geometryData = object.children[0].geometry as BufferGeometry;

    cache[name] = geometryData;

    return cache[name];
}