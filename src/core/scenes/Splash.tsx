import { FC, Fragment, useRef } from "react";
import { Object3D } from "three";

export const Splash: FC = () => {
    const ref = useRef<Object3D>();

    return (
        <Fragment>
            <mesh ref={ref} >
                <boxGeometry args={[3,3,3]} />
                <meshLambertMaterial color='white'/>
            </mesh>
            <directionalLight color='red' intensity={3}/>
            <directionalLight color='yellow' intensity={2} position={[0, 0, 10]}/>
            <directionalLight color='lightblue' intensity={1} position={[10, 0, 0]}/>
        </Fragment>
    );
};
