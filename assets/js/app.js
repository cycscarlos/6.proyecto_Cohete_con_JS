window.onload = inicio;
window.onkeydown = teclado;
window.onkeyup = soltarArrows;
window.onresize = tomarMedidas; /* Responsive Design */
var nave;
var x;
var y = 0;
var anchoNavegador, altoNavegador;
var anchoNave, altoNave;
var cronometro;
var pulsandoArrows = false; /* Significa: No estamos pulsando ninguna tecla de flecha */
var sonido;
var sizeBorde;

function inicio() {
  nave = document.querySelector("#nave");
  body = document.querySelector("body");
  tomarMedidas();
  // Ubicamos la nave en el centro del eje horizontal
  x = anchoNavegador / 2 - anchoNave / 2;
  ubicarNave();

  // Decimos: Cada 400ms ejecuta la función "gravedad()"
  cronometro = setInterval(() => {
    gravedad();
  }, 400);

  // Definimos la variable a ser utilizada en la temática del sonido del cohete
  sonido = document.querySelector("audio");

  // Programamos el tamaño del border inferior (o piso) como una variable
  let datos = window.getComputedStyle(document.querySelector("body"));
  sizeBorde = parseInt(datos["borderBottomWidth"]);

  // función de apagar/encender los sonidos
  document.querySelector("#volumen").onclick = onOFF;
}

function tomarMedidas() {
  anchoNavegador = window.innerWidth;
  anchoNave = nave.offsetWidth;
  altoNavegador = window.innerHeight;
  altoNave = nave.offsetHeight;
  console.log(anchoNavegador, altoNavegador, anchoNave, altoNave);

  // Responsive design
  if ((y = altoNave + 30 > altoNavegador)) {
    y + altoNavegador - altoNave - 30;
    ubicarNave();
  }

  if ((x = anchoNave > anchoNavegador)) {
    x = anchoNavegador - anchoNave;
    ubicarNave();
  }
}

function ubicarNave() {
  nave.style.left = `${x}px`;
  nave.style.bottom = `${y}px`;
}

function teclado(e) {
  let tecla = e.key;
  pulsandoArrows = true;

  if (tecla == "ArrowUp") {
    if (altoNavegador - altoNave > y) {
      // Codificamos la temática del sonido de despegue del cohete
      if (y == 0) {
        reproducirSonido("despegue.mp3");
      }
      y += 10;
      // Programamos que el cohete no sobrepase el limite superior
      if (y > altoNavegador - altoNave - 30) {
        y = altoNavegador - altoNave - 30;
      }
      ubicarNave();
    } else {
      reproducirSonido("choque.mp3");
    }
  }

  if (tecla == "ArrowDown") {
    if (y > 0) {
      y -= 10;
      // Programamos que el cohete no sobrepase el limite inferior
      if (y < 0) {
        y = 0;
      }
      ubicarNave();
    }
  }

  // Programamos el movimiento horizontal; con el +=10, muevo la nave 10px cada vez que pulso la tecla ArrowRight

  if (tecla == "ArrowRight" && y > 0) {
    x += 10;

    // Movemos la nave al borde derecho de la caja Navegador, para dar la apariencia de salida

    if (x > anchoNavegador - 50) {
      // Movemos la nave desde el borde izquierdo de la caja Navegador, para dar la apariencia de entrada

      x = -anchoNave + 50;
    }
    ubicarNave();
  }

  // Programamos el movimiento horizontal; con el +=10, se retrocede la nave 10px cada vez que se pulsa la tecla ArrowLeft

  if (tecla == "ArrowLeft" && y > 0) {
    x -= 10;

    if (x < -anchoNave + 100) {
      x = anchoNavegador - 100;
    }
    ubicarNave();
  }
}

function soltarArrows() {
  pulsandoArrows = false;
}

// Decimos: Si la nave NO esta en el piso y NO estamos pulsando ninguna tecla de arrow (flechas), comienza a bajar hasta el suelo la nave de slot de 5px

function gravedad() {
  if (y > 0 && pulsandoArrows == false) {
    y -= 5;
    ubicarNave();
  }
}

// Función de la temática de los sonidos del cohete
function reproducirSonido(s) {
  // Sí la duración NO ES cero y esta pausado o no ha comenzado, entonces sonará uno de los dos sonido!
  if (sonido.duration != 0 && sonido.paused == true) {
  }
  sonido.src = "assets/audios/" + s;
  sonido.play();
}

// Función para apagar o enceder los sonidos del cohete
function onOFF() {
  if (sonido.muted) {
    sonido.muted = false; // No lo silencie
    document.querySelector("#volumen").innerHTML = "OFF";
  } else {
    sonido.muted = true; // silenciar
    document.querySelector("#volumen").innerHTML = "ON";
  }
}
