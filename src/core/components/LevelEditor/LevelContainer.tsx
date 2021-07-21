import { Euler, Vector3 } from "@react-three/fiber";
import { ThreeEvent } from "@react-three/fiber/dist/declarations/src/core/events";
import { FC, Fragment } from "react";
import { AmmoBox } from "../../../games/AmmoPlayground/components/AmmoBox";
import { ConcaveModel } from "../ConcaveModel";
import { useLevelEditor } from "./useLevelEditor";

export const PlacementsMap: Record<string, FC<ObjectProps>> = {
    AmmoBox,
    ConcaveModel,
}

export interface ObjectProps {
    position?: Vector3;
    rotation?: Euler;
    mass?: number;
    size?: Vector3;
    name?: string;

    onEditorClick: (e: ThreeEvent<MouseEvent>) => void;
}

export interface PlacementConfig {
    component: keyof typeof PlacementsMap;
    props: Omit<ObjectProps, 'onEditorClick'>;
}

interface Props {
    configs: PlacementConfig[];
}

export const LevelContainer: FC<Props> = ({ configs }) => {
    const {isEnabled, setIndex} = useLevelEditor();

    return (
        <Fragment>
            {
                configs.map(({component, props}, index) => {
                    const Target = PlacementsMap[component];

                    return (
                        <Target
                            {...props}
                            onEditorClick={isEnabled ? (e) => {
                                e.stopPropagation();
                                
                                setIndex(index);
                            } : () => {}}

                            key={index}
                        />
                    );
                })
            }
        </Fragment>
    );
};
