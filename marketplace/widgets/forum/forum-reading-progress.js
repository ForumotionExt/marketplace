(function() {
  'use strict';
  // Bară de progres fixă la top (3px) pentru citire pagină
  if (document.getElementById('fme-forum-reading-progress')) return;
  var bar = document.createElement('div');
  bar.id = 'fme-forum-reading-progress';
  bar.style = 'position:fixed;top:0;left:0;width:0;height:3px;background:#0078d7;z-index:9999;transition:width .2s;';
  document.body.appendChild(bar);
  window.addEventListener('scroll', function() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    var p = h > 0 ? (window.scrollY / h) * 100 : 0;
    bar.style.width = p + '%';
  });
})();