/* eslint-disable */
import * as THREE from 'three'
import React, { FC, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import Effects from './Effects'

function Box(props: any) {
  const mesh = useRef<THREE.Mesh>(null)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  useFrame((state, delta) => {
    if (!mesh.current) {
      return;
    }

    mesh.current.rotation.x += 0.01
  })

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

const tempObject = new THREE.Object3D();

const InstancedCubes: FC = () => {
  const ref = useRef<THREE.InstancedMesh>();
  const args: any = [null, null, 1000];

  useFrame((state) => {
    if (!ref.current) {
      return;
    }

    const time = state.clock.getElapsedTime()
    // ref.current.rotation.x = Math.sin(time / 4)
    // ref.current.rotation.y = Math.sin(time / 2)
  
    let i = 0
    for (let x = 0; x < 10; x++)
      for (let y = 0; y < 10; y++)
        for (let z = 0; z < 10; z++) {
          const id = i++
          tempObject.position.set(5 - x, 5 - y, 5 - z)
          tempObject.scale.set(1, 1, 1)
          tempObject.updateMatrix()
          ref.current.setMatrixAt(id, tempObject.matrix)
        }
    ref.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={ref} args={args}>
      <boxGeometry args={[0.7, 0.7, 0.7]}>
      </boxGeometry>
      <meshPhysicalMaterial color='gray' />
    </instancedMesh>
  )
}

export default function App() {
  return (
    <Canvas camera={{position: [10, 10, 10]}}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <directionalLight position={[10, 10, 10]}/>
      <InstancedCubes />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />

      <Effects />
    </Canvas>
  )
}
