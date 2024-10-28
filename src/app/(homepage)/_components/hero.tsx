'use client'

import { Environment, PresentationControls, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { ButtonLink } from '~components/button-link'
import { Model } from './model'

const Hero = () => {
  useGLTF.preload('/assets/keycard-transformed.glb')

  return (
    <section className="relative flex w-full overflow-clip rounded-t-28 border border-white-6 bg-white-3 px-[72px] py-20">
      <div className="container relative z-10 flex max-w-[434px] flex-col px-4">
        <p className="pb-2 text-24 font-600 text-white-95">keycard</p>
        <h1 className="flex pb-4 font-lora text-48 font-400">
          Best in class <br /> secure element
        </h1>
        <p className="pb-8 text-20 font-300 text-white-80">
          Something will say here about this product. Certainly, you don&apos;t
          want to miss it.
        </p>
        <div className="flex space-x-4">
          <ButtonLink href="/">Buy Keycard</ButtonLink>
          <ButtonLink href="/" variant="secondary">
            Learn more
          </ButtonLink>
        </div>
        <p className="pt-6 text-16 font-300 text-white-60">Starts from $25</p>
      </div>
      <div className="min-h-full flex-1">
        <Canvas shadows camera={{ position: [6, 0, 10], fov: 30 }}>
          <ambientLight intensity={3.6} />
          <directionalLight
            color="white"
            intensity={100}
            position={[2, 0, 2]}
          />

          <PresentationControls
            global
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 150 }}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 2]}
          >
            <Model
              rotation={[0, Math.PI, 0]}
              position={[0, 1, 0]}
              scale={84.495}
            />
          </PresentationControls>

          <Environment preset="night" />
        </Canvas>
      </div>
    </section>
  )
}

export { Hero }
