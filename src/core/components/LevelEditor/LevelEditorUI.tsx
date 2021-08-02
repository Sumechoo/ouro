import { FC, useCallback, useEffect, useState } from "react";
import {Button, Card, CardContent, CardHeader, Grid, makeStyles, TextField} from '@material-ui/core';
import axios from "axios";

import { useLevelEditor } from "./useLevelEditor";
import { PlacementConfig } from "./LevelContainer";
import { PlacementsSelector } from "./PlacementsSelector";
import { GLOBALS } from "../../../globals";

const basicConfig: PlacementConfig[] = [
    {
        component: 'AmmoBox',
        props: {
            position: [0, 5, 0],
            mass: 10,
        }
    },
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


export const LevelEditorUI: FC = ({children}) => {
    const classes = useStyles();

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

    const onSave = useCallback(() => {
        axios.post(`${GLOBALS.EDITOR_URL}/placements`, configs);
    }, [configs]);
    
    return (
        <div className={classes.container}>
            <Card>
                <CardHeader>
                    Edit level placements
                </CardHeader>
                <CardContent>
                    <Grid
                        container
                        direction="column"
                    >
                        <PlacementsSelector
                            onPlacementLoad={setPlacementConfigs}
                            onSave={onSave}
                        />

                        <Button variant="contained" onClick={toggle}>{isEnabled ? '▶️' : '🛑'}</Button>
                        <TextField multiline value={value} onChange={(e) => setValue(e.target.value)} />
                        <Button color='primary' variant="contained" onClick={addPlacement}>Add placement</Button>
                        <Button variant="contained" onClick={applyChanges}>Apply changes</Button>
                        <Button variant="contained" onClick={() => setPlacementConfigs(basicConfig)}>Apply basic config</Button>
                    </Grid>
                </CardContent>
            </Card>
            <div style={{flex: 1}}>
                {children}
            </div>
        </div>
    );
};

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        height: '100%'
    }
}));
