(function() {
  'use strict';
  // Interceptează formularele cu acțiuni periculoase (delete/ban/purge)
  document.addEventListener('submit', function(e) {
    var f = e.target;
    if (!f || !f.tagName || f.tagName.toLowerCase() !== 'form') return;
    var danger = /delete|ban|purge|danger/i;
    if ([...f.querySelectorAll('button,input[type=submit]')].some(btn => danger.test(btn.value+btn.textContent))) {
      if (!confirm('Sigur doriți să continuați această acțiune periculoasă?')) e.preventDefault();
    }
  }, true);
})();