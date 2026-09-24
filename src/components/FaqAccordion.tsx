import { faqs } from '@/lib/profile';
export default function FaqAccordion() {
  return <section className="section container faq" id="preguntas"><div><h2>Antes de conversar.</h2><p>Mi enfoque, el estado de los proyectos y lo que puedes esperar.</p></div><div className="faq-list">{faqs.map((faq) => <details key={faq.question} name="preguntas"><summary><span>{faq.question}</span><span className="faq-plus" aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div></section>;
}
