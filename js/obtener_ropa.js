$(document).ready(function () { 
  const loadingIndicator = document.getElementById('loading-indicator');
  fetch('https://fakestoreapi.com/products').then(res => res.json()).then(data => {
    const ropa = data;
    const htmlRopa = document.getElementById('card-ropa');

    loadingIndicator.parentNode.removeChild(loadingIndicator);

    ropa.forEach(function(ropas, index){
      const card = 
      `<div class="card pt-2 m-2" style="width: 18rem">
        <img src="${ropas.image}" class="card-img-top" alt="${ropas.title}">
        <div class="card-body">
          <h5 class="card-title">${ropas.title}</h5>
          <span class="text-success fw-bold">Precio: $${ropas.price}</span><br/>
          <p class="">Categoria: ${ropas.category}</p>
          <p class="card-text fw-light text-secondary">${ropas.description}</p>
        </div>
      </div>`;

      document.getElementById('card-ropa').innerHTML += card;
    });
  });
});

