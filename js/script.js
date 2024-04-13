// Script para copiar un producto y mostrarlo 20 veces
if (document.getElementById('mini_producto')) {
  var tarjeta = document.getElementById('mini_producto').outerHTML;
  var tarjetas = '';
  for (i = 0; i < 20; i++) {
      tarjetas = tarjetas + tarjeta;
  }
  document.getElementById('mini_producto').outerHTML = tarjetas;
}


// Script para copiar NavBar (usuario sin registrar) en cada pagina
if (document.getElementById('menu')) {
  fetch('menu_superior.html').then(response => {
      return response.text();
  }).then(htmlContent => {
  document.getElementById('menu').innerHTML = htmlContent;
  window.scrollTo(0, 0);
  });
};

// Script para copiar NavBar (Admin) en cada pagina
if (document.getElementById('menu-adm')) {
  fetch('menu_sup_admin.html').then(response => {
      return response.text();
  }).then(htmlContent => {
  document.getElementById('menu-adm').innerHTML = htmlContent;
  window.scrollTo(0, 0);
  });
};

// Script para copiar NavBar (Cliente) en cada pagina
if (document.getElementById('menu-cli')) {
  fetch('menu_sup_user.html').then(response => {
      return response.text();
  }).then(htmlContent => {
  document.getElementById('menu-cli').innerHTML = htmlContent;
  window.scrollTo(0, 0);
  });
};

// Función para cambiar la imagen de perfil
function changeProfileImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function() {
        const imgElement = document.getElementById('profile-image');
        imgElement.src = reader.result;
    }
    reader.readAsDataURL(file);
}
