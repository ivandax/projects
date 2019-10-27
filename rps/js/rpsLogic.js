const WINS = {
    "paper":"rock",
    "scissors":"paper",
    "rock":"scissors"
}

const PLAYS = ["rock","paper","scissors"];

var areValidHands = (hand1,hand2)=>{
    if(!PLAYS.includes(hand1) || !PLAYS.includes(hand2)){
        return false;
    }
    return true;
}

var checkPlay = (hand1,hand2)=>{
    if(WINS[hand1]===hand2){
        return ["hand1",hand1]; //string and selection
    }
    else if(WINS[hand2]===hand1){
        return ["hand2",hand2];
    };
    return ["tie","tie"];
}

class Game{
    constructor(){
        this.gamesPlayed = 0;
        this.score1 = 0
        this.score2 = 0;
        this.frequency = {
            "rock":0,
            "paper":0,
            "scissors":0,
            "tie":0
        }
    }

    play(hand1,hand2){
        if(!areValidHands(hand1,hand2)){
            return "error!";
        }
        this.gamesPlayed += 1;
        this.winningHand = checkPlay(hand1,hand2);
        if(this.winningHand[0]==="hand1"){
            this.score1 += 1;
        } else if(this.winningHand[0]==="hand2"){
            this.score2 += 1;
        }
        this.frequency[this.winningHand[1]] += 1;
        return this.winningHand;
    }
}

module.exports = {Game}