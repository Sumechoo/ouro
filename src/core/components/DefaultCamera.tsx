import { Euler, useThree, Vector3 } from "@react-three/fiber";
import { FC, useEffect, useRef } from "react";
import { PerspectiveCamera } from "three";

interface Props {
    position?: Vector3;
    rotation?: Euler;
    onSetCameraRef?: (camera: PerspectiveCamera) => void;
}

export const DefaultCamera: FC<Props> = ({
    position = [0,0,0],
    rotation = [0,0,0],
    onSetCameraRef,
}) => {
    const { set } = useThree();
    const cameraRef = useRef<PerspectiveCamera | undefined>();

    useEffect(() => {
        if(!cameraRef.current) {
            return;
        }

        set({camera: cameraRef.current});

        onSetCameraRef && onSetCameraRef(cameraRef.current);

        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.matrixWorldNeedsUpdate = true;
    }, [cameraRef.current, set])

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
