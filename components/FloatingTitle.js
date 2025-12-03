// components/FloatingTitle.js
import { useRef, useState, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Text3D, Center } from "@react-three/drei"
import * as THREE from "three"

export default function FloatingTitle() {
  const ref = useRef()
  const shimmerMaterial = useRef()

  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  )

  useEffect(() => {
    const onResize = () => setScreenWidth(window.innerWidth)
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  const { viewport } = useThree()
  const isMobile = screenWidth < 480
  const isTablet = screenWidth >= 480 && screenWidth < 768

    // Responsive + clamped text size
    let FONT_SIZE = viewport.width * 0.12

    // Prevent too small or too large sizes
    FONT_SIZE = Math.max(0.20, Math.min(FONT_SIZE, 0.65))


    // Better vertical spacing for all screen sizes
    const Y_POSITION = 3.2 + (viewport.height * 0.05)



    // Animate floating + shimmering
    useFrame(({ clock }) => {
        const t = clock.getElapsedTime()

    // FLOATING
    ref.current.position.y = Y_POSITION + Math.sin(t * 0.8) * 0.25

    // SHIMMER TIMING
    const shineDuration = 5.3    // full sweep across text
    const pauseDuration = 4.0    // no shine
    const cycle = shineDuration + pauseDuration
    const cycleTime = t % cycle

    if (shimmerMaterial.current) {
      if (cycleTime < shineDuration) {
        // Shine ON — animate normally
        shimmerMaterial.current.uniforms.uActive.value = 1.0
        shimmerMaterial.current.uniforms.uTime.value = cycleTime
      } else {
        // Shine OFF — freeze shimmer completely
        shimmerMaterial.current.uniforms.uActive.value = 0.0
      }
    }
  })

  // ⭐ SHADER with uActive (controls ON/OFF shine)
  const ShimmerShader = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uActive: { value: 1 }, // 1 = shine on, 0 = shine off
      baseColor: { value: new THREE.Color("#00c8ff") },
      highlight: { value: new THREE.Color("#ffffff") },
    },
    vertexShader: `
      varying vec3 vPos;
      void main() {
        vPos = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform float uActive;
      uniform vec3 baseColor;
      uniform vec3 highlight;
      varying vec3 vPos;

      void main() {
        // diagonal sweep pattern
        float diagonal = (vPos.x * 1.0 + vPos.y * 1.2);
        float sweep = sin(diagonal + uTime * 2.0);

        // thin streak
        float thinBand = smoothstep(0.15, 0.25, sweep);

        // end sparkle
        float sparkle = pow(smoothstep(0.7, 1.0, sweep), 6.0);

        // combine
        vec3 finalColor = baseColor;

        // apply shine ONLY if uActive == 1
        finalColor += highlight * thinBand * 0.2 * uActive;
        finalColor += highlight * sparkle * 1.0 * uActive;

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `,
  })

  shimmerMaterial.current = ShimmerShader

  return (
    <group ref={ref}
    position={[0, Y_POSITION, 0]}
    rotation={[0.45, 0, 0]}   // ← tilt downward
    key={`title-${screenWidth}`}>
      <Center>

        {/* OUTLINE */}
        <Text3D
          font="/fonts/helvetiker_bold.typeface.json"
          size={FONT_SIZE}
          height={0.17}
          bevelEnabled
          bevelThickness={0.01}
          bevelSize={0.05}
          bevelSegments={4}
        >
          3D Portfolio
          <meshStandardMaterial color="#2a0e7cff" />
        </Text3D>

        {/* MAIN SHIMMER TEXT */}
        <Text3D
          font="/fonts/helvetiker_bold.typeface.json"
          size={FONT_SIZE}
          height={0.1}
          bevelEnabled
          bevelThickness={0.1}
          bevelSize={0.01}
          bevelSegments={1}
          position={[0, 0, 0.01]}
        >
          3D Portfolio
          <primitive object={ShimmerShader} />
        </Text3D>

      </Center>
    </group>
  )
}
