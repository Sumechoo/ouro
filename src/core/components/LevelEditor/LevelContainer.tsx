import { FC, Fragment, useEffect } from "react";
import { emptyFn } from "../../../constants";

import { ConcaveModel } from "../ConcaveModel";
import { DecorationModel } from "../DecorationModel";
import { Pickable } from "../Pickable";
import { Creature } from "../Creature";
import { Portal } from "../Portal";
import { ObjectProps } from "./types";
import { useLevelEditor } from "./useLevelEditor";
import { GLOBAL_CONFIG } from "../../../globalConfig";
import { getPlacement } from "../../api/getPlacement";

export const PlacementsMap: Record<string, FC<ObjectProps>> = {
    ConcaveModel,
    DecorationModel,
    Pickable,
    Creature,
    Portal,
}

export const LevelContainer: FC = () => {
    const {isEnabled, setIndex, configs, setPlacementConfigs, currentDynamics, toggle} = useLevelEditor();

    useEffect(() => {
        if (GLOBAL_CONFIG.IS_PROD) {
            getPlacement(GLOBAL_CONFIG.INIT_PLACEMENT)
                .then((configs) => {
                    setPlacementConfigs(configs);
                    setTimeout(toggle, 500);
                });
        }
    }, [setPlacementConfigs]);

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

                            key={JSON.stringify(props)}
                        />
                    );
                })
            }
        </Fragment>
    );
};
