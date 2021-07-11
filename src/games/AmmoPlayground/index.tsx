import { GameInstance } from "../../core/types";
import { AmmoPhysics } from "../../core/Ammo/AmmoPhysics";
import { FC } from "react";
import { useRigidbody } from "../../core/Ammo/hooks/useRigidbody";

const AmmoCube: FC = () => {
    const [ref] = useRigidbody();

    return (
        <mesh
            ref={ref}
        >
            <boxGeometry />
            <meshBasicMaterial color='red' />
        </mesh>
    )
}

export const AmmoPlayground: GameInstance = {
    Ui: () => null,
    Game: () => {
        return (
            <AmmoPhysics>
                <AmmoCube />
                <AmmoCube />
            </AmmoPhysics>
        )
    }
}