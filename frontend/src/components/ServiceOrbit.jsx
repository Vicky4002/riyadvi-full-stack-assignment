import React,{useMemo,useState}from'react';
import{ArrowUpRight,Move3D}from'lucide-react';
import{Link}from'react-router-dom';
import{services}from'../data/content';

export default function ServiceOrbit(){
 const[selected,setSelected]=useState(services[0]);
 const[selectedIndex,setSelectedIndex]=useState(0);
 const[tilt,setTilt]=useState({x:0,y:0});
 const nodes=useMemo(()=>services.map((s,i)=>{const angle=(i/services.length)*Math.PI*2-Math.PI/2;return{...s,x:50+38*Math.cos(angle),y:50+38*Math.sin(angle)}}),[]);
 const move=e=>{const r=e.currentTarget.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;setTilt({x:y*7,y:-x*7})};
 const choose=(s,i)=>{setSelected(s);setSelectedIndex(i)};
 return <div className="service-orbit-shell-v4" onMouseMove={move} onMouseLeave={()=>setTilt({x:0,y:0})}>
  <div className="service-orbit-stage-v4" style={{transform:`perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`}}>
   <div className="orbit-grid-v4"/><div className="orbit-ring-v4 ring-a"/><div className="orbit-ring-v4 ring-b"/><div className="orbit-ring-v4 ring-c"/>
   <div className="orbit-beam beam-a"/><div className="orbit-beam beam-b"/>
   <div className="orbit-core-v4"><div className="core-halo"/><span>{selected.visual}</span><b>{selected.title}</b><small>ACTIVE DISCIPLINE</small></div>
   {nodes.map((s,i)=><button key={s.id} className={`orbit-node-v4 ${selected.id===s.id?'active':''}`} style={{left:`${s.x}%`,top:`${s.y}%`}} onClick={()=>choose(s,i)} aria-label={s.title}><span>{s.icon}</span><small>0{i+1}</small><b>{s.title}</b></button>)}
   <div className="orbit-pulse-v4"/>
   <div className="orbit-hud"><span><Move3D size={13}/> MOVE / EXPLORE</span><span>06 NODES / 01 SYSTEM</span></div>
  </div>
  <div className="service-orbit-info-v4">
   <div className="eyebrow">0{selectedIndex+1} / 06 · Interactive capability map</div>
   <div className="service-orbit-copy-v4"><span className="service-orbit-index">{selected.visual}</span><h3>{selected.title}</h3><p>{selected.short}</p></div>
   <div className="service-orbit-features-v4">{selected.features.map((x,i)=><span key={x}><b>0{i+1}</b>{x}</span>)}</div>
   <div className="stack-tags-v4">{selected.stack.map(x=><span key={x}>{x}</span>)}</div>
   <Link className="btn btn-primary mt-7" to={`/services/${selected.id}`}>Explore {selected.title} <ArrowUpRight size={16}/></Link>
  </div>
 </div>
}