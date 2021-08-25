import { ChangeEvent, FC, Fragment, useCallback, useEffect, useState } from "react";

import { Button, FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { PlacementConfig } from "./types";
import { getPlacementsList } from "../../api/getPlacementsList";
import { getPlacement } from "../../api/getPlacement";

interface Props {
    onPlacementLoad: (placement: PlacementConfig) => void;
    onSave: (name: string) => void;
}

export const PlacementsSelector: FC<Props> = ({
    onPlacementLoad,
    onSave,
}) => {
    const [name, setName] = useState('');
    const [placements, setPlacements] = useState<string[]>([]);

    useEffect(() => {
        getPlacementsList()
            .then((data) => setPlacements(data));
    }, []);

    const onChange = useCallback((e: ChangeEvent<{name?: string; value: any}>) => {
        setName(e.target.value);

        getPlacement(e.target.value)
            .then((data) => onPlacementLoad(data));
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
                        <MenuItem key={name} value={name}>{name}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button onClick={handleSave}>Save</Button>
        </Fragment>
    );
}