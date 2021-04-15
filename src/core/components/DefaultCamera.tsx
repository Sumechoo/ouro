import { useThree, Vector3 } from "@react-three/fiber";
import { FC, useEffect, useRef } from "react";
import { PerspectiveCamera } from "three";

interface Props {
    position: Vector3;
}

export const DefaultCamera: FC<Props> = ({position}) => {
    const { set } = useThree();
    const cameraRef = useRef<PerspectiveCamera>();

    useEffect(() => {
        if(!cameraRef.current) {
            return;
        }

        set({camera: cameraRef.current});
    }, [cameraRef, set])

    return (
        <perspectiveCamera ref={cameraRef} position={position} aspect={16 / 9} />
    );
};
