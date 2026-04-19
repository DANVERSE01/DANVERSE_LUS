'use client';

import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, MeshDistortMaterial, Environment, Float, Sparkles } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { motion } from 'motion/react';
import * as THREE from 'three';

const orbVertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  uniform float uTime;
  uniform float uDistort;
  
  // Fast procedural noise
  float hash(vec3 p) {
    p = fract(p * 0.3183099 + .1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }
  
  float noise(in vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
                   mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
               mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
                   mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
  }

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    
    // Liquid displacement
    float n = noise(position * 1.5 + uTime * 0.5);
    vec3 newPosition = position + normal * n * uDistort;
    
    vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
    vPosition = newPosition;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const orbFragmentShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;

  void main() {
    vec3 viewDirection = normalize(cameraPosition - vPosition);
    float fresnel = clamp(1.0 - dot(vNormal, viewDirection), 0.0, 1.0);
    fresnel = pow(fresnel, 1.5);

    // Color mixing based on world position and time
    float mix1 = sin(vPosition.x * 2.0 + uTime) * 0.5 + 0.5;
    float mix2 = cos(vPosition.y * 2.0 - uTime) * 0.5 + 0.5;
    
    vec3 baseCol = mix(uColor1, uColor2, mix1);
    vec3 finalCol = mix(baseCol, uColor3, mix2);
    
    // Highlight edges (Lusion glass feel)
    finalCol += finalCol * fresnel * 1.5;

    gl_FragColor = vec4(finalCol, 0.9);
  }
`;

function CoreObject() {
  const groupRef = useRef<THREE.Group>(null);
  const orbMaterialRef = useRef<THREE.ShaderMaterial>(null);
  
  // Custom spring states
  const posSpring = useRef({ x: 0, y: 0, vx: 0, vy: 0 });
  const distSpring = useRef({ val: 0.2, vel: 0 });
  const lastMouse = useRef({ x: 0, y: 0 });

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uDistort: { value: 0.2 },
    uColor1: { value: new THREE.Color('#FF1040') }, // Danverse
    uColor2: { value: new THREE.Color('#9D00FF') }, // Purple
    uColor3: { value: new THREE.Color('#00FFCC') }  // Cyan
  }), []);

  useFrame((state) => {
    // 1. Cursor velocity
    const vX = state.pointer.x - lastMouse.current.x;
    const vY = state.pointer.y - lastMouse.current.y;
    const velocity = Math.sqrt(vX * vX + vY * vY);
    lastMouse.current.x = state.pointer.x;
    lastMouse.current.y = state.pointer.y;

    const stiffness = 0.04;
    const damping = 0.82;

    // Distortion squish on fast movement
    const targetDistort = 0.2 + Math.min(velocity * 8, 1.0);
    distSpring.current.vel += (targetDistort - distSpring.current.val) * 0.1;
    distSpring.current.vel *= 0.85;
    distSpring.current.val += distSpring.current.vel;

    if (groupRef.current) {
      // Magnetic Position
      const targetX = (state.pointer.x * state.viewport.width) / 5;
      const targetY = (state.pointer.y * state.viewport.height) / 5;

      posSpring.current.vx += (targetX - posSpring.current.x) * stiffness;
      posSpring.current.vy += (targetY - posSpring.current.y) * stiffness;
      posSpring.current.vx *= damping;
      posSpring.current.vy *= damping;

      posSpring.current.x += posSpring.current.vx;
      posSpring.current.y += posSpring.current.vy;

      groupRef.current.position.x = posSpring.current.x;
      groupRef.current.position.y = posSpring.current.y;

      groupRef.current.rotation.x += velocity * 0.2 + 0.002;
      groupRef.current.rotation.y += velocity * 0.2 + 0.003;
    }

    if (orbMaterialRef.current) {
      orbMaterialRef.current.uniforms.uDistort.value = distSpring.current.val;
      orbMaterialRef.current.uniforms.uTime.value = state.clock.elapsedTime * 0.8 + velocity * 2.0;
    }
  });

  return (
    <Float floatIntensity={1} speed={1} rotationIntensity={0.2}>
      <group ref={groupRef} scale={1.8}>
        {/* Lusion style dense fluid orb */}
        <mesh>
          <sphereGeometry args={[1, 128, 128]} />
          <shaderMaterial
            ref={orbMaterialRef}
            vertexShader={orbVertexShader}
            fragmentShader={orbFragmentShader}
            uniforms={uniforms}
            transparent
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>
    </Float>
  );
}

function InfiniteTunnel() {
  const tunnelRef = useRef<THREE.Group>(null);
  const ringsCount = 50;
  
  useFrame((state) => {
    // Scroll progress drives camera into the tunnel
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0;
    
    // Smooth aggressive camera drive deep into Z
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 7 - (scrollProgress * 50), 0.05);

    if (tunnelRef.current) {
      // Tunnel slow rotational breathing
      tunnelRef.current.rotation.z = state.clock.elapsedTime * 0.02 + scrollProgress * 1.5;
    }
  });

  return (
    <group ref={tunnelRef} position={[0, 0, -20]}>
      {Array.from({ length: ringsCount }).map((_, i) => {
        const zPos = -i * 1.8;
        // Exponential scale down to create forced perspective
        const scale = 1 + (i * 0.12); 
        
        // Let's create varying ring appearances for a foggy/ethereal look
        const color = i % 3 === 0 ? "#FF1040" : i % 2 === 0 ? "#9D00FF" : "#00FFCC";
        
        return (
          <mesh key={i} position={[0, 0, zPos]} scale={[scale, scale, 1]}>
            <torusGeometry args={[10, 0.05 + (i * 0.01), 32, 100]} />
            <meshBasicMaterial 
              color={color} 
              transparent 
              opacity={(1 - (i / ringsCount)) * 0.3} 
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export function Hero({ isReady = true }: { isReady?: boolean }) {
  return (
    <section className="relative w-full h-screen flex items-center justify-center bg-transparent">
      {/* GLOBAL WebGL Background */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isReady ? 1 : 0 }}
        transition={{ duration: 3 }}
        className="fixed inset-0 z-[-10] pointer-events-none"
      >
        <Canvas camera={{ position: [0, 0, 7], fov: 45 }} dpr={[1, 2]}>
          <color attach="background" args={['#020202']} />
          <ambientLight intensity={0.5} />
          {/* Lusion style ambient colors */}
          <directionalLight position={[10, 10, 5]} intensity={2} color="#9D00FF" /> {/* Purple */}
          <directionalLight position={[-10, -10, -5]} intensity={3} color="#00FFCC" /> {/* Cyan */}
          <directionalLight position={[0, -10, 5]} intensity={2} color="#FF1040" /> {/* Pink */}
          
          <Suspense fallback={null}>
            <CoreObject />
            <InfiniteTunnel />
            <Environment preset="night" />
            <Sparkles count={500} scale={20} size={0.8} speed={0.4} opacity={0.6} color="#ffffff" />
            
            {/* Cinematic Post Processing */}
            {/* @ts-ignore */}
            {typeof window !== 'undefined' && (
              <EffectComposer enableNormalPass={false}>
                <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} intensity={2.0} mipmapBlur />
                <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={new THREE.Vector2(0.002, 0.002)} />
              </EffectComposer>
            )}
          </Suspense>
        </Canvas>
      </motion.div>

      <div className="absolute inset-0 z-0 bg-gradient-to-b from-void/10 via-transparent to-void pointer-events-none" />
      <div className="noise-overlay" />
      
      {/* Content */}
      <div className="relative z-20 w-full h-full flex flex-col items-center justify-center pointer-events-none px-6">
        
        <motion.div
           initial={{ opacity: 0, scale: 0.95, filter: 'blur(20px)', y: 20 }}
           animate={{ 
             opacity: isReady ? 1 : 0, 
             scale: isReady ? 1 : 0.95,
             filter: isReady ? 'blur(0px)' : 'blur(20px)',
             y: isReady ? 0 : 20
           }}
           transition={{ delay: 0.5, duration: 2, ease: [0.16, 1, 0.3, 1] }}
           className="w-full text-center flex flex-col items-center justify-center mt-20"
        >
           <h1 className="font-sans text-[60px] md:text-[140px] lg:text-[180px] font-medium tracking-tight leading-[0.9] text-titanium drop-shadow-2xl mb-5 mix-blend-plus-lighter">
             Ideas, Brought<br className="hidden md:block"/>to Life
           </h1>
        </motion.div>
        
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: isReady ? 1 : 0 }}
           transition={{ delay: 1.5, duration: 2 }}
           className="absolute bottom-10 left-10 md:left-24 flex flex-col gap-2 text-titanium/60 font-sans text-sm tracking-wide mix-blend-plus-lighter max-w-sm"
        >
           <p>We combine design, motion, 3D, and development to create digital experiences that feel visually striking and technically seamless.</p>
        </motion.div>
      </div>
    </section>
  );
}
