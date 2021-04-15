import { FC, Fragment } from "react";
import { SmallFloor } from "../../core/components/SmallFloor";
import { Vehicle } from "../../core/components/Vehicle";

export const Racing: FC = () => {
    return (
        <Fragment>
            <Vehicle />
            <SmallFloor onPress={() => {}} />
        </Fragment>
    );
}
