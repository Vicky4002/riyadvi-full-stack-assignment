import '../premium.css';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDownRight, ArrowRight, ArrowUpRight, Braces, Boxes, CheckCircle2, Code2, Database, Layers3, Orbit, Sparkles, Workflow } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Scene from '../components/SceneLazy.jsx';
import { Eyebrow, LeadForm, SectionHeading, ServiceGrid, TechConstellation } from '../components/Shared.jsx';
import { cases, posts } from '../data/content.js';
import { useContent } from '../lib/useContent.js';

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  { icon: Boxes, number: '01', title: 'Immersive interfaces', copy: 'Purposeful 3D and motion that makes complex products feel intuitive.' },
  { icon: Workflow, number: '02', title: 'Connected systems', copy: 'Thoughtful frontend experiences backed by reliable services and APIs.' },
  { icon: Database, number: '03', title: 'Data that moves', copy: 'Dynamic content, useful workflows, and measurable product intelligence.' },
];
const principles = [
  { number: '01', title: 'Clarity before complexity', copy: 'We start with the user need and business outcome, then choose the simplest approach that solves the right problem.' },
  { number: '02', title: 'Engineering with intent', copy: 'Accessible interfaces, maintainable components and reliable APIs are part of the experience—not an afterthought.' },
  { number: '03', title: 'Progress you can see', copy: 'Focused milestones, open communication and testable acceptance criteria keep delivery understandable.' },
];
const filters = ['All work', 'Digital product', 'Business platform', 'Interactive experience'];

