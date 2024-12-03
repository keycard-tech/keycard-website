'use client'

import { Environment, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import {
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
} from '@react-three/postprocessing'
import { AnimatePresence, motion } from 'framer-motion'
import { useRef } from 'react'
import { KeycardModel } from './model'

useGLTF.preload('/assets/keycard-model.glb')

const Background = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{
          duration: 0.3,
          delay: 1,
        }}
        className="absolute left-0 top-0 z-0 size-full"
      >
        <Canvas ref={canvasRef}>
          <EffectComposer multisampling={0}>
            <DepthOfField
              focusDistance={0.04}
              focalLength={1}
              bokehScale={1.5}
              height={380}
            />
            <Noise opacity={0.025} />
            <Vignette eskil={false} offset={0.1} darkness={1} />
          </EffectComposer>
          <directionalLight
            color="white"
            intensity={100}
            position={[2, 0, 2]}
          />
          <ambientLight intensity={2} />
          <Environment preset="night" />
          <group position={[4.4, 2, 1]}>
            <KeycardModel
              initialRotation={[9, 3, 2.4]}
              scale={23}
              speed={0.3}
            />
          </group>

          <group position={[0, 2.2, 1]}>
            <KeycardModel
              initialRotation={[-0.4, -0.2, 2.4]}
              scale={30}
              speed={1}
            />
          </group>

          <group position={[-3.4, 0, 1.2]}>
            <KeycardModel
              initialRotation={[1.5, -2, 3]}
              scale={15}
              speed={1.3}
            />
          </group>

          <group position={[-2, -1.4, 0]}>
            <KeycardModel
              initialRotation={[0, 1.3, -1.2]}
              scale={24}
              speed={0.75}
            />
          </group>

          <group position={[2.9, -1.3, 0]}>
            <KeycardModel
              initialRotation={[-0.1, -0.3, 1.1]}
              scale={40}
              speed={0.25}
            />
          </group>

          <group position={[-5, 4, 1.5]}>
            <KeycardModel
              initialRotation={[-2, -2, -4.6]}
              scale={34}
              speed={1.45}
            />
          </group>
        </Canvas>
      </motion.div>
    </AnimatePresence>
  )
}

export { Background }
