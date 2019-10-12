"use strict";

(function(){
	//get an array with the numbers elements
	var nums= Array.from(document.getElementsByClassName('cbNum'));
	//get an array with the signs elements
	var signs= Array.from(document.getElementsByClassName('cbSign'));		
	//console.log(nums);
	//console.log(signs);
	//console.log(redo);

	let calc = ''; //to store the calculation to be executed
	let dis = document.getElementById("display_screen"); 
	let operators = []; //to store the actual operating signs as strings

	for(let n in signs){ //populate the operators array
		operators[n] = signs[n].id;
	};
	console.log(operators)

	nums.map(function(number){
		number.onclick = function(){
			//if calculation hasn't started, do this
			if(!calc.length){
				calc = number.id; //still a string
				dis.innerHTML = number.id; //still a string
				console.log("first input");
			}
			// if calc has initiated, append numbers.
			else if(calc.length){
				calc += number.id;
				dis.innerHTML += number.id;
				console.log("more digits");
			}
			console.log(calc);
		}
	})

	signs.map(function(operator){
		operator.onclick = function(){
			if(calc.length===0){ //won't accept sign as first input
				console.log('Must input number first');
			}
			else if(operators.indexOf(calc[calc.length-1])>0){
				//if you add a sign and not a number, you replace the sign
				console.log(calc[calc.length-1])
				console.log('Repeated sign');
				calc = calc.slice(0,-1)+operator.id; //slices last sign away and adds new
			}
			else if(calc.length>0){
				console.log('correctly appended sign');
				calc += operator.id;
			}
			dis.innerHTML = calc;
			console.log(calc)
		}
	})

    let eq = document.getElementById('=');
    eq.onclick = function(){
		try{
			if(calc.length===0){
				console.log('must input calculation');
				dis.innerHTML = '0';
			}
			else{
				let res = eval(calc); //eval function processes the calculation string
				let strRes = String(res); //convert the result to string
				let dIndex = strRes.indexOf('.'); //is decimal? returns the index
				let dAmount = strRes.slice(dIndex+1,strRes.length).length;
				if(dIndex>0 && dAmount>4){
					console.log('found decimal');
					strRes = res.toFixed(4); //max 4 decimal points... round
				}
				dis.innerHTML = strRes;
				calc = strRes;
				console.log(calc);					
			}			
		}
		catch(err){
			dis.innerHTML = 'error';
			calc = ''; //reset
		}
	}

	let redo = document.getElementById('re');
    redo.onclick = function(){
		console.log('click!')
		if(calc.length>0){
			calc = calc.slice(0,-1);
			dis.innerHTML = calc;
			console.log(calc);
		}
	}

	let reset = document.getElementById('ac');
    reset.onclick = function(){
		calc = '';
		dis.innerHTML = "0";
		console.log('calculator reset');
	}
	
})();
