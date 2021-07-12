import { useFrame, Vector3 } from "@react-three/fiber";
import { useContext, useEffect, useRef } from "react"
import * as THREE from 'three';
import Ammo from 'ammojs-typed';

import { AmmoPhysicsContext } from "../AmmoPhysics";
import { AmmoProvider } from "../AmmoProvider";

let TRANSFORM_AUX: Ammo.btTransform;

AmmoProvider.getApi().then((api) => TRANSFORM_AUX = new api.btTransform());

export const useBox = (
    mass = 0,
    size: Vector3 = [1,1,1],
    position: Vector3 = [0,0,0]
) => {
    const ref = useRef(new THREE.Object3D());
    const rigidbodyRef = useRef<any>();
    const context = useContext(AmmoPhysicsContext);

    useEffect(() => {
        if (ref) {
            ref.current.scale.set(size[0], size[1], size[2]);
        }

        return () => {
            context?.world.removeRigidBody(rigidbodyRef.current);
        }
    }, [ref, context, size]);

    useFrame(() => {
        const motionState = rigidbodyRef.current?.getMotionState();

        if (motionState && ref.current) {
            motionState.getWorldTransform(TRANSFORM_AUX);

            var p = TRANSFORM_AUX.getOrigin();
            var q = TRANSFORM_AUX.getRotation();
            ref.current.position.set(p.x(), p.y(), p.z());
            ref.current.quaternion.set(q.x(), q.y(), q.z(), q.w());
        }
    });

    AmmoProvider.getApi().then((api) => {
        const tempVec = new api.btVector3(size[0] / 2, size[1] / 2, size[2] / 2);
        const geometry = new api.btBoxShape(tempVec);
        const transform = new api.btTransform();

        transform.setIdentity();
        transform.setOrigin(new api.btVector3(position[0], position[1], position[2]));

        const motionState = new api.btDefaultMotionState(transform);
        const localInertia = new api.btVector3(0,0,0);

        geometry.calculateLocalInertia(mass, localInertia);
        const rbConstructionInfo = new api.btRigidBodyConstructionInfo(mass, motionState, geometry, localInertia);
        const rigidbody = new api.btRigidBody(rbConstructionInfo);

        if (mass > 0) {
            rigidbody.setActivationState(4);
        }
        rigidbody.setFriction(1);

        if (!rigidbodyRef.current) {
            context?.world.addRigidBody(rigidbody);
            rigidbodyRef.current = rigidbody;
        }
    });

    return [ref];
}