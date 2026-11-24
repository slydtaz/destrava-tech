// Fallback de revelação ao rolar para navegadores sem scroll-driven animations.
// Com suporte a `animation-timeline: view()`, o CSS faz a animação e este módulo
// não esconde nada. Com data-motion='off', nada é escondido em nenhum caso.

type Cleanup = () => void;

const SELECTOR = '.reveal, .card, .section-head';

export function setupReveal(): void {
  let cleanup: Cleanup = () => {};

  const apply = (): void => {
    cleanup();
    cleanup = () => {};

    const motionOff = document.documentElement.dataset.motion === 'off';
    const cssScroll =
      typeof CSS !== 'undefined' &&
      typeof CSS.supports === 'function' &&
      CSS.supports('animation-timeline: view()');

    if (motionOff || cssScroll) {
      document.documentElement.classList.remove('has-reveal-fallback');
      return;
    }

    document.documentElement.classList.add('has-reveal-fallback');
    const items = document.querySelectorAll<HTMLElement>(SELECTOR);

    if (typeof IntersectionObserver === 'undefined') {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );

    items.forEach((el) => observer.observe(el));
    cleanup = () => observer.disconnect();
  };

  document.addEventListener('astro:page-load', apply);
  document.addEventListener('astro:before-swap', () => {
    cleanup();
    cleanup = () => {};
    document.documentElement.classList.remove('has-reveal-fallback');
  });

  // Cobre o carregamento inicial caso `astro:page-load` já tenha disparado.
  if (document.readyState !== 'loading') apply();
}
