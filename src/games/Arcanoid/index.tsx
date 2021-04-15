import { CSSProperties, FC, Fragment } from "react";
import create from 'zustand';

import { GameInstance } from "../../core/types";
import { Bricks } from './components/Bricks';
import { ArcanoidLevels } from "./levels";
import { Handle } from "./components/Handle";
import { Background } from "./components/Background";
import { Ball } from "./components/Ball";
import { Walls } from "./components/Walls";
import Effects from "./Effects";
import { MainMenu } from "./components/UI/MainMenu";
import { Physics } from "@react-three/cannon";
import { Splash } from "../../core/scenes/Splash";

export const arcanoidTheme = {
    basicText: {
        fontFamily: 'Rockwell',
        color: 'white',
        backgroundColor: '#F76242',
        padding: 10,
    } as CSSProperties,
    titleBig: {
        fontWeight: 'bold',
        fontSize: 48,
    } as CSSProperties,
}

type ArcanoidStore = {
    scores: number;
    currentLevel: number;

    incrementScores: VoidFunction;
    setLevel: (index: number) => void;
}

export const useArcanoidStore = create<ArcanoidStore>((set) => ({
    scores: 0,
    currentLevel: -1,
    incrementScores: () => set((state) => ({scores: state.scores + 1})),
    setLevel: (index: number) => set(() => ({currentLevel: index})),
}));

const ArcanoidGame: FC = () => {
    const currentLevel = useArcanoidStore(({currentLevel}) => currentLevel);

    if(currentLevel === -1) {
        return null;
    }

    return (
        <Fragment>
            <Physics
                gravity={[0,0,0]}
                tolerance={0}
                allowSleep
                size={100}
                iterations={1}
            >
                {/* <Effects /> */}
                <ambientLight intensity={0.5} />
                <directionalLight castShadow position={[5, 2, 5]} intensity={1}/>

                <Bricks key={currentLevel} level={ArcanoidLevels[currentLevel]} />
                <Handle />
                <Ball />
                <Walls />
                <Background />
                {/* <Splash /> */}
            </Physics>
        </Fragment>
    );
};

const ArcanoidUI: FC = () => {
    const {scores, currentLevel} = useArcanoidStore();

    return (
        <div style={{margin: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            {currentLevel === -1 && <MainMenu />}
            <p style={arcanoidTheme.basicText}>Score: {scores}</p>
        </div>
    );
};

export const Arcanoid: GameInstance = {
    Ui: ArcanoidUI,
    Game: ArcanoidGame,
}
