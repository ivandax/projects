"use strict";

(function(){
	//slice.call creates the actual list.
	var triggers = [].slice.call(document.getElementsByClassName('nav_toggle'));
	console.log(triggers);
	
	//x is like a selector for each value of the array.
	triggers.map(function(x){
		x.onclick = function(){
			AssignClass_NavShow('mobile_nav_animate');
		}
	})

	//original formula using a loop, it also works:
	
	// var triggers = document.getElementsByClassName('nav_toggle');
	// console.log(triggers);
	
	// for (var i=0; i<triggers.length; i++){
		// triggers[i].onclick = function(){
			// AssignClass_NavShow('mobile_nav_animate');
		// }
	// }
	
})();


function AssignClass_NavShow(class_name){
	var items = document.getElementsByClassName(class_name)
	
	items[0].classList.toggle("mobile_nav_show");
	items[1].classList.toggle("mobile_nav_show");
}

function printdir(){
	console.dir(document.getElementById('pega') );
}
