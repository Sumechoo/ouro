import { useBox } from "@react-three/cannon";
import { FC, Fragment } from "react";
import { useKeyboardControls } from "../hooks/useKeyboardControls";
import { DefaultCamera } from "./DefaultCamera";

export const ThirdPersonController: FC = () => {
    const [ref, api] = useBox(() => ({args: [1,1,1], position: [0, 4, 0], mass: 1, fixedRotation: true}))
    
    useKeyboardControls(api, ref);

    return (
        <Fragment>
            <mesh castShadow receiveShadow ref={ref}>
                <boxGeometry args={[1,1,1]} />
                <meshStandardMaterial color='lightcoral' />
                
                <DefaultCamera position={[0,1,4]}/>
            </mesh>
        </Fragment>
    )
}