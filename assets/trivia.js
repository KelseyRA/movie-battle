var game = $('.game');
var board = $('.scoreBoard');
var gameQuestions = $('.qtns');
var progress = $('.progress');
var players = $('.players');




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
            gameQuestions.text(questionValue)


        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });
    
}



getTriviaApi()



// var progressBar = $('.progress', {
//     class:"progress is-danger",
//     value:"1",
//     max:"15",
// })

// var i = 0;

