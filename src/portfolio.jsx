import { useState, useEffect, useRef } from "react";
import ecoVideo from "./Assets/Eco-Marche.mp4";
import lumiereVideo from "./Assets/lumiere.mp4";
import profilePic from './Assets/1.jpg';
// ─── GOOGLE FONTS ─────────────────────────────────────────────────────────────
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
  `}</style>
);

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    :root {
      --black:   #080810;
      --deep:    #0D0D1A;
      --card:    #111127;
      --border:  #1E1E3A;
      --violet:  #7C3AED;
      --violet2: #9B5DE5;
      --cyan:    #06B6D4;
      --white:   #F0F0FF;
      --muted:   #8888AA;
      --syne:    'Syne', sans-serif;
      --inter:   'Inter', sans-serif;
      --mono:    'JetBrains Mono', monospace;
    }
    html { scroll-behavior: smooth; }
    body {
      background: var(--black);
      color: var(--white);
      font-family: var(--inter);
      cursor: none;
      overflow-x: hidden;
    }
    ::selection { background: var(--violet); color: #fff; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--black); }
    ::-webkit-scrollbar-thumb { background: var(--violet); border-radius: 2px; }

    /* ─ Cursor ─ */
    .cursor-dot {
      position: fixed; top: 0; left: 0; z-index: 9999;
      width: 8px; height: 8px; border-radius: 50%;
      background: var(--cyan);
      pointer-events: none;
      transform: translate(-50%,-50%);
      transition: width .15s, height .15s, background .15s;
      mix-blend-mode: screen;
    }
      .thumb-btn.primary {
  background: var(--violet);
  color: #fff;
  border: none;
  cursor: pointer;
}

.thumb-btn.primary:hover {
  opacity: 0.9;
}
    .cursor-ring {
      position: fixed; top: 0; left: 0; z-index: 9998;
      width: 36px; height: 36px; border-radius: 50%;
      border: 1.5px solid var(--violet);
      pointer-events: none;
      transform: translate(-50%,-50%);
      transition: width .35s cubic-bezier(.25,.46,.45,.94),
                  height .35s cubic-bezier(.25,.46,.45,.94),
                  border-color .35s, opacity .35s;
      opacity: 0.7;
    }
    .cursor-dot.hover   { width: 12px; height: 12px; background: var(--violet); }
    .cursor-ring.hover  { width: 56px; height: 56px; border-color: var(--cyan); opacity: 1; }
    .cursor-dot.click   { width: 6px;  height: 6px; }
    .cursor-ring.click  { width: 24px; height: 24px; }

    /* ─ Nav ─ */
    nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      display: flex; align-items: center; justify-content: space-between;
      padding: 20px 60px;
      backdrop-filter: blur(20px);
      background: rgba(8,8,16,0.7);
      border-bottom: 1px solid transparent;
      transition: border-color .4s, background .4s;
    }
    nav.scrolled { border-color: var(--border); background: rgba(8,8,16,0.92); }
    /* Maximum visibility for both */
.about-img-letter {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  filter: brightness(1.1) contrast(1.15) saturate(1.2);
  border: 4px solid white;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 8px rgba(139, 92, 246, 0.4);
  background: white;
}

.about-badge-visible {
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  border: 2px solid #a855f7;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 30px rgba(168, 85, 247, 0.5);
  padding: 16px 32px;
}

.badge-text-visible {
  font-size: 1.2rem;
  font-weight: 900;
  background: linear-gradient(135deg, #ffffff, #e879f9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.badge-sub-visible {
  font-size: 0.85rem;
  color: #f1f5f9;
  font-weight: 600;
}
    .nav-logo {
      font-family: var(--syne); font-weight: 800; font-size: 1.3rem;
      background: linear-gradient(135deg, var(--violet), var(--cyan));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      letter-spacing: -0.02em;
    }
    .nav-links { display: flex; gap: 36px; list-style: none; }
    .nav-links a {
      font-family: var(--inter); font-size: .85rem; font-weight: 500;
      color: var(--muted); text-decoration: none; letter-spacing: .06em; text-transform: uppercase;
      position: relative; padding-bottom: 4px;
      transition: color .25s;
    }
    .nav-links a::after {
      content: ''; position: absolute; bottom: 0; left: 0; right: 100%; height: 1px;
      background: linear-gradient(90deg, var(--violet), var(--cyan));
      transition: right .35s cubic-bezier(.25,.46,.45,.94);
    }
    .nav-links a:hover { color: var(--white); }
    .nav-links a:hover::after { right: 0; }
    .nav-cta {
      font-family: var(--inter); font-size: .8rem; font-weight: 600;
      color: var(--white); background: transparent;
      border: 1px solid var(--violet); border-radius: 4px;
      padding: 9px 20px; letter-spacing: .08em; text-transform: uppercase;
      cursor: none; transition: background .25s, box-shadow .25s;
    }
    .nav-cta:hover { background: var(--violet); box-shadow: 0 0 24px rgba(124,58,237,.5); }

    /* ─ Hero ─ */
    .hero {
      min-height: 100vh; display: flex; flex-direction: column;
      justify-content: center; padding: 0 60px;
      position: relative; overflow: hidden;
    }
    .hero-grid-bg {
      position: absolute; inset: 0; z-index: 0;
      background-image:
        linear-gradient(rgba(124,58,237,.06) 1px, transparent 1px),
        linear-gradient(90deg, rgba(124,58,237,.06) 1px, transparent 1px);
      background-size: 60px 60px;
      mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%);
    }
    .hero-glow {
      position: absolute; z-index: 0;
      border-radius: 50%; filter: blur(120px); pointer-events: none;
    }
    .hero-glow-1 { width: 600px; height: 600px; top: -100px; right: -100px; background: rgba(124,58,237,.18); }
    .hero-glow-2 { width: 400px; height: 400px; bottom: 0; left: 10%; background: rgba(6,182,212,.12); }
    .hero-content { position: relative; z-index: 1; max-width: 860px; }
    .hero-tag {
      display: inline-flex; align-items: center; gap: 8px;
      font-family: var(--mono); font-size: .75rem; color: var(--cyan);
      border: 1px solid rgba(6,182,212,.3); border-radius: 20px;
      padding: 6px 14px; margin-bottom: 28px;
      background: rgba(6,182,212,.06);
    }
      /* Additional animations for project cards */
.project-card {
  transition: transform 0.4s cubic-bezier(0.34, 1.2, 0.64, 1),
              border-color 0.3s ease,
              box-shadow 0.4s ease !important;
}

.project-thumb {
  position: relative;
  overflow: hidden;
}

.project-thumb-bg {
  transition: transform 0.6s cubic-bezier(0.34, 1.2, 0.64, 1);
}

.project-card:hover .project-thumb-bg {
  transform: scale(1.08);
}

.project-thumb-overlay {
  backdrop-filter: blur(8px);
  transition: opacity 0.4s cubic-bezier(0.34, 1.2, 0.64, 1);
}

.thumb-btn {
  transition: all 0.3s cubic-bezier(0.34, 1.2, 0.64, 1) !important;
}

.thumb-btn:hover {
  transform: translateY(-2px) scale(1.02);
}

.project-tech {
  transition: all 0.2s ease;
}

.project-tech:hover {
  border-color: var(--violet);
  color: var(--violet);
}
    .hero-tag::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--cyan); animation: pulse 2s infinite; }
    @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.8)} }
    .hero-title {
      font-family: var(--syne); font-weight: 800;
      font-size: clamp(3rem, 7vw, 5.5rem); line-height: 1.0;
      letter-spacing: -0.04em; margin-bottom: 24px;
    }
    .hero-title .line { display: block; overflow: hidden; }
    .hero-title .line span { display: block; }
    .hero-title .accent {
      background: linear-gradient(135deg, var(--violet), var(--cyan));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    }
    .hero-sub {
      font-size: 1.1rem; color: var(--muted); line-height: 1.75;
      max-width: 520px; margin-bottom: 44px; font-weight: 300;
    }
    .hero-actions { display: flex; gap: 16px; align-items: center; }
    .btn-primary {
      display: inline-flex; align-items: center; gap: 10px;
      background: linear-gradient(135deg, var(--violet), var(--violet2));
      color: #fff; font-family: var(--inter); font-weight: 600;
      font-size: .9rem; padding: 14px 32px; border-radius: 6px;
      text-decoration: none; cursor: none;
      transition: transform .25s, box-shadow .25s;
      box-shadow: 0 8px 32px rgba(124,58,237,.35);
    }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 16px 48px rgba(124,58,237,.5); }
    .btn-secondary {
      display: inline-flex; align-items: center; gap: 8px;
      color: var(--muted); font-size: .9rem; font-weight: 500;
      text-decoration: none; cursor: none;
      transition: color .25s;
    }
    .btn-secondary:hover { color: var(--white); }
    .btn-secondary svg { transition: transform .25s; }
    .btn-secondary:hover svg { transform: translateX(4px); }
    .hero-scroll {
      position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%);
      display: flex; flex-direction: column; align-items: center; gap: 10px;
      color: var(--muted); font-size: .72rem; font-family: var(--mono);
      letter-spacing: .1em; text-transform: uppercase;
    }
    .scroll-line { width: 1px; height: 40px; background: linear-gradient(var(--violet), transparent); animation: scrollDrop 1.8s ease-in-out infinite; }
    @keyframes scrollDrop { 0%{opacity:0;transform:scaleY(0) translateY(-20px)} 50%{opacity:1} 100%{opacity:0;transform:scaleY(1) translateY(10px)} }

    /* ─ Sections ─ */
    section { padding: 120px 60px; }
    .section-label {
      font-family: var(--mono); font-size: .72rem; color: var(--violet);
      letter-spacing: .18em; text-transform: uppercase; margin-bottom: 16px;
      display: flex; align-items: center; gap: 12px;
    }
    .section-label::before { content: ''; width: 24px; height: 1px; background: var(--violet); }
    .section-title {
      font-family: var(--syne); font-weight: 800; font-size: clamp(2rem, 4vw, 3rem);
      letter-spacing: -0.03em; line-height: 1.1; margin-bottom: 16px;
    }
    .section-sub { color: var(--muted); font-size: 1rem; line-height: 1.7; max-width: 500px; }

    /* ─ About ─ */
    .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; margin-top: 64px; }
    .about-img-wrap {
      position: relative; border-radius: 16px; overflow: hidden;
      aspect-ratio: 4/5;
      background: linear-gradient(135deg, var(--card) 0%, var(--deep) 100%);
      border: 1px solid var(--border);
    }
    .about-img-bg {
      position: absolute; inset: 0;
      background: radial-gradient(ellipse at 40% 30%, rgba(124,58,237,.3) 0%, transparent 60%),
                  radial-gradient(ellipse at 70% 80%, rgba(6,182,212,.2) 0%, transparent 50%);
    }
    .about-img-letter {
      position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
      font-family: var(--syne); font-weight: 800; font-size: 8rem;
      background: linear-gradient(135deg, var(--violet), var(--cyan));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      opacity: 0.4;
    }
    .about-badge {
      position: absolute; bottom: 24px; left: 24px; right: 24px;
      background: rgba(8,8,16,.85); backdrop-filter: blur(12px);
      border: 1px solid var(--border); border-radius: 10px; padding: 16px 20px;
      display: flex; align-items: center; gap: 12px;
    }
    .badge-dot { width: 10px; height: 10px; border-radius: 50%; background: #22c55e; flex-shrink: 0; animation: pulse 2s infinite; }
    .badge-text { font-size: .82rem; color: var(--white); font-weight: 500; }
    .badge-sub  { font-size: .72rem; color: var(--muted); font-family: var(--mono); }
    .about-text h3 { font-family: var(--syne); font-weight: 700; font-size: 1.6rem; margin-bottom: 20px; letter-spacing: -.02em; }
    .about-text p  { color: var(--muted); line-height: 1.8; margin-bottom: 20px; }
    .about-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 36px; }
    .stat-item { text-align: center; padding: 20px; background: var(--card); border: 1px solid var(--border); border-radius: 10px; }
    .stat-num { font-family: var(--syne); font-weight: 800; font-size: 2rem; background: linear-gradient(135deg, var(--violet), var(--cyan)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .stat-label { font-size: .75rem; color: var(--muted); margin-top: 4px; font-family: var(--mono); }

    /* ─ Skills ─ */
    .skills-section { background: var(--deep); }
    .skills-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; margin-top: 60px; }
    .skill-card {
      background: var(--card); border: 1px solid var(--border); border-radius: 12px;
      padding: 28px; position: relative; overflow: hidden;
      transition: border-color .3s, transform .3s, box-shadow .3s;
    }
    .skill-card::before {
      content: ''; position: absolute; inset: 0; opacity: 0;
      background: radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(124,58,237,.12), transparent 60%);
      transition: opacity .4s;
    }
    .skill-card:hover { border-color: var(--violet); transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,.4); }
    .skill-card:hover::before { opacity: 1; }
    .skill-icon { font-size: 2rem; margin-bottom: 16px; }
    .skill-name { font-family: var(--syne); font-weight: 700; font-size: 1.1rem; margin-bottom: 8px; }
    .skill-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 14px; }
    .skill-tag { font-family: var(--mono); font-size: .68rem; color: var(--cyan); background: rgba(6,182,212,.08); border: 1px solid rgba(6,182,212,.2); padding: 3px 10px; border-radius: 20px; }

    /* ─ Projects ─ */
    .projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 28px; margin-top: 60px; }
    .project-card {
      background: var(--card); border: 1px solid var(--border); border-radius: 16px;
      overflow: hidden; cursor: none;
      transition: border-color .3s, transform .3s, box-shadow .3s;
      position: relative;
    }
    .project-card:hover { border-color: var(--violet); transform: translateY(-6px); box-shadow: 0 32px 64px rgba(0,0,0,.5); }
    .project-thumb {
      height: 220px; position: relative; overflow: hidden;
      background: var(--deep);
    }
    .project-thumb-bg {
      position: absolute; inset: 0;
      transition: transform .5s cubic-bezier(.25,.46,.45,.94);
    }
    .project-card:hover .project-thumb-bg { transform: scale(1.05); }
    .project-thumb-overlay {
      position: absolute; inset: 0; background: rgba(8,8,16,.4);
      display: flex; align-items: center; justify-content: center;
      opacity: 0; transition: opacity .3s;
    }
    .project-card:hover .project-thumb-overlay { opacity: 1; }
    .thumb-action {
      display: flex; gap: 12px;
    }
    .thumb-btn {
      display: inline-flex; align-items: center; gap: 6px;
      font-size: .78rem; font-weight: 600; padding: 9px 18px;
      border-radius: 6px; text-decoration: none; cursor: none;
    }
    .thumb-btn.primary { background: var(--violet); color: #fff; }
    .thumb-btn.ghost { background: rgba(255,255,255,.1); color: var(--white); backdrop-filter: blur(8px); }
    .project-body { padding: 28px; }
    .project-cat { font-family: var(--mono); font-size: .7rem; color: var(--cyan); letter-spacing: .1em; text-transform: uppercase; margin-bottom: 10px; }
    .project-title { font-family: var(--syne); font-weight: 700; font-size: 1.2rem; margin-bottom: 10px; letter-spacing: -.02em; }
    .project-desc { color: var(--muted); font-size: .88rem; line-height: 1.7; margin-bottom: 20px; }
    .project-techs { display: flex; flex-wrap: wrap; gap: 6px; }
    .project-tech { font-family: var(--mono); font-size: .68rem; color: var(--muted); background: var(--deep); border: 1px solid var(--border); padding: 3px 10px; border-radius: 4px; }

    /* ─ Testimonials ─ */
    .testimonials-section { background: var(--deep); }
    .testimonials-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; margin-top: 60px; }
    .testimonial-card {
      background: var(--card); border: 1px solid var(--border); border-radius: 14px;
      padding: 32px; position: relative;
      transition: border-color .3s, transform .3s;
    }
    .testimonial-card:hover { border-color: rgba(124,58,237,.5); transform: translateY(-3px); }
    .testimonial-quote { font-size: 2.5rem; line-height: 1; color: var(--violet); margin-bottom: 16px; font-family: serif; }
    .testimonial-text { color: var(--muted); line-height: 1.75; font-size: .92rem; margin-bottom: 24px; font-style: italic; }
    .testimonial-author { display: flex; align-items: center; gap: 12px; }
    .author-avatar {
      width: 44px; height: 44px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-family: var(--syne); font-weight: 700; font-size: 1rem; color: #fff;
    }
    .author-name { font-weight: 600; font-size: .9rem; }
    .author-role { font-size: .78rem; color: var(--muted); font-family: var(--mono); }

    /* ─ Contact ─ */
    .contact-inner {
      max-width: 720px; margin: 0 auto; text-align: center;
    }
    .contact-inner .section-label { justify-content: center; }
    .contact-inner .section-title { margin-bottom: 20px; }
    .contact-inner .section-sub { margin: 0 auto 48px; }
    .contact-links { display: flex; justify-content: center; flex-wrap: wrap; gap: 16px; margin-bottom: 60px; }
    .contact-link {
      display: inline-flex; align-items: center; gap: 10px;
      color: var(--muted); font-size: .9rem; text-decoration: none;
      padding: 14px 24px; border: 1px solid var(--border); border-radius: 8px;
      background: var(--card); cursor: none;
      transition: color .25s, border-color .25s, transform .25s, box-shadow .25s;
    }
    .contact-link:hover { color: var(--white); border-color: var(--violet); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(124,58,237,.2); }
    .contact-form {
      background: var(--card); border: 1px solid var(--border); border-radius: 16px;
      padding: 48px; text-align: left;
    }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .form-group { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }
    .form-group label { font-size: .8rem; font-family: var(--mono); color: var(--muted); letter-spacing: .06em; text-transform: uppercase; }
    .form-group input, .form-group textarea {
      background: var(--deep); border: 1px solid var(--border); border-radius: 8px;
      padding: 14px 18px; color: var(--white); font-family: var(--inter); font-size: .9rem;
      outline: none; transition: border-color .25s, box-shadow .25s; resize: none;
    }
    .form-group input:focus, .form-group textarea:focus { border-color: var(--violet); box-shadow: 0 0 0 3px rgba(124,58,237,.15); }
    .form-group textarea { height: 130px; }
    .form-submit {
      width: 100%; display: flex; align-items: center; justify-content: center; gap: 10px;
      background: linear-gradient(135deg, var(--violet), var(--violet2));
      color: #fff; border: none; border-radius: 8px; padding: 16px;
      font-family: var(--inter); font-size: .95rem; font-weight: 600;
      cursor: none; transition: transform .25s, box-shadow .25s;
      box-shadow: 0 8px 32px rgba(124,58,237,.35);
    }
    .form-submit:hover { transform: translateY(-2px); box-shadow: 0 16px 48px rgba(124,58,237,.5); }

    /* ─ Footer ─ */
    footer {
      padding: 40px 60px; border-top: 1px solid var(--border);
      display: flex; justify-content: space-between; align-items: center;
    }
    .footer-copy { color: var(--muted); font-size: .8rem; font-family: var(--mono); }
    .footer-links { display: flex; gap: 24px; }
    .footer-links a { color: var(--muted); font-size: .8rem; text-decoration: none; transition: color .2s; cursor: none; }
    .footer-links a:hover { color: var(--violet); }

    /* ─ Animations ─ */
    .reveal {
      opacity: 0; transform: translateY(40px);
      transition: opacity .7s cubic-bezier(.25,.46,.45,.94), transform .7s cubic-bezier(.25,.46,.45,.94);
    }
    .reveal.visible { opacity: 1; transform: translateY(0); }
    .reveal-delay-1 { transition-delay: .1s; }
    .reveal-delay-2 { transition-delay: .2s; }
    .reveal-delay-3 { transition-delay: .3s; }
    .reveal-delay-4 { transition-delay: .4s; }

    /* ─ Marquee ─ */
    .marquee-wrap { overflow: hidden; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 18px 0; background: var(--deep); }
    .marquee-track { display: flex; gap: 0; animation: marquee 22s linear infinite; }
    .marquee-item { white-space: nowrap; font-family: var(--mono); font-size: .8rem; color: var(--muted); padding: 0 32px; }
    .marquee-item span { color: var(--violet); margin: 0 8px; }
    @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }

    @media(max-width:768px) {
      nav { padding: 16px 24px; }
      .nav-links { display: none; }
      section, .hero { padding-left: 24px; padding-right: 24px; }
      .about-grid { grid-template-columns: 1fr; }
      .form-row { grid-template-columns: 1fr; }
      footer { flex-direction: column; gap: 16px; text-align: center; }
    }
  `}</style>
);
const VideoModal = ({ video, onClose }) => {
  if (!video) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.9)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        padding: "20px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "90%",
          maxWidth: "1000px",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "-45px",
            right: "0",
            background: "#7C3AED",
            color: "#fff",
            border: "none",
            padding: "10px 15px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          ✕ Close
        </button>

        <video
          autoPlay
          controls
          style={{
            width: "100%",
            borderRadius: "12px",
          }}
        >
          <source src={video} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};
