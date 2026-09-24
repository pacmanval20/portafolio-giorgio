'use client';
import { useState } from 'react';
import { whatsappUrl } from '@/lib/profile';
import { Icon } from './Icon';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return <header className="header"><div className="container nav-inner">
    <a href="#inicio" className="brand" title="Volver al inicio"><span className="brand-symbol" aria-hidden="true">g<span>.</span></span><span>giorgio<span className="mint">.</span>dev</span></a>
    <button className="menu-toggle" aria-expanded={open} aria-controls="navigation" onClick={() => setOpen(!open)}>{open ? 'Cerrar' : 'Menú'} <span aria-hidden="true">{open ? '×' : '☰'}</span></button>
    <nav id="navigation" className={open ? 'navigation is-open' : 'navigation'} aria-label="Navegación principal">
      {[['#conocimientos','Enfoque técnico'], ['#proyectos','Proyectos'], ['#sobre-mi','Sobre mí']].map(([href,label]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
      <a className="button small" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Hablemos <Icon name="arrow" /></a>
    </nav>
  </div></header>;
}
