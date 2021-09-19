import { FC } from "react";

export interface GameInstance {
    Ui: FC;
    Game: FC;
}

export interface Point {
    x: number;
    y: number;
}