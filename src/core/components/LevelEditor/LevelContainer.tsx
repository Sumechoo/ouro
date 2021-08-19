import { FC, Fragment } from "react";
import { emptyFn } from "../../../constants";

import { ConcaveModel } from "../ConcaveModel";
import { Pickable } from "../Pickable";
import { Creature } from "../Creature";
import { Trigger } from "../Trigger";
import { ObjectProps } from "./types";
import { useLevelEditor } from "./useLevelEditor";

export const PlacementsMap: Record<string, FC<ObjectProps>> = {
    ConcaveModel,
    Pickable,
    Creature,
    Trigger,
}

export const LevelContainer: FC = () => {
    const {isEnabled, setIndex, configs, currentDynamics} = useLevelEditor();

    return (
        <Fragment>
            {
                [...configs.statics, ...currentDynamics].map((placement, index) => {
                    const {component, props} = placement;
                    const Target = PlacementsMap[component];

                    return (
                        <Target
                            {...props}
                            placement={placement}
                            onEditorClick={isEnabled ? (e) => {
                                e.stopPropagation();
                                
                                setIndex(index);
                            } : emptyFn}

                            key={JSON.stringify(placement)}
                        />
                    );
                })
            }
        </Fragment>
    );
};
