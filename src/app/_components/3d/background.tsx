'use client'

import { Environment } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import {
  DepthOfField,
  EffectComposer,
  Vignette,
} from '@react-three/postprocessing'
import { useIntersectionObserver } from '~/app/_hooks/use-intersection-observer'
import { useWindowFocus } from '~/app/_hooks/use-window-focus'
import { Image } from '~components/image'
import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { KeycardModel } from './model'

const cardsPositions: Record<
  Props['variant'],
  Array<{
    position: [number, number, number]
    rotation: [number, number, number]
    speed: number
    scale?: number
  }>
> = {
  'thank-you': [
    {
      position: [25, 25, -38],
      rotation: [-0.3, 0.4, -0.8],
      speed: 5.3,
    },
    {
      position: [60, 45, -68],
      rotation: [1, 0, 0],
      speed: 5.3,
    },
    {
      position: [0, 15, -15],
      rotation: [-0.3, -0.6, 2.4],
      speed: 1.4,
    },
    {
      position: [14, 4, -15],
      rotation: [0, 0, 0.6],
      speed: 2.3,
    },
    {
      position: [42, 4, -30],
      rotation: [0, 0.4, 1.2],
      speed: 2.3,
      scale: 1.4,
    },
    {
      position: [-20.5, 0, -27.5],
      rotation: [-1.1, 0.8, -0.6],
      speed: 2.75,
    },
    {
      position: [-23, 12, -30],
      rotation: [0.5, 0.4, 0.6],
      speed: 1.45,
    },
    {
      position: [-50.9, 20, -40],
      rotation: [0, 0, 0.6],
      speed: 4.25,
    },
    {
      position: [-20.9, 35, -40],
      rotation: [-1.3, -0.8, 0.6],
      speed: 4.25,
    },
    {
      position: [-107.9, 10, -80],
      rotation: [2, 0, 0.6],
      speed: 2.25,
    },
  ],
  homepage: [
    {
      position: [25, 25, -38],
      rotation: [-0.3, 0.4, -0.8],
      speed: 5.3,
    },
    {
      position: [60, 45, -68],
      rotation: [1, 0, 0],
      speed: 5.3,
    },
    {
      position: [0, 15, -15],
      rotation: [-0.3, -0.6, 2.4],
      speed: 1.4,
    },
    {
      position: [7, 4, -15],
      rotation: [0, 0, 0.6],
      speed: 2.3,
    },
    {
      position: [42, 4, -30],
      rotation: [0, 0.4, 1.2],
      speed: 2.3,
      scale: 1.4,
    },
    {
      position: [-7.5, 8, -27.5],
      rotation: [-1.1, 0.8, -0.6],
      speed: 2.75,
    },
    {
      position: [-23, 12, -30],
      rotation: [0.5, 0.4, 0.6],
      speed: 1.45,
    },
    {
      position: [-50.9, 20, -40],
      rotation: [0, 0, 0.6],
      speed: 4.25,
    },
    {
      position: [-20.9, 35, -40],
      rotation: [-1.3, -0.8, 0.6],
      speed: 4.25,
    },
    {
      position: [-107.9, 10, -80],
      rotation: [2, 0, 0.6],
      speed: 2.25,
    },
  ],
}

type Props = {
  variant: 'thank-you' | 'homepage'
}

const Background = (props: Props) => {
  const { variant } = props

  return (
    <ErrorBoundary fallback={<BackgroundImage variant={variant} />}>
      <BackgroundWebGL variant={variant} />
    </ErrorBoundary>
  )
}

export { Background }

// WEBGL Background
const BackgroundWebGL = (props: Props) => {
  const { variant } = props
  const [isMounted, setIsMounted] = useState(false)

  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const entry = useIntersectionObserver(wrapperRef, {
    rootMargin: '0%',
  })

  const isVisible = !!entry?.isIntersecting
  const isFocused = useWindowFocus()

  return (
    <div className="absolute size-full">
      <motion.div
        animate={{
          opacity: isMounted ? 0 : 1,
        }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut',
        }}
        className="absolute left-0 top-0 z-0 size-full translate-y-px scale-[0.99]"
      >
        <Image
          priority
          src={
            variant === 'homepage'
              ? '/assets/placeholder.png'
              : '/assets/placeholder-thank-you.png'
          }
          alt="Keycard Placeholder"
          width={5478}
          height={2166}
          className="aspect-[5478/2166] h-[74.5%] w-full object-cover"
        />
      </motion.div>
      <motion.div
        ref={wrapperRef}
        animate={{
          opacity: isMounted ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut',
        }}
        className="absolute left-0 top-0 z-0 size-full"
      >
        <Canvas
          frameloop={isVisible && isFocused ? 'always' : 'demand'}
          onCreated={() => {
            setIsMounted(true)
          }}
          gl={{
            precision: 'lowp',
            preserveDrawingBuffer: true,
            powerPreference: 'low-power',
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
              focalLength={0.015}
              bokehScale={4}
            />
            <Vignette eskil={false} offset={0.55} darkness={1} />
          </EffectComposer>

          <group scale={2} position={[0, -10, 0]}>
            {cardsPositions[variant].map((card, index) => (
              <group key={index} position={card.position} scale={card.scale}>
                <KeycardModel
                  initialRotation={card.rotation}
                  speed={card.speed}
                />
              </group>
            ))}
          </group>
        </Canvas>
      </motion.div>
    </div>
  )
}

// Background image when webgl is not supported
const BackgroundImage = (props: Props) => {
  const { variant } = props
  return (
    <div className="absolute size-full">
      <Image
        src={
          variant === 'homepage'
            ? '/assets/placeholder.png'
            : '/assets/placeholder-thank-you.png'
        }
        alt="Keycard"
        width={5478}
        height={2166}
        className="aspect-[5478/2166] h-[74.5%] w-full translate-y-[2px] scale-[0.99] object-cover"
      />
    </div>
  )
}
