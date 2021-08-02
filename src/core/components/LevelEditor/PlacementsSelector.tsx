import { ChangeEvent, FC, Fragment, useCallback, useEffect, useState } from "react";
import Axios from 'axios';

import {GLOBALS} from '../../../globals';
import { Button, FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { PlacementConfig } from "./LevelContainer";

interface Props {
    onPlacementLoad: (placement: PlacementConfig[]) => void;
    onSave: (name: string) => void;
}

export const PlacementsSelector: FC<Props> = ({
    onPlacementLoad,
    onSave,
}) => {
    const [name, setName] = useState('');
    const [placements, setPlacements] = useState<string[]>([]);

    useEffect(() => {
        Axios
            .get(`${GLOBALS.EDITOR_URL}/placements/list`)
            .then(({data}) => setPlacements(data));
    }, []);

    const onChange = useCallback((e: ChangeEvent<{name?: string; value: any}>) => {
        setName(e.target.value);

        Axios
            .get(`${GLOBALS.EDITOR_URL}/placements`, {params: {placementName: e.target.value}})
            .then(({data}) => onPlacementLoad(data));
    }, [onPlacementLoad]);

    const handleSave = useCallback(() => {
        onSave(name);
    }, [onSave, name]);
    
    return (
        <Fragment>
            <FormControl>
                <InputLabel id="placements_select">Placement config</InputLabel>
                <Select
                    value={name}
                    labelId="placements_select"
                    onChange={onChange}
                >
                    {placements.map((name) => (
                        <MenuItem value={name}>{name}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button onClick={handleSave}>Save</Button>
        </Fragment>
    );
}