'use client'

import { Environment, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Button } from '~components/button'
import { ButtonLink } from '~components/button-link'
import { GetNotifiedDialog } from '~components/get-notified-dialog'
import { cx } from 'cva'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { Model } from './model'

useGLTF.preload('/assets/keycard-transformed.glb')

const Hero = () => {
  return (
    <div
      className={cx(
        'relative flex h-[calc(100svh-261px-20px)] flex-col justify-center',
      )}
    >
      <div className="relative z-40">
        <div className="relative grid place-items-center px-5">
          <div className="z-10 flex flex-col items-center">
            <h3 className="mb-3 text-center font-lora text-32 text-white-95">
              Thanks for choosing Keycard!
            </h3>

            <p className="mb-10 max-w-[490px] text-center text-20 font-300 text-white-80">
              You have successfully purchased a Keycard set. It will arrive
              shortly!
            </p>
            <ButtonLink variant="secondary" href="/">
              Continue exploring
            </ButtonLink>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute z-30 size-full backdrop-blur-sm" />
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2, delay: 0.3 }}
          className="absolute -top-1/3 left-0 z-30 size-full flex-1"
        >
          <Canvas shadows>
            <ambientLight intensity={3.6} />
            <directionalLight
              color="white"
              intensity={100}
              position={[2, 0, 2]}
            />

            <Model rotation={[-0.8, -0.3, 2.2]} scale={35} />

            <Environment preset="night" />
          </Canvas>
        </motion.div>
      </AnimatePresence>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2, delay: 0.6 }}
          className="absolute -left-1/4 top-1/3 z-20 size-full flex-1"
        >
          <Canvas shadows>
            <ambientLight intensity={1} />
            <directionalLight
              color="white"
              intensity={100}
              position={[2, 0, 2]}
            />

            <Model rotation={[0.8, 10, 2]} scale={40} />

            <Environment preset="night" />
          </Canvas>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2, delay: 0.5 }}
          className="absolute left-1/3 top-1/4 z-30 size-full flex-1"
        >
          <Canvas shadows>
            <ambientLight intensity={3.6} />
            <directionalLight
              color="white"
              intensity={100}
              position={[2, 0, 2]}
            />

            <Model rotation={[0, 0, 0.6]} scale={50} />

            <Environment preset="night" />
          </Canvas>
        </motion.div>
      </AnimatePresence>
      <div
        className={cx(
          'absolute bottom-10 left-1/2 z-40 flex -translate-x-1/2 flex-col items-start justify-between gap-2 bg-white-8 p-1',
          'rounded-20 border border-white-12',
          'mx-auto w-full md:w-[570px] md:flex-row md:items-center md:gap-4 md:pr-4',
        )}
      >
        <div className="flex items-center gap-3">
          <Image
            src="/assets/sign-up-teaser.png"
            alt="Sign up teaser"
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
