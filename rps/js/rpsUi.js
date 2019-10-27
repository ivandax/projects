// UI functions.
const get = (id) => {
    let elem = document.getElementById(id);
    return elem;
}

const updateResults = (obj, hand1, hand2, userWins=0) => {
    //overall and user results...
    get("gamesPlayed").innerHTML = obj.gamesPlayed;
    get("score1").innerHTML = obj.score1;
    get("score2").innerHTML = obj.score2; 
    get("userWins").innerHTML = parseInt(get("userWins").innerHTML)+userWins;
    //statistics with frequencies...
    get("freqRock").innerHTML = `${obj.frequency["rock"]} times won. ${((obj.frequency["rock"]/obj.gamesPlayed)*100).toFixed(2)}%`;
    get("freqPaper").innerHTML = `${obj.frequency["paper"]} times won. ${((obj.frequency["paper"]/obj.gamesPlayed)*100).toFixed(2)}%`;
    get("freqScissors").innerHTML = `${obj.frequency["scissors"]} times won. ${((obj.frequency["scissors"]/obj.gamesPlayed)*100).toFixed(2)}%`
    get("freqTie").innerHTML = `${obj.frequency["tie"]} results. ${((obj.frequency["tie"]/obj.gamesPlayed)*100).toFixed(2)}%`
    //change images and text of the results...
    get("hand1play").innerHTML = hand1;
    get("hand2play").innerHTML = hand2;
    get("imghand1").src = `images/${hand1}.png`;
    get("imghand2").src = `images/${hand2}.png`;
}

const randomPlay = (array) => { //returns an integer from 0 to 2
    return array[Math.floor(Math.random()*3)];
}

//EXECUTION...

//makes instance
const g = new Game();

get('run').addEventListener("click", ()=>{
    let [hand1,hand2] = [randomPlay(PLAYS),randomPlay(PLAYS)] //ES6
    g.play(hand1,hand2); 
    updateResults(g,hand1,hand2);
});

get('run10').addEventListener("click", ()=>{
    for(let i=0; i<10; i++){
        let [hand1,hand2] = [randomPlay(PLAYS),randomPlay(PLAYS)]
        g.play(hand1,hand2);
        updateResults(g,hand1,hand2);
    }
});

//for the playing vs computer... we get an array of the 3 buttons.
let options = Array.from(document.getElementsByClassName("play_options"));

//then we map each button to a single functions
options.map(function(play){
    play.onclick = function(){
        let [hand1,hand2] = [this.getAttribute('data-play'),randomPlay(PLAYS)];
        let win = g.play(hand1,hand2); //in this case we want to know if hand1 won
        userWin = win[0]==="hand1" ? 1 : 0; //hand 1 is the user...
        updateResults(g,hand1,hand2,userWin);
    }
})




