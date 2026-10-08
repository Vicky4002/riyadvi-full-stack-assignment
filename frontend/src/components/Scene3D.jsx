import React,{useMemo,useRef}from'react';
import{Canvas,useFrame}from'@react-three/fiber';
import{Float,Line,OrbitControls,Environment,MeshTransmissionMaterial,Stars}from'@react-three/drei';
import*as THREE from'three';

function Core(){
 const ref=useRef();
 useFrame((s)=>{if(ref.current){ref.current.rotation.x=s.clock.elapsedTime*.08;ref.current.rotation.y=s.clock.elapsedTime*.16}});
 return <group ref={ref}>
   <mesh><icosahedronGeometry args={[1.05,2]}/><MeshTransmissionMaterial transmission={.95}roughness={.08}thickness={.5}ior={1.55}chromaticAberration={.12}color="#D4AF37"/></mesh>
   <mesh scale={1.18}><icosahedronGeometry args={[1.05,1]}/><meshBasicMaterial color="#D4AF37" wireframe transparent opacity={.22}/></mesh>
   <mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[1.48,.012,8,96]}/><meshBasicMaterial color="#D4AF37" transparent opacity={.65}/></mesh>
   <mesh rotation={[0,Math.PI/3,Math.PI/2]}><torusGeometry args={[1.68,.008,8,96]}/><meshBasicMaterial color="#D4AF37" transparent opacity={.28}/></mesh>
 </group>
}
function Network(){
 const points=useMemo(()=>Array.from({length:18},(_,i)=>{const a=i/18*Math.PI*2;const r=2.25+(i%3)*.18;return [Math.cos(a)*r,(i%5-2)*.32,Math.sin(a)*r]}),[]);
 return <group>{points.map((p,i)=><mesh key={i} position={p}><sphereGeometry args={[.055+(i%3)*.018,12,12]}/><meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={4}/></mesh>)}{points.map((p,i)=><Line key={'l'+i}points={[p,points[(i+1)%points.length]]}color="#D4AF37"transparent opacity={.2}lineWidth={1}/>)}</group>
}
function Scene(){return <Canvas dpr={[1,1.6]}camera={{position:[0,0,5.8],fov:40}}gl={{antialias:true,alpha:true,powerPreference:'high-performance'}}>
 <ambientLight intensity={.32}/><pointLight position={[3,3,4]}intensity={18}color="#D4AF37"/><pointLight position={[-3,-1,2]}intensity={8}color="#fff1b0"/>
 <Stars radius={9}depth={5}count={420}factor={1.1}saturation={0}fade speed={.35}/>
 <Float speed={1.1}rotationIntensity={.2}floatIntensity={.42}><Core/></Float><Network/>
 <OrbitControls enableZoom={false}enablePan={false}autoRotate autoRotateSpeed={.28}enableDamping dampingFactor={.05}/><Environment preset="night"/>
 </Canvas>}
export default function Scene3D(){return <div className="absolute inset-0"><Scene/></div>}
