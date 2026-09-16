(() => {
  const progress = document.querySelector('.scroll-progress');
  let pending = false;
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0})`;
    pending = false;
  };
  window.addEventListener('scroll', () => {
    if (!pending) {
      pending = true;
      requestAnimationFrame(updateProgress);
    }
  }, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });
  updateProgress();

  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  if (!finePointer.matches || reduceMotion.matches) return;

  document.querySelectorAll('.hero, .knowledge, .project-section, .contact-section').forEach(section => {
    let frame = 0;
    section.addEventListener('pointermove', event => {
      if (frame) return;
      const x = event.clientX;
      const y = event.clientY;
      frame = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        section.style.setProperty('--mouse-x', `${x - rect.left}px`);
        section.style.setProperty('--mouse-y', `${y - rect.top}px`);
        section.style.setProperty('--glow-opacity', '.17');
        frame = 0;
      });
    }, { passive: true });
    section.addEventListener('pointerleave', () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      section.style.setProperty('--glow-opacity', '0');
    });
  });

  document.querySelectorAll('.knowledge-card').forEach(card => {
    card.addEventListener('pointermove', event => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--card-x', `${event.clientX - rect.left}px`);
      card.style.setProperty('--card-y', `${event.clientY - rect.top}px`);
      card.style.setProperty('--card-light', '.14');
    }, { passive: true });
    card.addEventListener('pointerleave', () => card.style.setProperty('--card-light', '0'));
  });
})();
