import { GameInstance } from "../../core/types";
import { AmmoPhysics } from "../../core/Ammo/AmmoPhysics";
import { ConcaveModel } from "../../core/components/ConcaveModel";

import { AmmoBox } from './components/AmmoBox';
import { Player } from './components/Player';
import { useThree } from "@react-three/fiber";
import { FogExp2 } from "three";
import { useEffect } from "react";

export const AmmoPlayground: GameInstance = {
    Ui: () => null,
    Game: () => {
        const scene = useThree(({scene}) => scene);

        useEffect(() => {
            scene.fog = new FogExp2('lightblue', 0.02);
        }, [scene]);

        return (
            <AmmoPhysics>
                <directionalLight castShadow position={[10, 10, 10]} />
                <ambientLight intensity={1} color='lightblue' />

                <AmmoBox
                    mass={10}
                    position={[0, 5, 0]}
                />

                <Player />

                <ConcaveModel
                    name='sh1_building_13'
                    position={[0, 0, -12]}
                />
            </AmmoPhysics>
        )
    }
}