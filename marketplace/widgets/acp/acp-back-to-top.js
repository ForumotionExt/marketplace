(function() {
  'use strict';
  // Buton flotant de scroll sus, apare automat sub 300px
  if (document.getElementById('fme-acp-back-to-top')) return;
  var btn = document.createElement('button');
  btn.id = 'fme-acp-back-to-top';
  btn.textContent = '↑';
  btn.style = 'position:fixed;right:24px;bottom:32px;z-index:9999;display:none;padding:10px 16px;font-size:20px;background:#222;color:#fff;border:none;border-radius:50%;box-shadow:0 2px 8px #0003;cursor:pointer;transition:opacity .2s';
  btn.title = 'Scroll la top';
  btn.onclick = function() { window.scrollTo({top:0,behavior:'smooth'}); };
  document.body.appendChild(btn);
  window.addEventListener('scroll', function() {
    btn.style.display = (window.scrollY > 300) ? 'block' : 'none';
    btn.style.opacity = (window.scrollY > 300) ? '1' : '0';
  });
})();