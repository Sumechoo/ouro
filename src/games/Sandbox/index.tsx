import { FC, Fragment, useCallback, useState } from "react";
import { SmallCube } from "../../core/components/SmallCube";
import { SmallFloor } from "../../core/components/SmallFloor";
import { ThirdPersonController } from "../../core/components/ThirdPersonController";
import { Vehicle } from "../../core/components/Vehicle";

export const Sandbox: FC = () => {
    const [cubes, setCubes] = useState([1]);

    const handleAddCubes = useCallback(() => {
        setCubes([...cubes, Date.now()]);
    }, [cubes]);

    const handleDeleteCube = useCallback((cube: number) => {
        setCubes([...cubes.filter((id) => id!== cube)]);
    }, [cubes]);

    return (
        <Fragment>
            {cubes.map((cube) => <SmallCube onDelete={handleDeleteCube} id={cube} key={cube} />)}

            <Vehicle />

            <ThirdPersonController />
            <SmallFloor onPress={handleAddCubes} />
        </Fragment>
    );
};