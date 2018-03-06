/*
* Title: hangman.js
* Abstract: Javascript file for running hangman game
* Author: Moises Bernal
* Date: 3-6-2018
*/

// Global variables
const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const MAX_STATE = 7;
var won, correct, incorrect, words, word, masked, state, started;

function getTextAndPrepare(saveToWords){
    // read text from resources and 
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

// call getTextAndPrepare which has a callback function to prepare game
getTextAndPrepare(function (text) {
    // -- Prepare game -- 
    // Create array of words
    words = text.split('\n');

    // Add listeners for buttons
    document.getElementById("newGameBtn").addEventListener('click', (event) =>{
       console.log("hello");
       begin();
    });

    // Get user guess
    document.getElementById("submitBtn").addEventListener('click', (event) =>{
        checkGuess();
    });

    // Execute a function when the user releases a key on the keyboard
    document.getElementById("textInput").addEventListener("keyup", function(event) {
        // Cancel the default action, if needed
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("submitBtn").click();
        }
    });
});

function begin()
{   // default values
    incorrect = '';
    correct = '';
    state = 1;
    started = 0;
    won = false;

    // Chose random word
    //word = "COMPUTER" //Task 1;
    word = words[Math.floor(Math.random()*words.length)].trim().toUpperCase();
    
    // Create underscores based on word
    masked = word.replace(/[A-Z]/ig, "_ ");
    
    // Make changes to document
    document.getElementById("hangmanPic").src = "resources/images/state1.png";
    document.getElementById("correct").innerHTML = " ";
    document.getElementById("incorrect").innerHTML = " ";
    document.getElementById("newGameBtn").style.display = 'none';
    document.getElementById("textInput").style.display = '';
    document.getElementById("submitBtn").style.display = '';
    document.getElementById("masked").innerHTML = masked;
    document.getElementById("selected").innerHTML = " ";
    document.getElementById("selectedTitle").innerHTML = 'Enter the letter you select.';
    document.getElementById("guesses").style.display = 'table';
    document.getElementById("guess").innerHTML = 'Guesses left: ' + (MAX_STATE-state);
    document.getElementById("textInput").focus();

    //document.addEventListener();
}

function checkGuess(event)
{
    // Return if game is finished
    var userLetter = document.getElementById("textInput").value;
    if(state === MAX_STATE || won || userLetter == "")
        return;
    document.getElementById("selectedTitle").innerHTML = 'Selected: ';
    document.getElementById("message").innerHTML = " ";
    document.getElementById("selected").innerHTML = userLetter.toUpperCase();
    document.getElementById("textInput").value = "";
    document.getElementById("textInput").focus();

    // Check if guess is in A-Z
    if(ALPHA.indexOf(userLetter.toUpperCase()) < 0)
    {
        document.getElementById("message").innerHTML = "*** Enter letters A-Z ***";
        return;
    }

    // Check if guess is repeated
    if(incorrect.indexOf(userLetter.toUpperCase()) > -1
        || correct.indexOf(userLetter.toUpperCase()) > -1)
    {
        document.getElementById("message").innerHTML = "*** You already guessed '" + userLetter.toUpperCase() +"' ***";
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
        // check if user won
        if(done)
            win();
        correct+=userLetter.toUpperCase();
        document.getElementById("correct").innerHTML = correct;
    }
    else
    {
        // incorrect - append to incorrect
        incorrect+=userLetter.toUpperCase();
        document.getElementById("incorrect").innerHTML = incorrect;
        state++;
        document.getElementById("hangmanPic").src = "resources/images/state" + state + ".png";

        // check if player loses
        if(state === MAX_STATE)
            lose();
        else
            document.getElementById("guess").innerHTML = 'Guesses left: ' + (MAX_STATE-state);
    }
}

function lose()
{
    document.getElementById("message").innerHTML = " ";
    document.getElementById("selected").innerHTML = " ";
    document.getElementById("selectedTitle").innerHTML = 'You lose! The word is '
        + word.toUpperCase() + '.';
    document.getElementById("guess").innerHTML = ' ';
    document.getElementById("newGameBtn").style.display = 'inline';
    document.getElementById("textInput").style.display = 'none';
    document.getElementById("submitBtn").style.display = 'none';
}

// Display win message and show new game button
function win()
{
    document.getElementById("message").innerHTML = " ";
    document.getElementById("selectedTitle").innerHTML = " ";
    document.getElementById("selected").innerHTML = 'Congrats,\nYOU WIN!';
    document.getElementById("guess").innerHTML = ' ';
    document.getElementById("newGameBtn").style.display = 'inline';
    document.getElementById("textInput").style.display = 'none';
    document.getElementById("submitBtn").style.display = 'none';
    won = true;
}