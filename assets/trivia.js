// Declare all local Variables
var main = $('.main');
var triviaQuestions = $('.qtns');
var questionNumber = 0;
var answer = $('.answer');
var i = 0;
var progressBar = $('<progress>', { //Progress bar will fill until time is up
    class: "progress is-danger",
    value: i,
    max: "3",
});
var progress = $('.progressBar');
progress.append(progressBar);
var barProgress = document.querySelector('progress');
var buttonPlayer1 = $('.buttonPlayer1');
var buttonPlayer2 = $('.buttonPlayer2');
var buttonNextQuestion = $('.nextQuestion');
var buttonScoreBoard = $('.scoreBoardBtn');
var buttons = [ //buttons to interact with players 
    buttonPlayer1,
    buttonPlayer2,
    buttonNextQuestion,
    buttonScoreBoard];
var player1 = 0;
var player2 = 0;
var score = $('.score');
var board = $('.board');
var player1ScoreBoard = $('.player1');
var player2ScoreBoard = $('.player2');
var tieScoreBoard = $('.tie');
var playAgainBtn = $('.playAgain');
var movieSearchBtn = $('.movieSearch');
var endgame = 0;

// Get the localStorage values
var player1Score = localStorage.getItem('player1');
var player2Score = localStorage.getItem('player2');
var tieScore = localStorage.getItem('tie');

// if localStores values are null replace them with cero
if (player1Score === null || player2Score === null || tieScore === null) {
    // Set inicial values
    var initialScore = 0;

    // set values to local storage 
    localStorage.setItem('player1', initialScore);
    localStorage.setItem('player2', initialScore);
    localStorage.setItem('tie', initialScore);

    // set local storage values to players score and tie score
    var player1Score = localStorage.getItem('player1');
    var player2Score = localStorage.getItem('player2');
    var tieScore = localStorage.getItem('tie');
}



// Fetches the API information
function getTriviaApi() {
    var seconds = 5 // Set the time of the question at the end show answer
    const triviaApi = 'fGnBcoftMFEO2Pl6TyhSpQ==0X42NWP7AgaIvW3U';
    var category = 'entertainment';

    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/trivia?category=' + category,
        headers: { 'X-Api-Key': triviaApi },
        contentType: 'application/json',
        success: function (result) {
            // get the question and answer info    
            var questionValue = result[0].question;
            var answerValue = result[0].answer;
            questionNumber++
            triviaQuestions.text(questionNumber + '.  ' + questionValue);

            var timerInterval = setInterval(function () {
                barProgress.setAttribute('value', i++)
                seconds--;
                if (seconds === 0) {
                    // Stops execution of action at set interval
                    clearInterval(timerInterval);
                    answer.text(answerValue);

                }
            }, 1000);
        },
        // error: function ajaxError(jqXHR) {
        //     console.error('Error: ', jqXHR.responseText);
        // }
    });
}

// create and event that loops all buttons ang get which was clicked
buttons.forEach(function (button) {
    button.on('click', function () { //add event listener
        var selectedButton = button[0]

        // If statement to get the actual button
        if (selectedButton === buttonPlayer1[0]) {
            player1++
            buttonPlayer1.animate({ height: '50px', opacity: '0.4' }, "slow");
            buttonPlayer1.animate({ height: '40px', opacity: '1' }, "slow");
            endGame();

        } else if (selectedButton === buttonPlayer2[0]) {
            player2++
            buttonPlayer2.animate({ height: '50px', opacity: '0.4' }, "slow");
            buttonPlayer2.animate({ height: '40px', opacity: '1' }, "slow");
            endGame();

        } else if (selectedButton === buttonNextQuestion[0]) {
            buttonNextQuestion.animate({ height: '50px', opacity: '0.4' }, "slow");
            buttonNextQuestion.animate({ height: '40px', opacity: '1' }, "slow");
            endGame();

        } else {
            scoreBoard()
        }

    })
})
// check if the questions are done, finish the game and add point to the winer
function endGame() {
    i = 0
    barProgress.setAttribute('value', 0)
    answer.text("")
    endgame++
    if (endgame === 10) {
        // If game ends, clear the screen
        answer.text("")
        barProgress.setAttribute('class', 'clear')
        triviaQuestions.text("")
        buttonPlayer1.addClass('clear')
        buttonPlayer2.addClass('clear')
        buttonNextQuestion.addClass('clear')

        // if player 1 wins add point and call scoreBoard function
        if (player1 > player2) {
            score.text('Player 1 Wins ' + player1 + ' to ' + player2);
            player1Score++;
            console.log(player1Score)
            localStorage.setItem('player1', player1Score)
            scoreBoard()

            // if player 2 wins add point and call scoreBoard function
        } else if (player1 < player2) {
            score.text('Player 2 Wins ' + player2 + ' to ' + player1);
            player2Score++;
            console.log(player2Score)
            localStorage.setItem('player2', player2Score)
            scoreBoard()

            // if game is tie, add point to tie and call scoreBoard function
        } else {
            score.text('It is a Tie!!! ' + player1 + ' to ' + player2)
            tieScore++;
            console.log(tieScore)
            localStorage.setItem('tie', tieScore)
            scoreBoard()

        }

    } else {
        // If game not finished keep playing
        getTriviaApi()

    }

}
// Call Scoreboard function
function scoreBoard() {

    //Clear Screen
    answer.text("")
    barProgress.setAttribute('class', 'clear')
    triviaQuestions.text("")
    buttonPlayer1.attr('class', 'clear')
    buttonPlayer2.attr('class', 'clear')
    buttonNextQuestion.attr('class', 'clear')
    board.text('Scoreboard')

    // Set the result to local storage
    localStorage.setItem('player1', player1Score)
    localStorage.setItem('player2', player2Score)
    localStorage.setItem('tie', tieScore)

    // Display results
    player1ScoreBoard.text('Player 1 : ' + player1Score)
    player2ScoreBoard.text('Player 2 : ' + player2Score)
    tieScoreBoard.text('Tie : ' + tieScore)

    // remove claa clear to show buttons to play again or go to movie search
    playAgainBtn.removeClass('clear');
    movieSearchBtn.removeClass('clear');

    playAgainBtn.text('Play Again');
    movieSearchBtn.text('Movie Search')

    // event listener on play again to play again
    playAgainBtn.on('click', function () {
        location.reload();
    })
}

// Call function get trivia App
getTriviaApi()