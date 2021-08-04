//inicializamos el contador en 0
let num = 0;
let timer;
let cronometer;
const cuenta = document.querySelector('#cuenta');
const btnLetter = document.querySelector('#btn-letter');
const btnTime = document.querySelector('#btn-time');
const time = document.querySelector('#time')

const letras = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

cuenta.innerText = letras[0];

const table = document.querySelector('#tabla');

start();

btnLetter.addEventListener('click', function () {


  if (btnLetter.innerText == "STOP LETTER") {
    btnLetter.classList.add('again');
    //Frenamos las letras
    clearInterval(timer);
    btnLetter.innerText = "START LETTER";
    createTable();
    startCronometer();
  } else {
    start();
    btnLetter.classList.remove('again');
    btnLetter.innerText = "STOP LETTER";
    clearInterval(cronometer);
  }

})

function start() {
  timer = setInterval(function () {
    num++;
    cuenta.innerText = letras[num % letras.length];
  }, 50)
}

function createTable() {
  btnTime.classList.remove('hidden');
  table.innerHTML = `
  <div class="game">
  <label for="name">Name</label>
  <input type="text" name="name">
  <label for="object">Object</label>
  <input type="text" name="object">
  <label for="color">Color</label>
  <input type="text" name="color">
  <label for="animal">Animal</label>
  <input type="text" name="animal">
  <label for="food">Food</label>
  <input type="text" name="food">
  <label for="country">Country/City</label>
  <input type="text" name="country">
  <abel for="movie">Movie/Serie</abel>
  <input type="text" name="movie">               
  </div>`;
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
      clearInterval(cronometer);
      time.classList.add('time-out');
    }
  }, 10);
}

btnTime.addEventListener('click', function () {
  clearInterval(cronometer);
})
