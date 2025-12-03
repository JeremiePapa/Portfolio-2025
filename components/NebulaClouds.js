// components/NebulaClouds.js
import { useFrame, useLoader } from "@react-three/fiber"
import * as THREE from "three"
import { useRef } from "react"

export default function NebulaClouds() {
  const texture = useLoader(THREE.TextureLoader, "/nebula.png")
  const ref = useRef()

  useFrame(({ clock }) => {
    ref.current.rotation.z = clock.getElapsedTime() * 0.02
  })

  return (
    <mesh ref={ref} scale={40} position={[0, 0, -30]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={0.3}
        depthWrite={false}
      />
    </mesh>
  )
}
