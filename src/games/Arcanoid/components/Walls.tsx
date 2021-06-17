import { useBox } from "@react-three/cannon";
import { Vector3 } from "@react-three/fiber";
import { FC, Fragment } from "react";
import { bounceMaterial } from "../constants";

interface WallProps {
    type: 'horizontal' | 'vertical';
    position: number[];
}

export const Wall: FC<WallProps> = ({type, position}) => {
    const wallArgs: Vector3 = type === 'horizontal' ? [20, 1, 2] : [2, 1, 20];

    const [ref] = useBox(() => ({
        type: 'Kinematic',
        args: wallArgs,
        material: bounceMaterial,
        position,
    }))

    return (
        <mesh
            ref={ref}
            castShadow
            receiveShadow
        >
            <boxGeometry args={wallArgs}/>
            <meshPhysicalMaterial color='white'/>
        </mesh>
    );
};

export const Walls: FC = () => {
    

    return (
        <Fragment>
            <Wall type='horizontal' position={[0,0,-9]} />

            <Wall type='vertical' position={[-5,0,0]} />
            <Wall type='vertical' position={[5,0,0]} />
        </Fragment>
    );
};
