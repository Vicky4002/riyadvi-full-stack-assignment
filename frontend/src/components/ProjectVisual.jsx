import React from'react';
export default function ProjectVisual({project,index=0,large=false}){return <div className={`project-art-v4 project-art-${index%6} ${large?'project-art-large':''}`}>
 <div className="project-art-noise"/><div className="project-art-grid"/><div className="project-art-glow"/>
 <div className="project-orbit orbit-1"/><div className="project-orbit orbit-2"/><div className="project-orbit orbit-3"/>
 <div className="project-art-core"><span>{String(index+1).padStart(2,'0')}</span><b>{project.title.split(' ')[0]}</b></div>
 <div className="project-ui ui-a"><span>{project.industry}</span><b>LIVE SYSTEM</b></div>
 <div className="project-ui ui-b"><span>{project.tag}</span><i/></div>
 <div className="project-data"><span>STRATEGY</span><span>DESIGN</span><span>ENGINEERING</span></div>
 <div className="project-scan"/>
 </div>}
