import { GameInstance } from "../../core/types";
import { AmmoPhysics } from "../../core/Ammo/AmmoPhysics";
import { LevelContainer } from "../../core/components/LevelEditor/LevelContainer";

import { Player } from './components/Player';
import { useThree } from "@react-three/fiber";
import { FogExp2 } from "three";
import { useEffect } from "react";
import { useLevelEditor } from "../../core/components/LevelEditor/useLevelEditor";

export const AmmoPlayground: GameInstance = {
    Ui: () => null,
    Game: () => {
        const {isEnabled, configs} = useLevelEditor();
        const scene = useThree(({scene}) => scene);

        useEffect(() => {
            scene.fog = new FogExp2('lightblue', 0.02);
        }, [scene]);

        return (
            <AmmoPhysics>
                <directionalLight castShadow position={[10, 10, 10]} />
                <ambientLight intensity={1} color='lightblue' />

                <LevelContainer
                    configs={configs}
                />

                {!isEnabled && <Player />}
            </AmmoPhysics>
        )
    }
}