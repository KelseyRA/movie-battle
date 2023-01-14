const apiKeyTMDB = '32ce25589aa56c85a8438a669253213c';
var submitBtn = document.querySelector("#submit-btn");


console.log(apiKeyTMDB);

function formSubmitHandler(event) {
    event.preventDefault();

    var movieInput = document.querySelector("#movie-title");
    

    if (movieInput) {
        getApi(movieInput)
    }
}

function getApi(movieInput){

    var movieTitle = movieInput.value;

    var queryURL = 'https://api.themoviedb.org/3/search/movie?api_key=' + apiKeyTMDB + '&query=' + movieTitle;

    fetch(queryURL)
        .then(function (response) {
            data=response.json();
            return data;
       })
        .then(function (data) {
            console.log(data)

            var movieInfoCard = document.querySelector(".movie-info");
            movieInfoCard.textContent = "";

           for (var i = 0; i < data.results.length; i = i+1) {

            var posterImg = data.results[i].poster_path;
            var title = data.results[i].title;
            var rating = data.results[i].vote_average;
            var releaseDate = data.results[i].release_date;

            console.log(posterImg);
            console.log(title);
            console.log(rating);
            console.log(releaseDate);


            // second option with tiles

            var outerTile = document.createElement("div");
            var innerTile = document.createElement("article");
            var figureEl = document.createElement("figure");
            var img = document.createElement("img");
            var movieTitleEl = document.createElement("p");
            var ratingEl = document.createElement("p");
            var releaseDateEl = document.createElement("p");
            
            outerTile.setAttribute("class" , "tile is-parent is-4");
            innerTile.setAttribute("class" , "tile is-child box");
            figureEl.setAttribute("class" , "image is-4by3");
            img.setAttribute("class" , "poster");
            movieTitleEl.setAttribute("class" , "title");
            ratingEl.setAttribute("class" , "subtitle rating");
            releaseDateEl.setAttribute("class" , "subtitle release");

            movieTitleEl.textContent = data.results[i].title;
            ratingEl.textContent = "Rating: " + data.results[i].vote_average;
            releaseDateEl.textContent = "Release Date: " + data.results[i].release_date;

            img.src = "https://image.tmdb.org/t/p/original/" + posterImg;

            movieInfoCard.appendChild(outerTile);
            outerTile.appendChild(innerTile);
            innerTile.appendChild(figureEl);
            figureEl.appendChild(img);
            innerTile.appendChild(movieTitleEl);

            ratingEl.append(releaseDateEl);

            innerTile.appendChild(ratingEl);



            // movieTitleEl.appendChild(ratingEl);
            // innerTile.appendChild(releaseDateEl);




            // First try - vertical results

            // var cardImage = document.createElement("div");
            // var figureEl = document.createElement("figure");
            // var img = document.createElement("img");

            // var card = document.createElement("div");
            // var media = document.createElement("div");
            // var mediaContent = document.createElement("div");
            // var movieTitleEl = document.createElement("p");

            // var lastDivEl = document.createElement("div");
            // var ratingEl = document.createElement("p");
            // var releaseDateEl = document.createElement("p");

            // cardImage.setAttribute("class" , "card-image");
            // figureEl.setAttribute("class" , "image is-100x100");
            // img.setAttribute("class" , "poster");

            // card.setAttribute("class" , "card-content");
            // media.setAttribute("class" , "media");
            // mediaContent.setAttribute("class", "media-content");
            // movieTitleEl.setAttribute("class" , "title is-4");

            // lastDivEl.setAttribute("class" , "content");
            // ratingEl.setAttribute("class" , "rating");
            // releaseDateEl.setAttribute("class" , "release-date");

            // movieTitleEl.textContent = data.results[i].title;
            // ratingEl.textContent = data.results[i].vote_average;
            // releaseDate.textContent = data.results[i].release_date;

            // img.src = "https://image.tmdb.org/t/p/original/" + posterImg;

            // movieInfoCard.appendChild(figureEl);
            // figureEl.appendChild(img);
            // img.appendChild(card);
            // card.appendChild(media);
            // media.appendChild(mediaContent);
            // mediaContent.appendChild(movieTitleEl);
            // movieTitleEl.append(lastDivEl);
            // lastDivEl.append(ratingEl);
            // ratingEl.append(releaseDateEl);


            }
        })

}

submitBtn.addEventListener('click' , formSubmitHandler);

// getApi();