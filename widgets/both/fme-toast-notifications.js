(function() {
  'use strict';
  // Sistem global de notificări toast: FMEToast.show(msg, type)
  if (window.FMEToast) return;
  var container = document.createElement('div');
  container.id = 'fme-toast-container';
  container.style = 'position:fixed;bottom:32px;right:32px;z-index:99999;display:flex;flex-direction:column;gap:8px;';
  document.body.appendChild(container);
  window.FMEToast = {
    show: function(msg, type) {
      var toast = document.createElement('div');
      toast.textContent = msg;
      toast.style = 'background:'+(type==='error'?'#d32f2f':type==='success'?'#388e3c':'#222')+';color:#fff;padding:12px 20px;border-radius:6px;box-shadow:0 2px 8px #0003;font-size:15px;opacity:0.95;';
      container.appendChild(toast);
      setTimeout(function(){toast.remove();}, 3500);
    }
  };
})();