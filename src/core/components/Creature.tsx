import { useLoader } from "@react-three/fiber";
import { FC, Suspense } from "react";
import { DoubleSide, TextureLoader } from "three";

import { useCollision } from "../Ammo/hooks/useCollision";
import { useGenetics } from "../hooks/useGenetics";
import { ObjectProps } from "./LevelEditor/types";

const CreatureSuspended: FC<ObjectProps> = ({
    position = [0,0,0],
    placement,
}) => {
    const {ref, rb} = useCollision({mass: 1, position, size: [1,1,0.3], lockRotation: false});
    const textureUrl = `./assets/textures/walker.png`;
    const [ colorMap ] = useLoader(TextureLoader, [textureUrl]);

    useGenetics(ref, placement, rb);

    return (
        <mesh
            ref={ref}
            receiveShadow
        >
            <planeBufferGeometry args={[1,1]} />
            <meshStandardMaterial
                transparent
                alphaTest={0.3}
                side={DoubleSide}
                map={colorMap}
            />
        </mesh>
    );
};

export const Creature: FC<ObjectProps> = (props) => {
    return (
        <Suspense fallback={null}>
            <CreatureSuspended {...props} />
        </Suspense>
    )
}
