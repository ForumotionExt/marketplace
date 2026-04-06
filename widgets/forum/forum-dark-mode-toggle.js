(function() {
  'use strict';
  // Comutator dark mode pentru forum cu persistență cookie
  if (document.getElementById('fme-forum-dark-toggle')) return;
  var btn = document.createElement('button');
  btn.id = 'fme-forum-dark-toggle';
  btn.textContent = '🌙';
  btn.style = 'position:fixed;top:16px;right:24px;z-index:9999;padding:8px 12px;font-size:18px;background:#222;color:#fff;border:none;border-radius:8px;box-shadow:0 2px 8px #0003;cursor:pointer;';
  btn.title = 'Comută dark mode';
  document.body.appendChild(btn);
  var dark = localStorage.getItem('fme-forum-dark') === '1';
  function setDark(on) {
    document.documentElement.style.background = on ? '#181a1b' : '';
    document.body.style.background = on ? '#181a1b' : '';
    document.body.style.color = on ? '#eee' : '';
    btn.textContent = on ? '☀️' : '🌙';
    localStorage.setItem('fme-forum-dark', on ? '1' : '0');
  }
  setDark(dark);
  btn.onclick = function() { setDark(!(localStorage.getItem('fme-forum-dark') === '1')); };
})();