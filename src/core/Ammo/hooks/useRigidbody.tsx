import { useFrame } from "@react-three/fiber";
import { useContext, useRef } from "react"
import * as THREE from 'three';
import Ammo from 'ammojs-typed';

import { AmmoPhysicsContext } from "../AmmoPhysics";

let TRANSFORM_AUX: Ammo.btTransform;

Ammo().then((api) => TRANSFORM_AUX = new api.btTransform());

export const useRigidbody = () => {
    const ref = useRef(new THREE.Object3D());
    const rigidbodyRef = useRef<Ammo.btRigidBody>();
    const context = useContext(AmmoPhysicsContext);

    const returningData = [ref];

    useFrame(() => {
        // ref.current.rotateX(0.1);
        const motionState = rigidbodyRef.current?.getMotionState();

        if (motionState) {
            motionState.getWorldTransform(TRANSFORM_AUX);

            var p = TRANSFORM_AUX.getOrigin();
            var q = TRANSFORM_AUX.getRotation();
            ref.current.position.set(p.x(), p.y(), p.z());

            // console.info(p.x(), p.y(), p.z(), q.x(), q.y(), q.z(), q.w());
            // ref.current.quaternion.set(q.x(), q.y(), q.z(), q.w());
        }
    });

    if (!context) {
        return returningData;
    }

    Ammo().then((api) => {
        const tempVec = new api.btVector3(2,2,2);
        const geometry = new api.btBoxShape(tempVec);
        const transform = new api.btTransform();

        transform.setIdentity();
        transform.setOrigin(new api.btVector3(0,10,0));

        const motionState = new api.btDefaultMotionState(transform);
        const localInertia = new api.btVector3(0,0,0);

        geometry.calculateLocalInertia(100, localInertia);
        const rbConstructionInfo = new api.btRigidBodyConstructionInfo(100, motionState, geometry, localInertia);
        const rigidbody = new api.btRigidBody(rbConstructionInfo);

        rigidbody.setActivationState(4);
        rigidbody.setFriction(1);

        context.world.addRigidBody(rigidbody);
        rigidbodyRef.current = rigidbody;
    });

    return returningData;
}