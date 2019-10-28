const buildPlaceholder = (string) => {
    let placeholder = '';
    for(let letter in string){
        placeholder += "_";
    }
    return placeholder;
}

const randomNumber = (max) => {
    return Math.floor(Math.random() * max);
}
//returns a random word from an array of objects.
const randomWord = (array) => {
    let n = randomNumber(array.length);
    return [array[n].word, array[n].category]; //returns the word and category
}

const checkValidInput = (letter,array)=> {
    //works only if letter is string over 1 length and is not used already.
    if(letter.length>0 && !array.includes(letter)){
        return letter;
    } else{
        return false;
    }
}

const processLetter = (char, string, placeholder)=>{
    if(string.includes(char)){
        mod_placeholder = '';
        for(let i in string){
            if(placeholder[i]==="_"){
                if(string[i] === char){
                    mod_placeholder += char;
                } else{
                    mod_placeholder += "_";
                }            
            } else{
                mod_placeholder += placeholder[i];
            }
        }
        return [char, mod_placeholder];        
    } else{
        return false;
    }
}

class Hangman{
    constructor(){
        //this.score = 0; //starts on 0 by default.
        this.word = randomWord(words); //0 is the word, 1 is the category
        this.placeholder = buildPlaceholder(this.word[0]);
        this.attempts = 7;
        this.usedLetters = [];
        this.usedWords = []; 
        this.message = ''; 
        this.isFinished = false;    
    }

    processInput(letter){
        let char = checkValidInput(letter.toLowerCase(), this.usedLetters);
        if(!char){
            this.message = "Repeated or invalid input.";
            return;
        }
        let result = processLetter(char,this.word[0],this.placeholder)
        if(!result){
            this.attempts -= 1; //no match deducts from the attempts...
            if(!this.attempts){
              this.message = "Out of turns. You lose..."
              this.isFinished = true;
              return;              
            }
            this.message = "No match for this letter"
            this.usedLetters.push(char)//if letter is wrong, still, we consider it used.
            return;
        }

        this.placeholder = result[1]; //modify placeholder with latest match.

        if(this.word[0] === this.placeholder){
            this.message = "You guessed it! Awesome :)"
            this.isFinished = true;
            return
        }
        this.message = "You got a match!"        
        this.usedLetters.push(result[0]);//if there is a success, letter is already used.
    }
}