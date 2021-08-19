import { Euler, useThree, Vector3, Camera } from "@react-three/fiber";
import { FC, useEffect, useRef, useState } from "react";
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
    children,
}) => {
    const { set, camera } = useThree();
    const [prevCamera, setPrevCamera] = useState<Camera>();
    const cameraRef = useRef<PerspectiveCamera | undefined>();

    useEffect(() => {
        if(!cameraRef.current) {
            return;
        }

        const aspect = (camera as PerspectiveCamera).aspect;

        setPrevCamera(camera);

        set({camera: cameraRef.current});

        onSetCameraRef && onSetCameraRef(cameraRef.current);

        cameraRef.current.aspect = aspect;
        cameraRef.current.updateProjectionMatrix();

        return () => {
            if (prevCamera) {
                set({camera: prevCamera});
            }
        }
    }, [set, onSetCameraRef]);

    return (
        <perspectiveCamera
            ref={cameraRef}
            position={position}
            rotation={rotation}
            fov={90}
            aspect={window.innerWidth / window.innerHeight}
        >
            {children}
        </perspectiveCamera>
    );
};
