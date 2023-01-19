// API Key and submit button variable
document.addEventListener('DOMContentLoaded', () => {
  const apiKeyTMDB = "32ce25589aa56c85a8438a669253213c";

  var submitBtn = document.querySelector("#submit-btn");

  // Calls getApi function when a word is searched

  function formSubmitHandler(event) {
    event.preventDefault();

    var movieInput = document.querySelector("#movie-title");

    if (movieInput) {
      getApi(movieInput);
    }
  }

  // Fetches the Api information and renders on the search page

  function getApi(movieInput) {
    var movieTitle = movieInput.value;

    var queryURL =
      "https://api.themoviedb.org/3/search/movie?api_key=" + apiKeyTMDB + "&query=" + movieTitle + "&include_adult=false";


    fetch(queryURL)
      .then(function (response) {
        data = response.json();
        return data;
      })
      .then(function (data) {
        console.log(data);

        // Display modal if no movie title match.
        if (data.total_results === 0) {
          document.getElementById("modal-js-example").classList.add('is-active');
        }

        var movieInfoCard = document.querySelector(".movie-info");
        movieInfoCard.textContent = "";

        for (var i = 0; i < data.results.length; i = i + 1) {
          var posterImg = data.results[i].poster_path;
          var title = data.results[i].title;
          var rating = data.results[i].vote_average;
          var releaseDate = data.results[i].release_date;
          var summary = data.results[i].overview;
          var numberOfVotes = data.results[i].vote_count;


          // Renders data onto movie tiles

          var outerTile = document.createElement("div");
          var innerTile = document.createElement("article");
          var figureEl = document.createElement("figure");
          var img = document.createElement("img");
          var movieTitleEl = document.createElement("p");
          var ratingEl = document.createElement("p");
          var releaseDateEl = document.createElement("p");
          var summaryEl = document.createElement("p");
          var numberOfVotesEl = document.createElement("p");

          outerTile.setAttribute("class", "tile is-parent is-3");
          innerTile.setAttribute("class", "tile is-child box");
          figureEl.setAttribute("class", "image is-2by3");
          img.setAttribute("class", "poster");
          movieTitleEl.setAttribute("class", "title mt-4 has-text-centered has-text-dark");
          ratingEl.setAttribute("class", "subtitle rating has-text-centered has-text-dark");
          releaseDateEl.setAttribute("class", "subtitle release mt-4 has-text-centered has-text-dark");
          summaryEl.setAttribute("class", "subtitle summary has-text-centered has-text-dark");
          numberOfVotesEl.setAttribute("class", "subtitle summary mt-4 has-text-centered has-text-dark");

          movieTitleEl.textContent = title;
          ratingEl.innerHTML = "<strong>Rating: </strong>" + rating + "/10";
          numberOfVotesEl.innerHTML = "<strong>Number of Ratings: </strong>" + numberOfVotes;

          movieInfoCard.appendChild(outerTile);
          outerTile.appendChild(innerTile);
          innerTile.appendChild(figureEl);
          figureEl.appendChild(img);
          innerTile.appendChild(movieTitleEl);
          innerTile.append(releaseDateEl);
          innerTile.append(ratingEl);
          innerTile.append(numberOfVotesEl);
          innerTile.append(summaryEl);

          // replaces data or excludes movie records when missing data found

          if (releaseDate === undefined) {
            releaseDateEl.textContent = "Release year unavailable"
          } else {
            releaseDateEl.innerHTML = "<strong>Release Year: </strong>" + (releaseDate.slice(0, 4));
          }
          if (posterImg === null) {
            outerTile.style.display = "none";
          } else {
            img.src = "https://image.tmdb.org/t/p/original/" + posterImg;
          }

          if (summary === "") {
            summaryEl.textContent = "Synopsis unavailable."
          } else {
            summaryEl.innerHTML = "<strong>Synopsis: </strong>" + summary;
          }
        }
      });
  }

  // Calls first function when the submit button is clicked

  submitBtn.addEventListener("click", formSubmitHandler);
})
