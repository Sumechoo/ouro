import Ammo from "ammojs-typed";
import { MutableRefObject } from "react-transition-group/node_modules/@types/react";
import { Object3D, Quaternion, Vector3, Vector3Tuple } from "three";

export const toRadians = (angle = 0) => {
  return angle * (Math.PI / 180);
}

export const inverseDebounce = (fn: VoidFunction, ms = 0) => {
  let timer;
  let canCall = true;

  return () => {
    if (timer) {
      clearTimeout(timer);
    }

    if (canCall) {
      fn();
      canCall = false;
    }

    timer = setTimeout(() => canCall = true, ms);
  }
}

const ROTATION_OBJECT_AUX = new Object3D();

export const rotateRigidbodyByEuler = (rb: Ammo.btRigidBody, x: number, y: number, z: number) => {
  const transform = rb.getWorldTransform();
  const rotation = transform.getRotation();

  ROTATION_OBJECT_AUX.rotation.setFromQuaternion(
    new Quaternion(
      rotation.x(),
      rotation.y(),
      rotation.z(),
      rotation.w(),
    ), 'ZYX'
  );

  ROTATION_OBJECT_AUX.rotateX(x);
  ROTATION_OBJECT_AUX.rotateY(y);
  ROTATION_OBJECT_AUX.rotateZ(z);

  rotation.setEulerZYX(
    ROTATION_OBJECT_AUX.rotation.x,
    ROTATION_OBJECT_AUX.rotation.y,
    ROTATION_OBJECT_AUX.rotation.z,
  );

  transform.setRotation(rotation);
}

export const addTupleVectors = (...vectors: Vector3Tuple[]) => {
  const resultTuple: Vector3Tuple = [0,0,0];

  vectors.forEach((item) => {
    resultTuple[0] += item[0];
    resultTuple[1] += item[1];
    resultTuple[2] += item[2];
  });

  return resultTuple;
}

export const multiplyTupleByScalar = (vector: Vector3Tuple, scalar = 1): Vector3Tuple => {
  return [
    vector[0] * scalar,
    vector[1] * scalar,
    vector[2] * scalar,
  ];
}

const directionVector = new Vector3();

export const getWorldDirection = (obj: Object3D) => {
  obj.getWorldDirection(directionVector);

  return directionVector;
}