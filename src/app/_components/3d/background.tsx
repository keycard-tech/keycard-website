'use client'

import { Environment } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Vignette,
} from '@react-three/postprocessing'
import { AnimatePresence, motion } from 'framer-motion'
import { useRef } from 'react'
import { KeycardModel } from './model'

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
          <Environment preset="warehouse" environmentIntensity={0.6} />

          <ambientLight intensity={6} />

          <directionalLight
            position={[2, 5, 10]}
            intensity={5.6}
            color="#fff"
          />

          <EffectComposer multisampling={8}>
            <DepthOfField
              target={[0, 5, -30]}
              focusDistance={0.001}
              focalLength={0.02}
              bokehScale={3}
            />
            <Bloom
              intensity={0.05}
              luminanceThreshold={0.005}
              luminanceSmoothing={0.005}
            />
            <Vignette eskil={false} offset={0.55} darkness={1} />
          </EffectComposer>

          <group scale={2} position={[0, -10, 0]}>
            <group position={[25, 25, -38]}>
              <KeycardModel initialRotation={[-0.3, 0.4, -0.8]} speed={5.3} />
            </group>
            <group position={[60, 45, -68]}>
              <KeycardModel initialRotation={[1, 0, 0]} speed={5.3} />
            </group>
            <group position={[0, 15, -15]}>
              <KeycardModel initialRotation={[-0.3, -0.6, 2.4]} speed={1.4} />
            </group>
            <group position={[7, 4, -15]}>
              <KeycardModel initialRotation={[0, 0, 0.6]} speed={2.3} />
            </group>
            <group position={[43, 4, -30]} scale={1.4}>
              <KeycardModel initialRotation={[0, 0.4, 1.2]} speed={2.3} />
            </group>
            <group position={[-7.5, 8, -27.5]}>
              <KeycardModel initialRotation={[-1.1, 0.8, -0.6]} speed={2.75} />
            </group>
            <group position={[-15, 10, -20]}>
              <KeycardModel initialRotation={[2, -2, -4.6]} speed={1.45} />
            </group>
            <group position={[-50.9, 20, -40]}>
              <KeycardModel initialRotation={[0, -0, 0.6]} speed={4.25} />
            </group>
            <group position={[-20.9, 35, -40]}>
              <KeycardModel initialRotation={[-1.3, -0.8, 0.6]} speed={4.25} />
            </group>
            <group position={[-110.9, 10, -80]}>
              <KeycardModel initialRotation={[2, -0, 0.6]} speed={2.25} />
            </group>
          </group>
        </Canvas>
      </motion.div>
    </AnimatePresence>
  )
}

export { Background }
