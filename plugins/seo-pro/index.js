(function () {
  'use strict';

  const SEOPanel = {
    nav: () => {
      const navItem = document.createElement('li');
      navItem.innerHTML = `<a href="#fme-seo-panel"><span>SEO Tools</span></a>`;
      return navItem;
    },

    init: (container, origin, tid) => {
      if (container.querySelector('.fme-seo-panel')) return;

      const panel = document.createElement('div');
      panel.className = 'fme-seo-panel';
      panel.innerHTML = `
        <h2>SEO Tools</h2>
        <p>Instrumente pentru optimizarea SEO a forumului tău.</p>
      `;
      container.appendChild(panel);
    },
  };

  const SEO = {
    init: () => {
      const origin = window.location.origin;
      const tid    = new URLSearchParams(window.location.search).get('tid') || '';

      if (!/\/admin\//.test(window.location.pathname)) return;

      const main = document.querySelector('#page-body > #tabs');
      if (!main) return;

      const adminSearch = main.querySelector('#admin_search');
      if (adminSearch) {
        adminSearch.insertAdjacentElement('beforebegin', SEOPanel.nav());
      } else {
        main.prepend(SEOPanel.nav());
      }

      const observer = new MutationObserver(mutations => {
        for (const mutation of mutations) {
          for (const node of mutation.addedNodes) {
            if (node.matches?.('#main-content') || node.id === 'main-content') {
              SEOPanel.init(node, origin, tid);
              observer.disconnect();
              return;
            }
          }
        }
      });

      observer.observe(main, { childList: true, subtree: true });
    },
  };

  SEO.init();
})();
