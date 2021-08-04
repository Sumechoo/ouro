import { FC, useMemo, useRef } from "react";
import { PerspectiveCamera } from "three";

import { useBox } from "../../../core/Ammo/hooks/useBox";
import { DefaultCamera } from "../../../core/components/DefaultCamera";

import { KeyboardAddon, useKeyboardControls } from "../../../core/hooks/useKeyboardControls";
import { useMouseControls } from "../../../core/hooks/useMouseControls";
import { useRaycaster, useRaycasterState } from "../../../core/hooks/useRaycaster";

export const Player: FC = () => {
    const {ref, rb} = useBox({mass: 1, size: [0.5,0.5,0.5], position: [1, 1, 1]});
    const cameraRef = useRef<PerspectiveCamera>();
    const {activeObject} = useRaycasterState();

    const inventoryAddon: KeyboardAddon = useMemo(() => ({
        key: 'e',
        action: () => console.info(activeObject),
    }), [activeObject]);

    useMouseControls(rb, cameraRef);
    useKeyboardControls(ref, rb, [inventoryAddon]);
    useRaycaster(cameraRef);

    return (
        <mesh ref={ref} >
            <DefaultCamera
                onSetCameraRef={(camera) => cameraRef.current = camera}
                position={[0, 2, 0]}
                rotation={[0, 0, 0]}
            />
            <pointLight position={[0, 2, 0]} intensity={0.5} color='orange' distance={15} />
        </mesh>
    );
}