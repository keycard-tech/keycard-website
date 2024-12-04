'use client'

import { useGLTF } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

extend({ meshTransmissionMaterial: THREE.Mesh })

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

const KeycardModel = (
  props: React.ComponentProps<'group'> & {
    speed: number
    initialRotation?: [number, number, number]
  },
) => {
  const { speed, initialRotation = [0, 0, 0], ...rest } = props
  const { nodes, materials } = useGLTF('assets/keycard-model.glb') as GLTFResult

  const group = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  const initialRotationRef = useRef(new THREE.Euler(...initialRotation))
  const currentRotation = useRef(new THREE.Euler(...initialRotation))
  const modelPosition = useRef(new THREE.Vector3())

  useEffect(() => {
    if (group.current) {
      group.current.rotation.set(...initialRotation)
      currentRotation.current.set(...initialRotation)
    }
  }, [initialRotation])

  useFrame(state => {
    if (!group.current) return

    const t = state.clock.getElapsedTime() * 0.5
    group.current.position.y = Math.sin(t * (speed * 1.5)) * 0.25

    if (hovered) {
      group.current.getWorldPosition(modelPosition.current)

      const screenX = ((state.pointer.x + 1) / 2) * state.viewport.width
      const screenY = ((state.pointer.y + 1) / 2) * state.viewport.height

      const maxRotation = THREE.MathUtils.degToRad(30)

      const rotX = THREE.MathUtils.clamp(
        ((screenY - state.viewport.height / 2) / state.viewport.height) *
          maxRotation *
          1.5,
        -maxRotation,
        maxRotation,
      )
      const rotY = THREE.MathUtils.clamp(
        ((screenX - state.viewport.width / 2) / state.viewport.width) *
          maxRotation *
          1.5,
        -maxRotation,
        maxRotation,
      )

      currentRotation.current.x = initialRotationRef.current.x + rotX
      currentRotation.current.y = initialRotationRef.current.y + rotY
      currentRotation.current.z = initialRotationRef.current.z
    } else {
      currentRotation.current.x = THREE.MathUtils.lerp(
        currentRotation.current.x,
        initialRotationRef.current.x,
        0.15,
      )
      currentRotation.current.y = THREE.MathUtils.lerp(
        currentRotation.current.y,
        initialRotationRef.current.y,
        0.15,
      )
      currentRotation.current.z = THREE.MathUtils.lerp(
        currentRotation.current.z,
        initialRotationRef.current.z,
        0.15,
      )
    }

    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      currentRotation.current.x,
      0.2,
    )
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      currentRotation.current.y,
      0.2,
    )
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      currentRotation.current.z,
      0.2,
    )
  })

  return (
    <group
      ref={group}
      scale={100}
      {...rest}
      onPointerOver={e => {
        e.stopPropagation()
        setHovered(true)
      }}
      onPointerOut={e => {
        e.stopPropagation()
        setHovered(false)
      }}
    >
      <group>
        <mesh
          castShadow
          geometry={nodes.Cube002.geometry}
          material={materials['Card.image.001']}
        />
        <mesh
          castShadow
          geometry={nodes.Cube002_1.geometry}
          material={materials['Card.light.001']}
        />
        <mesh
          castShadow
          geometry={nodes.Cube002_2.geometry}
          material={materials['Material.001']}
        />
      </group>
    </group>
  )
}

export { KeycardModel }
