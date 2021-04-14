import * as THREE from 'three';
import { FC, useEffect, useRef } from "react";
import { useFrame } from '@react-three/fiber';

const tempObject = new THREE.Object3D();

export const Manhattan: FC = ({children}) => {
  const ref = useRef<THREE.InstancedMesh>();
  const args: any = [null, null, 250000];

  useEffect(() => {
    if (!ref.current) {
      return;
    }
  
    let i = 0
    for (let x = 0; x < 500; x++)
      for (let y = 0; y < 1; y++)
        for (let z = 0; z < 500; z++) {
          const id = i++
          tempObject.position.set(125 - x, 5 - y, 125 - z)
          tempObject.scale.set(1, Math.random() * 15 + 1, 1)
          tempObject.updateMatrix()
          ref.current.setMatrixAt(id, tempObject.matrix)
        }
    // ref.current.instanceMatrix.needsUpdate = true
  })

  useFrame(() => ref.current?.rotateY(0.005))

  return (
    <instancedMesh ref={ref} args={args}>
      <boxGeometry args={[0.7, 0.7, 0.7]} />
      <meshPhysicalMaterial color='gray' />

      {children}
    </instancedMesh>
  )
}