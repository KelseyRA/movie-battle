const apiKeyTMDB = "32ce25589aa56c85a8438a669253213c";

var submitBtn = document.querySelector("#submit-btn");

function formSubmitHandler(event) {
  event.preventDefault();

  var movieInput = document.querySelector("#movie-title");

  if (movieInput) {
    getApi(movieInput);
  }
}

function getApi(movieInput) {
  var movieTitle = movieInput.value;

  var queryURL =
    "https://api.themoviedb.org/3/search/movie?api_key=" + apiKeyTMDB +"&query=" + movieTitle + "&include_adult=false";

  var watchURL = "https://api.themoviedb.org/3/discover/movie?api_key=" + apiKeyTMDB + "&query" + movieTitle + "&with_watch_providers";

  fetch(watchURL)
  .then(function (response) {
    data = response.json();
    return data;
  })
  .then(function (data) {
    console.log(data);
  });

  fetch(queryURL)
    .then(function (response) {
      data = response.json();
      return data;
    })
    .then(function (data) {
      console.log(data);

      var movieInfoCard = document.querySelector(".movie-info");
      movieInfoCard.textContent = "";

      for (var i = 0; i < data.results.length; i = i + 1) {
        var posterImg = data.results[i].poster_path;
        var title = data.results[i].title;
        var rating = data.results[i].vote_average;
        var releaseDate = data.results[i].release_date;
        var summary = data.results[i].overview;
        var adult = data.results[i].adult;
        var numberOfVotes = data.results[i].vote_count;

        console.log(posterImg);
        console.log(title);
        console.log(rating);
        console.log(releaseDate);
        console.log(summary);
        console.log(adult);
        console.log(numberOfVotes);


        // Render movie tiles

        var outerTile = document.createElement("div");
        var innerTile = document.createElement("article");
        var figureEl = document.createElement("figure");
        var img = document.createElement("img");
        var movieTitleEl = document.createElement("p");
        var ratingEl = document.createElement("p");
        var releaseDateEl = document.createElement("p");
        var summaryEl = document.createElement("p");
        var numberOfVotesEl =document.createElement("p");

        outerTile.setAttribute("class", "tile is-parent is-4");
        innerTile.setAttribute("class", "tile is-child box");
        figureEl.setAttribute("class", "image is-4by3");
        img.setAttribute("class", "poster");
        movieTitleEl.setAttribute("class", "title mt-4");
        ratingEl.setAttribute("class", "subtitle rating");
        releaseDateEl.setAttribute("class", "subtitle release mt-4");
        summaryEl.setAttribute("class" , "subtitle summary");
        numberOfVotesEl.setAttribute("class" , "subtitle summary mt-4");

        movieTitleEl.textContent = title;
        ratingEl.textContent = "Rating: " + rating + "/10";
        numberOfVotesEl.textContent = "Number of Ratings: " + numberOfVotes;

        movieInfoCard.appendChild(outerTile);
        outerTile.appendChild(innerTile);
        innerTile.appendChild(figureEl);
        figureEl.appendChild(img);
        innerTile.appendChild(movieTitleEl);
        innerTile.append(releaseDateEl);
        innerTile.append(ratingEl);
        innerTile.append(numberOfVotesEl);
        innerTile.append(summaryEl);
        

        if (releaseDate === undefined) {
          releaseDateEl.textContent = "Release year unavailable"
        } else {
          releaseDateEl.textContent = "Release Year: " + (releaseDate.slice(0, 4));
      }

        if (posterImg === null) {
          img.src = "./assets/icons8-unavailable-150.png";
          outerTile.style.display = "none";
        }else {
        img.src = "https://image.tmdb.org/t/p/original/" + posterImg;
      }

      if (summary === "") {
      summaryEl.textContent = "Synopsis unavailable."
    } else {
      summaryEl.textContent = "Synopsis: " + summary;
    }
  }
    });
}

submitBtn.addEventListener("click", formSubmitHandler);
