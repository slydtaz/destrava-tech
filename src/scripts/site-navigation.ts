// Navegação do cabeçalho e ciclo de vida dos scripts com ClientRouter.
// O header NÃO é persistido: cada troca de página recria o DOM e exige
// reinstalar a medição do menu e o esconder-ao-rolar.

import { setupTableScroll } from './table-scroll';

type Cleanup = () => void;

export async function setupNavigation(): Promise<Cleanup> {
  const header = document.querySelector<HTMLElement>('.site-header');
  const inner = header?.querySelector<HTMLElement>('.header-inner');
  const menu = document.querySelector<HTMLElement>('#site-menu');
  const button = document.querySelector<HTMLButtonElement>('.menu-button');
  if (!header || !inner || !menu) return () => {};

  // Polyfill carregado ANTES dos listeners: `sync()` precisa medir o popover.
  if (!Object.hasOwn(HTMLElement.prototype, 'popover')) {
    await import('@oddbird/popover-polyfill');
  }

  let lastWidth = 0;
  let lastY = window.scrollY;

  const isOpen = () => menu.matches(':is(:popover-open, .\\:popover-open)');

  const syncExpanded = () => {
    // O evento `toggle` dispara depois de `sync()` fechar o popover no layout largo;
    // sem esta guarda ele reintroduziria o atributo que acabou de ser removido.
    if (header.classList.contains('is-wide')) {
      button?.removeAttribute('aria-expanded');
      return;
    }
    button?.setAttribute('aria-expanded', String(isOpen()));
  };

  const sync = () => {
    const wasOpen = isOpen();
    header.classList.add('is-measuring');
    header.classList.add('is-wide');

    // No layout largo, fecha o popover e limpa o botão antes de remover o atributo.
    if (wasOpen) menu.hidePopover?.();
    menu.removeAttribute('popover');
    const wide = inner.scrollWidth <= inner.clientWidth;
    if (!wide) {
      header.classList.remove('is-wide');
      menu.setAttribute('popover', 'auto');
      if (wasOpen) menu.showPopover();
    } else {
      button?.removeAttribute('aria-expanded');
    }
    requestAnimationFrame(() => header.classList.remove('is-measuring'));
  };

  const onResize = () => {
    const width = inner.clientWidth;
    const collapsed = !header.classList.contains('is-wide');
    // Recolhido: só re-mede quando a largura cresce (evita thrashing).
    if (collapsed && width <= lastWidth) {
      lastWidth = width;
      return;
    }
    lastWidth = width;
    sync();
  };

  const ro = new ResizeObserver(onResize);
  ro.observe(inner);
  ro.observe(menu);
  sync();

  // Esconde o header ao rolar para baixo. Roda sempre: Chromium suporta
  // container-type: scroll-state mas não a query 'scrolled'.
  const onScroll = () => {
    const y = Math.max(
      0,
      Math.min(window.scrollY, document.documentElement.scrollHeight - window.innerHeight)
    );
    if (y === lastY) return;
    header.classList.toggle('is-hidden', y > lastY && y > header.offsetHeight);
    lastY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  menu.addEventListener('beforetoggle', syncExpanded);
  menu.addEventListener('toggle', syncExpanded);

  return () => {
    ro.disconnect();
    window.removeEventListener('scroll', onScroll);
    menu.removeEventListener('beforetoggle', syncExpanded);
    menu.removeEventListener('toggle', syncExpanded);
    if (isOpen()) menu.hidePopover?.();
    header.classList.remove('is-hidden');
    lastY = window.scrollY;
    lastWidth = inner.clientWidth;
  };
}

export function setupPageLifecycle(): void {
  let generation = 0;
  const cleanups: Cleanup[] = [];

  document.addEventListener('astro:page-load', () => {
    generation += 1;
    const token = generation;
    void setupNavigation()
      .then((cleanup) => {
        // Uma troca rápida pode resolver a configuração da página antiga depois do swap.
        if (token !== generation) {
          cleanup();
          return;
        }
        cleanups.push(cleanup);
      })
      .catch(() => {
        // Sem polyfill, o menu segue com o comportamento nativo do navegador.
      });
    setupTableScroll();
  });

  document.addEventListener('astro:before-swap', () => {
    generation += 1;
    for (const cleanup of cleanups.splice(0)) cleanup();
  });
}
