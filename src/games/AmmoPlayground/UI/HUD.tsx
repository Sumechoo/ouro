import { makeStyles } from "@material-ui/core";

import { FC } from "react";
import { Inventory } from "./Inventory";
import { useInventoryState } from "../hooks/useInventoryState";
import { useRaycasterState } from "../../../core/hooks/useRaycaster";

export const HUD: FC = () => {
    const classes = useStyles();
    const {activeObject} = useRaycasterState();
    const {items, index} = useInventoryState();

    return (
        <div>
            <div className={classes.container}>{activeObject ? 'o' : '.'}</div>
            <Inventory items={items} index={index}/>
        </div>
    );
}

const useStyles = makeStyles({
    container: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        color: 'white',
    }
});