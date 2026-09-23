import { Icon } from './Icon';
const areas = [
  { icon: 'code' as const, number: '01', title: 'Interfaces que conectan', body: 'Aprendo a transformar una idea en una experiencia web clara, adaptable y fácil de recorrer.', tags: ['HTML', 'CSS', 'JavaScript'], state: 'DESARROLLO WEB · EN FORMACIÓN' },
  { icon: 'spark' as const, number: '02', title: 'Curiosidad por la IA', body: 'Exploro Python e inteligencia artificial a través de Nubo, mi proyecto personal en desarrollo.', tags: ['Python', 'Inteligencia artificial'], state: 'EXPLORACIÓN · PROYECTO NUBO' },
  { icon: 'terminal' as const, number: '03', title: 'Lógica con propósito', body: 'Estudio Java para entender la lógica de negocio y construir mi camino hacia el desarrollo backend.', tags: ['Java', 'Lógica de negocio'], state: 'BACKEND · EN APRENDIZAJE' },
];
export default function ServicesGrid() {
  return <section id="conocimientos" className="section container"><div className="section-heading"><div><p className="eyebrow">01 / LO QUE ESTOY CONSTRUYENDO</p><h2>Una base sólida.<br /><span className="muted">Muchas ganas de ir más allá.</span></h2></div><p>Cada tecnología es una herramienta.<br />Mi objetivo es aprender a usarlas para resolver problemas.</p></div>
    <div className="areas-grid">{areas.map(area => <article className="area-card" key={area.number}><div className="card-top"><span className="icon-box"><Icon name={area.icon} /></span><span className="card-number">{area.number}</span></div><p className="card-kicker">{area.state}</p><h3>{area.title}</h3><p>{area.body}</p><ul className="tags">{area.tags.map(tag => <li key={tag}>{tag}</li>)}</ul></article>)}</div>
    <div className="linux-note"><Icon name="terminal" /><p>También exploro el entorno donde vive el software.</p><span>Linux / Ubuntu / Omarchy</span></div>
  </section>;
}
