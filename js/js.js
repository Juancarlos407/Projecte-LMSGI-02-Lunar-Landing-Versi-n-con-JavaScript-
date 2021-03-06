
//Declaración de variables de entorno
var g = 1.622;
var dt = 0.016683;
var timer=null;
var timerFuel=null;
//Declaración de variables de la nave
var y = 10; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;
var c = 50;
var a = g; //la aceleración cambia cuando se enciende el motor de a=g a a=-g (simplificado)
//Declaración de variables de los marcadores
var velocidad = null;
var altura = null;
var combustible = null;
var fuelValor = 50;
var terminado = false;
var alturaInicio = 65;

//Definición de funciones
function start(){
 timer=setInterval(function(){ moverNave(); }, dt*1000); //cada intervalo de tiempo mueve la nave
}
function stop(){
 clearInterval(timer);
}

//funciones al cargar la página
window.onload = function(){
	velocidad = document.getElementById("velocidad");
  altura = document.getElementById("altura");
	combustible = document.getElementById("combustible");
  combustible.innerHTML = fuelValor;
  start(); //Empezar a mover la nave justo después de cargar la página
}

//Interacciones con el motor de la nave
document.onkeydown = motorOn; //encender al apretar una tecla
document.onkeyup = motorOff; //apagar al soltar una tecla
document.onclick = function () { //encender/apagar el motor al hacer click en la pantalla
 	 if (a==g){
  	motorOn();
 	 } else {
  	motorOff();
 	 }
}

function moverNave(){ //cambiar velocidad y posicion

	actualizarVelocidad();
	actualizarAltura();
	v +=a*dt;
	y +=v*dt;
	 if(y <= 5){
		y++;
		motorOff();
	}

	if (y<65){ //Llegar hasta el 65% de la pantalla
		document.getElementById("nave").style.top = y+"%";
	} else {
		document.getElementById("velocidad").innerHTML="";
		terminado = true;
		stop();
		motorOff();
		if (v>5){
			lose();
		}
		else {
			win();
		}
	}
}

//Funciones del motor
function motorOn(){
	a=-g;
	if (timerFuel==null)
	timerFuel=setInterval(function(){ actualizarFuel(); }, 10);
	document.getElementById("ship").src="img/ship2.png"
}
function motorOff(){
	a=g;
	clearInterval(timerFuel);
	timerFuel=null;
  document.getElementById("ship").src="img/ship1.png"
}

//Funciones de los marcadores
function actualizarFuel(){
	c-=0.1;
	if (c < 0 ) c = 0;
	combustible.innerHTML = Math.round(c);
	if (c === 0) {
		motorOff();
	}
}
function actualizarAltura(){
	altura.innerHTML = Math.round(alturaInicio - y);
}
function actualizarVelocidad(){
	var contNumVel = Math.abs(v);
	v +=a*dt;
	document.getElementById("velocidad").innerHTML=v.toFixed(2);
}

function lose(){
	document.getElementById("lose").style.display = "block";
	document.getElementById("ship").src="img/boom.png"
	document.onkeydown = lose;
	document.onkeyup = lose;
	document.onclick = lose;
	stop();
}
function win(){
	document.getElementById("win").style.display = "block";
	document.onkeydown = win;
	document.onkeyup = win;
	document.onclick = win;
	stop();
}

function empieza(){
	start();
  document.getElementById("pausa").style.display = "none";
  document.getElementById("about").style.display = "none";
  document.onkeydown = motorOn;
  document.onkeyup = motorOff;
  document.onclick = function () {
   	 if (a==g){
    	motorOn();
   	 } else {
    	motorOff();
   	 }
  }
}
function pausa(){
	document.getElementById("pausa").style.display = "block";
  document.onkeydown = motorOff;
	document.onkeyup = motorOff;
	document.onclick = motorOff;
	stop();
}
function about(){
	document.getElementById("about").style.display = "block";
  document.onkeydown = motorOff;
	document.onkeyup = motorOff;
	document.onclick = motorOff;
	stop();
}
