import { Physics, useBox } from "@react-three/cannon";
import { Vector3 } from "@react-three/fiber";
import { FC } from "react";
import { toRadians } from "../utils";

interface CubeProps {
    position: Vector3;
}

const SplashCube: FC<CubeProps> = ({position}) => {
    const [ref] = useBox(() => ({
        args: [1,1,1],
        position: position as any,
        mass: 1,
    }))
    
    return (
        <mesh ref={ref}>
            <boxGeometry args={[1,1,1]} />
            <meshLambertMaterial color='white'/>
        </mesh>
    )
}

const CrusherCube: FC = () => {
    const [ref] = useBox(() => ({
        args: [6,6,6],
        position: [0,-10,0],
        rotation: [0,toRadians(45),toRadians(45)],
    }))

    return (
        <mesh ref={ref}>
            <boxGeometry args={[6,6,6]} />
            <meshLambertMaterial color='white'/>
        </mesh>
    )
}

export const Splash: FC = () => {
    return (
        <Physics>
            <CrusherCube />

            <SplashCube position={[0,0,-2]} />
            <SplashCube position={[1,0,-2]} />
            <SplashCube position={[2,0,-2]} />
            <SplashCube position={[0,0,-1]} />
            <SplashCube position={[2,0,-1]} />
            <SplashCube position={[2,0,0]} />
            <SplashCube position={[1,0,0]} />
            <SplashCube position={[0,0,0]} />
            <SplashCube position={[3,0,0]} />

            <directionalLight color='red' intensity={3}/>
            <directionalLight color='yellow' intensity={2} position={[0, 0, 10]}/>
            <directionalLight color='lightblue' intensity={1} position={[10, 0, 0]}/>
        </Physics>
    );
};
