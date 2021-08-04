import { GameInstance } from "../../core/types";
import { AmmoPhysics } from "../../core/Ammo/AmmoPhysics";
import { LevelContainer } from "../../core/components/LevelEditor/LevelContainer";

import { Player } from './components/Player';
import { useThree } from "@react-three/fiber";
import { FogExp2 } from "three";
import { useEffect } from "react";
import { useLevelEditor } from "../../core/components/LevelEditor/useLevelEditor";
import { HUD } from "./UI/HUD";

export const AmmoPlayground: GameInstance = {
    Ui: () => (
        <div>
            <HUD />
        </div>
    ),
    Game: () => {
        const {isEnabled, configs} = useLevelEditor();
        const scene = useThree(({scene}) => scene);

        useEffect(() => {
            scene.fog = new FogExp2('orange', 0.015);
        }, [scene]);

        return (
            <AmmoPhysics>
                <LevelContainer
                    configs={configs}
                />

                {!isEnabled && <Player />}
            </AmmoPhysics>
        )
    }
}