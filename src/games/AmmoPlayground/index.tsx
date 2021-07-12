import { GameInstance } from "../../core/types";
import { AmmoPhysics } from "../../core/Ammo/AmmoPhysics";
import { AmmoBox } from './components/AmmoBox';

export const AmmoPlayground: GameInstance = {
    Ui: () => null,
    Game: () => {
        return (
            <AmmoPhysics>
                <AmmoBox size={[10, 0.1, 10]} />

                <AmmoBox mass={10} position={[0, 4, 0]} />
                <AmmoBox mass={10} position={[0.7, 6, 0]} />
            </AmmoPhysics>
        )
    }
}