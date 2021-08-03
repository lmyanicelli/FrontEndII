let datosPersona = {
  nombre: "",
  edad: 0,
  ciudad: "",
  interesPorJs: "",
};

function obtenerDatosDelUsuario() {
  /* --------------- PUNTO 1: Escribe tu codigo a partir de aqui --------------- */
  let nombre = prompt("Ingresa tu nombre");
  if (nombre != null) {
    datosPersona.nombre = nombre;
    let anioNacimiento = prompt("Ingresa el año en que naciste");
    if (anioNacimiento) {
      let anioActual = new Date().getFullYear();
      datosPersona.edad = anioActual - anioNacimiento;
    }
    datosPersona.ciudad = prompt("Ingresa la ciudad donde vives");
    datosPersona.interesPorJs = (confirm("¿Te intesa JavaScript?") ? "Si" : "No");
  }
}



function renderizarDatosUsuario() {
  /* ------------------- NO TOCAR NI ELIMINAR ESTA FUNCION. ------------------- */
  obtenerDatosDelUsuario();
  /* --------------- PUNTO 2: Escribe tu codigo a partir de aqui --------------- */
  document.querySelector('#nombre').innerHTML = datosPersona.nombre;
  if (datosPersona.edad) {
    document.querySelector('#edad').innerHTML = datosPersona.edad;
  }
  document.querySelector('#ciudad').innerHTML = datosPersona.ciudad;
  document.querySelector('#javascript').innerHTML = datosPersona.interesPorJs;
}


/* ------------------------- NO MODIFICAR ESTE ARRAY ------------------------ */
const listado = [
  {
    imgUrl: "https://huguidugui.files.wordpress.com/2015/03/html1.png",
    lenguajes: "HTML y CSS",
    bimestre: "1er bimestre",
  },
  {
    imgUrl: "https://image.flaticon.com/icons/png/512/919/919828.png",
    lenguajes: "Javascript",
    bimestre: "2do bimestre",
  },
  {
    imgUrl: "https://image.flaticon.com/icons/png/512/919/919851.png",
    lenguajes: "React JS",
    bimestre: "3er bimestre",
  },
];

function recorrerListadoYRenderizarTarjetas() {
  /* ------------------ PUNTO 3: Escribe tu codigo desde aqui ------------------ */
  const fila = document.querySelector('#fila');
  fila.innerHTML = "";
  listado.forEach(materia => {
    fila.innerHTML += `
    <div class="caja">
    <img src=${materia.imgUrl} alt=${materia.lenguajes}>
    <p class="lenguajes">Lenguajes: ${materia.lenguajes}</p>
    <p class="bimestre">Bimestre: ${materia.bimestre}</p>
    </div>`;
  });
}


function mostrarYOcultarDescripcionCompleta() {
  /* --------------------- PUNTO 4: Escribe tu codigo aqui --------------------- */
  document.querySelector('.sobre-mi').classList.toggle('sobre-mi-completo');
}
