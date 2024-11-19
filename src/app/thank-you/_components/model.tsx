'use client'

import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Cube002: THREE.Mesh
    Cube002_1: THREE.Mesh
    Cube002_2: THREE.Mesh
  }
  materials: {
    ['Card.image.001']: THREE.MeshStandardMaterial
    ['Card.light.001']: THREE.MeshStandardMaterial
    ['Material.001']: THREE.MeshStandardMaterial
  }
}

export function Model(
  props: JSX.IntrinsicElements['group'] & { speed: number },
) {
  const { speed, ...rest } = props
  const { nodes, materials } = useGLTF(
    'assets/keycard-transformed.glb',
  ) as GLTFResult

  const group = useRef<THREE.Group>(null)

  useFrame(state => {
    const t = state.clock.getElapsedTime() * 0.5

    if (group.current) {
      group.current.position.y = Math.sin(t * (speed * 1.5)) * 0.25
    }
  })

  return (
    <group ref={group} {...rest}>
      <group>
        <mesh
          geometry={nodes.Cube002.geometry}
          material={materials['Card.image.001']}
        />
        <mesh
          geometry={nodes.Cube002_1.geometry}
          material={materials['Card.light.001']}
        />
        <mesh
          geometry={nodes.Cube002_2.geometry}
          material={materials['Material.001']}
        />
      </group>
    </group>
  )
}
