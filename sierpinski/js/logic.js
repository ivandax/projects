console.log("sierpinski");

//logic

const randomNumber = (max) => {
    return Math.floor(Math.random() * max);
}

const dieCases = (int) => {
	switch(true){
		case(int===1 || int===2):
		  return "a";
		case(int===3 || int===4):
		  return "b";
		case(int===5 || int===6):
		  return "c";
	}
}

const newCursor = (coordA, coordB) => {
	return [coordA[0]+(coordB[0]-coordA[0])/2 , coordA[1]+(coordB[1]-coordA[1])/2];
}

class Die{
	constructor(){
		this.faces = [1,2,3,4,5,6];
	}

	roll(){
		return this.faces[randomNumber(this.faces.length)];
	}
}

class Triangle{
	constructor(sideLength){
		this.coordinates = {
			"a" : [0,Math.sqrt(3)*sideLength/2],//bottom left corner
			"b" : [sideLength,Math.sqrt(3)*sideLength/2],//bottom right corner
			"c" : [sideLength/2, 0],//top corner			
			"m" : [sideLength/2, Math.sqrt(3)*sideLength/4] //middle of triangle
		}
		this.cursor = this.coordinates["m"] //starts in the middle
		this.distanceToMove = 0; //starts at 0
	}
	move(cursor,target){ //cursor is the last place moved to.
		return newCursor(cursor, target);
	}
}


