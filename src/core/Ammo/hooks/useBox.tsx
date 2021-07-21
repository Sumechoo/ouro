import { Euler, useFrame, Vector3 } from "@react-three/fiber";
import { useContext, useEffect, useRef, useState } from "react"
import * as THREE from 'three';
import Ammo from 'ammojs-typed';

import { AmmoPhysicsContext } from "../AmmoPhysics";
import { AmmoProvider } from "../AmmoProvider";

let TRANSFORM_AUX: Ammo.btTransform;

AmmoProvider.getApi().then((api) => TRANSFORM_AUX = new api.btTransform());

function createTriangleShapeByBufferGeometry(api, geometry: THREE.BufferGeometry, scalingFactor: number) {
    var mesh = new api.btTriangleMesh(true, true);
    var vertexPositionArray = geometry.attributes.position.array;
    for (var i = 0; i < geometry.attributes.position.count/3; i++) {
            mesh.addTriangle(
                new api.btVector3(vertexPositionArray[i*9+0]*scalingFactor, vertexPositionArray[i*9+1]*scalingFactor, vertexPositionArray[i*9+2]*scalingFactor ),
                new api.btVector3(vertexPositionArray[i*9+3]*scalingFactor, vertexPositionArray[i*9+4]*scalingFactor, vertexPositionArray[i*9+5]*scalingFactor),
                new api.btVector3(vertexPositionArray[i*9+6]*scalingFactor, vertexPositionArray[i*9+7]*scalingFactor, vertexPositionArray[i*9+8]*scalingFactor),
                false
            );
    }
    var shape = new api.btBvhTriangleMeshShape(mesh, true, true);
    return shape;
}

interface Props {
    mass: number;
    size: Vector3;
    position: Vector3;
    rotation?: Euler;
    geometryData?: THREE.BufferGeometry;
}

export const useBox = (props: Props) => {
    const {
        mass = 0,
        size = [1,1,1],
        position = [0,0,0],
        rotation = [0,0,0],
        geometryData,
    } = props;
    const ref = useRef(new THREE.Object3D());
    const [rb, setRb] = useState<Ammo.btRigidBody>();
    const context = useContext(AmmoPhysicsContext);

    useEffect(() => {
        if (ref) {
            ref.current?.scale.set(size[0], size[1], size[2]);
        }

        AmmoProvider.getApi().then((api) => {
            if (rb) {
                return;
            }

            const tempVec = new api.btVector3(size[0] / 2, size[1] / 2, size[2] / 2);
            const geometry = new api.btBoxShape(tempVec);
            const transform = new api.btTransform();
            const rEuler = new THREE.Euler(rotation[0], rotation[1], rotation[2]);
            const rQuart = new THREE.Quaternion().setFromEuler(rEuler, true);
    
    
            let cGeometry = geometryData && createTriangleShapeByBufferGeometry(api, geometryData, 1);
    
            transform.setIdentity();
            transform.setRotation(new api.btQuaternion(rQuart.x, rQuart.y, rQuart.z, rQuart.w));
            transform.setOrigin(new api.btVector3(position[0], position[1], position[2]));
    
            const motionState = new api.btDefaultMotionState(transform);
            const localInertia = new api.btVector3(0,0,0);
    
            geometry.calculateLocalInertia(mass, localInertia);
            const rbConstructionInfo = new api.btRigidBodyConstructionInfo(mass, motionState, cGeometry ?? geometry, localInertia);
            const rigidbody = new api.btRigidBody(rbConstructionInfo);
    
            if (mass > 0) {
                rigidbody.setActivationState(4);
            }
            rigidbody.setFriction(0.5);
    
            context?.world.addRigidBody(rigidbody);
            setRb(rigidbody);
        });

        return () => {
            if (rb) {
                context?.world.removeRigidBody(rb);

                setRb(undefined);
            }
        }
    }, [ref, context, size, rb, geometryData, mass, position, rotation]);

    useFrame(() => {
        const motionState = rb?.getMotionState();

        if (motionState && ref.current) {
            motionState.getWorldTransform(TRANSFORM_AUX);

            var p = TRANSFORM_AUX.getOrigin();
            var q = TRANSFORM_AUX.getRotation();
            ref.current.position.set(p.x(), p.y(), p.z());
            ref.current.quaternion.set(q.x(), q.y(), q.z(), q.w());
        }
    });

    return {
        ref,
        rb,
    };
}