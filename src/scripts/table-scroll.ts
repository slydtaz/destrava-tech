export function setupTableScroll(): void {
  document.querySelectorAll<HTMLTableElement>('.article-body table').forEach(table => {
    if (table.scrollWidth > table.clientWidth && !table.hasAttribute('tabindex')) {
      table.setAttribute('tabindex', '0');
      table.setAttribute('role', 'region');
      table.setAttribute('aria-label', 'Tabela (role a tela para ver tudo)');
    }
  });
}