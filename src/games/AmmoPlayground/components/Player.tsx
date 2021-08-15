import { FC, useEffect, useMemo, useRef } from "react";
import { PerspectiveCamera } from "three";

import { useCollision } from "../../../core/Ammo/hooks/useCollision";
import { DefaultCamera } from "../../../core/components/DefaultCamera";
import { useLevelEditor } from "../../../core/components/LevelEditor/useLevelEditor";
import { KeyboardAddon, useKeyboardControls } from "../../../core/hooks/useKeyboardControls";
import { useMouseControls } from "../../../core/hooks/useMouseControls";
import { useRaycaster, useRaycasterState } from "../../../core/hooks/useRaycaster";
import { useInventoryState } from "../hooks/useInventoryState";

export const Player: FC = () => {
    const {ref, rb} = useCollision({mass: 1, size: [0.5,0.5,0.5], position: [1, 1, 1], lockRotation: true});
    const cameraRef = useRef<PerspectiveCamera>();
    const {addItem, removeItem, items} = useInventoryState();

    const {activeObject} = useRaycasterState();
    const {deleteDynamic, addPlacement} = useLevelEditor();

    const shadowRef = useRef<any>();
    useEffect(() => {
        if (shadowRef.current) {
            shadowRef.current.shadow.radius = 128;
            shadowRef.current.shadow.mapSize.width = 2048;
            shadowRef.current.shadow.mapSize.height = 2048;
        }
    }, []);

    const inventoryAddon: KeyboardAddon[] = useMemo(() => [{
        key: 'e',
        action: () => {
            const placement = activeObject?.userData.placement;

            if (items.length < 2 && placement) {
                deleteDynamic(placement);
                addItem(placement);
            }
        }
    }, {
        key: 'q',
        action: () => {
            if (items.length) {
                const pickedItem = items[0];
                const position = ref.current.position.toArray();

                addPlacement({...pickedItem, props: {...pickedItem.props, position}});
                removeItem(pickedItem);
            }
        }
    }], [activeObject?.userData.placement, addItem, addPlacement, deleteDynamic, items, ref, removeItem]);

    useMouseControls(rb, cameraRef);
    useKeyboardControls(ref, rb, inventoryAddon);
    useRaycaster(cameraRef);

    return (
        <mesh ref={ref} >
            <DefaultCamera
                onSetCameraRef={(camera) => cameraRef.current = camera}
                position={[0, 2, 0]}
                rotation={[0, 0, 0]}
            />
            <pointLight ref={shadowRef} castShadow position={[-1, 1, 0]} color='orange' intensity={0.5} distance={15}/>
        </mesh>
    );
}