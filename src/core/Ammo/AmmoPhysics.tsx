import { createContext, FC, useEffect, useState } from "react";
import * as THREE from 'three';
import { useFrame } from "@react-three/fiber";
import Ammo from 'ammojs-typed';

import { AmmoProvider } from "./AmmoProvider";
import { useLevelEditor } from "../components/LevelEditor/useLevelEditor";

const clock = new THREE.Clock(true);

const createWorld = async () => {
    const api = await AmmoProvider.getApi();

    const collisionConfiguration = new api.btDefaultCollisionConfiguration();
    const dispatcher = new api.btCollisionDispatcher( collisionConfiguration );
    const broadphase = new api.btDbvtBroadphase();
    const solver = new api.btSequentialImpulseConstraintSolver();
    const world = new api.btDiscreteDynamicsWorld(dispatcher, broadphase, solver, collisionConfiguration);

    world.setGravity( new api.btVector3( 0, -9.82, 0 ) );

    return world;
}

interface AmmoContextValue {
    world: Ammo.btDiscreteDynamicsWorld;
}

export const AmmoPhysicsContext = createContext<null | AmmoContextValue>(null);

export const AmmoPhysics: FC = ({ children }) => {
    const {isEnabled} = useLevelEditor();
    const [contextValue, setContextValue] = useState<AmmoContextValue | null>(null);

    useFrame(() => {
        if (contextValue && !isEnabled) {
            contextValue.world.stepSimulation(clock.getDelta(), 10);
        }
    })

    useEffect(() => {
        createWorld()
            .then((world) => {
                setContextValue({world});
            });
    }, []);

    if (!contextValue) {
        return null;
    }

    return (
        <AmmoPhysicsContext.Provider value={contextValue}>
            {children}
        </AmmoPhysicsContext.Provider>
    );
}