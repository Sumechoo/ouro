import { Euler } from "@react-three/fiber";
import Ammo from "ammojs-typed";
import { Object3D, Quaternion } from "three";
import { AmmoProvider } from "./Ammo/AmmoProvider";

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