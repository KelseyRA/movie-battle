
const triviaApi = 'fGnBcoftMFEO2Pl6TyhSpQ==0X42NWP7AgaIvW3U'

function getTriviaApi(){
    var category = 'music';
    $.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/trivia?category=' + category,
    headers: { 'X-Api-Key': triviaApi},
    contentType: 'application/json',
    success: function(result) {
        console.log(result);
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
    });

   
}

getTriviaApi();