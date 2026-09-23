'use client';
import { useEffect, useState } from 'react';

/** Disuade el guardado por teclado. No protege los archivos públicos contra copia. */
export default function SaveShortcutGuard() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
        event.preventDefault();
        setVisible(true);
        clearTimeout(timer);
        timer = setTimeout(() => setVisible(false), 5000);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); clearTimeout(timer); };
  }, []);
  return <div role="status" aria-live="polite" className={visible ? 'save-notice visible' : 'save-notice'}>{visible ? 'El guardado por atajo está desactivado. Puedes conservar el enlace en tus favoritos.' : ''}</div>;
}
