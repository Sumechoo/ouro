import { Euler, useThree, Vector3 } from "@react-three/fiber";
import { FC, MutableRefObject, useEffect, useRef } from "react";
import { PerspectiveCamera } from "three";

interface Props {
    position?: Vector3;
    rotation?: Euler;
    ref?: MutableRefObject<PerspectiveCamera | undefined>;
}

export const DefaultCamera: FC<Props> = ({
    position = [0,0,0],
    rotation = [0,0,0],
    ref,
}) => {
    const { set } = useThree();
    const cameraRef = useRef<PerspectiveCamera | undefined>(ref?.current);

    useEffect(() => {
        if(!cameraRef.current) {
            return;
        }

        set({camera: cameraRef.current});
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
    }, [cameraRef, set])

    return (
        <perspectiveCamera
            ref={cameraRef}
            position={position}
            rotation={rotation}
            fov={90}
            aspect={window.innerWidth / window.innerHeight}
        />
    );
};