// ─── DATA ─────────────────────────────────────────────────────────────────────
const SKILLS = [
  { icon: "⚛️", name: "Frontend Development", desc: "Crafting pixel-perfect, performant interfaces.", tags: ["React", "Next.js", "TypeScript", "Tailwind"] },
  { icon: "🔧", name: "Backend Engineering", desc: "Scalable APIs and robust server architecture.", tags: ["Node.js", "Python", "PostgreSQL", "Redis"] },
  { icon: "🎨", name: "UI / UX Design", desc: "Human-centered design with Figma & prototyping.", tags: ["Figma", "Framer", "Design Systems"] },
  { icon: "☁️", name: "Cloud & DevOps", desc: "CI/CD pipelines, containers, cloud infra.", tags: ["Docker", "GitHub Actions", "Vercel"] },
  { icon: "📱", name: "Mobile Development", desc: "Cross-platform apps for iOS and Android.", tags: ["React Native", "Flutter"] },
];

const PROJECTS = [
  {
    cat: "Full Stack · E-Commerce",
    title: "Eco-Marché",
    desc: "Plateforme communautaire de prêts, dons et ventes d'objets d'occasion entre voisins. Économie circulaire solidaire avec système de modération, associations vérifiées et impact social en temps réel.",
    techs: ["React", "Node.js", "Prisma", "MySQL", "Socket.io"],
    video: ecoVideo,
    accent: "#7C3AED", // Purple
  },
  {
    cat: "Real Estate · Luxury Branding",
    title: "Luxora — Prestige Real Estate Agency",
    desc: "High-end property showcase with immersive gallery, contact form with EmailJS integration, smooth scroll animations, and elegant gold-accented design for Tunisian luxury market.",
    techs: ["React", "EmailJS", "CSS-in-JS", "Intersection Observer"],
    video: lumiereVideo,
    accent: "#F59E0B", // Gold/Amber
  },
  {
  cat: "Web App · Food & Recipes",
  title: "Koulme Platform",
  desc: "An international recipe discovery platform where users can explore dishes from different countries. It includes filtering by country and ingredients, and provides step-by-step cooking instructions for each recipe in a clean, interactive interface.",
  techs: ["React", "Netlify", "API Integration", "UI Design"],
  accent: "#06B6D4",
  link: "https://koulme.netlify.app/"
}
];

