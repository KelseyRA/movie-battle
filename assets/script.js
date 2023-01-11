
const apiKeyTMBD = '32ce25589aa56c85a8438a669253213c';


function getApi(){

    var queryURL = 'https://api.themoviedb.org/3/search/movie?api_key=' + apiKeyTMBD + '&query=Jack Reacher';

    fetch(queryURL)
        .then(function (response) {
            data=response.json();
            return data;
       })
        .then(function (data) {
            // console.log(data)
        })

}

getApi();