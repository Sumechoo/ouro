import { FC, useCallback, useEffect, useState } from "react";
import {Button, Card, CardContent, CardHeader, Grid, TextField} from '@material-ui/core';

import { useLevelEditor } from "./useLevelEditor";
import { PlacementConfig } from "./LevelContainer";

const basicConfig: PlacementConfig[] = [
    {
        component: 'AmmoBox',
        props: {
            position: [0, 5, 0],
            mass: 10,
        }
    },
    // {
    //     component: 'ConcaveModel',
    //     props: {
    //         name: 'sh1_building_13',
    //         position: [0,0,-12]
    //     }
    // },
    {
        "component": "ConcaveModel",
        "props": {
          "name": "scp",
          "position": [
            0,
            0,
            0
          ]
        }
      }
];


export const LevelEditorUI: FC = () => {
    const {isEnabled, toggle, configs, setPlacementConfigs, index, setIndex} = useLevelEditor();
    const [value, setValue] = useState('');

    useEffect(() => {
        if (configs) {
            setValue(JSON.stringify(configs[index], null, 2))
        }
    }, [configs, index]);

    const applyChanges = useCallback(() => {
        const newConfigs = [...configs];

        newConfigs[index] = JSON.parse(value);
        setPlacementConfigs(newConfigs);
    }, [configs, index, setPlacementConfigs, value]);

    const addPlacement = useCallback(() => {
        const newConfigs = [...configs, {...basicConfig[0]}];

        setPlacementConfigs(newConfigs);
        setIndex(newConfigs.length - 1);
    }, [configs, setPlacementConfigs, setIndex]);
    
    return (
        <Card>
            <CardHeader>
                Edit level placements
            </CardHeader>
            <CardContent>
                <Grid
                    container
                    direction="column"
                >
                    <Button variant="contained" onClick={toggle}>{isEnabled ? '▶️' : '🛑'}</Button>
                    <TextField multiline value={value} onChange={(e) => setValue(e.target.value)} />
                    <Button color='primary' variant="contained" onClick={addPlacement}>Add placement</Button>
                    <Button variant="contained" onClick={applyChanges}>Apply changes</Button>
                    <Button variant="contained" onClick={() => setPlacementConfigs(basicConfig)}>Apply basic config</Button>
                </Grid>
            </CardContent>
        </Card>
    );
};
