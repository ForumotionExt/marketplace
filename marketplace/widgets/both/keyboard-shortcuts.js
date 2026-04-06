(function() {
  'use strict';
  // Shortcut-uri globale: ? = help, Alt+H = home, Alt+T = top
  document.addEventListener('keydown', function(e) {
    if (e.key === '?' && !e.ctrlKey && !e.altKey && !e.metaKey) {
      alert('Ajutor: \n? = help\nAlt+H = home\nAlt+T = top');
    }
    if (e.altKey && !e.ctrlKey && !e.metaKey) {
      if (e.key.toLowerCase() === 'h') {
        location.href = '/';
      } else if (e.key.toLowerCase() === 't') {
        window.scrollTo({top:0,behavior:'smooth'});
      }
    }
  });
})();