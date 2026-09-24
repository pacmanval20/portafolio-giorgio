'use client';
import { useEffect, useRef, useState } from 'react';
import { pythonExample } from '@/lib/profile';

type Meteor = { x: number; y: number; vx: number; vy: number; age: number; life: number; size: number; digit: string };
const clamp = (n: number) => Math.max(0, Math.min(1, n));

export default function ProgrammerEffects() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const halo = useRef<HTMLCanvasElement>(null);
  const pointer = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      let saved: string | null = null;
      try { saved = localStorage.getItem('giorgio-motion'); } catch {}
      setEnabled(!preference.matches && saved !== 'off');
    };
    sync(); setReady(true); preference.addEventListener('change', sync);
    return () => preference.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const root = document.documentElement;
    root.classList.toggle('fx-on', enabled);
    root.classList.toggle('fx-off', !enabled);
    const code = document.querySelector<HTMLElement>('[data-live-code]');
    if (!enabled) { if (code) code.textContent = pythonExample; return () => root.classList.remove('fx-off'); }
    const ctx = canvas.current?.getContext('2d');
    const haloCtx = halo.current?.getContext('2d');
    const fine = matchMedia('(hover: hover) and (pointer: fine)');
    const mobile = matchMedia('(max-width: 760px)');
    let width = innerWidth, height = innerHeight, raf = 0, last = 0, elapsed = 0, nextMeteor = 0;
    let mouseX = -500, mouseY = -500, x = -500, y = -500, showPointer = false;
    let codeVisible = false, characters = 0, typedAt = 0;
    let dirty = true;
    const meteors: Meteor[] = [];
    const hero = document.querySelector<HTMLElement>('.hero');
    const panels = Array.from(document.querySelectorAll<HTMLElement>('[data-chapter]'));
    const projects = Array.from(document.querySelectorAll<HTMLElement>('.project'));
    const stage = document.querySelector<HTMLElement>('.tech-stage');
    const stageLabel = document.querySelector<HTMLElement>('[data-stage-label]');
    const contact = document.querySelector<HTMLElement>('.contact');
    const resize = () => {
      width = innerWidth; height = innerHeight; dirty = true;
      if (!canvas.current) return;
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      canvas.current.width = Math.round(width * dpr); canvas.current.height = Math.round(height * dpr);
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const updateScenes = () => {
      const h = hero?.getBoundingClientRect();
      hero?.style.setProperty('--hero-shift', String(h ? clamp(-h.top / height) : 0));
      let nearest = 0, distance = Infinity;
      panels.forEach((panel, i) => {
        const r = panel.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - height * .52);
        if (d < distance) { distance = d; nearest = i; }
        const p = clamp((height * .92 - r.top) / (height * .5));
        panel.style.setProperty('--chapter-reveal', p.toFixed(3));
      });
      panels.forEach((panel, i) => panel.classList.toggle('chapter-active', i === nearest));
      if (stage) stage.dataset.active = String(nearest);
      if (stageLabel) stageLabel.textContent = ['Python · Datos y lógica', 'Web · Interfaz y experiencia', 'IA · Integraciones futuras'][nearest];
      projects.forEach(project => {
        const r = project.getBoundingClientRect();
        project.style.setProperty('--project-reveal', clamp((height * .95 - r.top) / (height * .6)).toFixed(3));
      });
      if (contact) contact.style.setProperty('--contact-reveal', clamp((height - contact.getBoundingClientRect().top) / (height * .65)).toFixed(3));
      const total = root.scrollHeight - height;
      root.style.setProperty('--reading-progress', String(total > 0 ? scrollY / total : 0));
      dirty = false;
    };
    const observeCode = new IntersectionObserver(entries => { codeVisible = entries.some(e => e.isIntersecting); });
    if (code) { code.textContent = ''; observeCode.observe(code); }
    const spawn = () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 35 + Math.random() * 85;
      // Keep the brighter particles in the outer space around the text.
      meteors.push({ x: Math.random() < .5 ? Math.random() * width * .2 : width * (.8 + Math.random() * .2), y: Math.random() * height,
        vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed * .65, age: 0, life: 1.8 + Math.random() * 2.4,
        size: 14 + Math.random() * 13, digit: Math.random() < .5 ? '0' : '1' });
    };
    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (now - last < 32) return;
      const dt = Math.min((now - last) / 1000 || .033, .05); last = now; elapsed += dt;
      if (dirty) updateScenes();
      if (ctx) {
        ctx.clearRect(0, 0, width, height);
        if (elapsed > nextMeteor && meteors.length < (mobile.matches ? 5 : 12)) { spawn(); nextMeteor = elapsed + (mobile.matches ? .85 : .35) + Math.random() * .65; }
        for (let i = meteors.length - 1; i >= 0; i--) {
          const m = meteors[i]; m.age += dt;
          const p = m.age / m.life;
          if (p >= 1) { meteors.splice(i, 1); continue; }
          m.x += m.vx * dt; m.y += m.vy * dt;
          const a = Math.min(p * 6, 1) * (1 - p) * .52;
          const size = m.size * (1 - p * .75);
          ctx.font = size.toFixed(1) + 'px Consolas, monospace';
          for (let tail = 4; tail >= 0; tail--) {
            ctx.fillStyle = 'rgba(76,239,164,' + a * (1 - tail / 5) * (tail ? .25 : 1) + ')';
            ctx.fillText(m.digit, m.x - m.vx * tail * .06, m.y - m.vy * tail * .06);
          }
        }
      }
      if (showPointer && fine.matches && !mobile.matches && pointer.current && haloCtx) {
        x += (mouseX - x) * .45; y += (mouseY - y) * .45;
        pointer.current.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
        haloCtx.clearRect(0, 0, 300, 300); haloCtx.font = '9px Consolas, monospace'; haloCtx.textAlign = 'center';
        for (let row = -12; row <= 12; row++) for (let col = -12; col <= 12; col++) {
          const dist = Math.hypot(row, col) * 11;
          if (dist < 15 || dist > 140) continue;
          const a = Math.pow(1 - dist / 144, 1.6) * (.2 + .1 * Math.sin(dist / 15 - elapsed * 3));
          haloCtx.fillStyle = 'rgba(65,242,161,' + a + ')';
          haloCtx.fillText((row + col + Math.floor(elapsed * 3)) % 2 ? '1' : '0', 150 + col * 11, 154 + row * 11);
        }
      }
      if (code && codeVisible && characters < pythonExample.length && now - typedAt > 45) {
        characters += 2; typedAt = now; code.textContent = pythonExample.slice(0, characters);
      }
    };
    const hide = () => { showPointer = false; pointer.current?.classList.remove('is-visible'); root.classList.remove('fx-pointer'); };
    const move = (e: PointerEvent) => {
      if (!fine.matches || mobile.matches || e.pointerType !== 'mouse') { hide(); return; }
      mouseX = e.clientX; mouseY = e.clientY;
      if (!showPointer) { x = mouseX; y = mouseY; }
      showPointer = true; pointer.current?.classList.add('is-visible'); root.classList.add('fx-pointer');
      pointer.current?.classList.toggle('is-link', e.target instanceof Element && !!e.target.closest('a,button,summary'));
    };
    const scroll = () => { dirty = true; };
    const key = (e: KeyboardEvent) => { if (e.key === 'Tab') hide(); };
    const visibility = () => {
      cancelAnimationFrame(raf); root.classList.toggle('fx-sleep', document.hidden); hide();
      if (!document.hidden) { last = performance.now(); dirty = true; raf = requestAnimationFrame(draw); }
    };
    resize(); updateScenes(); raf = requestAnimationFrame(draw);
    window.addEventListener('pointermove', move, { passive: true }); window.addEventListener('scroll', scroll, { passive: true });
    window.addEventListener('resize', resize); window.addEventListener('keydown', key); window.addEventListener('blur', hide);
    document.addEventListener('pointerleave', hide); document.addEventListener('visibilitychange', visibility);
    return () => {
      cancelAnimationFrame(raf); observeCode.disconnect(); hide();
      window.removeEventListener('pointermove', move); window.removeEventListener('scroll', scroll); window.removeEventListener('resize', resize);
      window.removeEventListener('keydown', key); window.removeEventListener('blur', hide); document.removeEventListener('pointerleave', hide); document.removeEventListener('visibilitychange', visibility);
      ctx?.clearRect(0, 0, width, height); haloCtx?.clearRect(0, 0, 300, 300);
      root.classList.remove('fx-on', 'fx-sleep'); root.style.removeProperty('--reading-progress');
      if (code) code.textContent = pythonExample;
      hero?.style.removeProperty('--hero-shift'); contact?.style.removeProperty('--contact-reveal');
      panels.forEach(p => { p.classList.remove('chapter-active'); p.style.removeProperty('--chapter-reveal'); });
      projects.forEach(p => p.style.removeProperty('--project-reveal'));
    };
  }, [enabled, ready]);
  const toggle = () => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setEnabled(!enabled); try { localStorage.setItem('giorgio-motion', enabled ? 'off' : 'on'); } catch {}
  };
  return <>
    <canvas className="binary-meteors" ref={canvas} aria-hidden="true" />
    <div className="reading-progress" aria-hidden="true" />
    <div className="binary-cursor" ref={pointer} aria-hidden="true"><canvas ref={halo} width="300" height="300" /><span /></div>
    {ready && <button className="motion-control" aria-pressed={enabled} onClick={toggle} aria-label={enabled ? 'Pausar animaciones' : 'Activar animaciones'}><span aria-hidden="true">{enabled ? 'Ⅱ' : '▷'}</span> {enabled ? 'Pausar animaciones' : 'Activar animaciones'}</button>}
  </>;
}
