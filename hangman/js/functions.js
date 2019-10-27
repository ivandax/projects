var words = [{word:"pizza", category:"Food"},
{word:"dragon", category:"Creatures"},
{word:"peanuts", category:"Food"},
{word:"yogurt", category:"Food"},
{word:"butterfly", category:"Creatures"},
{word:"canada", category:"Geography"},
{word:"mexico", category:"Geography"},
{word:"sydney", category:"Geography"},
{word:"andorra", category:"Geography"},
{word:"nigeria", category:"Geography"},
{word:"toledo", category:"Geography"},
{word:"mongolia", category:"Geography"},
{word:"germany", category:"Geography"},
{word:"israel", category:"Geography"},
{word:"paraguay", category:"Geography"},
{word:"unicorn", category:"Creatures"},
{word:"minotaur", category:"Creatures"},
{word:"falcon", category:"Creatures"},
{word:"gorilla", category:"Creatures"},
{word:"beaver", category:"Creatures"},
{word:"squirrel", category:"Creatures"},
{word:"lasagna", category:"Food"},
{word:"chocolate", category:"Food"},
{word:"almond", category:"Food"},
{word:"sandwich", category:"Food"},
{word:"blueberry", category:"Food"},
{word:"hamburger", category:"Food"},
{word:"racoon", category:"Creatures"},
{word:"paella", category:"Food"},
{word:"glasgow", category:"Geography"}]

//function to find the letters on the word and reveal add on the place holder...
var replaceCharOnPlaceholder = function(string,character,placeholder){
    mod_placeholder = '';
    for(var letter in string){
        if(placeholder[letter]==="_"){
            if(string[letter] === character){
                mod_placeholder += character;
            } else{
                mod_placeholder += "_";
            }            
        } else{
            mod_placeholder += placeholder[letter];
        }
    }
    return mod_placeholder;
}

var returnRandomUpTo = function(max){ //returns a random number between 0 and max.
    return Math.floor(Math.random() * max);
}

var modifyScreenWithPlaceholder = function(placeholder){ //handles the event of updating the screen with the updated placeholder, to be called on each user input.
    document.getElementById("word_to_guess").innerHTML = placeholder.split("").join(' ');
}

var updateImage = function(src){ //handles the event of updating the screen with the updated placeholder, to be called on each user input.
    document.getElementById('hangman_img').src=src;
}

var updateStatus= function(text){ //handles the event of updating the screen with the updated placeholder, to be called on each user input.
    document.getElementById('status').innerHTML=text;
}

//object constructor, each game is an instance of this...
var HangmanGame = function(obj){
    this.selected_word = obj.word; //we need to access the property of hte object
    this.placeholder = ''; //to build the "______" structure to show on screen
    this.turns = 10;
    this.input_letter;
    this.used_letters = []; 
    this.initialize = function(){
        //console.log("Game started > ",this)
        document.getElementById("submit_button").disabled = false //in case of a reset, we activate the submit button.
        for(var letter in this.selected_word){
            this.placeholder += "_"; //adds "_" for every letter on the selected word.
        }
        modifyScreenWithPlaceholder(this.placeholder);
        updateImage('images/10.png');
        updateStatus("Hint: '"+obj.category+"', "+this.turns+" turns remaining");
    }
    this.checkUserInput = function(){
        //console.log("Input received > ",this)
        this.input_letter = document.getElementById("input_guess").value.toLowerCase(); //get user input

        if(this.used_letters.indexOf(this.input_letter)>-1){
            updateStatus("Letter used already!"); //check if user is not repeating a letter...
            document.getElementById("input_guess").value = "";
        }else{
            if(this.input_letter.length){ //triggers the function action only if there is an input with length...
                this.placeholder = replaceCharOnPlaceholder(this.selected_word, this.input_letter, this.placeholder);
                modifyScreenWithPlaceholder(this.placeholder); //updated plac holder...
                this.turns -= 1;
                this.used_letters.push(this.input_letter); //adds used letter to the list
                updateStatus("Hint: '"+obj.category+"', "+this.turns+" turns remaining");
                updateImage('images/'+this.turns+'.png');
                document.getElementById("input_guess").value = "";
                if(this.placeholder===this.selected_word){ //if you won, do this
                    //console.log("Game completed! You won!");
                    updateStatus("Game completed! You won!");
                    document.getElementById("submit_button").disabled = true;
                }
                else if(!this.turns){//if turns drop down to 0...
                    updateStatus("You lose... :(");
                    document.getElementById("submit_button").disabled = true;
                }
            }else{
                console.log("No letter entered.");//do nothing if user presses enter without input of letter.
            }
        }
    }
}

//first object creation...
var game = new HangmanGame(words[returnRandomUpTo(words.length)]);
game.initialize();

//handle user input... we check the progress of the game
document.getElementById('guess_form').addEventListener('submit',game.checkUserInput.bind(game));

//reset to basic status if the reset button is hit, makes a new game instance and initialize it.
document.getElementById('reset_button').addEventListener('click',function(){
    game = new HangmanGame(words[returnRandomUpTo(words.length)])
    game.initialize();
});
