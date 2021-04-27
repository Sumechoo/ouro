import { Canvas } from "@react-three/fiber";
import { CSSProperties, FC, useEffect, useState } from "react";
import { Splash } from "../scenes/Splash";

import { GameInstance } from "../types";

interface Props {
    instance: GameInstance;
}

const styles = {
    previewContainer: {
        position: 'absolute',
        // width: 480,
        // height: 800,
        // left: 'calc(50% - 240px)',
        // top: 'calc(50% - 400px)',
        // border: 'solid black',
    } as CSSProperties,
    absolutePositionStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    } as CSSProperties,
}

export const GameInstanceRenderer: FC<Props> = ({instance}) => {
    const [showSplash, setShowSplash] = useState(true);
    
    const {
        Game,
        Ui,
    } = instance;

    useEffect(() => {setTimeout(() => setShowSplash(false), 2000)}, [])

    if (showSplash) {
        return (
            <Canvas style={styles.absolutePositionStyle} shadows camera={{position: [10, 10, 10]}}>
                <Splash />
            </Canvas>
        )
    }

    return (
        <div style={styles.absolutePositionStyle}>
            <Canvas style={styles.absolutePositionStyle} shadows camera={{position: [0, 8, 9]}}>
                <Game />
            </Canvas>
            <div style={{...styles.absolutePositionStyle, pointerEvents: 'none'}}>
                <Ui/>
            </div>
        </div>
    )
}
