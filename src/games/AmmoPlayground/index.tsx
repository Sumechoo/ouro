import { GameInstance } from "../../core/types";
import { AmmoPhysics } from "../../core/Ammo/AmmoPhysics";

import { ConcaveModel } from './components/ConcaveModel';
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
            scene.fog = new FogExp2('lightgray', 0.06);
        }, [scene]);

        return (
            <AmmoPhysics>
                <directionalLight />
                <ambientLight />

                <AmmoBox size={[20, 1, 20]} />

                <AmmoBox
                    mass={10}
                    position={[0, 5, 0]}
                />
                <AmmoBox
                    mass={10}
                    position={[0, 6, 0]}
                />

                <AmmoBox
                    mass={10}
                    position={[0, 7, 0]}
                />

                <Player />

                <ConcaveModel
                    position={[0, 0, -4]}
                />
                <ConcaveModel
                    position={[-16, 0, -4]}
                />
            </AmmoPhysics>
        )
    }
}