export default function PremiumHome() {
  const heroRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('All work');
  const livePosts = useContent('posts', posts);
  const liveCases = useContent('cases', cases);
  const visibleCases = activeFilter === 'All work' ? liveCases : liveCases.filter(item => item.category === activeFilter);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.pr-hero-kicker, .pr-hero-title-line, .pr-hero-description, .pr-hero-actions, .pr-hero-foot', { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, stagger: 0.12, ease: 'power3.out', delay: 0.15 });
      gsap.to('.pr-hero-orbit', { rotate: 18, y: -16, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.utils.toArray('.pr-reveal').forEach((el) => gsap.fromTo(el, { y: 34, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 86%', once: true } }));
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return <div className="pr-home" ref={heroRef}>
    <section className="pr-hero">
      <div className="pr-hero-grid" />
      <div className="pr-hero-glow pr-hero-glow-a" />
      <div className="pr-hero-glow pr-hero-glow-b" />
      <div className="pr-hero-inner">
        <div className="pr-hero-copy">
          <div className="pr-hero-kicker"><span className="pr-live-dot" /> DIGITAL PRODUCTS · SOFTWARE · EXPERIENCE</div>
          <h1 className="pr-hero-title"><span className="pr-hero-title-line">Build what</span><span className="pr-hero-title-line">comes <em>next.</em></span></h1>
          <p className="pr-hero-description">We connect strategy, design, engineering and emerging technology to create digital experiences that move businesses forward.</p>
          <div className="pr-hero-actions"><Link to="/services" className="pr-button pr-button-primary">Explore services <ArrowUpRight size={17} /></Link><Link to="/consultation" className="pr-button pr-button-secondary">Schedule consultation <ArrowRight size={16} /></Link></div>
          <div className="pr-hero-foot"><span className="pr-foot-index">RT / 2026</span><span className="pr-foot-rule" /><span>Ideas engineered into impact</span></div>
        </div>
        <div className="pr-hero-stage">
          <div className="pr-stage-frame">
            <div className="pr-stage-topline"><span>RIYADVI / DIGITAL SYSTEMS</span><span>INTERACTIVE 3D <span className="pr-live-dot" /></span></div>
            <div className="pr-hero-orbit pr-hero-orbit-one" /><div className="pr-hero-orbit pr-hero-orbit-two" />
            <div className="pr-scene-wrap"><Scene /></div>
            <div className="pr-stage-crosshair pr-crosshair-a">+</div><div className="pr-stage-crosshair pr-crosshair-b">+</div>
            <div className="pr-stage-card pr-stage-card-top"><Orbit size={15}/><span>DESIGN SYSTEM</span><b>01</b></div>
            <div className="pr-stage-card pr-stage-card-bottom"><span className="pr-signal"><i/><i/><i/><i/></span><span>ENGINEERING / ACTIVE</span><b>LIVE</b></div>
            <div className="pr-stage-coordinate">13°02' N / 80°16' E</div>
          </div>
          <div className="pr-stage-caption"><span>01 — THE DIGITAL FRONTIER</span><span>SCROLL TO DISCOVER <ArrowDownRight size={14}/></span></div>
        </div>
      </div>
      <div className="pr-hero-bottomline"><span>INDEPENDENT THINKING.</span><span>CONNECTED EXECUTION.</span><span>BUILT FOR WHAT'S NEXT.</span></div>
    </section>

    <section className="pr-trust-band pr-wrap" aria-label="Delivery principles">
      <div className="pr-trust-intro"><span className="pr-live-dot"/><span>ONE CONNECTED DIGITAL PARTNER</span></div>
      <div className="pr-trust-items"><div><strong>06 core capabilities</strong><span>Strategy through delivery</span></div><div><strong>3D + motion</strong><span>Interactive experiences</span></div><div><strong>API-connected content</strong><span>Dynamic content architecture</span></div><div><strong>MongoDB workflows</strong><span>Persistent form submissions</span></div></div>
    </section>

    <section className="pr-marquee" aria-label="Our disciplines"><div className="pr-marquee-track">{Array.from({ length: 2 }).map((_, i) => <span key={i}>PRODUCT ENGINEERING <b>✳</b> IMMERSIVE 3D <b>✳</b> DIGITAL STRATEGY <b>✳</b> INTELLIGENT WORKFLOWS <b>✳</b> EXPERIENCE DESIGN <b>✳</b></span>)}</div></section>

    <section className="pr-intro-section pr-wrap">
      <div className="pr-section-index"><span>01</span><span> / OUR POINT OF VIEW</span></div>
      <div className="pr-intro-content pr-reveal"><h2>Not just a website.<br/><em>A working digital experience.</em></h2><div className="pr-intro-bottom"><p>Modern digital products need more than a polished screen. They need meaningful interactions, connected data, a clear system behind the interface, and a reason for every detail to exist.</p><Link className="pr-text-link" to="/about">How we think <ArrowUpRight size={16}/></Link></div></div>
    </section>

    <section className="pr-capabilities-section"><div className="pr-wrap">
      <div className="pr-section-heading pr-reveal"><div><Eyebrow>WHAT WE BUILD</Eyebrow><h2>Complexity, made <em>clear.</em></h2></div><p>One connected team across design, software, data and interactive technology.</p></div>
      <div className="pr-capability-strip">{capabilities.map((item) => { const Icon = item.icon; return <article className="pr-capability-card pr-reveal" key={item.number}><div className="pr-capability-top"><span>{item.number} / CAPABILITY</span><Icon size={20}/></div><h3>{item.title}</h3><p>{item.copy}</p><span className="pr-card-arrow"><ArrowUpRight size={17}/></span></article>; })}</div>
      <div className="pr-services-head"><div><span className="pr-micro-label">OUR CAPABILITIES / 06</span><h3>From first sketch<br/>to <em>full deployment.</em></h3></div><Link className="pr-text-link" to="/services">View all services <ArrowUpRight size={16}/></Link></div>
      <ServiceGrid />
    </div></section>

    <section className="pr-architecture-section"><div className="pr-wrap pr-architecture-grid">
      <div className="pr-architecture-copy pr-reveal"><Eyebrow>THE SYSTEM BEHIND THE SCREEN</Eyebrow><h2>Every layer has<br/>a <em>purpose.</em></h2><p>A considered experience is built as a system: responsive interfaces, motion that guides attention, APIs that serve real content, and data that persists beyond the session.</p><Link className="pr-button pr-button-secondary" to="/contact">Talk to our team <ArrowUpRight size={16}/></Link></div>
      <div className="pr-architecture-visual pr-reveal"><div className="pr-architecture-orbit" /><div className="pr-architecture-core"><Layers3 size={28}/><span>RIYADVI<br/>DIGITAL CORE</span></div><div className="pr-architecture-node pr-node-ui"><Code2 size={17}/><span>INTERFACE</span><small>React · Motion</small></div><div className="pr-architecture-node pr-node-api"><Braces size={17}/><span>API LAYER</span><small>Express · REST</small></div><div className="pr-architecture-node pr-node-data"><Database size={17}/><span>DATA LAYER</span><small>MongoDB</small></div><div className="pr-architecture-node pr-node-3d"><Orbit size={17}/><span>3D ENGINE</span><small>Three.js · R3F</small></div><div className="pr-architecture-connectors"><i/><i/><i/><i/></div><div className="pr-architecture-foot"><span><span className="pr-live-dot"/> SYSTEM MAP</span><span>MODULAR / CONNECTED / SCALABLE</span></div></div>
    </div></section>

    <section className="pr-work-section pr-wrap">
      <SectionHeading eyebrow="SELECTED WORK / CONCEPTS" title="Design that thinks." accent="Technology that works." description="Illustrative concept work showing how connected digital experiences can solve practical business problems." link="/portfolio" />
      <div className="pr-filter-row" role="group" aria-label="Filter case studies">{filters.map(filter => <button key={filter} type="button" className={activeFilter === filter ? 'pr-filter-button is-active' : 'pr-filter-button'} onClick={() => setActiveFilter(filter)} aria-pressed={activeFilter === filter}>{filter}</button>)}</div>
      <div className="pr-case-grid">{visibleCases.map((item, i) => <Link to={`/portfolio/${item.slug}`} className="pr-case-card pr-reveal" key={item.slug}><div className={`pr-case-art pr-case-art-${item.accent || 'cyan'}`}><span className="pr-case-index">0{i + 1}</span><div className="pr-case-art-orbit"/><div className="pr-case-art-core"><Layers3 size={28}/></div><span className="pr-case-category">{item.category}</span></div><div className="pr-case-meta"><span>{item.industry || 'Digital experience'}</span><span>{item.year}</span></div><h3>{item.name}</h3><p>{item.summary}</p><span className="pr-text-link">Explore concept <ArrowUpRight size={15}/></span></Link>)}</div>
      <p className="pr-content-note"><Sparkles size={14}/> These are illustrative concept studies, not claims of verified client engagements or measured client outcomes.</p>
    </section>

    <section className="pr-principles-section"><div className="pr-wrap">
      <div className="pr-section-heading pr-reveal"><div><Eyebrow>THE WORKING RELATIONSHIP</Eyebrow><h2>Good work starts<br/>with <em>good principles.</em></h2></div><p>We don't invent client testimonials or performance numbers. We make our approach clear—and let the work demonstrate it.</p></div>
      <div className="pr-principle-grid">{principles.map((item) => <article className="pr-principle-card pr-reveal" key={item.number}><span>{item.number} / PRINCIPLE</span><CheckCircle2 size={21}/><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div>
    </div></section>

    <section className="pr-tech-section"><div className="pr-wrap pr-tech-layout"><div className="pr-reveal"><Eyebrow>THE TOOLKIT</Eyebrow><h2>Use the right tech.<br/><em>Make it matter.</em></h2><p>From WebGL and animation to API design and data persistence, the stack should support the experience—not become the experience.</p><div className="pr-tech-tags"><span>Three.js / R3F</span><span>GSAP</span><span>Lenis</span><span>React</span><span>REST APIs</span><span>MongoDB</span><span>Java / Spring Boot</span><span>Python</span><span>Cloud</span></div></div><TechConstellation/></div></section>

    <section className="pr-insights-section pr-wrap"><div className="pr-section-heading pr-reveal"><div><Eyebrow>FIELD NOTES</Eyebrow><h2>Ideas into <em>action.</em></h2></div><Link className="pr-text-link" to="/blog">All insights <ArrowUpRight size={16}/></Link></div><div className="pr-insights-grid">{livePosts.slice(0, 2).map((post, i) => <Link to={`/blog/${post.slug}`} className="pr-insight-card pr-reveal" key={post.slug}><div className="pr-insight-art"><span className="pr-insight-art-number">0{i + 1}</span><div className="pr-insight-art-orbit"><Sparkles size={28}/></div><span className="pr-insight-art-label">RIYADVI / FIELD NOTES</span></div><div className="pr-insight-meta"><span>{post.category}</span><span>{post.read}</span></div><h3>{post.title}</h3><p>{post.excerpt}</p><span className="pr-text-link">Read article <ArrowUpRight size={15}/></span></Link>)}</div></section>

    <section className="pr-contact-section"><div className="pr-wrap"><div className="pr-contact-heading pr-reveal"><Eyebrow>START A CONVERSATION</Eyebrow><h2>Have a challenge worth<br/><em>solving together?</em></h2><p>Tell us what you’re working on. Share only what you’re comfortable sharing; we’ll use it to understand the right next step.</p></div><LeadForm kind="contact" title="Tell us what you're building" description="A few details are enough to get the conversation started." buttonLabel="Send enquiry" compact /></div></section>

    <div className="pr-wrap pr-final-cta"><div className="pr-cta-eyebrow"><span className="pr-live-dot"/> HAVE A CHALLENGE WORTH SOLVING?</div><div className="pr-cta-row"><h2>Let's make<br/><em>something matter.</em></h2><Link to="/consultation" className="pr-cta-round" aria-label="Schedule a consultation"><ArrowUpRight size={30}/></Link></div><div className="pr-cta-bottom"><span>STRATEGY / DESIGN / ENGINEERING</span><span>START WITH A CONVERSATION <ArrowRight size={14}/></span></div></div>
  </div>;
}
