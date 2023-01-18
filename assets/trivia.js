var main = $('.main')
var gameQuestions = $('.qtns');
var questionNumberValue = 0
var answer = $('.answer') ;   
var i = 0;
var progressBar = $('<progress>', {
    class: "progress is-danger",
    value: i,
    max: "1",
});
var progress = $('.progressBar');
progress.append(progressBar)
var barProgress = document.querySelector('progress');
var buttonPlayer1 = $('.buttonPlayer1');
var buttonPlayer2 = $('.buttonPlayer2');
var nextQuestion = $('.nextQuestion');
var buttonScoreBoard = $('.scoreBoardBtn')
var buttons = [buttonPlayer1, buttonPlayer2, nextQuestion, buttonScoreBoard]
var player1 = 0;
var player2 = 0;
var score = $('.score');
var board = $('.board')
var player1ScoreBoard = $('.player1');
var player2ScoreBoard = $('.player2');
var tieScoreBoard = $('.tie');
var endgame = 0;

var player1Score = localStorage.getItem('player1');
var player2Score = localStorage.getItem('player2');
var tieScore = localStorage.getItem('tie');

var playAgainBtn = $('.playAgain');
var movieSearchBtn = $('.movieSearch');



function getTriviaApi() {
    var seconds = 2
    const triviaApi = 'fGnBcoftMFEO2Pl6TyhSpQ==0X42NWP7AgaIvW3U'


    var category = 'entertainment';
    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/trivia?category=' + category,
        headers: { 'X-Api-Key': triviaApi },
        contentType: 'application/json',
        success: function (result) {            
            var questionValue = result[0].question;
            var answerValue = result[0].answer;
            questionNumberValue++            
            gameQuestions.text(questionNumberValue + '.  '+ questionValue);

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
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });
}

buttons.forEach(function(button){
    button.on('click', function(){
        var selectedButton = button[0]     

        if(selectedButton === buttonPlayer1[0]){            
            player1++ 
            buttonPlayer1.animate({height: '50px', opacity: '0.4'}, "slow");            
            buttonPlayer1.animate({height: '40px', opacity: '1'}, "slow");
            addPoints();

        }else if(selectedButton === buttonPlayer2[0]){
            player2++
            buttonPlayer2.animate({height: '50px', opacity: '0.4'}, "slow");            
            buttonPlayer2.animate({height: '40px', opacity: '1'}, "slow");
            addPoints();

        }else if(selectedButton === nextQuestion[0]){
            nextQuestion.animate({height: '50px', opacity: '0.4'}, "slow");            
            nextQuestion.animate({height: '40px', opacity: '1'}, "slow");
            addPoints();

        }else{
            scoreBoard()
        }

    })
})
    
function addPoints() {         
    i = 0        
    barProgress.setAttribute('value', 0)  
    answer.text("")
    endgame++
    if (endgame === 10){
        answer.text("")
        barProgress.setAttribute('class','clearBar')
        gameQuestions.text("")
        buttonPlayer1.addClass('clearBar')
        buttonPlayer2.addClass('clearBar')
        nextQuestion.addClass('clearBar')

        if(player1 > player2){
            score.text('Player 1 Wins '+ player1 + ' to ' + player2);
            player1Score++;           
            localStorage.setItem('player1',player1Score)            
            scoreBoard()

        }else if(player1 < player2){
            score.text('Player 2 Wins '+ player2 + ' to '+ player1);
            player2Score++; 
            localStorage.setItem('player2',player2Score)
            scoreBoard()

        }else{
            score.text('Is a Tie!!! '+ player1 + ' to '+ player2)
            tieScore++;           
            localStorage.setItem('tie',tieScore)
            scoreBoard()

        }
                
    }else{
        getTriviaApi()    
        
    }
    
}

function scoreBoard(){

    answer.text("")
    barProgress.setAttribute('class','clearBar')
    gameQuestions.text("")
    buttonPlayer1.attr('class','clearBar')
    buttonPlayer2.attr('class','clearBar')
    nextQuestion.attr('class', 'clearBar')

   var scoreBoardBorder = $('.info')
   scoreBoardBorder.css('border-radius', '30px')
    board.text('ScoreBoard')
    if (player1Score === null || player1Score === null || tieScore === null){
        var player1InitialScore = 0;
        var player2InitialScore = 0;
        var tieInitialScore = 0;

        localStorage.setItem('player1',player1InitialScore)
        localStorage.setItem('player2',player2InitialScore)
        localStorage.setItem('tie',tieInitialScore)
    }

    localStorage.setItem('player1',player1Score)
    localStorage.setItem('player2',player2Score)
    localStorage.setItem('tie',tieScore)
    
    player1ScoreBoard.text('Player 1 : ' + player1Score)
    player2ScoreBoard.text('Player 2 : ' + player2Score)
    tieScoreBoard.text('Tie : ' + tieScore)

    playAgainBtn.removeClass('clearBar');
    movieSearchBtn.removeClass('clearBar');

    playAgainBtn.text('Play Again');
    movieSearchBtn.text('Movie Search');

    playAgainBtn.on('click', function(){
        location.reload();
    })
}

getTriviaApi()