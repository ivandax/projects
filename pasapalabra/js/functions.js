"use strict";

var questions = [
    { letter: "a", answer: "abducir", status: 0, question: "CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien"},
    { letter: "b", answer: "bingo", status: 0, question: "CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso"},
    { letter: "c", answer: "churumbel", status: 0, question: "CON LA C. Niño, crío, bebé"},
    { letter: "d", answer: "diarrea", status: 0, question: "CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida"},
    { letter: "e", answer: "ectoplasma", status: 0, question: "CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación"},
    { letter: "f", answer: "facil", status: 0, question: "CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad"},
    { letter: "g", answer: "galaxia", status: 0, question: "CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas"},
    { letter: "h", answer: "harakiri", status: 0, question: "CON LA H. Suicidio ritual japonés por desentrañamiento"},
    { letter: "i", answer: "iglesia", status: 0, question: "CON LA I. Templo cristiano"},
    { letter: "j", answer: "jabali", status: 0, question: "CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba"},
    { letter: "k", answer: "kamikaze", status: 0, question: "CON LA K. Persona que se juega la vida realizando una acción temeraria"},
    { letter: "l", answer: "licantropo", status: 0, question: "CON LA L. Hombre lobo"},
    { letter: "m", answer: "misantropo", status: 0, question: "CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas"},
    { letter: "n", answer: "necedad", status: 0, question: "CON LA N. Demostración de poca inteligencia"},
    { letter: "ñ", answer: "señal", status: 0, question: "CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo."},
    { letter: "o", answer: "orco", status: 0, question: "CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien"},
    { letter: "p", answer: "protoss", status: 0, question: "CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft"},
    { letter: "q", answer: "queso", status: 0, question: "CON LA Q. Producto obtenido por la maduración de la cuajada de la leche"},
    { letter: "r", answer: "raton", status: 0, question: "CON LA R. Roedor"},
    { letter: "s", answer: "stackoverflow", status: 0, question: "CON LA S. Comunidad salvadora de todo desarrollador informático"},
    { letter: "t", answer: "terminator", status: 0, question: "CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984"},
    { letter: "u", answer: "unamuno", status: 0, question: "CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914"},
    { letter: "v", answer: "vikingos", status: 0, question: "CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa"},
    { letter: "w", answer: "sandwich", status: 0, question: "CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso"},
    { letter: "x", answer: "botox", status: 0, question: "CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética"},
    { letter: "y", answer: "peyote", status: 0, question: "CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos"},
    { letter: "z", answer: "zen", status: 0, question: "CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional"},
]

var points = 0;
var attempts = 0;

//the following two functions allow us to get the question from the selected letter
/*from the array, select the given object based on the selection*/
var getObjectFromId = function(array, value){
	let index = array.findIndex(obj => obj.letter === value)
	return index;
};
/*get the question from the selected object*/
var getQuestion = function(choice){
	let id = getObjectFromId(questions, choice);
	return [id, questions[id]["question"]] //returns id, question
};
//evaluate the question, if it's right or wrong, return points
var processQuestion = function(ans, id){
	if(ans == questions[id]["answer"]){
		console.log("Correct! 1 point!");
		return 1;
	} else{
		console.log("Incorrect... 0 points")
		return 0;
	}
};
//remove from array after processing
var removeFromArray = function(array, element){
	var index = array.indexOf(element);
	array.splice(index,1);
};
//to execute when the game is somehow finished or aborted
var finishGame = function(){
	gameEnd = 1;
	document.getElementById("message").innerHTML = "Final del juego! Puntos = "+points+". Ratio = "+points+"/"+attempts;
	document.getElementById("pasapalabra").disabled = true; //disable buttons once user has ended the game.
	document.getElementById("ok").disabled = true;
	document.getElementById("stop").disabled = true;
}

//TIMER: set interval time functions need to be in the GLOBAL SCOPE!!
var timer = 180;
var countDown = function(){
	if(timer>0){ //only clocks countdown while time is over 0
		timer -= 1;
		document.getElementById('countdown').innerHTML = timer;
	}
	else{
		finishGame();
		clearInterval(countHandler);
	}
}
var countHandler = setInterval(countDown, 1000);
setTimeout(finishGame, 180000); //ends the game after defined time.

//get the letter elements into an array
var letters = [].slice.call(document.getElementsByClassName('letter'));
var gameEnd = 0; //we initially set this to 0
var i = 0; //iteration variable

var RunPasapalabra = function(){

	if(letters.length-1 === 0){ //checks if game ends during normal execution
		clearInterval(countHandler);
		finishGame();
	}

	var stop = document.getElementById("stop");
	stop.onclick = function(){ //if user stops the game
		clearInterval(countHandler);
		finishGame(); //run the finish game function
	}

	if(gameEnd === 1){ //if gameEnd = 1
		return; //return allows us to cut the execution of following functions...
	}

	var q = getQuestion(letters[i].innerHTML.toLowerCase()); //gets the letter from array
	document.getElementById("question").innerHTML = q[1]; //updates the question on screen
	letters[i].classList.add("active"); //changes the class to modify styling of the currently active letter

    //handles the event of the user clicking "ok" which means the user does an attempt to answer.
	var okButton = document.getElementById("ok");
	okButton.onclick = function(){
		if(document.getElementById("answer").value){ //only when user has entered and answered before pressing "ok"
			var score = processQuestion(document.getElementById("answer").value.toLowerCase(), q[0]); //see function above, returns 1 or 0.
			points += score; //increases global score
			attempts += 1; //counts the attempts
			if(score===1){ 
				document.getElementById("message").innerHTML = "Bien! Has ganado 1 punto. Total = "+points+". Ratio = "+points+"/"+attempts;
				console.log("+1");
				letters[i].classList.add("right"); //for styling in case of correct answer
			}
		    else{
 				document.getElementById("message").innerHTML = "Incorrecto. Total = "+points+". Ratio = "+points+"/"+attempts;
 				letters[i].classList.add("wrong"); //for styling in case of wrong answer
 			}
 			document.getElementById("answer").value = ""; //clears the input before moving on
 			i === letters.length-1 ? i = 0 : letters.splice(i,1); //the splice makes the current i be the following letter, so no need to increment the iteration variable here.
		}
		else{
			document.getElementById("message").innerHTML = "Ingresa una respuesta o presiona PASAPALABRA";
		}
		console.log(i)
		console.log(letters.length)
		RunPasapalabra(); //this is messed up, but this allows for the function to loop...
	}

	//we have to add also the .value condition, otherwise it reruns pasapalabra.
	document.addEventListener("keyup", function(event) {
		if (event.keyCode === 13 && document.getElementById("answer").value) { // 13 corresponds to enter
			okButton.onclick();
		}
	});

	//handles the event of the user clicking "PASAPALABRA", moves to the next letter
	var pasapalabra = document.getElementById("pasapalabra");
	pasapalabra.onclick = function(){
		letters[i].classList.remove("active");
		i === letters.length-1 ? i = 0 : i += 1; //goes to next letter, after reaching last available letter restarts at 0
		document.getElementById("answer").value = "";//clears the input before monving on
		RunPasapalabra(); //restarts the loop with the next letter
	}
}

RunPasapalabra(); //first call of the function to start, gets the first question.
