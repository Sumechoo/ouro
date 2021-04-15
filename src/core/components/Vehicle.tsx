import { useBox, useCylinder, useHingeConstraint } from "@react-three/cannon";
import { FC, Fragment } from "react";

export const Vehicle: FC = () => {
    const [bodyRef] = useBox(() => ({args: [2,1,3], mass: 1}));
    const [wheelRef] = useCylinder(() => ({args: [1,1,1] as any, mass: 1, position: [0, 4, 0], type: 'Dynamic'}));

    useHingeConstraint(bodyRef, wheelRef, {collideConnected: true});

    return (
        <Fragment>
            <mesh ref={bodyRef} castShadow receiveShadow>
                <boxGeometry args={[2, 1, 3]}/>
            </mesh>
            <mesh castShadow receiveShadow ref={wheelRef}>
                <cylinderGeometry args={[1, 1, 1]}/>
            </mesh>
        </Fragment>
    )
}