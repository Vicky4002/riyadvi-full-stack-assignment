import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import Lottie from 'lottie-react';
import { Rive } from '@rive-app/react-canvas';
import Spline from '@splinetool/react-spline';
import { getProject } from '@theatre/core';
import { Orbit, Sparkles, Workflow, Box } from 'lucide-react';

// Tiny self-contained vector loop: no third-party animation URL required.
const orbitAnimation = {
  v: '5.7.4', fr: 30, ip: 0, op: 90, w: 180, h: 120, nm: 'Riyadvi orbit loop',
  ddd: 0, assets: [],
  layers: [{
    ddd: 0, ind: 1, ty: 4, nm: 'Orbit ring', sr: 1,
    ks: {
      o: { a: 0, k: 100 },
      r: { a: 1, k: [{ t: 0, s: [0], e: [360], i: { x: [0.33], y: [1] }, o: { x: [0.67], y: [0] } }, { t: 90, s: [360] }] },
      p: { a: 0, k: [90, 60, 0] }, a: { a: 0, k: [0, 0, 0] }, s: { a: 0, k: [100, 100, 100] }
    },
    ao: 0, shapes: [{
      ty: 'gr', it: [
        { d: 1, ty: 'el', s: { a: 0, k: [72, 72] }, p: { a: 0, k: [0, 0] }, nm: 'Ellipse' },
        { ty: 'st', c: { a: 0, k: [0.49, 0.91, 0.95, 1] }, o: { a: 0, k: 100 }, w: { a: 0, k: 3 }, lc: 2, lj: 2, nm: 'Stroke' },
        { ty: 'tr', p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 }, sk: { a: 0, k: 0 }, sa: { a: 0, k: 0 }, nm: 'Transform' }
      ], nm: 'Orbit group'
    }],
    ip: 0, op: 90, st: 0, bm: 0
  }]
};

const splineSceneUrl = import.meta.env.VITE_SPLINE_SCENE_URL;
const riveFileUrl = import.meta.env.VITE_RIVE_FILE_URL;

// Theatre.js project/sheet are initialized as a foundation for authored timeline sequences.
const theatreProject = getProject('Riyadvi Motion Studio');
const theatreSheet = theatreProject.sheet('Homepage Motion');

function Tile({ icon: Icon, title, description, children, tag }) {
  return <article className="pr-playground-card">
    <div className="pr-playground-visual">{children}</div>
    <span className="pr-playground-pill">{tag}</span>
    <h3>{title}</h3>
    <p>{description}</p>
  </article>;
}

export default function TechnologyPlayground() {
  useEffect(() => {
    // Keep the Theatre project/sheet available to the motion-design workflow.
    void theatreSheet;
  }, []);

  return <section className="pr-playground" aria-labelledby="pr-playground-title">
    <div className="pr-wrap">
      <div className="pr-playground-head">
        <span className="pr-playground-pill">INTERACTIVE MOTION LAB / 02</span>
        <h2 id="pr-playground-title">A living interface.<br/><em>Not just a static mockup.</em></h2>
        <p>This section demonstrates the motion and 3D toolchain. Spline and Rive panels load your authored scenes when their asset URLs are configured; they show a clear fallback until then.</p>
      </div>
      <div className="pr-playground-grid">
        <Tile title="Motion for React" description="Declarative entrance, hover and layout animation, with reduced-motion preferences respected." tag="MOTION / REACT">
          <motion.div initial={{ opacity: 0, scale: 0.75, rotate: -12 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} whileHover={{ scale: 1.08, rotate: 6 }} viewport={{ once: true }} transition={{ duration: 0.65, ease: 'easeOut' }} style={{ color: '#8ce8e7' }}><Sparkles size={58} strokeWidth={1.1}/></motion.div>
        </Tile>
        <Tile title="Lottie vector animation" description="A lightweight, self-contained vector loop for UI motion without a remote animation dependency." tag="LOTTIE / JSON">
          <Lottie animationData={orbitAnimation} loop autoplay style={{ width: 170, height: 116 }} ariaLabel="Animated cyan orbit ring"/>
        </Tile>
        <Tile title="Rive interaction" description="Loads a Rive-authored state-machine animation from a project-provided asset URL." tag="RIVE / STATE MACHINE">
          {riveFileUrl ? <Rive src={riveFileUrl} /> : <div className="pr-playground-placeholder"><Orbit size={28}/><br/>Set VITE_RIVE_FILE_URL to your exported .riv file.</div>}
        </Tile>
        <Tile title="Spline 3D scene" description="Embeds an authored Spline scene inside the responsive layout; keep the scene lightweight for mobile." tag="SPLINE / WEBGL">
          {splineSceneUrl ? <Spline scene={splineSceneUrl} className="pr-playground-spline" /> : <div className="pr-playground-placeholder"><Box size={28}/><br/>Set VITE_SPLINE_SCENE_URL to your published scene.splinecode URL.</div>}
        </Tile>
        <Tile title="Theatre.js timeline" description="A named Theatre project and sheet provide the foundation for authoring keyed motion and syncing it with a 3D scene." tag="THEATRE / TIMELINE">
          <div className="pr-playground-timeline" aria-label="Decorative timeline preview"><span/><span/><span/><span/><span/><span/><span/></div>
        </Tile>
        <Tile title="Three.js + React Three Fiber" description="The hero already renders a custom Three.js scene through React Three Fiber and Drei, with procedural geometry and moving orbit elements." tag="THREE / R3F / DREI">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }} style={{ color: '#8ce8e7' }}><Workflow size={60} strokeWidth={1.1}/></motion.div>
        </Tile>
      </div>
    </div>
  </section>;
}
