export const profile = {
  name: 'Giorgio Valentino Taboada Ylave',
  title: 'Giorgio Valentino Taboada Ylave | Portafolio profesional',
  description: 'Técnico egresado en Computación e Informática y desarrollador en formación. Conoce mis proyectos con Java, JavaScript, Python e inteligencia artificial.',
  email: 'valentinotabylav@gmail.com',
  phone: '+51 940 756 413',
  github: 'https://github.com/pacmanval20',
  linkedin: 'https://www.linkedin.com/in/giorgio-valentino-taboada-ylave-5b8721283/',
  youtube: 'https://www.youtube.com/@pacsito6569',
};
export const whatsappUrl = 'https://wa.me/51940756413?text=' + encodeURIComponent('Hola Giorgio Valentino Taboada Ylave | Portafolio profesional, estuve revisando su página web y quiero cotizar sus servicios.');
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
export const siteUrl = (process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'https://pacmanval20.github.io/portafolio-giorgio')).replace(/\/$/, '');
export const asset = (path: string): string => `${basePath}/${path}`;
export const faqs: ReadonlyArray<{ question: string; answer: string }> = [
  { question: '¿Qué oportunidades estás buscando?', answer: 'Busco oportunidades de prácticas o puestos iniciales en programación donde pueda aportar, aprender de un equipo y seguir construyendo experiencia con proyectos reales.' },
  { question: '¿Con qué tecnologías estás trabajando?', answer: 'Estoy aprendiendo Java y desarrollo frontend con HTML, CSS y JavaScript. También exploro Python e inteligencia artificial, y he utilizado Linux con Ubuntu y Omarchy.' },
  { question: '¿En qué estado están tus proyectos?', answer: 'Este portafolio es mi espacio para presentar mi trabajo. Nubo es mi proyecto de inteligencia artificial en desarrollo. El sistema de ventas e inventario está planificado como práctica con Java; todavía no está construido.' },
  { question: '¿Cuál es tu experiencia previa?', answer: 'Soy técnico egresado en Computación e Informática. He trabajado en soporte técnico y como auxiliar de logística. Esa experiencia me acerca a las necesidades de los usuarios y a los procesos operativos.' },
  { question: '¿Cómo podemos conversar sobre una oportunidad?', answer: 'Puedes escribirme al WhatsApp +51 940 756 413 o al correo valentinotabylav@gmail.com. Cuéntame sobre el puesto o el alcance del proyecto para conversar sobre cómo puedo participar.' },
];
