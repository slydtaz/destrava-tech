// Ferramentas de leitura que funcionam em todas as páginas com ClientRouter.
// Nenhum estado é guardado em variável global: cada troca de página reinstala
// os listeners e remove os antigos no `astro:before-swap`.

type Cleanup = () => void;

export function setupGuideTools(): void {
  let cleanup: Cleanup = () => {};

  const apply = (): void => {
    cleanup();
    const disposers: Cleanup[] = [];

    const copy = document.querySelector<HTMLButtonElement>('[data-copy-link]');
    if (copy) {
      const label = copy.querySelector<HTMLElement>('[data-copy-label]');
      const status = document.querySelector<HTMLElement>('[data-copy-status]');
      const original = copy.dataset.labelOriginal ?? label?.textContent ?? '';
      const copied = copy.dataset.labelCopied ?? original;
      const failed = copy.dataset.labelFailed ?? original;
      let timer: number | undefined;

      const onClick = (): void => {
        const message = (ok: boolean): string => (ok ? copied : failed);
        const show = (text: string, state?: string): void => {
          if (label) label.textContent = text;
          if (status) status.textContent = text;
          if (state) copy.dataset.state = state;
          else delete copy.dataset.state;
        };

        const reset = (): void => {
          show(original);
          if (timer) window.clearTimeout(timer);
          timer = undefined;
        };

        const clipboard = navigator.clipboard;
        if (!clipboard?.writeText) {
          show(message(false), 'error');
          if (timer) window.clearTimeout(timer);
          timer = window.setTimeout(reset, 2200);
          return;
        }

        void clipboard.writeText(window.location.href).then(
          () => {
            show(message(true), 'ok');
            if (timer) window.clearTimeout(timer);
            timer = window.setTimeout(reset, 2200);
          },
          () => {
            show(message(false), 'error');
            if (timer) window.clearTimeout(timer);
            timer = window.setTimeout(reset, 2200);
          }
        );
      };

      copy.addEventListener('click', onClick);
      disposers.push(() => {
        copy.removeEventListener('click', onClick);
        if (timer) window.clearTimeout(timer);
      });
    }

    const filters = [...document.querySelectorAll<HTMLButtonElement>('[data-pillar-filter]')];
    const sections = [...document.querySelectorAll<HTMLElement>('[data-pillar-section]')];
    if (filters.length > 0) {
      const onFilter = (event: Event): void => {
        const button = event.currentTarget as HTMLButtonElement;
        const value = button.dataset.pillarFilter ?? 'all';
        for (const item of filters) item.setAttribute('aria-pressed', String(item === button));
        for (const section of sections) {
          section.hidden = value !== 'all' && section.dataset.pillarSection !== value;
        }
      };
      for (const button of filters) button.addEventListener('click', onFilter);
      disposers.push(() => {
        for (const button of filters) button.removeEventListener('click', onFilter);
      });
    }

    const back = document.querySelector<HTMLButtonElement>('[data-back-to-top]');
    if (back) {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
      const onScroll = (): void => {
        back.hidden = window.scrollY < 400;
      };
      const onClick = (): void => {
        window.scrollTo({ top: 0, behavior: reduce.matches ? 'auto' : 'smooth' });
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      back.addEventListener('click', onClick);
      onScroll();
      disposers.push(() => {
        window.removeEventListener('scroll', onScroll);
        back.removeEventListener('click', onClick);
      });
    }

    cleanup = () => {
      for (const dispose of disposers) dispose();
    };
  };

  document.addEventListener('astro:page-load', apply);
  document.addEventListener('astro:before-swap', () => {
    cleanup();
    cleanup = () => {};
  });

  // Cobre o carregamento inicial caso `astro:page-load` já tenha disparado.
  if (document.readyState !== 'loading') apply();
}
