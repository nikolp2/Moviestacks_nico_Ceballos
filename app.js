const cards = document.getElementById('cardConteiner');
const getList = document.getElementById('inputSearch')
const genreFilter = document.getElementById('genres')


// fetch moviestacks API
const url = 'https://moviestack.onrender.com/api/movies';

const api = '0ff70d54-dc0b-4262-9c3d-776cb0f34dbd';

const init = {
    headers: {
        "x-api-key": api
    }
}

fetch(url, init)
.then((response) => response.json())
.then((data) => {
  const movies = data.movies.filter((movie)=> movie != null)
  console.log(movies)

  //card creator

  function createCard(movie) {
        return `
          <div class="card border-slate-100 w-40 p-1 overflow-auto text-'read more' h-64 flex-col justify-between">
            <img src="https://moviestack.onrender.com/static/${movie.image}" class="card-img" alt="">
            <div class="card-body align-center justify-center">
              <h5 class="card-title my-3 text-center text-lg font-semibold">${movie.title}</h5>
              <p class="italic footerText my-4 justify-center">${movie.tagline}</p>
              <button data-movie-id="${movie.id}" class="fav btn align-center justify-center m-6" type="button">fav</button>
              <a class="btn align-center justify-center m-6" href="./description.html?id=${movie.id}"><button type="button">Read more</button></a>
            </div>          
          </div>
        `;
      }
      
      renderCards(movies);
      function renderCards(filteredMovies) {
        cards.innerHTML = '';
        filteredMovies.forEach(movie => {
          cards.innerHTML += createCard(movie);
        });
      }
      //--------------------------------------

      
      //genre search
      genreFilter.addEventListener('change', function() {
        
        const filteredMovies = filterByGenres(movies, genreFilter);
        renderCards(filterByName(filteredMovies, getList));
      });
      function filterByGenres(selectedGenre){
        const genre = selectedGenre.value
        let filteredMovies;
        
        if (selectedGenre == 'All') {
          filteredMovies = movies;
        } else {
          filteredMovies = movies.filter(movie => movie.genres.includes(selectedGenre));
        }

        return filteredMovies;
      }
      //--------------------------------------    
      
      //list creator
      const genresArray = getGenres(movies);
      
      genresArray.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre;
        option.textContent = genre;
        genres.appendChild(option);
      })      
      function getGenres(movies) {
        const moviesGenres = data.movies
        .map(movie => movie.genres)
        .flat()
        .filter((genre, index, genres) => genres.indexOf(genre) == index);
        return moviesGenres    
      }
      console.log(getGenres(movies))
      //--------------------------------------
      
      
      
      //input search
      getList.addEventListener('input', function() {
        const filteredMovies = filterByGenres(movies, genreFilter);
        renderCards(filterByName(filteredMovies, getList));
      });
      function filterByName(movies, getList) {
        const textInput = getList.value;
        if(!textInput){
          return movies;
        }
        return movies.filter(movie => movie.title.toLowerCase().includes(textInput.toLowerCase()));
      }
      //--------------------------------------

      
      cards.addEventListener('click', function(e) {
        const movieId = e.target.dataset.movieId
        const favourites = JSON.parse(localStorage.getItem('movies')) || [];
        if (e.target.classList.contains('fav')) {          
          if(!favourites.includes(movieId)){
            favourites.push(movieId);
            e.target.classList.toggle('text-red-500');
            return localStorage.setItem('movies', JSON.stringify(favourites));
          }
          
          
        }
      })

      //crossfilter



    })
    .catch((error) => console.error(error));
//--------------------------------------










