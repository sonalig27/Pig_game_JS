/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, previousRoll1,previousRoll2, currentPlayer, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function(){
   if(gamePlaying){
       var dice1 = Math.floor(Math.random() * 6) + 1;
       var dice2 = Math.floor(Math.random() * 6) + 1;
       document.getElementById('dice-0').style.display = 'block';
       document.getElementById('dice-1').style.display = 'block';
       document.getElementById('dice-0').src = 'dice-' + dice1 + '.png';
       document.getElementById('dice-1').src = 'dice-' + dice2 + '.png';
       if((dice1 ===  6 && previousRoll1 === 6) || (dice2 === 6 && previousRoll2 === 6)){
           scores[currentPlayer] = 0;
           document.getElementById('score-' + currentPlayer).textContent = 0;
           console.log("2 6's");
           nextPlayer();
       }
       else
       if(dice1 !== 1 && dice2 !== 1){
           roundScore += dice1 + dice2;
           document.querySelector('#current-' + currentPlayer).textContent = roundScore;
       }
       else{
           nextPlayer();
       }
       previousRoll1 = dice1;
       previousRoll2 = dice2;
   }
})


document.querySelector('.btn-hold').addEventListener('click',function(){
    if(gamePlaying){
        scores[currentPlayer] += roundScore;
        document.querySelector('#score-' + currentPlayer).textContent = scores[currentPlayer];
        var input = parseInt(document.querySelector('.winning-score').value);
        var winningScore;
        if(input){
            winningScore = input;
        }else{
            winningScore = 100;
        }

        if(scores[currentPlayer] >= winningScore){
             document.querySelector('#name-' + currentPlayer).textContent = 'Winner!';
             document.getElementById('dice-0').style.display = 'none';
             document.getElementById('dice-1').style.display = 'none';
             document.querySelector('.player-' + currentPlayer + '-panel').classList.remove('active');
             document.querySelector('.player-' + currentPlayer + '-panel').classList.add('winner');
             gamePlaying = false;
        }
        else{
             nextPlayer();
        }
    }

})


document.querySelector('.btn-new').addEventListener('click',init);

function init(){
    scores = [0,0];
    roundScore = 0;
    previousRoll = 0;
    currentPlayer = 0;
    gamePlaying = true;

    document.getElementById('dice-0').style.display = 'none';
    document.getElementById('dice-1').style.display = 'none';

    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}


function nextPlayer(){
        roundScore = 0;
        document.getElementById('dice-0').style.display = 'none';
        document.getElementById('dice-1').style.display = 'none';
        document.getElementById('current-0').textContent = 0;
        document.getElementById('current-1').textContent = 0;
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        currentPlayer === 0 ? currentPlayer = 1 : currentPlayer = 0;
}
