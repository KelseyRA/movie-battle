const apiKeyTMBD = '32ce25589aa56c85a8438a669253213c';
var submitBtn = document.querySelector("#submit-btn");




function formSubmitHandler(event) {
    event.preventDefault();

    var movieInput = document.querySelector("#movie-title");
    

    if (movieInput) {
        getApi(movieInput)
    }
}

function getApi(movieInput){

    var movieTitle = movieInput.value;

    var queryURL = 'https://api.themoviedb.org/3/search/movie?api_key=' + apiKeyTMBD + '&query=' + movieTitle;

    fetch(queryURL)
        .then(function (response) {
            data=response.json();
            return data;
       })
        .then(function (data) {
            console.log(data)
        })

}

submitBtn.addEventListener('click' , formSubmitHandler);

// getApi();