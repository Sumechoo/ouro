import { FC } from "react";
import {usePlane} from '@react-three/cannon';

import { toRadians } from "../utils";

interface Props {
    onPress: VoidFunction;
}

export const SmallFloor: FC<Props> = ({onPress}) => {
    const [ref] = usePlane(() => ({args: [2, 2, 2], rotation: [toRadians(-90), 0, 0]}));

    return (
        <mesh receiveShadow onClick={onPress} ref={ref}>
            <planeGeometry args={[20,20,20]} />
            <meshStandardMaterial color='green'/>
        </mesh>
    );
}
