(function() {
  'use strict';
  // Bandă de anunțuri care defilează automat în partea de sus
  if (document.getElementById('fme-forum-announce-ticker')) return;
  var ticker = document.createElement('div');
  ticker.id = 'fme-forum-announce-ticker';
  ticker.style = 'position:fixed;top:0;left:0;width:100%;background:#fffae6;color:#b36b00;font-weight:bold;padding:6px 0;z-index:9999;overflow:hidden;box-shadow:0 2px 8px #0002;font-size:15px;';
  var msg = ticker.appendChild(document.createElement('span'));
  msg.textContent = 'Bine ați venit pe forum! Urmăriți anunțurile aici.';
  msg.style = 'display:inline-block;white-space:nowrap;animation:fme-ticker 18s linear infinite;';
  var style = document.createElement('style');
  style.textContent = '@keyframes fme-ticker{0%{transform:translateX(100vw);}100%{transform:translateX(-100%);}}';
  document.head.appendChild(style);
  document.body.appendChild(ticker);
})();