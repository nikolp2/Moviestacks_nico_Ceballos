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
              <a class="btn inline flex align-center justify-center m-6" href="./description.html?id=${movie.id}"><button type="button">Read more</button></a>
              <div class="container-buttons-card">
								<button class="favorite">
									<i
										class="fa-regular fa-heart"
										id="favorite-regular"
									></i>
									<i
										class="fa-solid fa-heart"
										id="added-favorite"
									></i>
								</button>
              </div>
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
      function getList(movies) {
        const moviesList = data.movies

      }
      
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
        const filteredMovies = filterByName(movies, getList);
        renderCards(filteredMovies);
      });
      function filterByName(movies, getList) {
        return movies.filter(movie => movie.title.toLowerCase().includes(getList.value.toLowerCase()));
      }
      //--------------------------------------
      
    })

    .catch((error) => console.error(error));
//--------------------------------------










