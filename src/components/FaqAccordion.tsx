import { faqs } from '@/lib/profile';
export default function FaqAccordion() {
  return <section className="section container faq" id="preguntas"><div><p className="eyebrow">04 / CONOZCÁMONOS MEJOR</p><h2>Algunas respuestas.<br /><span className="muted">Para empezar.</span></h2><p>Lo esencial sobre mi perfil y el momento en el que estoy.</p></div><div className="faq-list">{faqs.map((faq, index) => <details key={faq.question} name="preguntas"><summary><span className="faq-number">0{index + 1}</span><span>{faq.question}</span><span className="faq-plus" aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div></section>;
}
