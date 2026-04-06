(function() {
  'use strict';
  // Ceas live în bara de sus a ACP-ului, actualizare la fiecare secundă
  if (document.getElementById('fme-acp-clock')) return;
  var clock = document.createElement('span');
  clock.id = 'fme-acp-clock';
  clock.style = 'margin-left:16px;font-weight:bold;font-family:monospace;font-size:15px;color:#0078d7;';
  function update() {
    var d = new Date();
    clock.textContent = d.toLocaleTimeString('ro-RO');
  }
  update();
  setInterval(update, 1000);
  var topBar = document.querySelector('.punbb .main-head, .main-head, #pun-intro, #header, header');
  if (topBar) topBar.appendChild(clock);
})();