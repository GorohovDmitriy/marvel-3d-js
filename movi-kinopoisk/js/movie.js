const API_KEY = 'd08ce756-ce20-4c47-b6a1-2bd86e1373fd'
const API_URL =
	'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1'
const API_URL_SEARCH =
	'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword='

getMovies(API_URL)
async function getMovies(url) {
	const response = await fetch(url, {
		headers: {
			'Content-Type': 'aplication/json',
			'X-API-KEY': API_KEY,
		},
	})
	const responseData = await response.json()
	showMovies(responseData)
	console.log(responseData)
}

function getClassByRate(number) {
	if (number >= 7) {
		return 'green'
	} else if (number > 5) {
		return 'orange'
	} else {
		return 'red'
	}
}

function showMovies(data) {
	const moviesEl = document.querySelector('.movies')


	document.querySelector('.movies').innerHTML = ''

	data.films.forEach((movie) => {
		const movieEl = document.createElement('div')
		movieEl.classList.add('movie')
		movieEl.innerHTML = `
			<div class="movie__cover-inner">
						<img
							class="movie__cover"
							src='${movie.posterUrlPreview}'
							alt="${movie.nameRu}"
						/>
						<div class="movie__cover--darkened"></div>
					</div>
					<div class="movie__info">
						<div class="movie__title">${movie.nameRu}</div>
						<div class="movie__category">${movie.genres.map((genre) => ` ${genre.genre} `)}</div>
						<div class="movie__average movie__average--${getClassByRate(movie.rating)}">${movie.rating}</div>
					</div>
		`
		moviesEl.appendChild(movieEl)
	})
}
const form = document.querySelector('form')
const search = document.querySelector('.header__search')

form.addEventListener('submit', (e) => {
	e.preventDefault()

	const apiSearchUrl = `${API_URL_SEARCH}${search.value}`
	if (search.value) {
		getMovies(apiSearchUrl)

		search.value = ''
	}
})
