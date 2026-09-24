export const profile = {
  name: 'Giorgio Valentino Taboada Ylave',
  title: 'Giorgio Taboada | Desarrollador Python · Web e IA',
  description: 'Portafolio de Giorgio Valentino Taboada Ylave. Enfoque en Python, desarrollo web y aplicaciones con IA. Perfil técnico, proyectos en desarrollo y contacto.',
  email: 'valentinotabylav@gmail.com',
  phone: '+51 940 756 413',
  github: 'https://github.com/pacmanval20',
  linkedin: 'https://www.linkedin.com/in/giorgio-valentino-taboada-ylave-5b8721283/',
  youtube: 'https://www.youtube.com/@pacsito6569',
};
export const whatsappUrl = 'https://wa.me/51940756413?text=' + encodeURIComponent('Hola Giorgio, vi tu portafolio y quisiera conversar contigo sobre un proyecto.');
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
export const siteUrl = (process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'https://pacmanval20.github.io/portafolio-giorgio')).replace(/\/$/, '');
export const asset = (path: string): string => `${basePath}/${path}`;
export const pythonExample = "# Ejemplo ilustrativo · procesamiento de datos\nfrom collections import Counter\n\ndef resumir_estados(registros):\n    return Counter(\n        fila[\"estado\"]\n        for fila in registros\n        if fila.get(\"estado\")\n    )";
export const faqs: ReadonlyArray<{ question: string; answer: string }> = [
  { question: '¿Cuál es tu enfoque como desarrollador?', answer: 'Mi dirección profesional es Python, desarrollo web e inteligencia artificial. Actualmente profundizo en Python y preparo proyectos propios. Mi formación es técnica en Computación e Informática; no presento experiencia laboral previa como desarrollador.' },
  { question: '¿Qué conocimientos tienes y qué estás incorporando?', answer: 'Mi base incluye HTML, CSS y JavaScript, además de formación en Computación e Informática y uso de Linux. Python es mi prioridad actual. Las automatizaciones, integraciones de IA y RAG son líneas de trabajo futuras, sin implementaciones publicadas todavía.' },
  { question: '¿Puedo ver tus proyectos funcionando?', answer: 'Este portafolio está publicado. Nubo continúa en desarrollo y aún no tiene una demostración pública. El sistema de ventas e inventario con Java está planificado. Publicaré código y demostraciones cuando estén disponibles; las ilustraciones no representan productos terminados.' },
  { question: '¿Desarrollo con IA y RAG son lo mismo?', answer: 'No. El desarrollo asistido por IA utiliza herramientas de IA para apoyar la creación de una web. Una aplicación con IA incorpora esas funciones en el producto. RAG es una técnica para consultar documentos o información propia antes de generar una respuesta; está entre mis líneas futuras de trabajo.' },
  { question: '¿Cuál es tu experiencia previa?', answer: 'Soy técnico egresado en Computación e Informática. He trabajado en soporte técnico y como auxiliar de logística, con contacto directo con usuarios y procesos operativos.' },
  { question: '¿Cómo podemos conversar sobre un proyecto?', answer: 'Escríbeme por WhatsApp al +51 940 756 413 o a valentinotabylav@gmail.com. Cuéntame qué necesitas para conversar sobre el alcance y evaluar cómo puedo participar.' },
];
