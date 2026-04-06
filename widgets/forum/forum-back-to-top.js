(function() {
  'use strict';
  // Buton animat de scroll sus cu slide-in/out
  if (document.getElementById('fme-forum-back-to-top')) return;
  var btn = document.createElement('button');
  btn.id = 'fme-forum-back-to-top';
  btn.textContent = '↑';
  btn.style = 'position:fixed;right:24px;bottom:32px;z-index:9999;display:none;padding:10px 16px;font-size:20px;background:#0078d7;color:#fff;border:none;border-radius:50%;box-shadow:0 2px 8px #0003;cursor:pointer;transform:translateY(100px);transition:opacity .2s,transform .3s;';
  btn.title = 'Scroll la top';
  btn.onclick = function() { window.scrollTo({top:0,behavior:'smooth'}); };
  document.body.appendChild(btn);
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      btn.style.display = 'block';
      btn.style.opacity = '1';
      btn.style.transform = 'translateY(0)';
    } else {
      btn.style.opacity = '0';
      btn.style.transform = 'translateY(100px)';
      setTimeout(function(){btn.style.display='none';},200);
    }
  });
})();