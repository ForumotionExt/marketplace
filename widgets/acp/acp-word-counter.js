(function() {
  'use strict';
  // Contor caractere/cuvinte sub fiecare textarea din ACP
  var textareas = document.querySelectorAll('textarea');
  textareas.forEach(function(ta) {
    if (ta.nextSibling && ta.nextSibling.className === 'fme-acp-word-counter') return;
    var counter = document.createElement('div');
    counter.className = 'fme-acp-word-counter';
    counter.style = 'font-size:12px;color:#888;margin:2px 0 8px 0;';
    function update() {
      var val = ta.value;
      var words = val.trim().split(/\s+/).filter(Boolean).length;
      counter.textContent = words + ' cuvinte, ' + val.length + ' caractere';
    }
    ta.addEventListener('input', update);
    update();
    ta.parentNode.insertBefore(counter, ta.nextSibling);
  });
})();