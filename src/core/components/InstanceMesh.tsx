import { Vector3 } from "@react-three/fiber";
import { useEffect, useRef, FC, useContext } from "react";
import { Object3D, InstancedMesh } from 'three';

import { useMemoizedGeometry } from "../hooks/useMemoizedGeometry";
import { ResourceContext } from "./ResourceContext";

interface Props {
    temp?: Object3D;
    positions: Vector3[];
    name: string;
}

export const InstanceMesh: FC<Props> = ({
    temp = new Object3D(),
    positions=[],
    children,
    name,
}) => {
    const ref = useRef<InstancedMesh>();
    const geometryData = useMemoizedGeometry(name);
    const { materials, depthMaterial } = useContext(ResourceContext);
     
    useEffect(() => {
        if(!ref.current) {
            return;
        }

      for (let i = 0; i < positions.length; i++) {
        const position = positions[i];
        temp.position.set(position[0], position[1], position[2]);
        temp.updateMatrix()
        ref.current.setMatrixAt(i, temp.matrix)
      }
      ref.current.instanceMatrix.needsUpdate = true;
    }, [positions, ref, temp]);

    return (
      <instancedMesh
        castShadow
        receiveShadow
        ref={ref}
        args={[geometryData, materials[0], positions.length]}
        customDepthMaterial={depthMaterial}
      >
          {children}
      </instancedMesh>
    )
  }