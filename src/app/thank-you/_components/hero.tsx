'use client'

import {
  Environment,
  PresentationControlProps,
  PresentationControls,
  useGLTF,
} from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Button } from '~components/button'
import { ButtonLink } from '~components/button-link'
import { GetNotifiedDialog } from '~components/get-notified-dialog'
import { cx } from 'cva'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'
import { Model } from './model'

useGLTF.preload('/assets/keycard-transformed.glb')

const presentationControls: PresentationControlProps = {
  config: { mass: 2, tension: 500 },
  snap: { mass: 4, tension: 150 },
  polar: [-Math.PI / 3, Math.PI / 3],
  azimuth: [-Math.PI / 1.4, Math.PI / 2],
}

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  return (
    <div
      className={cx(
        'relative flex min-h-[calc(100svh-16px)] flex-col justify-center overflow-clip',
      )}
    >
      <div className="z-10 flex w-fit self-center">
        <div className="relative px-5">
          <div className="z-10 flex select-none flex-col items-center">
            <h3 className="mb-3 text-center font-lora text-32 text-white-95">
              Thanks for choosing Keycard!
            </h3>

            <p className="max-w-[490px] pb-8 text-center text-20 font-300 text-white-80">
              You have successfully purchased a Keycard set. It will arrive
              shortly!
            </p>
            <ButtonLink variant="secondary" href="/">
              Continue exploring
            </ButtonLink>
          </div>
        </div>
      </div>

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{
            duration: 0.3,
            delay: 1,
          }}
          className="fixed left-0 top-0 z-0 h-svh w-full"
        >
          <Canvas ref={canvasRef}>
            <directionalLight
              color="white"
              intensity={100}
              position={[2, 0, 2]}
            />
            <ambientLight intensity={2} />
            <Environment preset="night" />
            <group position={[4.4, 2, 1]}>
              <PresentationControls {...presentationControls}>
                <Model rotation={[9, 3, 2.4]} scale={23} speed={0.3} />
              </PresentationControls>
            </group>

            <group position={[0, 2.2, 1]}>
              <PresentationControls {...presentationControls}>
                <Model rotation={[-0.4, -0.2, 2.4]} scale={30} speed={1} />
              </PresentationControls>
            </group>

            <group position={[-3.4, 0, 1.2]}>
              <PresentationControls {...presentationControls}>
                <Model rotation={[1.5, -2, 3]} scale={15} speed={1.3} />
              </PresentationControls>
            </group>

            <group position={[-2, -1.4, 0]}>
              <PresentationControls {...presentationControls}>
                <Model rotation={[0, 1.3, -1.2]} scale={24} speed={0.75} />
              </PresentationControls>
            </group>

            <group position={[2.9, -1.3, 0]}>
              <PresentationControls {...presentationControls}>
                <Model rotation={[-0.1, -0.3, 1.1]} scale={40} speed={0.25} />
              </PresentationControls>
            </group>

            <group position={[-5, 4, 1.5]}>
              <PresentationControls {...presentationControls}>
                <Model rotation={[-2, -2, -4.6]} scale={34} speed={1.45} />
              </PresentationControls>
            </group>
          </Canvas>
        </motion.div>
      </AnimatePresence>

      <div
        className={cx(
          'absolute bottom-10 left-1/2 z-40 flex -translate-x-1/2 flex-col items-start justify-between gap-2 bg-white-8 p-1 backdrop-blur-[20px]',
          'rounded-20 border border-white-12',
          'mx-auto w-full md:w-[570px] md:flex-row md:items-center md:gap-4 md:pr-4',
        )}
      >
        <div className="flex items-center gap-3">
          <Image
            src="/assets/thank-you.png"
            alt="Thank you"
            width={64}
            height={64}
          />
          <div className="flex flex-1 flex-col gap-0.5">
            <div className="font-lora text-20 text-white-95">
              Want to up your game?
            </div>
            <div className="text-16 font-300 text-white-80">
              Keycard Shell is coming 2025
            </div>
          </div>
        </div>

        <GetNotifiedDialog>
          <Button
            variant="primary"
            className="w-full justify-center md:w-fit md:justify-start"
          >
            Get notified
          </Button>
        </GetNotifiedDialog>
      </div>
    </div>
  )
}

export { Hero }
