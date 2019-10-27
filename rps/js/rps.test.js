var functions = require("./rpsLogic");

//each describe is a suite of tests... 
describe("New RPS logic functions...", function(){

    //when testing we initialize the object first...
    g = new functions.Game();

    test("Initialize the game object", function(){
        expect(g.gamesPlayed).toBe(0);
        console.log(g)
    })

    test("original score1 should be 0", function(){
        expect(g.score1).toBe(0);
    })

    test("should win paper", function(){
        var result = g.play('paper', 'rock')[1];//first item in array is the selection of the winner
        expect(result).toBe('paper');
    })

    test("should win paper", function(){
        var result = g.play('rock', 'paper')[1];
        expect(result).toBe('paper');
    })

    test("should be tie", function(){
        var result = g.play('paper', 'paper')[1];
        console.log("TCL: result", result)
        
        expect(result).toBe('tie');
    })

    test("should win scissors", function(){
        var result = g.play('scissors', 'paper')[1];
        expect(result).toBe('scissors');
    })
})

//on the directory, type npm test to run your tests...
