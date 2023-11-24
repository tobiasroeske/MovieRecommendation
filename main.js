

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
    const genres =  await genreArray.map((item) => {
        let genreItem = document.createElement('option');
        genreItem.setAttribute = ('id', 'genreOption');
        genreItem.setAttribute = ('value', item);
        genreItem.innerHTML= item;
        genreSelector.appendChild(genreItem);

    })
    return genres;
}


getGenres().then(createOptionElements);

