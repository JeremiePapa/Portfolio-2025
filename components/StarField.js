// components/StarField.js
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import TwinklingStars from "./TwinklingStars"

export default function StarField({ mouse }) {
  const starGroup = useRef()

  useFrame(() => {
    if (starGroup.current) {
      starGroup.current.rotation.y = mouse.current[0]
      starGroup.current.rotation.x = mouse.current[1]
    }
  })

  return (
    <group ref={starGroup} position={[0, 0, 2]}>
      <TwinklingStars count={1500} spread={40} />
      <TwinklingStars count={1000} spread={50} />
    </group>
  )
}
