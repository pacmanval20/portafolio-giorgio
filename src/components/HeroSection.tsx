import { asset, profile, whatsappUrl } from '@/lib/profile';
import { Icon } from './Icon';
export default function HeroSection() {
  return <section className="hero container" id="inicio" aria-labelledby="hero-title">
    <div className="hero-copy"><h1 id="hero-title">Giorgio<br /><span className="mint">Taboada.</span></h1><p className="hero-role">Desarrollador Python</p><p className="hero-description">Desarrollo web. Automatización.<br />Inteligencia artificial.<br /><span>Mi enfoque: convertir necesidades reales en soluciones útiles.</span></p><div className="actions"><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="button">Hablemos de tu proyecto <Icon name="arrow" /></a><a href="#conocimientos" className="text-link">Explorar mi enfoque <Icon name="code" /></a></div><div className="hero-socials"><a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></div></div>
    <figure className="hero-art"><div className="portrait-window"><img src={asset('giorgio.webp')} width="600" height="658" alt="Giorgio Valentino Taboada Ylave" fetchPriority="high" /><span className="portrait-shade" /></div><figcaption><span>Giorgio Valentino Taboada Ylave</span><span>Computación e Informática · Perú</span></figcaption><span className="portrait-mark" aria-hidden="true">&lt; / &gt;</span></figure>
    <a href="#conocimientos" className="hero-explore"><span>Del código a la idea.</span><span>Desplázate para explorar <span aria-hidden="true">↓</span></span></a>
  </section>;
}
