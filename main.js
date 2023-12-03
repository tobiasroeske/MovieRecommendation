

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
    const genre = genreSelector.value;
    console.log(genre);
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

const createPlotField = (plotDescription, movieNum) => {

    const plotField = document.createElement('p');
    plotField.setAttribute("id", `plotfield-${movieNum}`);
    plotField.innerHTML = plotDescription;
    plotField.style.display = 'none';
    return plotField;
}
// Click on movie should give out additional information like release date, runtime and plot description
const createAdditionalInfo = (releaseDate, runtime, movieNum) => {

    const additionalInfoField = document.createElement('div');
    additionalInfoField.setAttribute("id", `additionalInfo-${movieNum}`);
    additionalInfoField.innerHTML = `<p>Release Date: ${releaseDate}</p><br><p>Runtime: ${runtime} min</p>`;
    additionalInfoField.style.display = 'none';
    return additionalInfoField;
}


const displayMovie = (movieInfoArray) => {
    const mainMovieDiv = document.getElementById('movieDiv');
    for (let i = 0; i < 5; i++) {

        let movieTitle = movieInfoArray[i].title;
        let poster = createPosterField(movieInfoArray[i].poster_path);
        let title = createTitleField(movieTitle)
        let plotDescription = createPlotField(movieInfoArray[i].overview, [i+1]);
        let additionalInfo = createAdditionalInfo(movieInfoArray[i].release_date, movieInfoArray[i].runtime, [i+1]);

        let movieDiv = document.getElementById(`movie-${i + 1}`);
        movieDiv.appendChild(poster);
        movieDiv.appendChild(title);
        movieDiv.appendChild(plotDescription);
        movieDiv.appendChild(additionalInfo);

    }
    mainMovieDiv.style.display = 'grid';
}
// A function which desplays the extra Info of the movie. It is later used in an eventlistener
const toggleAdditionalInfo = (movieNum) => {
    const plot = document.getElementById(`plotfield-${movieNum}`);
    const additionalInfo = document.getElementById(`additionalInfo-${movieNum}`);
    if (plot.style.display === 'none') {
        plot.style.display = 'block';
        additionalInfo.style.display = 'block';
    } else {
        plot.style.display = 'none';
        additionalInfo.style.display = 'none';
    }
        
}
// A Function which hides the extra Info for each movie
const hideAdditionalInfo = (movieNum) => {
    const plot = document.getElementById(`plotfield-${movieNum}`);
    const additionalInfo = document.getElementById(`additionalInfo-${movieNum}`);

    plot.style.display = 'none';
    additionalInfo.style.display = 'none';

}

// Clears display before calling all the other functions
const clearDisplay = () => {
    const mainMovieDiv = document.getElementById('movieDiv');
    mainMovieDiv.style.display =  'none';
    for (let i = 1; i <= 5; i++) {
        let movieDiv = document.getElementById(`movie-${i}`);
        movieDiv.innerHTML = "";
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

// Add event Listeners
const addEventListeners = () => {

    // Click event for the search button
    const findMovieBtn = document.getElementById('submitBtn');
    findMovieBtn.addEventListener('click', () => {
    clearDisplay();
    getRandomMovie();
})
    // click events for the movie

    const movie1 = document.getElementById('movie-1');
    const movie2 = document.getElementById('movie-2');
    const movie3 = document.getElementById('movie-3');
    const movie4 = document.getElementById('movie-4');
    const movie5 = document.getElementById('movie-5');

    // Need better logic!!!

    movie1.addEventListener('click', () => {
        toggleAdditionalInfo(1);
    });

    movie2.addEventListener('click', () => {
        toggleAdditionalInfo(2);
    });
    
    movie3.addEventListener('click', () => {
        toggleAdditionalInfo(3);
    });

    movie4.addEventListener('click', () => {
        toggleAdditionalInfo(4);
    });

    movie5.addEventListener('click', () => {
        toggleAdditionalInfo(5);
    });
    }


    


// Function calls 
getGenres().then(createOptionElements);
addEventListeners();


// Calls for finding error

// getMoviesByGenre()
// .then(randomMovieIds)
// .then(getMovieDetails)
// .then(displayMovie);
