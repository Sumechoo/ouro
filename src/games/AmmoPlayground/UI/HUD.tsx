import { makeStyles, Card, Button } from "@material-ui/core";
import { FC, useRef } from "react";

import { useRaycasterState } from "../../../core/hooks/useRaycaster";
import { useTouchAxes } from "../../../core/hooks/useTouchAxes";
import { useInventoryState } from "../hooks/useInventoryState";

export const HUD: FC = () => {
    const classes = useStyles();
    const {activeObject} = useRaycasterState();
    const {items, index} = useInventoryState();

    return (
        <div>
            <div className={classes.container}>{activeObject ? 'o' : '.'}</div>
            <Card>
                {items.map((item, i) => (
                    <Button
                        color={index === i ? 'primary' : 'default'}
                        variant={index === i ? 'contained' : 'text'}
                        key={item.component + Math.random()}
                    >
                        {item.alias ?? item.component}
                    </Button>))
                }
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