/*const TESTIMONIALS = [
  {
    text: "Working with Mortadha was a revelation. The attention to animation detail and performance optimization made our product feel alive. Shipped 3 weeks ahead of schedule.",
    name: "Sophie Martin", role: "CPO @ Orion Labs", color: "#7C3AED",
  },
  {
    text: "The most technically versatile developer I've worked with. Mortadha understood the business problem first, then built the perfect solution — clean, documented, scalable.",
    name: "Marcus Chen", role: "CTO @ NovaTech", color: "#06B6D4",
  },
  {
    text: "Our conversion rate jumped 34% after the redesign. Mortadha brought both the UX instinct and the engineering precision to make it real. Extraordinary work.",
    name: "Layla Hassan", role: "Founder @ Bloom Studio", color: "#22c55e",
  },
];*/

// ─── HOOKS ────────────────────────────────────────────────────────────────────
function useCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const pos     = useRef({ x: 0, y: 0 });
  const ring    = useRef({ x: 0, y: 0 });
  const raf     = useRef(null);

  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + "px";
        dotRef.current.style.top  = e.clientY + "px";
      }
    };
    const down = () => { dotRef.current?.classList.add("click"); ringRef.current?.classList.add("click"); };
    const up   = () => { dotRef.current?.classList.remove("click"); ringRef.current?.classList.remove("click"); };
    const over = (e) => {
      if (e.target.closest("a,button,[data-hover]")) {
        dotRef.current?.classList.add("hover"); ringRef.current?.classList.add("hover");
      } else {
        dotRef.current?.classList.remove("hover"); ringRef.current?.classList.remove("hover");
      }
    };

    const lerp = (a, b, t) => a + (b - a) * t;
    const animate = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.12);
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.12);
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + "px";
        ringRef.current.style.top  = ring.current.y + "px";
      }
      raf.current = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("mouseover", over);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return { dotRef, ringRef };
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); } });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useScrollNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return scrolled;
}

