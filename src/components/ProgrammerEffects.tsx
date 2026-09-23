'use client';
import { useEffect, useRef, useState } from 'react';
const digits = '101101001011010010110100';
export default function ProgrammerEffects() {
  const cursor = useRef<HTMLDivElement>(null);
  const ripple = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
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
    <div className="fx-progress" ref={progress} aria-hidden="true" />
    <div className="binary-cursor" ref={cursor} aria-hidden="true"><div className="binary-halo"><div className="binary-spin">{Array.from(digits).map((digit, index) => <span key={index} style={{ transform: 'rotate(' + index * 15 + 'deg) translateY(-38px)' }}>{digit}</span>)}</div><i /><b /></div></div>
    <div className="fx-ripple" ref={ripple} aria-hidden="true" />
    <div className="terminal-strip container" aria-hidden="true"><span><i /> giorgio@portfolio <b>~</b> <em>$</em> npm run creativity<span className="terminal-caret">▌</span></span><span className="terminal-status">● SYSTEM ONLINE</span></div>
    {ready && <button className="motion-control" aria-pressed={enabled} onClick={toggle} aria-label={enabled ? 'Pausar animaciones' : 'Activar animaciones'}><span aria-hidden="true">{enabled ? 'Ⅱ' : '▷'}</span><span>{enabled ? 'Pausar animaciones' : 'Activar animaciones'}</span></button>}
  </>;
}
const styles = `
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
