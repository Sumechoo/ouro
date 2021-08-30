import { FC, useCallback, useEffect } from "react";
import { useCollision } from "../Ammo/hooks/useCollision";
import { getPlacement } from "../api/getPlacement";
import { ObjectProps } from "./LevelEditor/types";
import { useLevelEditor } from "./LevelEditor/useLevelEditor";

export const Portal: FC<ObjectProps> = ({
    position = [0,0,0],
    size = [1,1,1],
}) => {
    const {ref} = useCollision({
        mass: 0,
        position,
        size,
        forceDynamic: true,
    });

    const {toggle, setPlacementConfigs} = useLevelEditor();

    const action = useCallback(async () => {
        toggle();
        setPlacementConfigs(await getPlacement('STRESS_TEST.json'));
        toggle();
    }, [toggle, setPlacementConfigs]);

    useEffect(() => {
        ref.current.userData.action = action;
    }, [action, ref]);

    return (
        <mesh ref={ref}>
            <pointLight color="black" distance={5}/>

            <boxBufferGeometry />
            <meshBasicMaterial color='brown' />
        </mesh>
    )
}