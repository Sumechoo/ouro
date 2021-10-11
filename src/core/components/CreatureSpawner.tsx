import { FC, useEffect } from "react";

import { ObjectProps } from "./LevelEditor/types";
import { useLevelEditor } from "./LevelEditor/useLevelEditor";

export const CreatureSpawner: FC<ObjectProps> = ({
    position,
    targetPlacement,
    delay = 2000,
}) => {
    const {addPlacement} = useLevelEditor();

    useEffect(() => {
        const intervalId = setTimeout(() => {
            targetPlacement && addPlacement(targetPlacement, position);
        }, delay);

        return () => {
            clearTimeout(intervalId);
        }
    }, [addPlacement, targetPlacement]);

    return null;
};
