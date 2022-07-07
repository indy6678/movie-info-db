var userFormEl = document.querySelector("#search-form")
var movieInputEl = document.querySelector("#search")

var genres = [];

var movieApi;

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
                        console.log(data);
                        displayMovieInfo(data);
                        movieApi = data;
                        genres= data.Genre.split(", ");
                    }
                    else{
                        // return "Sorry that's (probably) a TV show not a movie"
                        console.log("Sorry, that's not a movie, please try again.")
                    }
                }
                else{
                    // return data.Error somewhere
                    console.log(data.Error)
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