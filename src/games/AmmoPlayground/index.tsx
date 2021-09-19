import { GameInstance } from "../../core/types";
import { AmmoPhysics } from "../../core/Ammo/AmmoPhysics";
import { LevelContainer } from "../../core/components/LevelEditor/LevelContainer";

import { Player } from './components/Player';
import { HUD } from './UI/HUD';
import { useLevelEditor } from "../../core/components/LevelEditor/useLevelEditor";
import { PlayerAwareLight } from "./components/PlayerAwareLight";
import { useThree } from "@react-three/fiber";
import { FogExp2 } from "three";
import {useEffect} from 'react';

export const AmmoPlayground: GameInstance = {
    Ui: () => (
        <div>
            <HUD />
        </div>
    ),
    Game: () => {
        const {isEnabled} = useLevelEditor();
        const scene = useThree(({scene}) => scene);

        useEffect(() => {
            if(!scene.fog) {
                scene.fog = new FogExp2('lightblue', 0.03);
            }
        }, [scene]);

        return (
            <AmmoPhysics>
                <ambientLight intensity={.1} color="lightblue"/>
                {/* <PlayerAwareLight /> */}

                <LevelContainer />

                {!isEnabled && <Player />}
            </AmmoPhysics>
        )
    }
}