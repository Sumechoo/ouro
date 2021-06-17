import { CSSProperties, FC, useCallback } from "react";

import {arcanoidTheme, useArcanoidStore} from '../../index';

const styles = {
    buttons: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '30%',
    } as CSSProperties,
    button: {
        fontWeight: 'bold',
        fontSize: 25,
        border: 'none',
        margin: 10,
        padding: 10,
        pointerEvents: 'all',
    } as CSSProperties,
}

export const MainMenu: FC = () => {
    const setLevel = useArcanoidStore(({setLevel}) => setLevel);
    const startGame = useCallback(() => {
        setLevel(0);
    }, [setLevel]);

    return (
        <div>
            <p style={{
                ...arcanoidTheme.basicText,
                ...arcanoidTheme.titleBig,
            }}>{'<JustArcanoid />'}</p>
            <div style={styles.buttons}>
                <button
                    style={styles.button}
                    onClick={startGame}
                >
                    Start game
                </button>
                <button style={styles.button}>
                    Options
                </button>
            </div>

        </div>
    );
};
