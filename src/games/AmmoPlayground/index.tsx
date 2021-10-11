import { GameInstance } from "../../core/types";
import { AmmoPhysics } from "../../core/Ammo/AmmoPhysics";
import { LevelContainer } from "../../core/components/LevelEditor/LevelContainer";

import { HUD } from './UI/HUD';
import { PlayerAwareLight } from "./components/PlayerAwareLight";
import { useThree } from "@react-three/fiber";
import { FogExp2 } from "three";
import { useEffect } from 'react';

export const AmmoPlayground: GameInstance = {
    Ui: () => (
        <div>
            <HUD />
        </div>
    ),
    Game: () => {
        const scene = useThree(({scene}) => scene);

        useEffect(() => {
            if(!scene.fog) {
                scene.fog = new FogExp2(0xFED8E6, 0.01);
            }
        }, [scene]);

        return (
            <AmmoPhysics>
                <ambientLight intensity={.08} color={0xADD8E6}/>
                <PlayerAwareLight />

                <LevelContainer />
            </AmmoPhysics>
        )
    }
}