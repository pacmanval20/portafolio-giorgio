import { asset, profile, pythonExample, whatsappUrl } from '@/lib/profile';
import { Icon } from './Icon';
export default function HeroSection() {
  return <section className="hero container" id="inicio" aria-labelledby="hero-title">
    <div className="hero-copy">
      <p className="hero-identity">Giorgio Taboada <span>Desarrollador Python</span></p>
      <h1 id="hero-title"><span className="mint">Python.</span><br />Desarrollo web.<br />Inteligencia artificial.</h1>
      <p className="hero-description">Mi enfoque es desarrollar aplicaciones web, automatizar procesos e integrar inteligencia artificial en soluciones útiles.</p>
      <div className="actions"><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="button">Hablemos de tu proyecto <Icon name="arrow" /></a><a href="#conocimientos" className="text-link">Mi enfoque técnico <Icon name="code" /></a></div>
      <div className="hero-socials"><a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><span>Perú · Contacto directo</span></div>
    </div>
    <div className="hero-art">
      <div className="portrait-card"><div className="photo-wrap"><img src={asset('giorgio.webp')} width="600" height="658" alt="Giorgio Valentino Taboada Ylave" fetchPriority="high" /><span className="photo-overlay" /></div><div className="portrait-caption"><strong>Giorgio Taboada<span>Técnico en Computación e Informática</span></strong><Icon name="code" /></div></div>
      <div className="live-terminal"><div className="live-terminal-title"><span>procesar_datos.py</span><small>Ejemplo ilustrativo</small></div><pre aria-label="Ejemplo de Python: contar registros por estado"><code data-live-code aria-hidden="true">{pythonExample}</code></pre></div>
    </div>
  </section>;
}
