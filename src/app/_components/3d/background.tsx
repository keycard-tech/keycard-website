'use client'

import { Environment, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import {
  Bloom,
  BrightnessContrast,
  EffectComposer,
  HueSaturation,
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
        <Canvas
          ref={canvasRef}
          gl={{
            precision: 'highp',
            alpha: true,
            stencil: false,
            depth: false,
            antialias: false,
          }}
          dpr={[1, 2]}
        >
          <Environment preset="warehouse" />

          <ambientLight intensity={1.5} />
          <directionalLight
            position={[2, 5, 10]}
            intensity={5}
            color="#ffffff"
          />

          <EffectComposer multisampling={8}>
            <Bloom
              intensity={0.05}
              luminanceThreshold={0.005}
              luminanceSmoothing={0.005}
            />
            <Vignette eskil={false} offset={0.25} darkness={1.1} />
            <BrightnessContrast brightness={0.01} contrast={0.1} />
            <HueSaturation hue={6.3} saturation={0.1} />
          </EffectComposer>

          <group position={[4, 2.4, 1]}>
            <KeycardModel
              initialRotation={[9, 3, 2.4]}
              scale={22}
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
              initialRotation={[-0.1, -0, 1]}
              scale={40}
              speed={0.25}
            />
          </group>

          <group position={[-3.5, 2.5, 1.5]}>
            <KeycardModel
              initialRotation={[2, -2, -4.6]}
              scale={16}
              speed={1.45}
            />
          </group>
        </Canvas>
      </motion.div>
    </AnimatePresence>
  )
}

export { Background }
