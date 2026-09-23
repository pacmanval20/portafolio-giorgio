import { asset, profile, whatsappUrl } from '@/lib/profile';
import { Icon } from './Icon';

export default function HeroSection() {
  return <section className="hero container" id="inicio" aria-labelledby="hero-title">
    <div className="hero-copy"><p className="availability"><span /> Abierto a oportunidades para aprender y aportar</p>
      <p className="eyebrow hero-name">HOLA, SOY GIORGIO</p>
      <h1 id="hero-title">Aprender.<br />Construir.<br /><span className="mint">Dar el siguiente<br className="desktop-break" /> paso.</span></h1>
      <p className="hero-description">Desarrollador en formación, con una base en <strong>Computación e Informática</strong> y la curiosidad de convertir ideas en soluciones prácticas.</p>
      <div className="actions"><a href="#proyectos" className="button">Explorar mis proyectos <Icon name="arrow" /></a><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-link">Conversemos <Icon name="chat" /></a></div>
      <div className="hero-socials"><span>ENCUÉNTRAME EN</span><a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></div>
    </div>
    <div className="hero-art"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><span className="art-cross" aria-hidden="true">+</span>
      <div className="portrait-card"><div className="portrait-top"><span className="tiny-dot" /> PERSONA DETRÁS DEL CÓDIGO <span>01</span></div>
        <div className="photo-wrap"><img src={asset('giorgio.webp')} width="600" height="658" alt="Giorgio Valentino Taboada Ylave" fetchPriority="high" /><span className="photo-overlay" /></div>
        <div className="portrait-caption"><strong>Giorgio Taboada<span>Desarrollador en formación</span></strong><span className="portrait-icon"><Icon name="code" /></span></div>
      </div>
      <div className="floating-label"><span className="tiny-dot" /><span>Siempre en modo aprendizaje<span className="label-code">while (curiosidad) &#123; construir(); &#125;</span></span></div>
    </div>
  </section>;
}
