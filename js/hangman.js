/*
* Title: hangman.js
* Abstract: Javascript file for running hangman game
* Author: Moises Bernal
* Date: 3-4-2018
*/

// Global variables
const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const MAX_STATE = 7;
var won, correct, incorrect, words, word, masked, state, started;

function getTextAndBegin(saveToWords){
    // read text from resources
    var request = new XMLHttpRequest();
    request.open('GET', 'resources/hangmanwords.txt', true);
    request.send(null);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var type = request.getResponseHeader('Content-Type');
            if (type.indexOf("text") !== 1) {
                saveToWords(request.responseText);
            }
        }
    }
}

// call getTextAndBegin which calls begin function
getTextAndBegin(function (text) {
    // Create array of words
    words = text.split('\n');

    // Prepare game
    prepare();
});

function prepare()
{
    // Add listeners for buttons
    document.getElementById("newGameBtn").addEventListener('click', (event) =>{
       begin();
    });

    //
    document.getElementById("guesses").style.display = 'none';
}

function begin()
{   // default values
    incorrect = '';
    correct = '';
    state = 1;
    started = 0;
    won = false;

    // Chose random word
    // word = "COMPUTER";
    word = words[Math.floor(Math.random()*words.length)].trim().toUpperCase();
    console.log(word);
    
    // Create underscores based on word
    masked = word.replace(/[A-Z]/ig, "_ ");
    console.log(masked);
    document.getElementById("correct").innerHTML = " ";
    document.getElementById("incorrect").innerHTML = " ";
    document.getElementById("newGameBtn").style.display = 'none';
    document.getElementById("masked").innerHTML = masked;
    document.getElementById("selected").innerHTML = " ";
    document.getElementById("selectedTitle").innerHTML = 'Selected:';
    document.getElementById("guesses").style.display = 'table';
    document.getElementById("guess").innerHTML = 'Guesses left: ' + (MAX_STATE-state);
}

// Get user guess
document.addEventListener('keypress', (event) =>{
    if(state===MAX_STATE || won)
        return;
    document.getElementById("message").innerHTML = " ";
    var userLetter = String.fromCharCode(event.charCode);
    document.getElementById("selected").innerHTML = userLetter.toUpperCase();
    console.log(userLetter);

    // Check if guess is in A-Z
    if(ALPHA.indexOf(userLetter.toUpperCase()) < 0)
    {
        document.getElementById("message").innerHTML = "*** Enter letters A-Z ***";
        console.log("Enter letters A-Z");
        return;
    }

    // Check if guess is repeated
    if(incorrect.indexOf(userLetter.toUpperCase()) > -1
        || correct.indexOf(userLetter.toUpperCase()) > -1)
    {
        document.getElementById("message").innerHTML = "*** You already guessed '" + userLetter.toUpperCase() +"' ***";
        console.log("*** You already guessed '" + userLetter.toUpperCase() +"' ***");
    }
    else if(word.toUpperCase().indexOf(userLetter.toUpperCase())>-1)
    {
        // correct - append to correct
        var done = true;
        for(var i = 0; i < word.length; i++)
        {
            if(word[i] === userLetter.toUpperCase())
            {
                masked = masked.substr(0, 2*i) + word[i] + masked.substr(2*i + 1);
                madeChanged = 1;
                document.getElementById("masked").innerHTML = masked;
            }
            if(masked[2*i] === '_')
                done = false;
        }
        if(done === true)
            win();
        correct+=userLetter.toUpperCase();
        document.getElementById("correct").innerHTML = correct;
        console.log("correct: " + correct);
    }
    else
    {
        // incorrect - append to incorrect
        incorrect+=userLetter.toUpperCase();
        document.getElementById("incorrect").innerHTML = incorrect;
        console.log("incorrect: " + incorrect);
        state++;
        document.getElementById("hangmanPic").src = "resources/images/state" + state + ".png";

        // check if game ends
        if(state === MAX_STATE)
        {
            document.getElementById("message").innerHTML = " ";
            document.getElementById("selected").innerHTML = " ";
            document.getElementById("selectedTitle").innerHTML = 'You lose! The word is '
                + word.toUpperCase() + '.';
            document.getElementById("guess").innerHTML = ' ';
            document.getElementById("newGameBtn").style.display = 'inline';
        }
        else
            document.getElementById("guess").innerHTML = 'Guesses left: ' + (MAX_STATE-state);
    }
});

function win()
{
    document.getElementById("message").innerHTML = " ";
    document.getElementById("selectedTitle").innerHTML = " ";
    document.getElementById("selected").innerHTML = 'Congratulations, YOU WIN!';
    document.getElementById("guess").innerHTML = ' ';
    document.getElementById("newGameBtn").style.display = 'inline';
    won = true;
}