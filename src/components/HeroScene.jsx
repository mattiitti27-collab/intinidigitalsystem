import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { MeshTransmissionMaterial, Environment, Float } from '@react-three/drei'
import * as THREE from 'three'

/* ── Shader per distorsione organica del TorusKnot ─────────── */
const vertexShader = `
  uniform float uTime;
  uniform float uStrength;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;

  vec3 snoiseGrad(vec3 p) {
    return vec3(
      sin(p.y * 2.1 + uTime * 0.3) * 0.5,
      cos(p.z * 1.8 + uTime * 0.25) * 0.5,
      sin(p.x * 1.6 + uTime * 0.2) * 0.5
    );
  }

  void main() {
    vUv = uv;
    vNormal = normal;
    vPosition = position;

    vec3 displaced = position + normal * snoiseGrad(position) * uStrength;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;

  void main() {
    vec3 normal = normalize(vNormal);
    float fresnel = pow(1.0 - abs(dot(normal, vec3(0.0, 0.0, 1.0))), 2.5);

    vec3 goldTint  = vec3(0.79, 0.66, 0.43);
    vec3 darkBase  = vec3(0.04, 0.04, 0.05);
    vec3 blueTint  = vec3(0.1, 0.12, 0.28);

    float t = sin(uTime * 0.15 + vPosition.y * 2.0) * 0.5 + 0.5;
    vec3 color = mix(darkBase, mix(blueTint, goldTint, t), fresnel * 1.4);

    gl_FragColor = vec4(color, 1.0);
  }
`

/* ── La forma principale: MetalKnot ────────────────────────── */
function MetalKnot({ mouseRef }) {
  const meshRef  = useRef()
  const matRef   = useRef()
  const targetRot = useRef({ x: 0, y: 0 })

  const uniforms = useMemo(() => ({
    uTime:     { value: 0 },
    uStrength: { value: 0.06 },
  }), [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    // Uniform time
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = t
    }

    // Rotazione base + reazione mouse
    if (meshRef.current) {
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      targetRot.current.x += (my * 0.35 - targetRot.current.x) * 0.04
      targetRot.current.y += (mx * 0.45 - targetRot.current.y) * 0.04

      meshRef.current.rotation.x = targetRot.current.x + t * 0.07
      meshRef.current.rotation.y = targetRot.current.y + t * 0.12
      meshRef.current.rotation.z = t * 0.04
    }
  })

  return (
    <Float
      speed={0.8}
      rotationIntensity={0.15}
      floatIntensity={0.25}
      floatingRange={[-0.08, 0.08]}
    >
      <mesh ref={meshRef} castShadow>
        <torusKnotGeometry args={[1, 0.34, 256, 64, 2, 3]} />
        <shaderMaterial
          ref={matRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          side={THREE.FrontSide}
        />
      </mesh>
    </Float>
  )
}

/* ── Particelle di polvere ambientale ───────────────────────── */
function DustParticles() {
  const ref    = useRef()
  const count  = 280

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 12
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    return arr
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.015
      ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.008) * 0.1
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#c9a96e"
        transparent
        opacity={0.28}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

/* ── Rings ambientali ───────────────────────────────────────── */
function AmbientRings() {
  const ref1 = useRef()
  const ref2 = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (ref1.current) {
      ref1.current.rotation.z = t * 0.06
      ref1.current.rotation.x = Math.sin(t * 0.04) * 0.3
    }
    if (ref2.current) {
      ref2.current.rotation.z = -t * 0.04
      ref2.current.rotation.y = t * 0.03
    }
  })

  return (
    <>
      <mesh ref={ref1} position={[0, 0, -1]}>
        <torusGeometry args={[2.4, 0.008, 16, 200]} />
        <meshBasicMaterial color="#c9a96e" transparent opacity={0.08} />
      </mesh>
      <mesh ref={ref2} position={[0, 0, -0.5]} rotation={[0.6, 0, 0]}>
        <torusGeometry args={[3.1, 0.005, 16, 200]} />
        <meshBasicMaterial color="#2a2a5a" transparent opacity={0.15} />
      </mesh>
    </>
  )
}

/* ── Luci Sceniche ──────────────────────────────────────────── */
function Lights() {
  const ref1 = useRef()
  const ref2 = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (ref1.current) {
      ref1.current.position.x = Math.sin(t * 0.25) * 3
      ref1.current.position.y = Math.cos(t * 0.2) * 2
    }
    if (ref2.current) {
      ref2.current.position.x = -Math.sin(t * 0.18) * 3
      ref2.current.position.z = Math.cos(t * 0.22) * 2
    }
  })

  return (
    <>
      {/* Luce oro scura — fill principale */}
      <pointLight
        ref={ref1}
        color="#8a6030"
        intensity={4}
        distance={12}
        decay={2}
        position={[3, 2, 3]}
      />
      {/* Luce indigo/notte — rim light drammatico */}
      <pointLight
        ref={ref2}
        color="#1a1a4a"
        intensity={8}
        distance={14}
        decay={1.8}
        position={[-3, -1, 2]}
      />
      {/* Luce fredda quasi-bianca — highlight speculare */}
      <pointLight
        color="#c0c8e0"
        intensity={2}
        distance={8}
        position={[0, 4, 1]}
      />
      {/* Ambient minimo */}
      <ambientLight color="#0a0810" intensity={0.4} />
    </>
  )
}

/* ── Camera Rig con mouse parallax ─────────────────────────── */
function CameraRig({ mouseRef }) {
  const { camera } = useThree()
  const target = useRef({ x: 0, y: 0 })

  useFrame(() => {
    target.current.x += (mouseRef.current.x * 0.5 - target.current.x) * 0.025
    target.current.y += (-mouseRef.current.y * 0.3 - target.current.y) * 0.025
    camera.position.x = target.current.x
    camera.position.y = target.current.y
    camera.lookAt(0, 0, 0)
  })

  return null
}

/* ── Export: HeroScene ──────────────────────────────────────── */
export default function HeroScene({ mouseRef }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 45 }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      }}
    >
      <CameraRig mouseRef={mouseRef} />
      <Lights />
      <DustParticles />
      <AmbientRings />
      <MetalKnot mouseRef={mouseRef} />
    </Canvas>
  )
}
