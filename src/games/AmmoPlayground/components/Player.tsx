import { FC, useEffect, useMemo, useRef } from "react";
import { PerspectiveCamera } from "three";
import { animated, useSpring, config } from '@react-spring/three';

import { useCollision } from "../../../core/Ammo/hooks/useCollision";
import { DefaultCamera } from "../../../core/components/DefaultCamera";
import { useLevelEditor } from "../../../core/components/LevelEditor/useLevelEditor";
import { useAxesState } from "../../../core/hooks/useAxesState";
import { KeyboardAddon, useKeyboardControls } from "../../../core/hooks/useKeyboardControls";
import { useMouseControls } from "../../../core/hooks/useMouseControls";
import { useRaycaster, useRaycasterState } from "../../../core/hooks/useRaycaster";
import { useInventoryState } from "../hooks/useInventoryState";
import { isCreatureUserData, useCreatureProperties } from "../../../core/hooks/useCreatureProperties";
import { isPlacementItem } from "../../../core/components/LevelEditor/guards";
import { addTupleVectors, getWorldDirection, multiplyTupleByScalar } from "../../../core/utils";

export const Player: FC = () => {
    const {ref, rb} = useCollision({mass: 1, size: [0.5,0.5,0.5], position: [1, 1, 1], lockRotation: true});
    const cameraRef = useRef<PerspectiveCamera>();
    const {addItem, removeItem, items, index, setActiveIndex} = useInventoryState();
    const {setActiveObject} = useRaycasterState();
    const {activeObject} = useRaycaster(cameraRef);
    const levelEditorApi = useLevelEditor();
    const {deleteDynamic, addPlacement, setPlayer} = levelEditorApi;
    const {touches} = useAxesState();
    const rightTouches = useMemo(() => touches.filter((item) => item.side === 'right'), [touches]);
    const leftTouches = useMemo(() => touches.filter((item) => item.side === 'left'), [touches]);

    useCreatureProperties({ref});

    useEffect(() => {
        setActiveObject(activeObject);
    }, [activeObject, setActiveObject])

    const shadowRef = useRef<any>();
    useEffect(() => {
        if (shadowRef.current) {
            shadowRef.current.shadow.mapSize.width = 2048;
            shadowRef.current.shadow.mapSize.height = 2048;
        }

        setPlayer(ref.current);

        return () => {
            setPlayer(undefined);
        }
    }, [ref, setPlayer]);

    const damageAddon = useMemo<KeyboardAddon[]>(() => [{
        key: 'k',
        action: () => {
            const activeObjectUserData = activeObject?.userData;

            if (isCreatureUserData(activeObjectUserData)) {
                const {applyDamage} = activeObjectUserData;

                applyDamage(200);
            }
        },
    }], [activeObject]);
    
    const inventoryAddon: KeyboardAddon[] = useMemo(() => [{
        key: 'e',
        action: () => {
            const {placement, action} = activeObject?.userData ?? {};

            if (action) {
                action();
            }

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
                const direction = cameraRef.current && getWorldDirection(cameraRef.current);

                if (isPlacementItem(pickedItem)) {
                    addPlacement(pickedItem, position);
                    removeItem(pickedItem);
                } else {
                    pickedItem.primaryAction(
                        levelEditorApi,
                        addTupleVectors(position, [0, 1, 0]),
                        direction ? multiplyTupleByScalar(direction.toArray(), 10) : [0,0,0],
                    );
                }
            }
        },
    }, {
        key: '=',
        action: () => setActiveIndex(index + 1),
    }, {
        key: '-',
        action: () => setActiveIndex(index - 1),
    }], [activeObject?.userData, cameraRef, addItem, addPlacement, deleteDynamic, index, items, levelEditorApi, ref, removeItem, setActiveIndex]);

    const {charging} = useMouseControls(rb, cameraRef, rightTouches[0]);
    const {
        crouch,
        walk,
    } = useKeyboardControls(ref, rb, leftTouches[0], [...inventoryAddon, ...damageAddon]);

    const { scale } = useSpring({
        scale: crouch ? 0.2 : 0.4,
        config: config.wobbly,
    });
    const { handx, handy } = useSpring({
        from: {handy: -0.4, handx: 0.3},
        config: {duration: 500},
        pause: !walk,
        reset: walk,
        loop: { reverse: true },
        to: {handy: -0.5, handx: 0.5}
    });
    const { chargingTransform, chargingRotation } = useSpring({
        chargingTransform: charging ? -0.1 : -0.5,
        chargingRotation: charging ? 0.4 : -0.4,
        reverse: charging,
        config: charging ? config.slow : config.stiff,
        onRest: () => {
            if (!charging) {
                const activeObjectUserData = activeObject?.userData;
    
                if (isCreatureUserData(activeObjectUserData)) {
                    const {applyDamage} = activeObjectUserData;
    
                    applyDamage(200);
                }
            }
        }
    });

    return (
        <animated.mesh ref={ref} scale={scale} >
            <DefaultCamera
                onSetCameraRef={(camera) => cameraRef.current = camera}
                position={[0, 2, 0]}
                rotation={[0, 0, 0]}
            >
                <animated.mesh
                    position={[0.4, -0.4, -0.5]}
                    position-x={handx}
                    position-y={handy}
                    position-z={chargingTransform}
                    rotation-x={chargingRotation}
                >
                    <boxBufferGeometry args={[0.2,0.2,0.5]}/>
                    <meshPhysicalMaterial />
                </animated.mesh>
            </DefaultCamera>
            
        </animated.mesh>
    );
}