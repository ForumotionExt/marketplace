(function() {
  console.log('[FME] Injecting tab link...');
  const h = document.querySelector('#page-body > #tabs');
  if (!h) {
    console.warn('[FME] Nu am găsit containerul de taburi, nu pot injecta link-ul.');
    return;
  };

  const link = document.createElement('li');
  link.innerHTML = `<a href="#" id="fme-tab-link">FME Plugins</a>`;
  h.querySelector('ul #admin_search').insertAdjacentElement('beforebegin', link);

  h.addEventListener('click', async (e) => {
    if (e.target.matches('#fme-tab-link')) {
      e.preventDefault();
      console.log('[FME] Tab clicked, loading plugin manager...');
    }
  });
})();
