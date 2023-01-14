var game = $('.game');
var board = $('.scoreBoard');
var gameQuestions = $('.qtns');
var progress = $('.progressBar');
var players = $('.players');
var answer = $('.answer')
var buttonPlayer1 = $('.buttonPlayer1')
var buttonPlayer2 = $('.buttonPlayer2')
var buttons = [buttonPlayer1, buttonPlayer2]
var seconds = 15

var i = 0
var progressBar = $('<progress>', {
    class:"progress is-danger",
    value:i,
    max:"15",
})
progress.append(progressBar)
var test = document.querySelector('progress');



const triviaApi = 'fGnBcoftMFEO2Pl6TyhSpQ==0X42NWP7AgaIvW3U'

function getTriviaApi(){
    
    var category = 'entertainment';
    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/trivia?category=' + category,
        headers: { 'X-Api-Key': triviaApi},
        contentType: 'application/json',
        success: function(result) {
            console.log(result);
            var questionValue = result[0].question;
            var answerValue = result[0].answer;

            gameQuestions.text(questionValue);
            
            var timerInterval = setInterval(function() {
               test.setAttribute('value', i++)
                seconds--;
                if(seconds === 0) {
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






getTriviaApi()

buttons.forEach(function(button){
    button.addEventListener('click', function(){
        console.log('hello')
    })
})


// var i = 0;


