import { FC, Fragment, useEffect } from "react";
import { emptyFn } from "../../../constants";

import { ConcaveModel } from "../ConcaveModel";
import { DecorationModel } from "../DecorationModel";
import { Pickable } from "../Pickable";
import { Creature } from "../Creature";
import { Bullet } from "../Bullet";
import { Portal } from "../Portal";
import { CreatureSpawner } from "../CreatureSpawner";
import { ObjectProps, Placement } from "./types";
import { useLevelEditor } from "./useLevelEditor";
import { GLOBAL_CONFIG } from "../../../globalConfig";
import { getPlacement } from "../../api/getPlacement";

import {Player} from '../../../games/AmmoPlayground/components/Player';
import { InstancingContextProvider } from "../InstacingConext";
import { IdManager } from "../../classes/IdManager";

export const PlacementsMap: Record<string, FC<ObjectProps>> = {
    ConcaveModel,
    DecorationModel,
    Pickable,
    Creature,
    Portal,
    CreatureSpawner,
    Player,
    Bullet,
};

const playerSpawner: Placement = {
    id: IdManager.getNewId(),
    component: 'CreatureSpawner',
    props: {
        delay: 1000,
        targetPlacement: {
            id: IdManager.getNewId(),
            component: 'Player',
            props: {},
        }
    }
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
        <InstancingContextProvider>
            {
                [...configs.statics, ...currentDynamics, playerSpawner].map((placement, index) => {
                    const {component, props} = placement;
                    const Target = PlacementsMap[component];

                    return (
                        <Target
                            {...props}
                            placement={placement}
                            // onEditorClick={isEnabled ? (e) => {
                            //     e.stopPropagation();
                                
                            //     setIndex(index);
                            // } : emptyFn}
                            onEditorClick={emptyFn}

                            key={placement.id}
                        />
                    );
                })
            }
        </InstancingContextProvider>
    );
};
