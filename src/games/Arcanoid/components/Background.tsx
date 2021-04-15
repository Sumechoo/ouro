import { FC } from "react";
import { toRadians } from "../../../core/utils";

export const Background: FC = () => {
    return (
        <mesh
            receiveShadow
            position={[0,0,0]}
            rotation={[toRadians(-90),0,0]}
        >
            <planeGeometry args={[10,30,1]}/>
            <meshStandardMaterial color='white'/>
        </mesh>
    )
}