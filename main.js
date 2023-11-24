

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
        genreItem.setAttribute = ('id', 'genreOption');
        genreItem.setAttribute = ('value', item);
        genreItem.innerHTML= item;
        genreSelector.appendChild(genreItem);

    })
    return genre;
}

// Get a random Movie depending on Genre

const randomMovieByGenre = async () => {
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
        const randomMovieIndex = Math.floor(Math.random() * jsonResponse.length);
        const randomMovie = jsonResponse[randomMovieIndex];
        const randomMovieId = randomMovie.slice(7, randomMovie.length -1);
        console.log(randomMovieId);
        return randomMovieId;
    }
} catch (error) {
	console.error(error);
}
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
        const movieTitle = jsonResponse.title;
        console.log(movieTitle);
        const moviePosterUrl = jsonResponse.image.url;
        console.log(moviePosterUrl);
        return randomMovieId;
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
    }
} catch (error) {
	console.error(error);
}
}


getGenres().then(createOptionElements);
randomMovieByGenre().then(getMovieDetails)
.then(getMoviePlot);


