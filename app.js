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
  const movies = data.movies
  console.log(movies)

  //card creator

  function createCard(movie, isOnlocalStorage) {
        if (isOnlocalStorage) {
          return `
          <div class="card border-slate-100 overflow-auto text-'read more'  flex-col justify-between">
            <img src="https://moviestack.onrender.com/static/${movie.image}" class="card-img" alt="">
            <div class="card-body align-center justify-center">
              <h5 class="card-title my-3 text-center text-lg font-semibold p-3">${movie.title}</h5>
              <p class="italic footerText my-4 justify-center">${movie.tagline}</p>
              <button data-movie-id="${movie.id}" class="fav btn align-center justify-center m-6 text-red-500" type="button">favourites</button>
              <a class="btn align-center justify-center m-6" href="./description.html?id=${movie.id}"><button type="button">Read more</button></a>
            </div>          
          </div>
        `;
        } else {
          return `
          <div class="card border-slate-100  p-1 overflow-auto text-'read more'  flex-col justify-between">
            <img src="https://moviestack.onrender.com/static/${movie.image}" class="card-img" alt="">
            <div class="card-body align-center justify-center">
              <h5 class="card-title flex my-3 text-center text-lg font-semibold">${movie.title}</h5>
              <p class="italic footerText my-4 justify-center">${movie.tagline}</p>
              <button data-movie-id="${movie.id}" class="fav btn align-center justify-center m-6" type="button">favourites</button>
              <a class="btn align-center justify-center m-6" href="./description.html?id=${movie.id}"><button type="button">Read more</button></a>
            </div>          
          </div>
        `
          
        }
      }
      
      renderCards(movies);
      function renderCards(filteredMovies) {
        let savedMovies = '';
        cards.innerHTML = '';
        const favouritesLocal = JSON.parse(localStorage.getItem('movies')) || [];

        let isOnlocalStorage = false;
        filteredMovies.forEach(movie => {          
          favouritesLocal.forEach(fav =>{
            if(movie.id == fav){
              isOnlocalStorage = true;
              savedMovies += createCard(movie, isOnlocalStorage);
              isOnlocalStorage = false;
            }
          })
          if(!savedMovies.includes(movie.id)){
            savedMovies += createCard(movie, isOnlocalStorage)            
          }
        });
        cards.innerHTML += savedMovies
      }
      //--------------------------------------

      
      //genre search
      genreFilter.addEventListener('change', function() {        
        let filteredMovies = filterByGenres(movies, genreFilter);
         
       
        renderCards(filterByName(filteredMovies, getList));
        
      });
      function filterByGenres(movies, selectedGenre){
        const genre = selectedGenre.value;
        let filteredMovies;

        
        
        if (genre == 'All') {
          filteredMovies = movies;
        } else {
          filteredMovies = movies.filter(movie => movie.genres.includes(genre));
        }

        return filteredMovies;
        
      }
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
      
      //---------------------------------------
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
           
      cards.addEventListener('click', function(event) {
        const favButton = event.target;
        const movieId = favButton.dataset.movieId;
        const favourites = JSON.parse(localStorage.getItem('movies')) || [];

        if (favButton.classList.contains('fav')) {  

          if(!favourites.includes(movieId)){
            favourites.push(movieId);
            localStorage.setItem('movies', JSON.stringify(favourites));
            return favButton.classList.toggle('text-red-500');

          } else if(favourites.includes(movieId)) {
            let unfav = [];

            favourites.forEach(fav => {
              if(fav != movieId){
                unfav.push(fav);
              }
            });
            localStorage.setItem('movies', JSON.stringify(unfav))
            return favButton.classList.toggle('text-red-500');
            
          }         
        }
      })
    })
    .catch((error) => console.error(error));
//--------------------------------------










