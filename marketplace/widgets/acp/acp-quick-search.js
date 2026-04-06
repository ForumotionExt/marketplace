(function() {
  'use strict';
  // Casetă de căutare deasupra tabelelor mari cu filtrare live pe rânduri
  var tables = document.querySelectorAll('table');
  tables.forEach(function(table) {
    if (table.rows.length < 10 || table.parentNode.querySelector('.fme-acp-quick-search')) return;
    var input = document.createElement('input');
    input.className = 'fme-acp-quick-search';
    input.placeholder = 'Căutare rapidă...';
    input.style = 'margin-bottom:8px;padding:4px 8px;width:40%;font-size:14px;border:1px solid #ccc;border-radius:4px;';
    table.parentNode.insertBefore(input, table);
    input.addEventListener('input', function() {
      var val = input.value.toLowerCase();
      for (var i = 1; i < table.rows.length; i++) {
        var row = table.rows[i];
        row.style.display = row.textContent.toLowerCase().includes(val) ? '' : 'none';
      }
    });
  });
})();