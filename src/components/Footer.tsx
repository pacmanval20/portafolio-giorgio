import { profile } from '@/lib/profile';
export default function Footer() {
  return <footer className="container footer"><div className="footer-top"><a className="brand" href="#inicio">giorgio<span className="mint">.</span>dev</a><p>Python · Desarrollo web · Inteligencia artificial</p><nav aria-label="Redes sociales"><a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href={profile.youtube} target="_blank" rel="noopener noreferrer">YouTube ↗</a></nav></div><div className="footer-bottom"><p>© {new Date().getFullYear()} {profile.name}. Todos los derechos reservados.</p><a href="#inicio">Volver arriba ↑</a></div></footer>;
}
