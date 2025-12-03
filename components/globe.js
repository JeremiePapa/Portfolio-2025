// components/Globe.js
import { useRef, useMemo, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import * as THREE from "three"

import GlobeButtons from "./GlobeButtons"
import FloatingTitle from "./FloatingTitle"

import TwinklingStars from "./TwinklingStars"
import StarField from "./StarField"


function GlobeMesh({ size, shouldRotate }) {
  const globeRef = useRef()
  const targetScale = useRef(new THREE.Vector3(size, size, size))

  const texture = useMemo(() => {
    return new THREE.TextureLoader().load("/earth2.webp")
  }, [])

  useFrame(() => {
    if (!globeRef.current) return

    if (shouldRotate.current) {
      globeRef.current.rotation.y += 0.01
    }

    targetScale.current.set(size, size, size)
    globeRef.current.scale.lerp(targetScale.current, 0.2)
  })

  return (
    <mesh ref={globeRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial map={texture} roughness={0.9} metalness={0.1} />
    </mesh>
  )
}

function GlowSphere() {
  return (
    <mesh scale={10} raycast={null}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial
        color="#1a2cff"
        transparent
        opacity={0.03}   // LOWER opacity
        side={THREE.BackSide}
        depthWrite={false}  // ⭐ does NOT block stars
      />
    </mesh>
  )
}

export default function Globe({
  size,
  isPopupOpen,
  onAbout,
  onSkills,
  onExperience,
  onTools,
  onSchedule,
}) {
  const shouldRotate = useRef(true)
  const mouse = useRef([0, 0])

  useEffect(() => {
    shouldRotate.current = !isPopupOpen
  }, [isPopupOpen])

  return (
    <Canvas
      camera={{ position: [0, 0, 6] }}
      dpr={[1, 1.5]}
      gl={{ antialias: true }}
      onPointerMove={(e) => {
        const x = (e.clientX / window.innerWidth) * 2 - 1
        const y = -(e.clientY / window.innerHeight) * 2 + 1
        mouse.current = [x * 0.1, y * 0.1]
      }}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: 1,
      }}
    >
      {/* ⭐ Base Starfield (always visible) */}
      <Stars
        radius={120}
        depth={80}
        count={9000}
        factor={2.5}
        saturation={0}
        fade
      />

      {/* ⭐ Parallax Stars + Shooting Stars */}
      <StarField mouse={mouse} />

      {/* Lighting */}
      <ambientLight intensity={4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />


      {/* Background glow behind everything */}
      <GlowSphere />

      {/* 3D Title */}
      <FloatingTitle />

      {/* Globe */}
      <GlobeMesh size={size} shouldRotate={shouldRotate} />

      {/* Buttons */}
      <GlobeButtons
        onAbout={onAbout}
        onSkills={onSkills}
        onExperience={onExperience}
        onTools={onTools}
        onSchedule={onSchedule}
        scale={size}
      />

      <OrbitControls enablePan={false} enableZoom minDistance={5} maxDistance={8} />
    </Canvas>
  )
}
