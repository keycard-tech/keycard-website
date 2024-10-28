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

export function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(
    'assets/keycard-transformed.glb',
  ) as GLTFResult

  const group = useRef<THREE.Group>(null)

  useFrame(state => {
    const t = state.clock.getElapsedTime()

    if (group.current) {
      // Floating up and down animation
      group.current.position.y = Math.sin(t * 2) * 0.1

      // Smooth rotation on all axes
      group.current.rotation.x = Math.cos(t / 4) / 20
      group.current.rotation.y = Math.sin(t / 2) / 20
      group.current.rotation.z = Math.sin(t / 4) / 30
    }
  })

  return (
    <group ref={group} {...props} dispose={null}>
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
