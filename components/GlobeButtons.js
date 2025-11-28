import { Billboard, Text } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useState, useRef, useMemo } from "react"
import * as THREE from "three"

function GlowButton({ label, position, onClick, scale }) {
  const [hovered, setHovered] = useState(false)
  const groupRef = useRef()

  // Random drifting personality for each button
  const floatConfig = useMemo(() => ({
    x: Math.random() * 10,
    y: Math.random() * 10,
    speed: 0.4 + Math.random() * 0.4,
    rotateSpeed: 0.002 + Math.random() * 0.003,
  }), [])

  useFrame(({ clock }) => {
    if (!groupRef.current) return

    const t = clock.getElapsedTime()

    // Floating position offsets
    const floatY = Math.sin(t * floatConfig.speed + floatConfig.y) * 0.02
    const floatX = Math.cos(t * floatConfig.speed + floatConfig.x) * 0.02

    // Apply floating movement
    groupRef.current.position.set(
      position[0] + floatX,
      position[1] + floatY,
      position[2]
    )

    // Gentle rotation wiggle
    groupRef.current.rotation.z = Math.sin(t * floatConfig.rotateSpeed) * 0.12

    // Hover scaling
    const targetScale = (hovered ? 1.15 : 1.0) * scale
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.12
    )
  })

  return (
    <Billboard position={position} follow={false} lockX={false} lockY={false}>
      <group
        ref={groupRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
        style={{ cursor: "pointer" }}
      >
        {/* Foreground Blue Button */}
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[1.6, 0.55]} />
          <meshBasicMaterial
            color={hovered ? "#3d6bff" : "#2a58ff"}
            transparent
            opacity={0.2}
          />
        </mesh>

        {/* Glow Layer */}
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[1.67, 0.62]} />
          <meshBasicMaterial
            transparent
            color={hovered ? "#0004ffff" : "#3bf7ff"}
            opacity={hovered ? .9 : .2}
          />
        </mesh>

        {/* Label */}
        <Text
          color="white"
          fontSize={0.22 * scale}
          anchorX="center"
          anchorY="middle"
          position={[0, 0, 0.02]}
        >
          {label}
        </Text>
      </group>
    </Billboard>
  )
}

export default function GlobeButtons({
  onAbout,
  onSkills,
  onExperience,
  onTools,
  onSchedule,
  scale
}) {
  const pos = scale
  const sz = scale

  return (
    <>
      <GlowButton
        label="About"
        position={[0, .8 * pos, 0]}
        scale={sz}
        onClick={onAbout}
      />

      <GlowButton
        label="Skills"
        position={[-1 * pos, 0.05 * pos, 0]}
        scale={sz}
        onClick={onSkills}
      />

      <GlowButton
        label="Tools"
        position={[1 * pos, 0.05 * pos, 0]}
        scale={sz}
        onClick={onTools}
      />

      <GlowButton
        label="Experience"
        position={[-0.5 * pos, -.8 * pos, 0]}
        scale={sz}
        onClick={onExperience}
      />

      <GlowButton
        label="Schedule"
        position={[0.5 * pos, -.8 * pos, 0]}
        scale={sz}
        onClick={() => {
          console.log("SCHEDULE BUTTON CLICKED")
          onSchedule()
        }}
      />
    </>
  )
}
