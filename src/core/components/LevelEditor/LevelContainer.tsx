import { Euler, Vector3 } from "@react-three/fiber";
import { ThreeEvent } from "@react-three/fiber/dist/declarations/src/core/events";
import { FC, Fragment, useState } from "react";
import { emptyFn } from "../../../constants";

import { AmmoBox } from "../../../games/AmmoPlayground/components/AmmoBox";
import { ConcaveModel } from "../ConcaveModel";
import { Sprite } from "../Sprite";
import { useLevelEditor } from "./useLevelEditor";

export const PlacementsMap: Record<string, FC<ObjectProps>> = {
    AmmoBox,
    ConcaveModel,
    Sprite,
}

export interface ObjectProps {
    position?: Vector3;
    rotation?: Euler;
    mass?: number;
    size?: Vector3;
    name?: string;

    onEditorClick: (e: ThreeEvent<MouseEvent>) => void;
}

export interface Placement {
    component: keyof typeof PlacementsMap;
    props: Omit<ObjectProps, 'onEditorClick'>;
}

export interface PlacementConfig {
    statics: Placement[],
    dynamics: Placement[],
}

interface Props {
    configs: PlacementConfig;
}

export const LevelContainer: FC<Props> = ({ configs }) => {
    const {isEnabled, setIndex} = useLevelEditor();
    const {
        statics = [],
        dynamics = [],
    } = configs;
    const [dynamicsState] = useState([...dynamics]);

    return (
        <Fragment>
            {
                [...statics, ...dynamicsState].map(({component, props}, index) => {
                    const Target = PlacementsMap[component];

                    return (
                        <Target
                            {...props}
                            onEditorClick={isEnabled ? (e) => {
                                e.stopPropagation();
                                
                                setIndex(index);
                            } : emptyFn}

                            key={index}
                        />
                    );
                })
            }
        </Fragment>
    );
};
