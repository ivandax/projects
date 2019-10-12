"use strict";

(function(){

	var triggers = [document.getElementById('submit'), document.getElementById('pop-cancel')];
	
	triggers[0].onclick = function(){
			ShowPopUp('popup');
		}
		
	triggers[1].onclick = function(){
			CancelPopUp('popup');
		}
	
})();

//function to ADD the class for displaying the Pop Up
function ShowPopUp(id){
	var item = document.getElementById(id);
	item.classList.add("popup-show");
}

//function to REMOVE the class for displaying the Pop Up
function CancelPopUp(id){
	var item = document.getElementById(id);
	item.classList.remove("popup-show");
}

//Neutralizes the FORM submission
var submit_button = document.getElementById("submit");

submit_button.addEventListener("click", function(evt){
    evt.preventDefault()
});