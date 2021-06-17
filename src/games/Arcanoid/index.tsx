import { CSSProperties, FC, Fragment, useEffect } from "react";
import create from 'zustand';

import { GameInstance } from "../../core/types";
import { Bricks } from './components/Bricks';
import { ArcanoidLevels } from "./levels";
import { Handle } from "./components/Handle";
import { Background } from "./components/Background";
import { Ball } from "./components/Ball";
import { Walls } from "./components/Walls";
import { MainMenu } from "./components/UI/MainMenu";
import { Physics } from "@react-three/cannon";
import { useThree } from "@react-three/fiber";
import { FogExp2 } from "three";

export const arcanoidTheme = {
    basicText: {
        fontFamily: 'Skia',
        color: 'white',
        backgroundColor: '#F76242',
        padding: 10,
    } as CSSProperties,
    titleBig: {
        fontWeight: 'bold',
        fontSize: '5vh',
        transform: 'rotate(13deg)'
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
    const scene = useThree(({scene}) => scene);

    useEffect(() => {
        scene.fog = new FogExp2('0xfff', 0.03);
    }, [scene]);

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
                <ambientLight intensity={0.05} color='blue' />
                <Bricks key={currentLevel} level={ArcanoidLevels[currentLevel]} />
                <Handle />
                <Ball />
                <Walls />
                <Background />
            </Physics>
        </Fragment>
    );
};

const ArcanoidUI: FC = () => {
    const {scores, currentLevel} = useArcanoidStore();

    return (
        <div style={{
            margin: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '40%',
        }}>
            {currentLevel === -1 && <MainMenu />}
            <p style={arcanoidTheme.basicText}>Score: {scores}</p>
        </div>
    );
};

export const Arcanoid: GameInstance = {
    Ui: ArcanoidUI,
    Game: ArcanoidGame,
}
