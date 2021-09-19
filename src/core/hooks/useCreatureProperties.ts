import { MutableRefObject, useCallback, useEffect, useState } from "react";
import { Object3D } from 'three';

interface CreatureUserProperties {
    hp: number;
}

interface CreatureUserDataActions {
    applyDamage: (amount: number) => void;
}

type CreatureUserData = CreatureUserDataActions & CreatureUserProperties & {
    isCreature: true;
}

export function isCreatureUserData (obj?: object) : obj is CreatureUserData {
    return Boolean(obj && 'isCreature' in obj);
}

interface Props {
    ref: MutableRefObject<Object3D>,
    onKill?: VoidFunction;
};

export const useCreatureProperties = ({
    ref,
    onKill,
}: Props) => {
    const [creatureProps, setCreatureProps] = useState<CreatureUserProperties>({
        hp: 100,
    });

    const applyDamage = useCallback((amount: number) => {
        setCreatureProps({
            ...creatureProps,
            hp: creatureProps.hp - amount,
        });

        if (creatureProps.hp - amount <= 0 && onKill) {
            onKill();
        }
    }, [creatureProps]);

    useEffect(() => {
        const userData: CreatureUserData = {
            isCreature: true,
            hp: 100,

            applyDamage,
        };

        ref.current.userData = {
            ...ref.current.userData,
            ...userData,
        };
    }, [ref, applyDamage]);
}