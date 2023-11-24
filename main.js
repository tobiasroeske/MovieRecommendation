

// Get an array of Genres
async function getGenres() {
    const url = 'https://imdb188.p.rapidapi.com/api/v1/getGenres';
    const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '8160cc5193msh097f2bb27e42010p17adf2jsn31db1b563171',
		'X-RapidAPI-Host': 'imdb188.p.rapidapi.com'
	}
    };

    try {
        const response = await fetch(url, options);
            if (response.ok) {
                const jsonResponse = await response.json();
                const genreArray = jsonResponse.data.all_genres;
                return genreArray;
            }
    } catch (error) {
        console.error(error);
    }
}
// Create the option Elements for the Selector Element
const createOptionElements = async (genreArray) => {
    const genreSelector = document.getElementById('genreSelector');
    const genre =  await genreArray.map((item) => {
        let genreItem = document.createElement('option');
        genreItem.setAttribute = ("id", "genreOption");
        genreItem.setAttribute = ("value", item);
        genreItem.innerHTML= item;
        genreSelector.appendChild(genreItem);

    })
    return genre;
}

// Get a random Movie depending on Genre

const GetMoviesByGenre = async () => {
    const url = 'https://imdb8.p.rapidapi.com/title/v2/get-popular-movies-by-genre';
    const genreSelector = document.getElementById('genreSelector');
    const genre = genreSelector.ariaValueMax;
    const requiredParams = `?genre=${genre}&limit=100`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'e8ccc402c3msh3e9dc3e37473cbfp1c12c2jsn6b67c2c0e67c',
		'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
	}
};

try {
	const response = await fetch(`${url}${requiredParams}`, options);
	if (response.ok) {
        const jsonResponse = await response.json();
        const movies = jsonResponse;
        return movies;
    }
} catch (error) {
	console.error(error);
}
}

const randomMovieId = (movies) => {
    const randomMovieIndex = Math.floor(Math.random() * movies.length);
        const randomMovie = movies[randomMovieIndex];
        const randomMovieId = randomMovie.slice(7, randomMovie.length -1);
        console.log(randomMovieId);
        return randomMovieId;
}

// Get Movie title and poster url depending on Movie ID

const getMovieDetails = async (randomMovieId) => {

    const url = 'https://imdb8.p.rapidapi.com/title/get-details';
    const requiredParams =`?tconst=${randomMovieId}`;
    const options = {
	    method: 'GET',
	    headers: {
		'X-RapidAPI-Key': 'e8ccc402c3msh3e9dc3e37473cbfp1c12c2jsn6b67c2c0e67c',
		'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
	    }
    };
    try {
        const response = await fetch(`${url}${requiredParams}`, options);
        if (response.ok) {
            const jsonResponse = await response.json();
            const moviePosterTitle = jsonResponse;
            console.log(moviePosterTitle.title);
            console.log(moviePosterTitle.image.url);
            return moviePosterTitle;
        }
    } catch (error) {
        console.error(error);
    }
}

// get Plot desription based on movie Id

const getMoviePlot = async(randomMovieId) => {

    const url = 'https://imdb8.p.rapidapi.com/title/get-plots';
    const requiredParams =`?tconst=${randomMovieId}`;
    const options = {
	    method: 'GET',
	    headers: {
		    'X-RapidAPI-Key': 'e8ccc402c3msh3e9dc3e37473cbfp1c12c2jsn6b67c2c0e67c',
		    'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
	    }
    };

    try {
        const response = await fetch(`${url}${requiredParams}`, options);
        if (response.ok) {
            const jsonResponse = await response.json();
            const plotDescription = jsonResponse.plots[0].text;
            console.log(plotDescription);
            return plotDescription;
        }
    } catch (error) {
        console.error(error);
    }
}




// Create a field with the added moviePoster url

const createPosterField = (moviePosterUrl) => {

    const imageDiv = document.createElement('div');
    imageDiv.setAttribute("id", "imageDiv");
    imageDiv.innerHTML = `<img src = ${moviePosterUrl}>`
    return imageDiv;
}

// Create a field with the added Movie Title

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


// A Function which puts all the information together and displays them in the MovieDiv

const displayMovieData = async () => {
    
    // The Movie Div where the Poster, Title and Description get added
    const movieDiv = document.getElementById('movieDiv');

    // Call all Functions which are needed for the movie Data
    const movies = await GetMoviesByGenre();
    const randomMovie = randomMovieId(movies);
    const posterTitle = await getMovieDetails(randomMovie);
    const plot = await getMoviePlot(randomMovie)

    // Call the Functions to create the fields and save them to variables
    const poster = createPosterField(posterTitle.image.url);
    const title = createTitleField(posterTitle.title);
    const description = createPlotField(plot);
    const overviewDiv = document.createElement('div');
    overviewDiv.setAttribute("id", "overviewDiv")


    // Append the new fields to the movie Div

    movieDiv.appendChild(poster);
    movieDiv.appendChild(overviewDiv);
    overviewDiv.appendChild(title);
    overviewDiv.appendChild(description);

}

const showMovieBtn = document.getElementById('submitBtn');



// Function calls
getGenres().then(createOptionElements);
showMovieBtn.onclick = displayMovieData;