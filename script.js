
//==========
// Var / Let
//==========
var activePlayer = 0; // 0 - player 1 ? 1 - player 2
var score = {
  player1: 0,
  player2: 0,
  round: 0
};
var toggle = {
    nightMode: 1,
    red_blueMode: 1
};

//======
// Logic
//======

// Hides the dice, winner text and makes the 'NEW GAME' button normal
document.querySelector('.dice').style.display = 'none';
document.querySelector('.winner_div').style.display = 'none';
document.querySelector('.btn-new').style.fontWeight = '100';
document.querySelector('.player-score').style.fontSize = '80';

// Sets all the scores to '0'
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-0').textContent = '0';

// Button "Roll Dice"
document.querySelector('.btn-roll').addEventListener('click', roll);


// Button "New Game"
document.querySelector('.btn-new').addEventListener('click', new_game);


// Button "Hold"
document.querySelector('.btn-hold').addEventListener('click', hold);
//==========
// Functions
//==========

// Roll
function roll() {
     // Generating the random number
    var dice = Math.floor(Math.random() * 6) + 1;

    // Display the result
    let diceDOM = document.querySelector('.dice');
    diceDOM.style.display = "block";
    diceDOM.src = 'images/dice-' + dice + '.png';

    // Update the round score if the rolled number was not 1
    if (dice !== 1) {
        // Add to score
        score.round += dice;
        document.querySelector('#current-' + activePlayer).textContent = score.round;
    } else {
        // Next player
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        score.round = 0;

        // current score - 0
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        // Toggle the active screen between the players
        document.querySelector('.player-1-panel').classList.toggle('active');
        document.querySelector('.player-2-panel').classList.toggle('active');

        diceDOM.style.display = 'none';
    }
}

// New Game
function new_game () {
    // New Game Started Confirmation
    let toast = swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000
    });

    toast({
      type: 'success',
      title: 'New Game Started'
    })
        // Hides the dice and makes the 'NEW GAME' button normal
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.btn-new').style.fontWeight = '100';

    // Sets all the scores to '0'
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    score.round, score.player1, score.player2 = 0;
    
    // Switches active panels
    document.querySelector('.player-1-panel').classList.add('active');
    document.querySelector('.player-2-panel').classList.remove('active');
    
    // Hides the winner screen
    document.querySelector('.winner_div').style.display = 'none';
}

// Hold
function hold(){    
    // Holds the current score in the main scoreboard.
    if ( activePlayer === 0) {
        // Send score to player 1 //
        
        // Switches the active pannel
        document.querySelector('.player-1-panel').classList.remove('active');
        document.querySelector('.player-2-panel').classList.add('active');
        activePlayer = 1;

        // Adds the score to the player 
        score.player1 += score.round;
        document.querySelector('#score-0').textContent = score.player1;
    } else if (activePlayer === 1) {
        // Send score to player 2
        
        // Switches the active pannel
        document.querySelector('.player-1-panel').classList.add('active');
        document.querySelector('.player-2-panel').classList.remove('active');
        activePlayer = 0;

        // Adds the score to the player
        score.player2 += score.round;
        document.querySelector('#score-1').textContent = score.player2;
    }

    // Deleting the previous scores
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    score.round = 0;
    
    // Checking if someone has reached a score = 100
    finalScore();
    
    var swalPlayer = activePlayer + 1;
    swalPlayer === 1 ? swalPlayer = 2 : swalPlayer = 1;
    
    var swalPosition = 'top-left';
    swalPosition === 'top-left' ? swalPosition = 'top-right' : swalPosition = 'top-left';
    
        // Player X HOLDS
     let toast = swal.mixin({
        toast: true,
        position: swalPosition,
        showConfirmButton: false,
        timer: 2000
    });

    toast({
      type: 'success',
      title: "Player " + swalPlayer + " holds",
    })
}

// Checks if the someone has reached a score = 100
function finalScore () {
    var winnerPlayer = 0; 
    
    // Chescks if someone has a score = 100
        if (score.player1 >= 100) {     
            // Player 1 wins
            winnerPlayer = 1;
            showWinner(winnerPlayer);        
        } else if (score.player2 >= 100) {  
            // Player 2 wins
            winnerPlayer = 2;
            showWinner(winnerPlayer);           
    } else {
        // if any of the player scores != 100 - NO WINNER
        
        //Resets the winner screen back to default
        document.getElementById('winner_id').textContent = 'Player';
        document.querySelector('.winner_div').style.display = 'none';
    }
}

// Shows the winner
function showWinner (winnerPlayer) {
    // Makes the winner screen look good
    document.querySelector('.winner_div').style.display = 'block';
    document.querySelector('.btn-new').style.fontWeight = 'bold';
    document.querySelector('.player-score').style.fontSize = '50';
    
    // Checks who is the winner and shows his name
    switch (winnerPlayer) {
        case 1: 
            document.getElementById('winner_id').textContent = 'Player I';
            document.getElementById('score-0').textContent = 'WINNER';
            break;
        
        case 2:
            document.getElementById('winner_id').textContent = 'Player II';
            document.getElementById('score-1').textContent = 'WINNER'
            break;
        default:
            console.log("Can't display the winner");
            break;
    }
}

// Info screen
function info() { 
     let tutorialStr = "Each turn, a player repeatedly rolls a die until either a 1 is rolled or the player decides to HOLD \n\n *If the player rolls a 1, they score nothing and it becomes the next player's turn. \n *If a player chooses to 'HOLD', their turn total is added to their score, and it becomes the next player's turn. \n \n The first player to score 100 or more points wins.";
    
    swal({
        title: "'DICE' Rules",
        type: 'info',
        html:
            `<b>The first player with 100 points: WINS</b><br><br>
            <p style="text-align: left">
                Roll a <b>1</b>:<br>
                Score zero and next player turn.<br><br>
                Hold:<br>
                Stop rolling, save the total and next player turn.
            </p>`,
        padding: 60,
        allowEnterKey: true,
        confirmButtonText:
            'OK',
    })
}

// Key Press functions
document.onkeydown = function (event) {
    let keyPress = event.keyCode;
    
    if ( keyPress === 78 ) {
         // New Game
            new_game();
    } else if ( keyPress === 82 ) {
        // Roll
            roll();
    } else if ( keyPress === 72 ) {
        // Hold
            hold();
    } else if ( keyPress === 73) {
        // Info
            info();
    } else if ( keyPress === 76) {
        // Night Mode
        night_mode();
    } else {
        // console.log(keyPress);
    }
}


