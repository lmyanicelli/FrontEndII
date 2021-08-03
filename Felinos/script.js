let body = document.querySelector('body');
function alternarTema() {
  body.classList.toggle("dark");
}

const contenedor = document.querySelector('.contenedor');

//Ordenar array por fecha desde la más reciente
let arrayOrdenadoPorFecha = listadoFelinos.sort(function (a, b) {
  return new Date(b.createdAt) - new Date(a.createdAt);
});

console.log(arrayOrdenadoPorFecha);

//recorrer array y cargarlo en el html
arrayOrdenadoPorFecha.forEach(element => {

  contenedor.innerHTML += `<div class="item">
    <img src=${element.imgUrl}>
    <h2>${element.title}</h2>
    <p>${element.description}</p>
  </div>`;

});
