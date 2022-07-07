var userFormEl = document.querySelector("#search-form");
var movieInputEl = document.querySelector("#search");

var mainBodyEl = document.querySelector(".main");
var errorMessageEl = document.querySelector(".error")

var genres = [];
var movieApi; // delete later

function formSubmitHandler(event) {
    event.preventDefault();
    var movie = movieInputEl.value.trim();
    if(movie) {
        getMovie(movie);
        movieInputEl.value = "";
    }
}

// API call
function getMovie(movie){
    var apiUrl = `http://www.omdbapi.com/?apikey=5af37e64&t=${movie}&plot=full`

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                if(data.Response==="True")
                {
                    if(data.Director!=="N/A")
                    {
                        movieApi = data;
                        console.log(data); // delete
                        displayMovieInfo(data);
                        movieApi = data; // delete later
                        genres= data.Genre.split(", ");
                        errorMessageEl.classList.add("hidden");
                        mainBodyEl.classList.remove("hidden");


                    }
                    else{
                        // return "Sorry that's (probably) a TV show not a movie"
                        mainBodyEl.classList.add("hidden");
                        errorMessageEl.classList.remove("hidden");
                        errorMessageEl.textContent = "Sorry, we couldn't find that movie, please double check your spelling and try again.";
                    }
                }
                else{
                    // return data.Error somewhere
                    mainBodyEl.classList.add("hidden");
                    errorMessageEl.classList.remove("hidden");
                    errorMessageEl.textContent = data.Error;
                }
            });
        }
        else {

        }
    });
}
// Display Movie Info
function displayMovieInfo(movieData){
    var posterEl = document.querySelector(".poster").querySelector("img");
    var movieTitleEl = document.querySelector(".movie-title")
    var plotEl = document.querySelector(".plot-desc");
    var directorEl = document.querySelector(".dir-list");
    var mpaaEl = document.querySelector("#rating");
    
    
    // Poster
    posterEl.setAttribute("src",movieData.Poster)
    // Title
    movieTitleEl.textContent= movieData.Title;
    // Plot
    plotEl.textContent = movieData.Plot;
    // Director
    directorEl.textContent = movieData.Director
    // MPAA
    mpaaEl.textContent = movieData.Rated
    // Actors
    displayActors(movieData.Actors)
    // Ratings
    displayRatings(movieData.Ratings)
}

function displayActors(actorString){
    var actorListEl = document.querySelector(".actor-list");
    // convert to array
    actors = actorString.split(", ");
    actorListEl.textContent = "";
    for(actor of actors){
        var listItemEl = document.createElement("li");
        listItemEl.textContent = actor;
        actorListEl.appendChild(listItemEl);
    }

}

function displayRatings(ratingArr){
    var ratingEl = document.querySelector(".score-list");
    var i = 0;
    $(ratingEl).children().each(function(){
        if(ratingArr[i].Source === "Internet Movie Database"){
            ratingArr[i].Source = "IMDB";
        }
        $(this).text(`${ratingArr[i].Source}: ${ratingArr[i].Value}`)
        i++;
    })
}

userFormEl.addEventListener("submit", formSubmitHandler);