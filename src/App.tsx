import React, { Fragment, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import { PerspectiveCamera } from 'three'
import { Sandbox } from './games/Sandbox'
import { Racing } from './games/Racing';

export default function App() {
  const cameraRef = useRef<PerspectiveCamera>();

  useEffect(() => {
    console.info(cameraRef.current?.name)
  }, [cameraRef])

  return (
    <Fragment>
      <Canvas shadows camera={{position: [0, 6, 10]}}>
        <Physics>
            <ambientLight />
            <directionalLight castShadow position={[5, 10, 10]} intensity={5}/>

            <Racing />
        </Physics>
      </Canvas>
    </Fragment>
  )
}
