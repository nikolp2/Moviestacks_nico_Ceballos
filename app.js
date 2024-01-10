const cards = document.getElementById('cardConteiner');
const getList = document.getElementById('inputSearch')
const genreFilter = document.getElementById('genres')

function createCard(movie) {
  return `
    <div class="card border-slate-100 w-40 p-1 overflow-auto text-'read more' h-64 flex-col justify-between">
      <img src="${movie.image}" class="card-img" alt="">
      <div class="card-body align-center justify-center">
        <h5 class="card-title my-3 text-center text-lg font-semibold">${movie.title}</h5>
        <p class="italic footerText my-4 justify-center">${movie.tagline}</p>
        <a class="btn align-center justify-center m-6" href="./description.html?id=${movie.id}"><button type="button">Read more</button></a>
      </div>          
    </div>
  `;
}

//card creator
renderCards(movies);
function renderCards(filteredMovies) {
  cards.innerHTML = '';
  filteredMovies.forEach(movie => {
    cards.innerHTML += createCard(movie);
  });
}
//--------------------------------------


//genre search
genres.addEventListener('change', function() {
  const selectedGenre = genres.value;
  let filteredMovies;

  if (selectedGenre == 'All') {
    filteredMovies = movies;
  } else {
    filteredMovies = movies.filter(movie => movie.genres.includes(selectedGenre));
  }

  renderCards(filteredMovies);
});
//--------------------------------------




//list creator
const genresList = getGenres(movies);

genreFilter.innerHTML = genresList.reduce((accumulator, genre)=> accumulator += createGenres(genre), '<option selected>All</option>');
function createGenres(genre) {
  return `<option value="${genre}">${genre}</option>`
}
//--------------------------------------



//input search
getList.addEventListener('input', () => {
  const selectedInput = filterList(movies, getList.value);
  if (filterList == "") {    
    renderCards(movies);
  } else {
    renderCards(selectedInput);
  }
})

function filterList(movies, query){
  movies.filter( (movie) => {
    return movie.title.toLowerCase().includes(query.toLowerCase())
  })
}
//--------------------------------------



function getGenres(movies) {
  const moviesGenres = movies
  .map(movie => movie.genres)
  .flat()
  .filter((genre, index, genres) => genres.indexOf(genre) == index);
  return moviesGenres    
}
