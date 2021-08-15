import { useLoader } from "@react-three/fiber";
import { FC, Suspense } from "react";
import { DoubleSide, NearestFilter, TextureLoader } from "three";
import { useCollision } from "../Ammo/hooks/useCollision";
import { ObjectProps } from "./LevelEditor/types";

const CreatureSuspended: FC<ObjectProps> = ({
    position = [0,0,0],
}) => {
    const {ref} = useCollision({mass: 1, position, size: [2,2,0.2], lockRotation: true});
    const textureUrl = `./assets/textures/walker.png`;
    const [ colorMap ] = useLoader(TextureLoader, [textureUrl]);

    colorMap.magFilter = NearestFilter;

    return (
        <mesh
            ref={ref}
            receiveShadow
        >
            <planeBufferGeometry args={[1,1]} />
            <meshPhysicalMaterial
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
