

// Get an array of Genres and append them to the select element
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
                genreArray.map((item) => {
                    const genreItem = document.createElement('option');
                    genreItem.innerHTML = item;
                    genreSelector.appendChild(genreItem);
                });
            }
    } catch (error) {
        console.error(error);
    }
}
getGenres();



