'use client';
import { useEffect, useRef, useState } from 'react';
const codeSample = '// Un paso a la vez.\nconst giorgio = {\n  stack: ["Java", "JavaScript", "Python"],\n  modo: "aprender construyendo"\n};\n\nwhile (curiosidad) {\n  practicar();\n  crear();\n}';
export default function ProgrammerEffects() {
  const cursor = useRef<HTMLDivElement>(null);
  const ripple = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const haloCanvas = useRef<HTMLCanvasElement>(null);
  const rainCanvas = useRef<HTMLCanvasElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      let saved: string | null = null;
      try { saved = localStorage.getItem('giorgio-motion'); } catch {}
      setEnabled(!preference.matches && saved !== 'off');
    };
    update(); setReady(true);
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    const code = document.querySelector<HTMLElement>('[data-live-code]');
    if (!enabled) { if (code) code.textContent = codeSample; return; }
    const halo = haloCanvas.current?.getContext('2d');
    const rain = rainCanvas.current?.getContext('2d');
    const fine = matchMedia('(hover: hover) and (pointer: fine)');
    let width = 0, height = 0, frame = 0, last = 0, ticks = 0, characters = 0, hold = 0;
    let codeVisible = true;
    const drops: { x: number; y: number; speed: number }[] = [];
    const resize = () => {
      width = innerWidth; height = innerHeight;
      const canvas = rainCanvas.current;
      if (!canvas) return;
      const ratio = Math.min(devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
      rain?.setTransform(ratio, 0, 0, ratio, 0, 0);
      drops.length = 0;
      const spacing = width < 760 ? 64 : 38;
      for (let x = 12; x < width; x += spacing) drops.push({ x, y: Math.random() * (height + 300) - 300, speed: 1.5 + Math.random() * 2 });
    };
    const observer = new IntersectionObserver(entries => { codeVisible = entries.some(entry => entry.isIntersecting); });
    if (code) { code.textContent = ''; observer.observe(code); }
    resize();
    const draw = (now: number) => {
      frame = requestAnimationFrame(draw);
      if (document.hidden || now - last < 60) return;
      last = now; ticks++;
      if (rain) {
        rain.clearRect(0, 0, width, height); rain.font = '11px Consolas, monospace';
        drops.forEach((drop, index) => {
          drop.y += drop.speed;
          if (drop.y > height + 260) drop.y = -30;
          for (let tail = 0; tail < 13; tail++) {
            rain.fillStyle = 'rgba(25,235,115,' + ((1 - tail / 13) * .15) + ')';
            rain.fillText((index + tail + Math.floor(ticks / 13)) % 3 === 0 ? '1' : '0', drop.x, drop.y - tail * 16);
          }
        });
      }
      if (halo && fine.matches && document.documentElement.classList.contains('fx-pointer')) {
        halo.clearRect(0, 0, 360, 360); halo.font = '10px Consolas, monospace'; halo.textAlign = 'center';
        const glyphs = '01:;+*#01';
        for (let row = 0; row < 29; row++) {
          for (let column = 0; column < 29; column++) {
            const dx = (column - 14) * 12, dy = (row - 14) * 12;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance > 174 || distance < 17) continue;
            const wave = .5 + .5 * Math.sin(distance / 17 - ticks / 7);
            const opacity = Math.pow(1 - distance / 178, 1.35) * (.27 + wave * .38);
            halo.fillStyle = 'rgba(30,255,110,' + opacity + ')';
            halo.fillText(glyphs[(row * 7 + column * 3 + Math.floor(ticks / 4)) % glyphs.length], 180 + dx, 184 + dy);
          }
        }
      }
      if (code && codeVisible) {
        if (characters < codeSample.length) {
          characters = Math.min(codeSample.length, characters + (ticks % 3 === 0 ? 2 : 1));
          code.textContent = codeSample.slice(0, characters);
        } else if (++hold > 80) { characters = 0; hold = 0; code.textContent = ''; }
      }
    };
    frame = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('resize', resize); halo?.clearRect(0, 0, 360, 360); rain?.clearRect(0, 0, width, height); if (code) code.textContent = codeSample; };
  }, [enabled]);
  useEffect(() => {
    if (!ready) return;
    const root = document.documentElement;
    root.classList.toggle('fx-on', enabled);
    root.classList.toggle('fx-off', !enabled);
    if (!enabled) return () => root.classList.remove('fx-off');
    const fine = matchMedia('(hover: hover) and (pointer: fine)');
    const ring = cursor.current;
    let frame = 0, scrollFrame = 0;
    let x = 0, y = 0, targetX = 0, targetY = 0;
    let visible = false;
    let activeCard: HTMLElement | null = null;
    let clickAnimation: Animation | undefined;
    const cards = '.area-card, .project, .portrait-card';
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>('.section-heading, .area-card, .project, .journey li, .faq-list, .contact'));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('fx-await');
          entry.target.classList.add('fx-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    revealElements.forEach(element => {
      if (element.getBoundingClientRect().top > innerHeight) element.classList.add('fx-await');
      observer.observe(element);
    });
    const render = () => {
      x += (targetX - x) * .24; y += (targetY - y) * .24;
      if (ring) ring.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
      frame = Math.abs(targetX - x) + Math.abs(targetY - y) > .15 ? requestAnimationFrame(render) : 0;
    };
    const hide = () => {
      visible = false; ring?.classList.remove('is-visible'); root.classList.remove('fx-pointer');
      cancelAnimationFrame(frame); frame = 0;
    };
    const move = (event: PointerEvent) => {
      if (!fine.matches || event.pointerType !== 'mouse' || document.hidden) { hide(); return; }
      targetX = event.clientX; targetY = event.clientY;
      if (!visible) { x = targetX; y = targetY; visible = true; }
      root.classList.add('fx-pointer'); ring?.classList.add('is-visible');
      const target = event.target instanceof Element ? event.target : null;
      ring?.classList.toggle('is-link', !!target?.closest('a,button,summary,[role="button"]'));
      const card = target?.closest<HTMLElement>(cards) ?? null;
      if (activeCard !== card) activeCard?.classList.remove('fx-lit');
      activeCard = card;
      if (card) {
        const box = card.getBoundingClientRect();
        card.style.setProperty('--spot-x', (event.clientX - box.left) + 'px');
        card.style.setProperty('--spot-y', (event.clientY - box.top) + 'px');
        card.classList.add('fx-lit');
      }
      if (!frame) frame = requestAnimationFrame(render);
    };
    const click = (event: PointerEvent) => {
      if (!fine.matches || event.pointerType !== 'mouse' || !ripple.current) return;
      ripple.current.style.left = event.clientX + 'px'; ripple.current.style.top = event.clientY + 'px';
      clickAnimation?.cancel();
      clickAnimation = ripple.current.animate([
        { opacity: .8, transform: 'translate(-50%,-50%) scale(.3)' },
        { opacity: 0, transform: 'translate(-50%,-50%) scale(2)' },
      ], { duration: 550, easing: 'ease-out' });
    };
    const scroll = () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => {
        const distance = document.documentElement.scrollHeight - innerHeight;
        progress.current?.style.setProperty('transform', 'scaleX(' + (distance > 0 ? scrollY / distance : 0) + ')');
        scrollFrame = 0;
      });
    };
    const visibility = () => { root.classList.toggle('fx-sleep', document.hidden); if (document.hidden) hide(); };
    const keyboard = (event: KeyboardEvent) => { if (event.key === 'Tab') hide(); };
    const focus = (event: FocusEvent) => { if (event.target instanceof Element) event.target.closest('.fx-await')?.classList.remove('fx-await'); };
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', click, { passive: true });
    window.addEventListener('scroll', scroll, { passive: true });
    window.addEventListener('resize', scroll); window.addEventListener('blur', hide); window.addEventListener('keydown', keyboard);
    document.addEventListener('pointerleave', hide); document.addEventListener('visibilitychange', visibility); document.addEventListener('focusin', focus);
    fine.addEventListener('change', hide); scroll();
    return () => {
      hide(); clickAnimation?.cancel(); cancelAnimationFrame(scrollFrame); observer.disconnect();
      window.removeEventListener('pointermove', move); window.removeEventListener('pointerdown', click);
      window.removeEventListener('scroll', scroll); window.removeEventListener('resize', scroll);
      window.removeEventListener('blur', hide); window.removeEventListener('keydown', keyboard);
      document.removeEventListener('pointerleave', hide); document.removeEventListener('visibilitychange', visibility);
      document.removeEventListener('focusin', focus); fine.removeEventListener('change', hide);
      revealElements.forEach(element => element.classList.remove('fx-await', 'fx-revealed'));
      activeCard?.classList.remove('fx-lit'); root.classList.remove('fx-on', 'fx-sleep');
    };
  }, [enabled, ready]);
  const toggle = () => {
    const next = !enabled; setEnabled(next);
    try { localStorage.setItem('giorgio-motion', next ? 'on' : 'off'); } catch {}
  };
  return <>
    <style>{styles}</style>
    <div className="fx-grid" aria-hidden="true" />
    <canvas ref={rainCanvas} className="binary-rain" aria-hidden="true" />
    <div className="fx-progress" ref={progress} aria-hidden="true" />
    <div className="binary-cursor" ref={cursor} aria-hidden="true"><canvas ref={haloCanvas} className="ascii-halo" width="360" height="360" /><span className="ascii-core" /></div>
    <div className="fx-ripple" ref={ripple} aria-hidden="true" />
    <div className="terminal-strip container" aria-hidden="true"><span><i /> giorgio@portfolio <b>~</b> <em>$</em> npm run creativity<span className="terminal-caret">▌</span></span><span className="terminal-status">● SYSTEM ONLINE</span></div>
    {ready && <button className="motion-control" aria-pressed={enabled} onClick={toggle} aria-label={enabled ? 'Pausar animaciones' : 'Activar animaciones'}><span aria-hidden="true">{enabled ? 'Ⅱ' : '▷'}</span><span>{enabled ? 'Pausar animaciones' : 'Activar animaciones'}</span></button>}
  </>;
}
const styles = `
.ascii-halo{position:absolute;left:-180px;top:-180px;width:360px;height:360px;transition:scale .25s;mix-blend-mode:screen}.ascii-core{position:absolute;left:-4px;top:-4px;width:8px;height:8px;border:1px solid #76ffad;rotate:45deg}.binary-cursor.is-link .ascii-halo{scale:1.16}.binary-rain{position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:-1;mask-image:linear-gradient(#0008,#000, #0006)}
.live-terminal{max-width:475px;margin-top:24px;border:1px solid #1c4935;border-radius:9px;background:linear-gradient(140deg,#06130fe6,#070f12e6);overflow:hidden;box-shadow:0 12px 40px #0002}.live-terminal-title{display:flex;gap:6px;align-items:center;padding:10px 13px;border-bottom:1px solid #193328;color:#90b5a3;font:10px Consolas,monospace}.live-terminal-title i{width:5px;height:5px;border-radius:50%;background:#23754e}.live-terminal-title span{margin-left:6px}.live-terminal pre{margin:0;padding:14px 17px;min-height:199px;white-space:pre-wrap;overflow-wrap:anywhere;color:#4edb94;font:11px/1.55 Consolas,monospace}.live-terminal code:after{content:'▌';color:#7effa6}.fx-on .live-terminal code:after{animation:terminal-blink 1.2s steps(2,end) infinite}.fx-off .binary-rain{display:none}@media(max-width:760px){.live-terminal{max-width:100%}.live-terminal pre{font-size:10px;min-height:183px}.ascii-halo{display:none}}@media(prefers-reduced-motion:reduce){.binary-rain{display:none!important}}
.fx-grid{position:fixed;inset:0;pointer-events:none;z-index:-1;background-image:linear-gradient(#10b98108 1px,transparent 1px),linear-gradient(90deg,#10b98108 1px,transparent 1px);background-size:64px 64px;mask-image:linear-gradient(#000,transparent 85%)}
body{isolation:isolate}.terminal-strip{display:flex;justify-content:space-between;gap:20px;padding-top:25px;color:#a6c9bb;font:11px/1.6 Consolas,monospace;letter-spacing:.025em}.terminal-strip b,.terminal-strip em{font-style:normal;color:#48efac}.terminal-strip i{display:inline-block;width:6px;height:6px;border-radius:50%;background:#49eeac;box-shadow:0 0 14px #10b981;margin-right:9px}.terminal-status{font-size:9px;color:#82b49d;letter-spacing:.12em}.terminal-caret{color:#54f6b3}.hero{padding-top:40px}.fx-progress{position:fixed;top:0;left:0;width:100%;height:2px;background:#56ffb7;box-shadow:0 0 12px #10b981;transform:scaleX(0);transform-origin:left;z-index:100;pointer-events:none}
.binary-cursor{position:fixed;top:0;left:0;width:0;height:0;z-index:9999;pointer-events:none;opacity:0;transition:opacity .18s}.binary-cursor.is-visible{opacity:1}.binary-halo{position:absolute;left:-48px;top:-48px;width:96px;height:96px;transition:scale .22s ease;filter:drop-shadow(0 0 5px #10b98170)}.binary-spin{position:absolute;inset:0}.binary-spin span{position:absolute;left:44px;top:41px;width:8px;text-align:center;font:10px/14px Consolas,monospace;color:#75ffc1;transform-origin:4px 7px}.binary-halo i{position:absolute;inset:20px;border:1px solid #39ffab45;border-radius:50%}.binary-halo b{position:absolute;inset:44px;border:1px solid #7affcb;transform:rotate(45deg)}.binary-cursor.is-link .binary-halo{scale:1.35}.binary-cursor.is-link .binary-halo i{border-color:#9affd2;box-shadow:0 0 15px #10b98133}.fx-ripple{position:fixed;z-index:9998;width:60px;height:60px;border:1px solid #66ffc1;border-radius:50%;pointer-events:none;opacity:0}
.motion-control{position:fixed;left:18px;bottom:20px;z-index:40;display:flex;align-items:center;gap:8px;min-height:40px;padding:9px 12px;border:1px solid #315347;border-radius:7px;color:#bcebd6;background:#0b1713eF;font:10px/1.4 Consolas,monospace;backdrop-filter:blur(10px)}.motion-control>span:first-child{color:#64ffc1;font-size:14px}.motion-control:hover{border-color:#64ffc1}
.fx-on .binary-spin{animation:binary-orbit 16s linear infinite}.fx-on .terminal-caret{animation:terminal-blink 1.3s steps(2,end) infinite}.fx-on .hero-copy{animation:code-arrive .85s ease both}.fx-on .hero-art{animation:code-arrive 1s .15s ease both}.fx-on .hero h1 .mint{background:linear-gradient(105deg,#10b981 10%,#a0ffd7 40%,#10b981 65%);background-size:220% auto;background-clip:text;-webkit-background-clip:text;color:transparent;animation:code-shine 7s ease-in-out infinite}.fx-on .floating-label{animation:code-float 5s ease-in-out infinite}.fx-on .nubo-core{animation:core-glow 5s ease-in-out infinite}.fx-on .nubo-ring.ring-a{animation:nubo-orbit 22s linear infinite}.fx-on .nubo-ring.ring-b{animation:nubo-orbit 28s linear reverse infinite}.fx-on .orbit-one{animation:portrait-orbit 25s linear infinite}.fx-on .orbit-two{animation:portrait-orbit 32s linear reverse infinite}
.fx-on .area-card,.fx-on .project,.fx-on .portrait-card{position:relative;overflow:hidden}.fx-on .area-card:after,.fx-on .project:after,.fx-on .portrait-card:after{content:'';position:absolute;inset:0;pointer-events:none;background:radial-gradient(260px circle at var(--spot-x,50%) var(--spot-y,50%),#36ffb51c,transparent 75%);opacity:0;transition:opacity .25s}.fx-on .fx-lit:after{opacity:1}.fx-on .project{transition:transform .35s,border-color .35s}.fx-on .project:hover{transform:translateY(-6px);border-color:#35775b}.fx-on .button{position:relative;overflow:hidden}.fx-on .button:after{content:'';position:absolute;inset:-40% auto -40% -50%;width:30%;background:#ffffff40;transform:skewX(-20deg);transition:left .55s;pointer-events:none}.fx-on .button:hover:after{left:125%}.fx-on .button svg,.fx-on .text-link svg{transition:transform .25s}.fx-on .button:hover svg,.fx-on .text-link:hover svg{transform:translate(2px,-2px)}.fx-on .section-heading,.fx-on .area-card,.fx-on .project,.fx-on .journey li,.fx-on .faq-list,.fx-on .contact{transition:opacity .65s ease,translate .65s ease,border-color .3s,transform .3s}.fx-on .fx-await{opacity:0;translate:0 28px}.fx-on .fx-revealed{opacity:1;translate:0 0}.fx-on .fx-await:focus-within{opacity:1;translate:0 0}
@keyframes binary-orbit{to{transform:rotate(360deg)}}@keyframes terminal-blink{50%{opacity:0}}@keyframes code-arrive{from{opacity:0;translate:0 20px}to{opacity:1;translate:0 0}}@keyframes code-shine{50%{background-position:100% center}}@keyframes code-float{50%{translate:0 -9px}}@keyframes core-glow{50%{text-shadow:0 0 35px #42ffc580}}@keyframes nubo-orbit{from{transform:translate(-50%,-50%) rotate(-30deg)}to{transform:translate(-50%,-50%) rotate(330deg)}}@keyframes portrait-orbit{to{rotate:360deg}}
@media(hover:hover) and (pointer:fine){.fx-pointer,.fx-pointer body,.fx-pointer a,.fx-pointer button,.fx-pointer summary{cursor:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='32' viewBox='0 0 28 32'%3E%3Cpath d='M3 2L23 19L13 20L8 29Z' fill='%230a1711' stroke='%2375ffc1' stroke-width='1.8' stroke-linejoin='round'/%3E%3Cpath d='M8 10L15 16H10Z' fill='%2310b981'/%3E%3C/svg%3E") 3 2,auto}.fx-pointer input,.fx-pointer textarea,[contenteditable=true]{cursor:text}}
.fx-sleep *,.fx-sleep *:before,.fx-sleep *:after{animation-play-state:paused!important}.fx-off *,.fx-off *:before,.fx-off *:after{animation:none!important;transition:none!important}.fx-off{scroll-behavior:auto}.fx-off .binary-cursor,.fx-off .fx-ripple,.fx-off .fx-progress{display:none}
@media(max-width:760px){.terminal-strip{padding-top:18px;font-size:9px}.terminal-status{display:none}.hero{padding-top:28px}.motion-control{left:12px;bottom:17px;padding:9px;max-width:150px;font-size:9px}.binary-cursor,.fx-ripple{display:none}}
@media(prefers-reduced-motion:reduce){.binary-cursor,.fx-ripple{display:none!important}.fx-on .fx-await{opacity:1;translate:none}.fx-on *,.fx-on *:before,.fx-on *:after{animation:none!important;transition:none!important}.fx-on .hero h1 .mint{background:none;color:#10b981}.fx-on,.fx-on body,.fx-on a,.fx-on button,.fx-on summary{cursor:auto}}
`;
