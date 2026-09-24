import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesGrid from '@/components/ServicesGrid';
import Projects from '@/components/Projects';
import AboutUs from '@/components/AboutUs';
import FaqAccordion from '@/components/FaqAccordion';
import ContactWhatsapp from '@/components/ContactWhatsapp';
import Footer from '@/components/Footer';
import SaveShortcutGuard from '@/components/SaveShortcutGuard';
import ProgrammerEffects from '@/components/ProgrammerEffects';
import { profile, faqs, siteUrl } from '@/lib/profile';

export default function Home() {
  const structuredData = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'Person', '@id': `${siteUrl}/#giorgio`, name: profile.name, url: `${siteUrl}/`, image: `${siteUrl}/giorgio.webp`, description: profile.description, jobTitle: 'Desarrollador Python', email: profile.email, telephone: '+51940756413', sameAs: [profile.github, profile.linkedin, profile.youtube], knowsAbout: ['Java', 'JavaScript', 'Python', 'HTML', 'CSS', 'Linux'] },
    { '@type': 'ProfilePage', '@id': `${siteUrl}/#perfil`, url: `${siteUrl}/`, name: profile.title, mainEntity: { '@id': `${siteUrl}/#giorgio` }, inLanguage: 'es-PE' },
    { '@type': 'FAQPage', '@id': `${siteUrl}/#preguntas`, mainEntity: faqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
  ] };
  return <><a className="skip-link" href="#contenido">Saltar al contenido</a><Navbar /><ProgrammerEffects /><main id="contenido"><HeroSection /><div className="stack-band"><div className="container"><span>BASE TÉCNICA Y DIRECCIÓN</span><p>Python <i>/</i> Web <i>/</i> Automatización <i>/</i> IA</p><span aria-hidden="true">↓</span></div></div><ServicesGrid /><Projects /><AboutUs /><FaqAccordion /><ContactWhatsapp /></main><Footer /><SaveShortcutGuard /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} /></>;
}
