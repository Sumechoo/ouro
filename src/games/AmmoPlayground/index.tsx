import { GameInstance } from "../../core/types";
import { AmmoPhysics } from "../../core/Ammo/AmmoPhysics";
import { LevelContainer } from "../../core/components/LevelEditor/LevelContainer";

import { Player } from './components/Player';
import { HUD } from './UI/HUD';
import { useLevelEditor } from "../../core/components/LevelEditor/useLevelEditor";
import { useThree } from "@react-three/fiber";
import { FogExp2 } from "three";
import { useEffect } from "react";

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
            scene.fog = new FogExp2('gray', 0.01);
        }, [scene]);

        return (
            <AmmoPhysics>
                <ambientLight intensity={.4} color="white"/>
                <directionalLight color="orange" intensity={1} position={[1, 3, 3]}/>
                <LevelContainer />

                {!isEnabled && <Player />}
            </AmmoPhysics>
        )
    }
}