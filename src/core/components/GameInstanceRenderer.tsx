import { Canvas } from "@react-three/fiber";
import { CSSProperties, FC, useEffect, useState } from "react";
import { globalConfig } from "../../globalConfig";
import { LevelEditorUI } from "../components/LevelEditor/LevelEditorUI";

import { Splash } from "../scenes/Splash";

import { GameInstance } from "../types";

interface Props {
    instance: GameInstance;
}

const styles: Record<string, CSSProperties> = {
    previewContainer: {
        position: 'absolute',
    },
    absolutePositionStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
}

const lockMouse = () => document.body.requestPointerLock();

export const GameInstanceRenderer: FC<Props> = ({instance}) => {
    const [showSplash, setShowSplash] = useState(true);
    
    const {
        Game,
        Ui,
    } = instance;

    useEffect(() => {setTimeout(() => setShowSplash(false), globalConfig.SHOW_SPLASH ? 2000 : 0)}, []);

    useEffect(() => {
        document.getElementById('mainCanvas')?.addEventListener('click', lockMouse);
    }, [])

    if (showSplash) {
        return (
            <Canvas style={styles.absolutePositionStyle} shadows camera={{position: [10, 10, 10]}}>
                <Splash />
            </Canvas>
        )
    }

    return (
        <div style={styles.fullScreen}>
            <LevelEditorUI>
                <Canvas
                    id="mainCanvas"
                    shadows
                    camera={{position: [0, 5, 9], fov: 100}}
                >
                    <Game />
                </Canvas>
                <Ui/>
            </LevelEditorUI>
        </div>
    )
}
