import { useBox } from "@react-three/cannon";
import { useFrame, Vector3 } from "@react-three/fiber";
import { FC } from "react";
import { bounceMaterial } from "../constants";

const handleArgs: Vector3 = [3,0.2,0.3];

export const Handle: FC = () => {
    const [ref, api] = useBox(() => ({
        args: handleArgs,
        position: [0,0,6],
        type: 'Kinematic',
        material: bounceMaterial,
    }))

    useFrame((state) => {
        api.position.set(state.mouse.x * 5, 0, 6);
        api.rotation.set(0, state.mouse.x, 0);
    });

    return (
        <mesh
            ref={ref}
            castShadow
            receiveShadow
        >
            <boxGeometry args={handleArgs}/>
            <meshStandardMaterial color='gray' />
        </mesh>
    );
};
