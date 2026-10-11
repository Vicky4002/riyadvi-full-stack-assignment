import React, { Suspense } from 'react';
const Scene = React.lazy(() => import('./Scene.jsx'));
export default function SceneLazy(props){return <Suspense fallback={<div className={`scene scene-fallback ${props.compact?'scene-compact':''}`} aria-hidden="true"/>}><Scene {...props}/></Suspense>}
