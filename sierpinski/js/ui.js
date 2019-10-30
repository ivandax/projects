//UI functions

const get = (id) => {
    let elem = document.getElementById(id);
    return elem;
}

const createTriangle = (dieObj, areaObj) => {
	let die_result = dieObj.roll();
	//get the coordinate associated with the die result
	let result_coordinate = dieCases(die_result);
	//gets the new cursor position or "moves" to the new cursor
	areaObj.cursor = areaObj.move(areaObj.cursor, areaObj.coordinates[result_coordinate]);
	//draws a point in the cursor coordinate
	area.fillRect(areaObj.cursor[0],areaObj.cursor[1],1,1);
	//change image of die...
	get("die").src = `images/${die_result}.png`;		
}

//executions

let d = new Die();
let s = new Triangle(300);
console.log(s)

//area of the canvas where we'll draw the triangle
let area = get("area").getContext("2d"); 

get("run").addEventListener("click", function(){
	let execute = setInterval(function(){
		createTriangle(d,s); //we do this to be able to pass parameters to the function
	}, 50) //ever 50 milliseconds...
});