function useTilt() {
  const cardRefs = useRef([]);

  useEffect(() => {
    const cards = cardRefs.current; // ✅ snapshot ONCE

    const handlers = cards.map((card) => {
      if (!card) return null;

      const move = (e) => {
        const r = card.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 100;
        const y = ((e.clientY - r.top) / r.height) * 100;
        card.style.setProperty("--mx", x + "%");
        card.style.setProperty("--my", y + "%");
      };

      card.addEventListener("mousemove", move);
      return move;
    });

    return () => {
      cards.forEach((card, i) => {
        if (card && handlers[i]) {
          card.removeEventListener("mousemove", handlers[i]);
        }
      });
    };
  }, []);

  return cardRefs;
}

// ─── COMPONENTS ───────────────────────────────────────────────────────────────
const Cursor = ({ dotRef, ringRef }) => (
  <>
    <div className="cursor-dot"  ref={dotRef}  />
    <div className="cursor-ring" ref={ringRef} />
  </>
);

const Nav = ({ scrolled }) => (
  <nav className={scrolled ? "scrolled" : ""}>
    <div className="nav-logo">Mortadha.dev</div>
    <ul className="nav-links">
      {["About","Skills","Projects","Contact"].map(s => (
        <li key={s}><a href={`#${s.toLowerCase()}`}>{s}</a></li>
      ))}
    </ul>
    <button className="nav-cta">Hire Me</button>
  </nav>
);
  const titles = ["Full-Stack Developer", "UI/UX Architect", "Creative Coder", "Product Builder"];
