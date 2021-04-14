import React, { Fragment, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import { PerspectiveCamera } from 'three'
import { Sandbox } from './games/Sandbox'

export default function App() {
  const cameraRef = useRef<PerspectiveCamera>();

  useEffect(() => {
    console.info(cameraRef.current?.name)
  }, [cameraRef])

  return (
    <Fragment>
      <Canvas camera={{position: [0, 6, 10]}}>
        <Physics>
            <ambientLight />
            <directionalLight position={[0, 10, 0]} intensity={10}/>

            <Sandbox />
        </Physics>
      </Canvas>
    </Fragment>
  )
}
