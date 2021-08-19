import { FC, useEffect, useMemo, useRef } from "react";
import { Object3D, PerspectiveCamera } from "three";

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
    const handRef = useRef<Object3D>();
    const {addItem, removeItem, items, index, setActiveIndex} = useInventoryState();

    const {setActiveObject} = useRaycasterState();
    const {activeObject} = useRaycaster(cameraRef);
    const {deleteDynamic, addPlacement, setPlayer} = useLevelEditor();

    useEffect(() => {
        setActiveObject(activeObject);
    }, [activeObject, setActiveObject])

    const shadowRef = useRef<any>();
    useEffect(() => {
        if (shadowRef.current) {
            shadowRef.current.shadow.radius = 64;
            shadowRef.current.shadow.mapSize.width = 2048;
            shadowRef.current.shadow.mapSize.height = 2048;
        }

        setPlayer(ref.current);

        return () => {
            setPlayer(undefined);
        }
    }, [ref, setPlayer]);

    const inventoryAddon: KeyboardAddon[] = useMemo(() => [{
        key: 'e',
        action: () => {
            const placement = activeObject?.userData.placement;

            if (placement) {
                deleteDynamic(placement);
                addItem(placement);
            }
        }
    }, {
        key: 'q',
        action: () => {
            if (items.length) {
                const pickedItem = items[index];
                const position = ref.current.position.toArray();

                addPlacement({...pickedItem, props: {...pickedItem.props, position}});
                // removeItem(pickedItem);
            }
        },
    }, {
        key: '=',
        action: () => setActiveIndex(index + 1),
    }, {
        key: '-',
        action: () => setActiveIndex(index - 1),
    }], [activeObject?.userData.placement, addItem, addPlacement, deleteDynamic, index, items, ref, setActiveIndex]);

    useMouseControls(rb, cameraRef, handRef);
    useKeyboardControls(ref, rb, inventoryAddon);

    return (
        <mesh ref={ref} >
            <DefaultCamera
                onSetCameraRef={(camera) => cameraRef.current = camera}
                position={[0, 2, 0]}
                rotation={[0, 0, 0]}
            >
                <mesh
                    position={[0.4, -0.4, -0.5]}
                    ref={handRef}
                >
                    <boxBufferGeometry args={[0.2,0.2,0.5]}/>
                    <meshPhysicalMaterial />

                    <pointLight
                        ref={shadowRef}
                        castShadow={false}
                        position={[0, 0, -0.3]}
                        color='orange'
                        intensity={1}
                        distance={8}
                    />
                </mesh>
            </DefaultCamera>
            
        </mesh>
    );
}