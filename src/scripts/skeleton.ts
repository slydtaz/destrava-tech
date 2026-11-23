// Skeleton honesto: só aparece se a navegação demorar mais que 300 ms.
// Não atrasa a navegação; apenas observa os eventos do ClientRouter.

const THRESHOLD_MS = 300;
const HARD_TIMEOUT_MS = 3000;

type PreparationEvent = Event & {
  to?: { href: string; hash: string };
  from?: { href: string };
};

export function setupSkeleton(): () => void {
  const root = document.querySelector<HTMLElement>('.nav-skeleton');
  let thresholdTimer: number | undefined;
  let hardTimer: number | undefined;
  let startedAt = 0;

  const clearTimers = () => {
    if (thresholdTimer !== undefined) {
      window.clearTimeout(thresholdTimer);
      thresholdTimer = undefined;
    }
    if (hardTimer !== undefined) {
      window.clearTimeout(hardTimer);
      hardTimer = undefined;
    }
  };

  const removeStatus = () => {
    document.querySelector('[data-skeleton-status]')?.remove();
  };

  const hide = () => {
    clearTimers();
    root?.setAttribute('hidden', '');
    removeStatus();
  };

  const show = () => {
    thresholdTimer = undefined;
    if (!root) return;
    // Timers podem atrasar em aba em segundo plano; não mostre um estado velho.
    if (performance.now() - startedAt >= HARD_TIMEOUT_MS) return;

    root.removeAttribute('hidden');
    if (!document.querySelector('[data-skeleton-status]')) {
      const status = document.createElement('p');
      status.className = 'visually-hidden';
      status.dataset.skeletonStatus = '';
      status.textContent = 'Carregando página…';
      root.after(status);
    }

    // O teto de 3 s conta desde o início da preparação, não desde a exibição.
    const remaining = Math.max(0, HARD_TIMEOUT_MS - (performance.now() - startedAt));
    hardTimer = window.setTimeout(hide, remaining);
  };

  const onBeforePreparation = (event: Event) => {
    const { to, from } = event as PreparationEvent;
    if (to?.href && from?.href && to.href === from.href) return;
    if (to?.hash) return;

    clearTimers();
    startedAt = performance.now();
    thresholdTimer = window.setTimeout(show, THRESHOLD_MS);
  };

  const onAfterPreparation = () => {
    if (thresholdTimer !== undefined) {
      window.clearTimeout(thresholdTimer);
      thresholdTimer = undefined;
    }
  };

  document.addEventListener('astro:before-preparation', onBeforePreparation);
  document.addEventListener('astro:after-preparation', onAfterPreparation);
  document.addEventListener('astro:after-swap', hide);
  document.addEventListener('astro:page-load', hide);

  return () => {
    document.removeEventListener('astro:before-preparation', onBeforePreparation);
    document.removeEventListener('astro:after-preparation', onAfterPreparation);
    document.removeEventListener('astro:after-swap', hide);
    document.removeEventListener('astro:page-load', hide);
    hide();
  };
}
