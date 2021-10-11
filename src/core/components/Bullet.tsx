import { FC, useEffect } from "react";

import { ObjectProps } from './LevelEditor/types';
import { useCollision } from '../Ammo/hooks/useCollision';
import { AmmoProvider } from '../Ammo/AmmoProvider';
import { useLevelEditor } from "./LevelEditor/useLevelEditor";

export const Bullet: FC<ObjectProps> = ({
    position = [0,1,0],
    placement,
    direction = [0, 0, 0]
}) => {
    const {deleteDynamic} = useLevelEditor();
    const {ref, rb} = useCollision({
        mass: 0.1,
        size: [0.2, 0.2, 0.2],
        position,
        lockRotation: true,
    });

    useEffect(() => {
        const api = AmmoProvider.getApiSync();

        rb?.setLinearVelocity(new api.btVector3(...direction));
    }, [direction, rb]);

    useEffect(() => {
        const timer = setTimeout(() => {
            deleteDynamic(placement);
        }, 3000);

        return () => {
            clearTimeout(timer);
        }
    }, [deleteDynamic, placement]);
    
    return (
        <mesh ref={ref} castShadow receiveShadow>
            <boxBufferGeometry />
            <meshPhysicalMaterial />
        </mesh>
    );
};