import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, Stars, Torus } from '@react-three/drei';

function OrbitingSystem({ compact = false }) {
  const root = useRef();
  const core = useRef();
  const ringA = useRef();
  const ringB = useRef();
  const ringC = useRef();
  const satelliteA = useRef();
  const satelliteB = useRef();
  const satelliteC = useRef();

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime;
    if (root.current) root.current.rotation.y += delta * (compact ? 0.07 : 0.12);
    if (core.current) {
      core.current.rotation.x += delta * 0.16;
      core.current.rotation.y += delta * 0.23;
      core.current.position.y = Math.sin(t * 0.8) * 0.09;
    }
    if (ringA.current) { ringA.current.rotation.x = 0.95 + Math.sin(t * 0.24) * 0.08; ringA.current.rotation.y = t * 0.12; }
    if (ringB.current) { ringB.current.rotation.x = 1.7; ringB.current.rotation.y = -t * 0.17; ringB.current.rotation.z = 0.35; }
    if (ringC.current) { ringC.current.rotation.x = 0.25; ringC.current.rotation.y = t * 0.09; ringC.current.rotation.z = t * 0.1; }
    const orbit = (ref, radius, speed, phase) => {
      if (!ref.current) return;
      ref.current.position.set(Math.cos(t * speed + phase) * radius, Math.sin(t * speed * 1.4 + phase) * radius * 0.42, Math.sin(t * speed + phase) * radius * 0.7);
      ref.current.rotation.x += delta * 0.5;
      ref.current.rotation.y += delta * 0.7;
    };
    orbit(satelliteA, 1.62, 0.48, 0.2);
    orbit(satelliteB, 1.95, -0.34, 2.4);
    orbit(satelliteC, 1.4, 0.28, 4.1);
  });

  return <group ref={root} scale={compact ? 0.72 : 1}>
    <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.16}>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.72, 2]} />
        <meshPhysicalMaterial color="#e9f4ff" metalness={0.68} roughness={0.17} clearcoat={1} clearcoatRoughness={0.12} emissive="#174e78" emissiveIntensity={0.45} />
      </mesh>
      <mesh rotation={[0.25, 0.4, 0]} scale={1.035}>
        <icosahedronGeometry args={[0.72, 1]} />
        <meshBasicMaterial color="#7ce8f2" wireframe transparent opacity={0.52} />
      </mesh>
    </Float>
    <Torus ref={ringA} args={[1.2, 0.018, 12, 160]}>
      <meshStandardMaterial color="#e8bd5a" metalness={0.75} roughness={0.24} emissive="#8a5b19" emissiveIntensity={0.45} />
    </Torus>
    <Torus ref={ringB} args={[1.48, 0.012, 10, 160]}>
      <meshStandardMaterial color="#68dbe8" metalness={0.7} roughness={0.22} emissive="#147f9a" emissiveIntensity={0.6} />
    </Torus>
    <Torus ref={ringC} args={[1.72, 0.008, 8, 160]}>
      <meshStandardMaterial color="#b6c9ed" metalness={0.5} roughness={0.3} transparent opacity={0.48} />
    </Torus>
    <mesh ref={satelliteA}>
      <octahedronGeometry args={[0.16, 1]} />
      <meshStandardMaterial color="#f1c96c" metalness={0.75} roughness={0.2} emissive="#9c671c" emissiveIntensity={0.55} />
    </mesh>
    <mesh ref={satelliteB}>
      <icosahedronGeometry args={[0.105, 1]} />
      <meshStandardMaterial color="#80eff3" metalness={0.7} roughness={0.2} emissive="#167a91" emissiveIntensity={0.7} />
    </mesh>
    <mesh ref={satelliteC}>
      <octahedronGeometry args={[0.085, 0]} />
      <meshStandardMaterial color="#f3f5ff" metalness={0.5} roughness={0.18} emissive="#5676a8" emissiveIntensity={0.4} />
    </mesh>
    {[0, 1, 2, 3, 4, 5].map((n) => <mesh key={n} position={[Math.cos(n * Math.PI / 3) * 2.02, Math.sin(n * 1.7) * 0.26, Math.sin(n * Math.PI / 3) * 1.36]}>
      <sphereGeometry args={[0.025 + (n % 2) * 0.012, 10, 10]} />
      <meshBasicMaterial color={n % 2 ? '#f1c96c' : '#7ce8f2'} />
    </mesh>)}
  </group>;
}

export default function Scene({ compact = false }) {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(max-width: 700px)');
    const update = () => setMobile(query.matches);
    update();
    query.addEventListener?.('change', update);
    return () => query.removeEventListener?.('change', update);
  }, []);
  const starCount = mobile ? 45 : compact ? 80 : 190;
  const sparkleCount = mobile ? 8 : compact ? 12 : 30;
  return <div className={`scene ${compact ? 'scene-compact' : ''}`} role="img" aria-label="Animated three-dimensional digital orbit with a luminous geometric core">
    <Canvas fallback={<div className="scene-fallback-label">Connected digital systems</div>} dpr={mobile ? [1, 1.15] : [1, 1.5]} camera={{ position: [0, 0, 5.1], fov: 42 }} gl={{ antialias: !mobile, alpha: true, powerPreference: 'low-power' }}>
      <ambientLight intensity={0.72} />
      <pointLight position={[3, 3, 4]} intensity={22} color="#a5f2ff" />
      <pointLight position={[-3, -2, -3]} intensity={17} color="#dba54a" />
      <pointLight position={[0, 3, 0]} intensity={8} color="#f6f7ff" />
      <Suspense fallback={null}>
        <OrbitingSystem compact={compact} />
        <Stars radius={14} depth={4} count={starCount} factor={1.35} fade speed={0.35} />
        <Sparkles count={sparkleCount} scale={4.6} size={mobile ? 1.2 : 1.7} speed={0.2} color="#9eeaf0" />
      </Suspense>
    </Canvas>
  </div>;
}
