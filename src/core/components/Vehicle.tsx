import { useBox, usePointToPointConstraint, useSphere } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { FC, Fragment } from "react";
import { DefaultCamera } from "./DefaultCamera";

export const Vehicle: FC = () => {
    const [bodyRef] = useBox(() => ({args: [2,1,3], mass: 1}));
    const [frontLeftWheelRef] = useSphere(() => ({args: 1, mass: 0.2, position: [2,0,2], type: 'Dynamic'}));
    const [frontRightWheelRef] = useSphere(() => ({args: 1, mass: 0.2, position: [2,0,-2], type: 'Dynamic'}));
    const [backLeftWheelRef] = useSphere(() => ({args: 1, mass: 0.2, position: [0, 8, 0], type: 'Dynamic'}));
    const [backRightWheelRef] = useSphere(() => ({args: 1, mass: 0.2, position: [0, 8, 0], type: 'Dynamic', }));

    usePointToPointConstraint(bodyRef, frontLeftWheelRef, {pivotA: [2,0,2], pivotB: [0,0,0], collideConnected: false});
    usePointToPointConstraint(bodyRef, frontRightWheelRef, {pivotA: [2,0,-2], pivotB: [0,0,0], collideConnected: false});
    usePointToPointConstraint(bodyRef, backLeftWheelRef, {pivotA: [-2,0,-2], pivotB: [0,0,0], collideConnected: false});
    usePointToPointConstraint(bodyRef, backRightWheelRef, {pivotA: [-2,0,2], pivotB: [0,0,0], collideConnected: false});

    return (
        <Fragment>
            <mesh ref={bodyRef} castShadow receiveShadow>
                <boxGeometry args={[2, 1, 3]}/>
                <meshBasicMaterial color='lightcoral'/>
                <DefaultCamera position={[0, 3, 6]}/>

            </mesh>
            <mesh castShadow receiveShadow ref={frontLeftWheelRef}>
                <sphereGeometry args={[1, 10, 10]}/>
                <meshBasicMaterial color='gray'/>
            </mesh>
            <mesh castShadow receiveShadow ref={frontRightWheelRef}>
                <sphereGeometry args={[1, 10, 10]}/>
                <meshBasicMaterial color='gray'/>
            </mesh>
            <mesh castShadow receiveShadow ref={backLeftWheelRef}>
                <sphereGeometry args={[1, 10, 10]}/>
                <meshBasicMaterial color='gray'/>
            </mesh>
            <mesh castShadow receiveShadow ref={backRightWheelRef}>
                <sphereGeometry args={[1, 10, 10]}/>
                <meshBasicMaterial color='gray'/>
            </mesh>
        </Fragment>
    )
}