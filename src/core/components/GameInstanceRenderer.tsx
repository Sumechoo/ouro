import { makeStyles } from "@material-ui/core";
import { Canvas } from "@react-three/fiber";
import { CSSProperties, FC, useEffect, useState } from "react";
import { globalConfig } from "../../globalConfig";
import { LevelEditorUI } from "../components/LevelEditor/LevelEditorUI";

import { Splash } from "../scenes/Splash";

import { GameInstance } from "../types";
import { useLevelEditor } from "./LevelEditor/useLevelEditor";

interface Props {
    instance: GameInstance;
}

const useStyles = makeStyles({
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
    },
    gameContainer: {
        position: 'relative',
        height: '100%'
    },
    gameUiContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }
});

const lockMouse = () => document.body.requestPointerLock();

export const GameInstanceRenderer: FC<Props> = ({instance}) => {
    const classes = useStyles();
    const [showSplash, setShowSplash] = useState(true);
    const {isEnabled} = useLevelEditor();
    
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
            <Canvas className={classes.absolutePositionStyle} shadows camera={{position: [10, 10, 10]}}>
                <Splash />
            </Canvas>
        )
    }

    return (
        <div className={classes.fullScreen}>
            <LevelEditorUI>
                <div className={classes.gameContainer}>
                    <Canvas
                        id="mainCanvas"
                        shadows
                        camera={{position: [0, 5, 9], fov: 100}}
                    >
                        {isEnabled && <ambientLight intensity={1} />}
                        <Game />
                    </Canvas>
                    <div className={classes.gameUiContainer}>
                        <Ui/>
                    </div>
                </div>
            </LevelEditorUI>
        </div>
    )
}
