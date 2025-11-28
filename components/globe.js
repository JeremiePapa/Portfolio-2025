import { useRef, useMemo, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import * as THREE from "three"
import GlobeButtons from "./GlobeButtons"

function GlobeMesh({ size, shouldRotate }) {
  const globeRef = useRef()
  const targetScale = useRef(new THREE.Vector3(size, size, size))

  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader()
    return loader.load("/earth.jpg")
  }, [])

  useFrame(() => {
    if (!globeRef.current) return

    // Smooth rotation
    if (shouldRotate.current) {
      globeRef.current.rotation.y += 0.0015
    }

    // Smooth scaling animation
    targetScale.current.set(size, size, size)
    globeRef.current.scale.lerp(targetScale.current, 0.2)  
    // 0.1 = speed (0.05 slow, 0.2 fast)
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
    <mesh scale={10} raycast={null} >
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial
        color="#1a2cff"
        transparent
        opacity={0.05}
        side={THREE.BackSide}
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
  onSchedule
}) {
  console.log("STEP 2: Globe received onSchedule =", onSchedule);
  const shouldRotate = useRef(true)

  useEffect(() => {
    shouldRotate.current = !isPopupOpen
  }, [isPopupOpen])

  return (
    <Canvas
      camera={{ position: [0, 0, 6] }}
      dpr={[1, 1.5]}
      gl={{ antialias: true }}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: 1
      }}
    >
      <ambientLight intensity={4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />

      <GlowSphere />
      <GlobeMesh size={size} shouldRotate={shouldRotate} />

      <GlobeButtons
        onAbout={onAbout}
        onSkills={onSkills}
        onExperience={onExperience}
        onTools={onTools}
        onSchedule={onSchedule}
        scale={size}
      />

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={5}
        maxDistance={8}
      />
    </Canvas>
  )
}
