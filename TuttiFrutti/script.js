//inicializamos el contador en 0
let num = 0;
let timer;
let cronometer;
const cuenta = document.querySelector('#cuenta');
const btnLetter = document.querySelector('#btn-letter');
const btnTime = document.querySelector('#btn-time');
const time = document.querySelector('#time')
const table = document.querySelector('#tabla');
const inputs = document.querySelectorAll('input');

const letras = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

cuenta.innerText = letras[0];

btnLetter.addEventListener('click', function () {

  switch (btnLetter.innerText) {
    case "STOP LETTER":
      stopLetter();
      break;

    case "START LETTER":
      startLetter();
      break;

    default:
      break;
  }
})

btnTime.addEventListener('click', function () {
  stopCronometer();
})

//Funciones
function startLetter() {
  //Cambio el texto y apariencia del botón letter
  btnLetter.innerText = "STOP LETTER";
  btnLetter.classList.remove('start');
  //Deshabilito los inputs y borro el texto
  inputs.forEach(input => {
    input.value = '';
    input.readOnly = true;
  });
  //Desabilito el botón Finish y modifico su apariencia
  btnTime.disabled = true;
  btnTime.classList.add('start');
  //Detengo el cronómetro
  stopCronometer();
  //Vuelvo a cero el cronómetro
  time.innerText = '00:00';
  //Inicia el contador de letras
  timer = setInterval(function () {
    num++;
    cuenta.innerText = letras[num % letras.length].toUpperCase();
  }, 50)
}

function stopLetter() {
  //Detengo el contador de letras
  clearInterval(timer);
  //Cambio el texto y apariencia del botón letter
  btnLetter.innerText = "START LETTER";
  btnLetter.classList.add('start');
  //Habilito los inputs
  inputs.forEach(input => {
    input.readOnly = false;
  });
  //Habilito el botón Finish y modifico su apariencia
  btnTime.disabled = false;
  btnTime.classList.remove('start');
  //Inicio el cronómetro
  startCronometer();
}

function startCronometer() {
  let sec = 0;
  let ms = 0;
  time.classList.remove('time-out');
  cronometer = setInterval(function () {
    ms++;
    time.innerText = `${sec}:${ms}`;
    if (ms == 99) {
      sec++;
      ms = 0;
    }
    //Tiempo límite
    if (sec == 60) {
      stopCronometer();
    }
  }, 10);
}

function stopCronometer() {
  inputs.forEach(input => {
    input.readOnly = true;
  });
  clearInterval(cronometer);
  time.classList.add('time-out');
  btnTime.disabled = true;
}