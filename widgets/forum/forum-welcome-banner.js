(function() {
  'use strict';
  // Banner CTA pentru vizitatori, dismissibil cu remember
  if (localStorage.getItem('fme-forum-welcome-banner') === '1') return;
  var banner = document.createElement('div');
  banner.id = 'fme-forum-welcome-banner';
  banner.style = 'position:fixed;top:0;left:0;width:100%;background:#0078d7;color:#fff;padding:16px 0;text-align:center;z-index:9999;font-size:17px;box-shadow:0 2px 8px #0002;';
  banner.textContent = 'Bine ai venit! Creează-ți cont pentru a participa la discuții.';
  var close = document.createElement('button');
  close.textContent = '×';
  close.style = 'margin-left:16px;background:none;border:none;color:#fff;font-size:22px;cursor:pointer;';
  close.onclick = function() {
    banner.remove();
    localStorage.setItem('fme-forum-welcome-banner', '1');
  };
  banner.appendChild(close);
  document.body.appendChild(banner);
})();