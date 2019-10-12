"use strict"

//functions

var constructGrid = function(x,y){ //creates an array with all the cell coordinates of the game...
	var grid = [];
	var i = 0;
	while(i<x){
		var n = 0;
		while(n<y){
			grid[grid.length] = String(i)+String(n);
			n += 1;
		}
		i += 1;
	}
	console.log(grid);
	return grid;
}

//function to get the elements of each column into an array (we're getting the actual node)
var makeColumns = function(column_number, height){
	var column = [];
	var i = 0; //iteration variable
	while(i<height-1){
		column[column.length] = document.getElementById(column_number+String(i));
		i += 1;
	}
	console.log(column);
	return column;
}

var evaluateLastSelection = function(selection){
	console.log(selection.id);
	console.log(selection.classList.value[0]);


}

//executes the function, passing the width and height
var gridNumbers = constructGrid(7,6);
var playerRed = [];
var playerRedAxis
var playerBlue = [];
var playerBlueAxis
var columns = []
var i = 0;
while(i<7){ //now columns will contain one array for every accesible column in the game.
	columns[columns.length] = makeColumns(i,7) //this actually executes the function 7 times to get the columns in to the array
	i += 1;
}

console.log(columns)

var columnHeaders = Array.from(document.getElementsByClassName('columnSelection'));
var turns = 0;
var colorOptions = ["blueBackground","redBackground"]

columnHeaders.map(function(header){
	header.onclick = function(){

		var selection = columns[header.innerHTML].splice(0,1) //splice removes the item from column, and returns it into selection.

		if(turns%2===0){ //if modulus returns 0, the turn is blue. Otherwise it's an odd number, and the turn is red.
			playerBlue[playerBlue.length] = selection[0];
			evaluateLastSelection(selection[0]);

		} else{
			playerRed[playerRed.length] = selection[0];
			evaluateLastSelection(selection[0]);
		}

		//visually change the color of the cell in the column.
		var tableCell = document.getElementById(selection[0].id) //use selection id to get the element from the DOM we need
		tableCell.classList.add(colorOptions[turns%2]); //change its color
		document.getElementById("square").classList.toggle("redBackground") //css > combination of the two classes makes it red.
		console.log(playerBlue)
		console.log(playerRed)

		turns += 1;
	}
})

