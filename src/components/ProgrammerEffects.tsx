'use client';
import { useEffect, useRef, useState } from 'react';
const codeSample = "// Un paso a la vez.\nconst giorgio = {\n  stack: [\"Java\", \"JavaScript\", \"Python\"],\n  modo: \"aprender construyendo\"\n};\n\nwhile (curiosidad) {\n  practicar();\n  crear();\n}";
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
