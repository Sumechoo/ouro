import Ammo from "ammojs-typed";
import { MutableRefObject, useCallback, useEffect, useState } from "react";
import { Object3D, PerspectiveCamera } from "three";
import {useSpring} from 'react-spring';

import { AmmoProvider } from "../Ammo/AmmoProvider";
import { useFrame } from "@react-three/fiber";
import { toRadians } from "../utils";

export const useMouseControls = (
    rb?: Ammo.btRigidBody,
    camera?: MutableRefObject<PerspectiveCamera | undefined>,
    handRef?: MutableRefObject<Object3D | undefined>,
) => {
    const [to, setTo] = useState(50);
    const {x} = useSpring({
        x: 0,
        to: {x: to},
        onRest: () => setTo(0),
    });

    const mouseEventsHandler = useCallback(async (e: MouseEvent) => {
        if(!rb) {
            return;
        }

        const api = await AmmoProvider.getApi();

        rb.setAngularVelocity(new api.btVector3(0, -e.movementX / 2, 0));
        rb.setFriction(0);

        camera?.current?.rotateX(-e.movementY / 200);
    }, [rb, camera]);

    const mouseClick = useCallback(() => {
        setTo(45);
    }, []);

    useFrame(() => {
        if (!handRef || !handRef.current) {
            return;
        }

        handRef.current.rotation.set(toRadians(x.get()), 0, 0);
    });

    useEffect(() => {
        document.addEventListener('mousemove', mouseEventsHandler);
        document.addEventListener('click', mouseClick);

        return () => {
            document.removeEventListener('mousemove', mouseEventsHandler);
            document.removeEventListener('click', mouseClick);
        }
    }, [mouseClick, mouseEventsHandler]);
}