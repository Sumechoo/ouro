import { createContext, FC, useEffect, useState } from "react";
import Ammo from 'ammojs-typed';
import * as THREE from 'three';
import { useFrame } from "@react-three/fiber";

const clock = new THREE.Clock(true);

const createWorld = async () => {
    const api = await Ammo();

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
    const [contextValue, setContextValue] = useState<AmmoContextValue | null>(null);

    useFrame(() => {
        if (contextValue) {
            contextValue.world.stepSimulation(clock.getDelta(), 10);
        }
    })

    useEffect(() => {
        createWorld()
            .then((world) => {
                setContextValue({world});
            });
    }, []);

    useEffect(() => {
        console.info(contextValue);
    }, [contextValue]);

    if (!contextValue) {
        return null;
    }

    return (
        <AmmoPhysicsContext.Provider value={contextValue}>
            {children}
        </AmmoPhysicsContext.Provider>
    );
}