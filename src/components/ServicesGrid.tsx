const areas = [
  { title: 'Python y automatización', body: 'Python es mi prioridad técnica actual. La dirección: transformar datos y reducir tareas repetitivas con software.', tags: ['Python', 'Procesamiento de datos'], state: 'En desarrollo técnico' },
  { title: 'Desarrollo web', body: 'Base en HTML, CSS y JavaScript para interfaces claras y adaptables. Las herramientas de IA apoyan el desarrollo; no sustituyen la revisión del resultado.', tags: ['HTML', 'CSS', 'JavaScript'], state: 'Base actual' },
  { title: 'Aplicaciones con IA', body: 'Integrar modelos en aplicaciones y asistentes que consulten documentos mediante RAG. Una línea futura, todavía sin implementaciones públicas.', tags: ['Integraciones de IA', 'RAG'], state: 'Dirección futura' },
];
export default function ServicesGrid() {
  return <section id="conocimientos" className="section container"><div className="section-heading"><h2>Un enfoque técnico.<br /><span className="muted">Tres líneas de trabajo.</span></h2><p>Una visión clara de mi base actual y de las soluciones hacia las que dirijo mi trabajo.</p></div>
    <div className="areas-grid">{areas.map(area => <article className="area-card" key={area.title}><div><h3>{area.title}</h3><span className="area-state">{area.state}</span></div><p>{area.body}</p><ul className="tags">{area.tags.map(tag => <li key={tag}>{tag}</li>)}</ul></article>)}</div>
    <div className="linux-note"><p>Entorno y conocimientos complementarios</p><span>Linux · Ubuntu · Omarchy · Java</span></div>
  </section>;
}
