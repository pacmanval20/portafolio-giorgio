import { profile, whatsappUrl } from '@/lib/profile';
import { Icon } from './Icon';
export default function ContactWhatsapp() {
  return <><section className="container contact-wrap" id="contacto"><div className="contact"><h2>Tu idea merece<br /><span className="mint">una buena conversación.</span></h2><p>Cuéntame qué necesitas resolver. Conversemos sobre el alcance,<br className="desktop-break" /> las prioridades y cómo puedo participar.</p><div className="actions"><a href={whatsappUrl} className="button" target="_blank" rel="noopener noreferrer"><Icon name="chat" /> Escríbeme por WhatsApp <Icon name="arrow" /></a><a href={`mailto:${profile.email}`} className="text-link"><Icon name="mail" /> Enviar un correo</a></div><span className="contact-number">{profile.phone} · Perú</span></div></section><a className="whatsapp-float" href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Hablemos por WhatsApp con Giorgio"><Icon name="chat" /><span>Hablemos</span></a></>;
}
