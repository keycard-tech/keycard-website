'use client'

import { Environment } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import {
  DepthOfField,
  EffectComposer,
  Vignette,
} from '@react-three/postprocessing'
import { useIntersectionObserver } from '~/app/_hooks/use-intersection-observer'
import { Image } from '~components/image'
import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { KeycardModel } from './model'

const Background = () => {
  const [isMounted, setIsMounted] = useState(false)

  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const entry = useIntersectionObserver(wrapperRef, {
    rootMargin: '0%',
  })

  const isVisible = !!entry?.isIntersecting

  return (
    <div className="absolute size-full">
      <motion.div
        animate={{ opacity: isMounted ? 0 : 1, y: isMounted ? 20 : 0 }}
        transition={{
          duration: 0.3,
        }}
        className="absolute left-0 top-0 z-0 size-full"
      >
        <Image
          priority
          src="/assets/placeholder.png"
          alt="Keycard Placholder"
          width={5478}
          height={2166}
          className="aspect-[5478/2166] h-[74.5%] w-full object-cover blur-2xl"
        />
      </motion.div>
      <motion.div
        ref={wrapperRef}
        animate={{ opacity: isMounted ? 1 : 0, y: isMounted ? 0 : 20 }}
        transition={{
          duration: 0.3,
        }}
        className="absolute left-0 top-0 z-0 size-full"
      >
        <Canvas
          frameloop={isVisible ? 'always' : 'demand'}
          onCreated={() => {
            setIsMounted(true)
          }}
          gl={{
            precision: 'lowp',
            preserveDrawingBuffer: true,
            powerPreference: 'low-power',
            autoClear: false,
          }}
        >
          <Environment
            preset="night"
            environmentIntensity={4}
            environmentRotation={[0, 14, -23]}
          />

          <ambientLight intensity={3.5} />
          <EffectComposer multisampling={0} enabled={isVisible}>
            <DepthOfField
              target={[0, 5, -30]}
              focusDistance={0.001}
              focalLength={0.02}
              bokehScale={3}
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
            <group position={[42, 4, -30]} scale={1.4}>
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
            <group position={[-107.9, 10, -80]}>
              <KeycardModel initialRotation={[2, -0, 0.6]} speed={2.25} />
            </group>
          </group>
        </Canvas>
      </motion.div>
    </div>
  )
}

export { Background }