const Hero = () => {
  const [typed, setTyped] = useState("");
  const tIdx = useRef(0); const cIdx = useRef(0); const del = useRef(false);

  useEffect(() => {
  const tick = () => {
    const t = titles[tIdx.current];

    if (!del.current) {
      setTyped(t.slice(0, cIdx.current + 1));
      cIdx.current++;

      if (cIdx.current === t.length) {
        del.current = true;
        setTimeout(tick, 1800);
        return;
      }
    } else {
      setTyped(t.slice(0, cIdx.current - 1));
      cIdx.current--;

      if (cIdx.current === 0) {
        del.current = false;
        tIdx.current = (tIdx.current + 1) % titles.length;
      }
    }

    setTimeout(tick, del.current ? 55 : 95);
  };

  const id = setTimeout(tick, 600);
  return () => clearTimeout(id);
}, []);

  return (
    <section className="hero" id="hero">
      <div className="hero-grid-bg" />
      <div className="hero-glow hero-glow-1" />
      <div className="hero-glow hero-glow-2" />
      <div className="hero-content">
        <div className="hero-tag">Available for projects · 2026</div>
        <h1 className="hero-title">
          <span className="line"><span>Crafting</span></span>
          <span className="line"><span>Digital <span className="accent">Experiences</span></span></span>
          <span className="line"><span>That Matter</span></span>
        </h1>
        <p className="hero-sub">
          I'm <strong style={{color:"var(--white)"}}>Mortadha Boufeden</strong> — {" "}
          <span style={{color:"var(--cyan)", fontFamily:"var(--mono)"}}>
            {typed}<span style={{animation:"pulse 1s infinite"}}>|</span>
          </span>
          <br/>Building fast, beautiful, and accessible web products with obsessive attention to detail.
        </p>
        <div className="hero-actions">
          <a href="#projects" className="btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            View My Work
          </a>
          <a href="#contact" className="btn-secondary">
            Let's Talk
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
      <div className="hero-scroll">
        <div className="scroll-line" />
        scroll
      </div>
    </section>
  );
};

