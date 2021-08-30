import { makeStyles } from "@material-ui/core";
import { Canvas } from "@react-three/fiber";
import { FC, useEffect } from "react";
import { GLOBAL_CONFIG } from "../../globalConfig";
import { LevelEditorUI } from "../components/LevelEditor/LevelEditorUI";

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
    const {isEnabled} = useLevelEditor();
    
    const {
        Game,
        Ui,
    } = instance;

    useEffect(() => {
        if (GLOBAL_CONFIG.IS_PROD) {
            document.addEventListener('click', lockMouse);
        }
    }, [])

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
