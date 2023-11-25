

// Get an array of Genres
const getGenres = async () => {
    const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en'
    const options = {
    method: 'GET',
    headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZDZkMDU1MmMxZDYwYTJmMzE1ZTcxZWMyZjkxZGY5OSIsInN1YiI6IjY1NWNiNjBkZjY3ODdhMDEzYTVjODNiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._5vNcLhbbWqNbXItkBVMZtgno6TaqbKr9hZhfQIPSYU'
    }
    };
    try {
        const response = await fetch(url, options)
            if (response.ok) {
                const jsonResponse = await response.json();
                console.log(jsonResponse)
                const genreArray = jsonResponse.genres;
                return genreArray;
            }
    } catch(err) {
        console.log((err))
    }
}


// Create the option Elements for the Selector Element
const createOptionElements = async (genreArray) => {
    const genreSelector = document.getElementById('genreSelector');
    const genre =  await genreArray.map((item) => {
        let genreItem = document.createElement('option');
        genreItem.setAttribute = ("id", "genreOption");
        genreItem.setAttribute = ("value", item.name);
        genreItem.innerHTML= item.name;
        genreSelector.appendChild(genreItem);

    })
    return genre;
}

// Get a random Movie depending on Genre

const getMoviesByGenre = async () => {
    const page = 1; // will be changed in a later
    const baseUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`
    const genreSelector = document.getElementById('genreSelector');
    const genre = genreSelector.ariaValueMax;
    const requiredParams = `&with_genres=${genre}`
    
    
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZDZkMDU1MmMxZDYwYTJmMzE1ZTcxZWMyZjkxZGY5OSIsInN1YiI6IjY1NWNiNjBkZjY3ODdhMDEzYTVjODNiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._5vNcLhbbWqNbXItkBVMZtgno6TaqbKr9hZhfQIPSYU'
        }
      };
      
    
   
    try {
        const response = await fetch(`${baseUrl}${requiredParams}`, options);
        if (response.ok) {
            const movies = await response.json();
            return movies;
        }
    } catch(err) {
        console.log(err);
    }
    
        
}



// get random movie

const randomMovieId = (movies) =>{
    const randomMovieIndex = Math.floor(Math.random() * movies.results.length);
    console.log(randomMovieIndex)
    const randomMovie = movies.results[randomMovieIndex]
    const randomMovieId = randomMovie.id;
    return randomMovieId;

    
}




// Get Movie title and poster url depending on Movie ID

const getMovieDetails = async (randomMovieId) => {

    const baseUrl = 'https://api.themoviedb.org/3/movie/'
    requiredParams = '?language=en-US'
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZDZkMDU1MmMxZDYwYTJmMzE1ZTcxZWMyZjkxZGY5OSIsInN1YiI6IjY1NWNiNjBkZjY3ODdhMDEzYTVjODNiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._5vNcLhbbWqNbXItkBVMZtgno6TaqbKr9hZhfQIPSYU'
        }
      };
      try {
        const response = await fetch(`${baseUrl}${randomMovieId}${requiredParams}`, options);
        if (response.ok) {
            const movieInfo = await response.json();
            return movieInfo;
        }
      } catch(err) {
        console.log(err);
      }
      
    
}


// Create a field with the added moviePoster url

const createPosterField = (moviePosterUrl) => {
    const posterBaseUrl = 'https://image.tmdb.org/t/p/original/'
    const imageDiv = document.createElement('div');
    imageDiv.setAttribute("id", "imageDiv");
    imageDiv.innerHTML = `<img src=${posterBaseUrl}${moviePosterUrl}>`;
    return imageDiv;
}

const createTitleField = (movieTitle) => {

    const titleField = document.createElement('h2');
    titleField.setAttribute("id", "movieTitle");
    titleField.innerHTML = movieTitle
    return titleField
}

// Create a field with the added movie Plot desription

const createPlotField = (plotDescription) => {

    const plotField = document.createElement('p');
    plotField.setAttribute("id", "plotField");
    plotField.innerHTML = plotDescription;
    return plotField;
}


const displayMovie = (movieInfo) => {
    const movieTitle = movieInfo.title;
    const moviePlotDescription = movieInfo.overview;

    // Call the Functions to create the fields and save them to variables
    const poster = createPosterField(movieInfo.poster_path);
    const title = createTitleField(movieTitle);
    const description = createPlotField(moviePlotDescription);
    const overviewDiv = document.createElement('div');
    overviewDiv.setAttribute("id", "overviewDiv")


    // Append the new fields to the movie Div

    movieDiv.appendChild(poster);
    movieDiv.appendChild(overviewDiv);
    overviewDiv.appendChild(title);
    overviewDiv.appendChild(description);
}
// A Function which puts all the information together and displays them in the MovieDiv

const getRandomMovie = async () => {
    
    // The Movie Div where the Poster, Title and Description get added
    const movieDiv = document.getElementById('movieDiv');

    // Call all Functions which are needed for the movie Data
    const movies = await getMoviesByGenre();
    const randomMovie = randomMovieId(movies);
    const movieInfo = await getMovieDetails(randomMovie);

    displayMovie(movieInfo);
}

// Function calls 
getGenres().then(createOptionElements);


const findMovieBtn = document.getElementById('submitBtn');

findMovieBtn.addEventListener('click', () => {
    getRandomMovie();
})