const Marquee = () => {
  const items = ["React","TypeScript","Node.js","Next.js","Python","Figma","Three.js","PostgreSQL","Docker","GraphQL","Tailwind CSS","React Native","Prisma","Redis"];
  const doubled = [...items, ...items];
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {doubled.map((t, i) => (
          <span className="marquee-item" key={i}>{t}<span>✦</span></span>
        ))}
      </div>
    </div>
  );
};

const About = () => (
  <section id="about">
    <div className="section-label">About Me</div>
    <div className="about-grid">
      <div className="reveal">
        <div className="about-img-wrap">
          <div className="about-img-bg" />
          <img 
            src={profilePic} 
            alt="Mortadha Boufeden" 
            className="about-img-letter"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              borderRadius: '50%'
            }}
          />
          <div className="about-badge">
            <div className="badge-dot" />
            <div>
              <div className="badge-text">Open to Work</div>
              <div className="badge-sub">Remote · Freelance · Full-time</div>
            </div>
          </div>
        </div>
      </div>
      <div className="reveal reveal-delay-2">
        <h2 className="section-title">Turning ideas into <span style={{background:"linear-gradient(135deg,var(--violet),var(--cyan))", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent"}}>reality</span></h2>
        <div className="about-text">
          <p>I'm an entry-level full-stack developer who started my journey with a high school diploma in IT, followed by a Bachelor's degree in Information Technology. Right now, I'm in my first year of a Master's degree in Information Development Systems — and I couldn't be more excited about where this path is taking me.</p>
<p>Outside of my studies, I use my free time to keep learning and building. I'm constantly working on side projects, experimenting with new technologies, and challenging myself to become a better developer. From frontend to backend, I love seeing how different pieces of technology come together to create something meaningful.</p>
<p>My goal isn't just to write code — it's to understand how things work deeply, stay curious, and never stop improving. Whether I'm learning a new framework, fixing a bug, or deploying a project, I see every moment as a chance to grow.</p>
        </div>
        <div className="about-stats">
          {[["6","Months ago."],["10+","Projects"]].map(([n,l]) => (
            <div className="stat-item" key={l}>
              <div className="stat-num">{n}</div>
              <div className="stat-label">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
const Skills = ({ tiltRefs }) => (
  <section id="skills" className="skills-section">
    <div className="section-label reveal">Expertise</div>
    <h2 className="section-title reveal reveal-delay-1">What I bring <span style={{background:"linear-gradient(135deg,var(--violet),var(--cyan))", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent"}}>to the table</span></h2>
    <p className="section-sub reveal reveal-delay-2">A full-spectrum skill set across the modern web stack — from pixel-perfect frontends to scalable cloud infrastructure.</p>
    <div className="skills-grid">
      {SKILLS.map((s, i) => (
        <div className={`skill-card reveal reveal-delay-${(i % 4) + 1}`} key={s.name}
          ref={el => tiltRefs.current[i] = el}>
          <div className="skill-icon">{s.icon}</div>
          <div className="skill-name">{s.name}</div>
          <p style={{color:"var(--muted)", fontSize:".85rem", lineHeight:"1.65"}}>{s.desc}</p>
          <div className="skill-tags">{s.tags.map(t => <span className="skill-tag" key={t}>{t}</span>)}</div>
        </div>
      ))}
    </div>
  </section>
);
const Projects = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Professional images for each project
  const projectImages = {
    "Eco-Marché": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    "Luxora — Prestige Real Estate Agency": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    "Koulme Platform": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
};

  // Fallback images by category
  const getFallbackImage = (project) => {
    if (project.title.includes("Eco")) {
      return "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80";
    }
    if (project.title.includes("Luxora") || project.title.includes("Real Estate")) {
      return "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80";
    }
    return "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80";
  };

  return (
    <section id="projects">
      <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />

      <div className="section-label reveal">Selected Work</div>

      <h2 className="section-title reveal reveal-delay-1">
        Projects that{" "}
        <span
          style={{
            background: "linear-gradient(135deg,var(--violet),var(--cyan))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          ship
        </span>
      </h2>

      <p className="section-sub reveal reveal-delay-2">
        A curated selection of real products — built for scale, designed for humans.
      </p>

      <div className="projects-grid">
        {PROJECTS.map((p, i) => {
          const isHovered = hoveredIndex === i;
          const projectImage = projectImages[p.title] || getFallbackImage(p);

          return (
            <div
              className={`project-card reveal reveal-delay-${(i % 3) + 1}`}
              key={p.title}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="project-thumb">
                <div
                  className="project-thumb-bg"
                  style={{
                    position: "absolute",
                    inset: 0,
                  }}
                >
                  {/* Main Image */}
                  <img
                    src={projectImage}
                    alt={p.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.6s cubic-bezier(0.34, 1.2, 0.64, 1)",
                      transform: isHovered ? "scale(1.1)" : "scale(1)",
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: `linear-gradient(135deg, 
                        ${p.accent}40 0%, 
                        rgba(0,0,0,0.6) 50%, 
                        rgba(0,0,0,0.8) 100%)`,
                    }}
                  />

                  {/* Dark overlay for better text contrast */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(0,0,0,0.3)",
                      opacity: isHovered ? 0.2 : 0.5,
                      transition: "opacity 0.4s ease",
                    }}
                  />

                  {/* Grid Pattern Overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
                      `,
                      backgroundSize: "40px 40px",
                      pointerEvents: "none",
                    }}
                  />

                  {/* Tech Icons Floating */}
                  <div
                    style={{
                      position: "absolute",
                      top: "20px",
                      right: "20px",
                      display: "flex",
                      gap: "8px",
                      zIndex: 2,
                    }}
                  >
                    {p.techs.slice(0, 3).map((tech, idx) => (
                      <span
                        key={tech}
                        style={{
                          fontSize: "0.65rem",
                          background: "rgba(0,0,0,0.7)",
                          backdropFilter: "blur(8px)",
                          padding: "4px 10px",
                          borderRadius: "20px",
                          color: "#fff",
                          fontFamily: "var(--mono)",
                          border: `1px solid ${p.accent}`,
                          transform: isHovered ? `translateY(-${(idx + 1) * 3}px)` : "translateY(0)",
                          transition: `transform 0.3s cubic-bezier(0.34, 1.2, 0.64, 1) ${idx * 0.05}s`,
                          opacity: isHovered ? 1 : 0.8,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Project Title Overlay */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "0",
                      left: "0",
                      right: "0",
                      padding: "30px 24px 24px",
                      background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)",
                      transform: isHovered ? "translateY(0)" : "translateY(10px)",
                      transition: "transform 0.4s cubic-bezier(0.34, 1.2, 0.64, 1)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.7rem",
                        color: p.accent,
                        fontFamily: "var(--mono)",
                        letterSpacing: "0.1em",
                        marginBottom: "6px",
                        opacity: isHovered ? 1 : 0.7,
                      }}
                    >
                      {p.cat.toUpperCase()}
                    </div>
                    <div
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        fontFamily: "var(--syne)",
                        color: "#fff",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {p.title}
                    </div>
                  </div>

                  {/* Corner Accents */}
                  <div
                    style={{
                      position: "absolute",
                      top: "16px",
                      left: "16px",
                      width: "40px",
                      height: "40px",
                      borderTop: `2px solid ${p.accent}`,
                      borderLeft: `2px solid ${p.accent}`,
                      opacity: isHovered ? 0.8 : 0.3,
                      transition: "opacity 0.3s ease",
                      pointerEvents: "none",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "16px",
                      right: "16px",
                      width: "40px",
                      height: "40px",
                      borderBottom: `2px solid ${p.accent}`,
                      borderRight: `2px solid ${p.accent}`,
                      opacity: isHovered ? 0.8 : 0.3,
                      transition: "opacity 0.3s ease",
                      pointerEvents: "none",
                    }}
                  />
                </div>

                {/* Hover Overlay with Actions */}
                <div
                  className="project-thumb-overlay"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(135deg, ${p.accent}cc, rgba(0,0,0,0.8))`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0,
                    transition: "opacity 0.4s cubic-bezier(0.34, 1.2, 0.64, 1)",
                    backdropFilter: "blur(4px)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
                >
                  <div className="thumb-action" style={{ display: "flex", gap: "16px" }}>
                    <button
                      className="thumb-btn primary"
                      onClick={() => {
  if (p.link) {
    window.open(p.link, "_blank");
  } else {
    setSelectedVideo(p.video);
  }
}}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        background: "#fff",
                        color: p.accent,
                        border: "none",
                        padding: "12px 24px",
                        borderRadius: "8px",
                        fontFamily: "var(--inter)",
                        fontWeight: 600,
                        fontSize: "0.85rem",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.3)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                      {p.link ? "Live Demo" : "Watch Demo"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="project-body">
                <div className="project-cat">{p.cat}</div>
                <div className="project-title">{p.title}</div>
                <p className="project-desc">{p.desc}</p>

                <div className="project-techs">
                  {p.techs.map((t) => (
                    <span className="project-tech" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .project-card {
          transition: transform 0.4s cubic-bezier(0.34, 1.2, 0.64, 1),
                      border-color 0.3s ease,
                      box-shadow 0.4s ease !important;
        }
        
        .project-thumb {
          position: relative;
          overflow: hidden;
          height: 260px;
        }
        
        .project-thumb-bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .thumb-btn {
          transition: all 0.3s cubic-bezier(0.34, 1.2, 0.64, 1) !important;
        }
      `}</style>
    </section>
  );
};
/*const Testimonials = () => (
  <section id="testimonials" className="testimonials-section">
    <div className="section-label reveal">Social Proof</div>
    <h2 className="section-title reveal reveal-delay-1">What clients <span style={{background:"linear-gradient(135deg,var(--violet),var(--cyan))", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent"}}>say</span></h2>
    <div className="testimonials-grid">
      {TESTIMONIALS.map((t, i) => (
        <div className={`testimonial-card reveal reveal-delay-${i + 1}`} key={t.name}>
          <div className="testimonial-quote">"</div>
          <p className="testimonial-text">{t.text}</p>
          <div className="testimonial-author">
            <div className="author-avatar" style={{background:`linear-gradient(135deg,${t.color},rgba(255,255,255,.2))`}}>
              {t.name.charAt(0)}
            </div>
            <div>
              <div className="author-name">{t.name}</div>
              <div className="author-role">{t.role}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
); */
const Contact = () => {
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.target;
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/mortadhaboufeden17@gmail.com", {
        method: "POST",
        body: new FormData(form)
      });
      const result = await response.json();
      
      if (result.success) {
        setSent(true);
        form.reset(); // ✅ Resets all form fields to empty/initial state
        
        // Reset the sent message after 3 seconds
        setTimeout(() => setSent(false), 3000);
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      alert("Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact">
      <div className="contact-inner">
        <div className="section-label reveal">Contact</div>
        <h2 className="section-title reveal reveal-delay-1">Let's build something <span style={{background:"linear-gradient(135deg,var(--violet),var(--cyan))", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent"}}>great</span></h2>
        <p className="section-sub reveal reveal-delay-2">Open for freelance projects, full-time roles, and interesting collaborations. Response within 24h.</p>
        <div className="contact-links reveal reveal-delay-3">
  {[
    { icon:"📧", label:"mortadhaboufeden17@gmail.com", href:"mailto:mortadhaboufeden17@gmail.com" },
    { icon:"💼", label:"LinkedIn", href:"https://tn.linkedin.com/in/mortadha-boufeden-a04231202" },
    { icon:"🐙", label:"GitHub", href:"https://github.com/mortadha20" },
    { icon:"🐦", label:"Twitter", href:"https://x.com/MortadhaBoufed3" },
  ].map(l => (
    <a 
      key={l.label} 
      href={l.href} 
      className="contact-link"
      target="_blank" 
      rel="noopener noreferrer"
    >
      {l.icon} {l.label}
    </a>
  ))}
</div>
        <div className="contact-form reveal reveal-delay-4">
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group"><label>Name</label><input type="text" name="name" placeholder="Your name" required /></div>
              <div className="form-group"><label>Email</label><input type="email" name="email" placeholder="you@example.com" required /></div>
            </div>
            <div className="form-group"><label>Subject</label><input type="text" name="subject" placeholder="Project idea, job offer…" required /></div>
            <div className="form-group"><label>Message</label><textarea name="message" placeholder="Tell me about your project…" required /></div>
            <button type="submit" className="form-submit" disabled={isLoading}>
              {sent ? "✓ Message Sent!" : isLoading ? "Sending..." : (
                <><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13"/><path d="M22 2L15 22 11 13 2 9l20-7z"/></svg> Send Message</>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer>
    <span className="footer-copy">© 2026 Mortadha Boufeden — Built with React & passion</span>
  </footer>
);

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const { dotRef, ringRef } = useCursor();
  const scrolled = useScrollNav();
  const tiltRefs = useTilt();
  useReveal();

  return (
    <>
      <FontLoader />
      <GlobalStyles />
      <Cursor dotRef={dotRef} ringRef={ringRef} />
      <Nav scrolled={scrolled} />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills tiltRefs={tiltRefs} />
        <Projects />
        {/* <Testimonials /> */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}