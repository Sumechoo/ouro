import { Canvas } from "@react-three/fiber";
import { CSSProperties, FC } from "react";

import { GameInstance } from "../types";

interface Props {
    instance: GameInstance;
}

const styles = {
    previewContainer: {
        position: 'absolute',
        width: 480,
        height: 800,
        left: 'calc(50% - 240px)',
        top: 'calc(50% - 400px)',
        border: 'solid black',
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
    const {
        Game,
        Ui,
    } = instance;

    return (
        <div style={styles.previewContainer}>
            <Canvas style={styles.absolutePositionStyle} shadows camera={{position: [0, 8, 9]}}>
                <Game />
            </Canvas>
            <div style={{...styles.absolutePositionStyle, pointerEvents: 'none'}}>
                <Ui/>
            </div>
        </div>
    )
}
