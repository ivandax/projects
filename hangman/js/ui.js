// UI functions.
const get = (id) => {
    let elem = document.getElementById(id);
    return elem;
}

const updateFromObject = (obj) => {
    get("status").innerHTML = obj.message;
    get("word_to_guess").innerHTML = obj.placeholder.split("").join(" ");
    get("hangman_img").src = `images/${obj.attempts}.png`;
    if(obj.isFinished){
        get("submit_button").disabled = true;
    }
    get("input_guess").value = '';
}

//Execution

var game = new Hangman();
//console.log(game);
get("word_to_guess").innerHTML = game.placeholder.split("").join(" ");
get("hint").innerHTML = `Hint: ${game.word[1]}`

//on player submitting a letter, do this...
get('guess_form').addEventListener('submit',()=>{
    game.processInput(get("input_guess").value); //this will run the function and modifies the object state
    updateFromObject(game);
    //console.log(game);
});

get("reset_button").addEventListener('click',()=>{
    //reset object.
    game.word = randomWord(words);
    game.placeholder = buildPlaceholder(game.word[0]);
    game.attempts = 7;
    game.usedLetters = [];
    game.message = 'Status displays here.';
    game.isFinished = false;
    //reset the screen.
    get("status").innerHTML=game.message;
    get("word_to_guess").innerHTML = game.placeholder.split("").join(" ");
    get("hangman_img").src="images/7.png";
    get("submit_button").disabled = false;
    get("input_guess").value = '';
    get("hint").innerHTML = `Hint: ${game.word[1]}`
    //console.log(game)
});
