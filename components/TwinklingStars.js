// components/TwinklingStars.js
import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function TwinklingStars({ count = 2500, spread = 150 }) {
  const material = useRef()

  // Generate star positions
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * spread
    }
    return pos
  }, [count, spread])

  useFrame(({ clock }) => {
    if (material.current) {
      material.current.uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>

      <shaderMaterial
        ref={material}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          uTime: { value: 0 }
        }}
        vertexShader={`
          varying float vTwinkle;
          void main() {
            vTwinkle = fract(position.x * 12.0 + position.y * 7.0 + position.z * 5.0);
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = 4.0 + sin(vTwinkle * 10.0 + uTime * 3.0) * 3.0;
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          void main() {
            float d = length(gl_PointCoord - vec2(0.5));
            if (d > 0.5) discard;
            gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
          }
        `}
      />
    </points>
  )
}
