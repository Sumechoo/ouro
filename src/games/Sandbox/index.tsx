import { Physics } from "@react-three/cannon";
import { FC, useCallback, useEffect, useState } from "react";
import { SmallFloor } from "../../core/components/SmallFloor";
import { ThirdPersonController } from "../../core/components/ThirdPersonController";
import { GameInstance } from "../../core/types";
import { Model } from "../../core/components/Model";
import { useThree } from "@react-three/fiber";
import { FogExp2 } from "three";

const Game: FC = () => {
    const [cubes, setCubes] = useState([1]);
    const scene = useThree(({scene}) => scene);

    const handleAddCubes = useCallback(() => {
        setCubes([...cubes, Date.now()]);
    }, [cubes]);

    useEffect(() => {
        scene.fog = new FogExp2('lightgray', 0.06);
    }, [scene]);

    return (
        <Physics>
            <ambientLight intensity={0.2}/>
            <directionalLight intensity={1} castShadow />

            <ThirdPersonController />
            {[1,1,1,1].map(() => <Model key={Math.random()} />)}
            <SmallFloor onPress={handleAddCubes} />
        </Physics>
    );
};

export const Sandbox: GameInstance = {
    Game, 
    Ui: () => null,
}