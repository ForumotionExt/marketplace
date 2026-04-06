(function() {
  'use strict';
  // Contor caractere sub textarea de postare cu status limită 5000
  var textareas = document.querySelectorAll('textarea');
  textareas.forEach(function(ta) {
    if (ta.nextSibling && ta.nextSibling.className === 'fme-forum-post-word-count') return;
    var counter = document.createElement('div');
    counter.className = 'fme-forum-post-word-count';
    counter.style = 'font-size:12px;color:#888;margin:2px 0 8px 0;';
    function update() {
      var val = ta.value;
      var chars = val.length;
      counter.textContent = chars + ' caractere';
      counter.style.color = chars > 5000 ? '#d00' : '#888';
    }
    ta.addEventListener('input', update);
    update();
    ta.parentNode.insertBefore(counter, ta.nextSibling);
  });
})();