import { makeStyles } from "@material-ui/core";
import { FC } from "react";
import { useRaycasterState } from "../../../core/hooks/useRaycaster";

export const HUD: FC = () => {
    const classes = useStyles();
    const {activeObject} = useRaycasterState();

    return (
        <div className={classes.container}>.{activeObject && activeObject.id}</div>
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