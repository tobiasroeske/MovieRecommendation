

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
//2.0 Picks random movie out of the first 20 pages (sorted by genre and popularity)

const getMoviesByGenre = async () => {
    const randomPage = Math.floor(Math.random() * 20);
    const page = randomPage; 
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
        const movieArray = [];
        for (let i = 0; i <= 5; i++) {
            const response = await fetch(`${baseUrl}${requiredParams}`, options);
            if (response.ok) {
                const movies = await response.json();
                movieArray.push(movies);
            }
            
        }
        console.log(movieArray);
        return movieArray;
    } catch(err) {
        console.log(err);
    }
    
        
}



// get random movie

const randomMovieIds = (movieArray) =>{
    const randomMovieIdArray = [];

    while (randomMovieIdArray.length <=5) {
        movieArray.forEach((movie) => {
            let randomMovieIndex = Math.floor(Math.random() * movie.results.length);
            let randomMovie = movie.results[randomMovieIndex];
            let randomMovieId = randomMovie.id;
            if (!randomMovieIdArray.includes(randomMovieId)) {
                randomMovieIdArray.push(randomMovieId)
            }
        })
    }
   
        console.log(randomMovieIdArray);
    return randomMovieIdArray;
}




// Get Movie title and poster url depending on Movie ID

const getMovieDetails = async (randomMovieIdArray) => {

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
        const movieInfoArray = [];
        for (let i = 0; i <= randomMovieIdArray.length - 1; i++) {
            const response = await fetch(`${baseUrl}${randomMovieIdArray[i]}${requiredParams}`, options);
            if (response.ok) {
                let movieInfo = await response.json();
                movieInfoArray.push(movieInfo);
            }
        }
        console.log(movieInfoArray);
        return movieInfoArray;
        
      } catch(err) {
        console.log(err);
      }
}


// Create a field with the added moviePoster url

const createPosterField = (moviePosterUrl) => {
    const posterBaseUrl = 'https://image.tmdb.org/t/p/original/'
    const image = document.createElement('img');
    image.setAttribute("src", `${posterBaseUrl}${moviePosterUrl}`);
    return image;
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


const displayMovie = (movieInfoArray) => {
    
    for (let i = 0; i < 5; i++) {

        let movieTitle = movieInfoArray[i].title;
        let poster = createPosterField(movieInfoArray[i].poster_path);
        let title = createTitleField(movieTitle)

        let movieDiv = document.getElementById(`movie-${i + 1}`);
        movieDiv.appendChild(poster);
        movieDiv.appendChild(title);
    }
}
// A Function which puts all the information together and displays them in the MovieDiv

const getRandomMovie = async () => {

    // Call all Functions which are needed for the movie Data
    const movies = await getMoviesByGenre();
    const randomMovie = randomMovieIds(movies);
    const movieInfo = await getMovieDetails(randomMovie);

    displayMovie(movieInfo);
}

// Function calls 
getGenres().then(createOptionElements);


const findMovieBtn = document.getElementById('submitBtn');

findMovieBtn.addEventListener('click', () => {
    getRandomMovie();
})

// Calls for finding error

// getMoviesByGenre()
// .then(randomMovieIds)
// .then(getMovieDetails)
// .then(displayMovie);
