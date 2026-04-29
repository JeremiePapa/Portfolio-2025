// components/TwinklingStars.js
import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function TwinklingStars({
  count = 2500,
  spread = 150,
  mouse
}) {
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

      if (mouse?.current) {
        material.current.uniforms.uMouse.value.set(
          mouse.current[0] * 10,
          mouse.current[1] * 10
        )
      }
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
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0, 0) }
        }}
        vertexShader={`
          uniform float uTime;
          uniform vec2 uMouse;

          varying float vTwinkle;

          void main() {
            vec3 pos = position;

            vTwinkle = fract(
              position.x * 12.0 +
              position.y * 7.0 +
              position.z * 5.0
            );

            // Mouse repel effect
            vec2 diff = pos.xy - uMouse;
            float dist = length(diff);

            if (dist < 4.0) {
              float force = (4.0 - dist) * 0.25;
              pos.xy += normalize(diff) * force;
            }

            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

            gl_PointSize =
              0.5 + sin(vTwinkle * 10.0 + uTime * 3.0) * 0.45;

            gl_PointSize *= (35.0 / -mvPosition.z);

            gl_Position =
              projectionMatrix * mvPosition;
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
