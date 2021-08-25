import { GameInstance } from "../../core/types";
import { AmmoPhysics } from "../../core/Ammo/AmmoPhysics";
import { LevelContainer } from "../../core/components/LevelEditor/LevelContainer";

import { Player } from './components/Player';
import { HUD } from './UI/HUD';
import { useLevelEditor } from "../../core/components/LevelEditor/useLevelEditor";

export const AmmoPlayground: GameInstance = {
    Ui: () => (
        <div>
            <HUD />
        </div>
    ),
    Game: () => {
        const {isEnabled} = useLevelEditor();

        return (
            <AmmoPhysics>
                {/* <ambientLight intensity={0.2} color="white"/> */}
                <LevelContainer />

                {!isEnabled && <Player />}
            </AmmoPhysics>
        )
    }
}