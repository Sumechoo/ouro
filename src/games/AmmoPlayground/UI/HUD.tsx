import { makeStyles, Card, Button } from "@material-ui/core";
import { FC } from "react";

import { useRaycasterState } from "../../../core/hooks/useRaycaster";
import { useInventoryState } from "../hooks/useInventoryState";

export const HUD: FC = () => {
    const classes = useStyles();
    const {activeObject} = useRaycasterState();
    const {items} = useInventoryState();

    return (
        <div>
            <div className={classes.container}>.{activeObject && 'Press "E" to pickup'}</div>
            <Card>
                {items.map((item, index) => <Button key={index}>{item.component}</Button>)}
            </Card>
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