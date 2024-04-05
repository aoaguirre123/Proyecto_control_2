

if (document.getElementById('mini_producto')) {
  var tarjeta = document.getElementById('mini_producto').outerHTML;
  var tarjetas = '';
  for (i = 0; i < 20; i++) {
      tarjetas = tarjetas + tarjeta;
  }
  document.getElementById('mini_producto').outerHTML = tarjetas;
}

