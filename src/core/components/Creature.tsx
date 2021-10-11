import { useLoader } from "@react-three/fiber";
import { FC, Suspense, useCallback } from "react";
import { DoubleSide, TextureLoader } from "three";

import { useCollision } from "../Ammo/hooks/useCollision";
import { IdManager } from "../classes/IdManager";
import { useCreatureProperties } from "../hooks/useCreatureProperties";
import { useGenetics } from "../hooks/useGenetics";
import { ObjectProps } from "./LevelEditor/types";
import { useLevelEditor } from "./LevelEditor/useLevelEditor";

const CreatureSuspended: FC<ObjectProps> = ({
    position = [0,0,0],
    placement,
}) => {
    const {ref, rb} = useCollision({mass: 1, position, size: [1,1,0.3], lockRotation: false});
    const textureUrl = `./assets/textures/walker.png`;
    const [ colorMap ] = useLoader(TextureLoader, [textureUrl]);
    const { deleteDynamic, addPlacement } = useLevelEditor();

    useGenetics(ref, placement, rb);

    const onKill = useCallback(() => {
        const currentPosition = ref.current.position;

        deleteDynamic(placement);
        addPlacement({
            id: IdManager.getNewId(),
            component: 'Pickable',
            props: {
                position: [currentPosition[0], currentPosition[1] + 1, currentPosition[2]],
            }
        })
    }, [deleteDynamic, addPlacement, ref, placement]);

    useCreatureProperties({ref, onKill});

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
