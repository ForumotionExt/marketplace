(function() {
  'use strict';
  // Deschide automat link-urile externe în tab nou + rel=noopener
  var links = document.querySelectorAll('a[href^="http"]:not([href*="'+location.hostname+'"]):not([target])');
  links.forEach(function(link) {
    link.target = '_blank';
    link.rel = 'noopener';
  });
})();