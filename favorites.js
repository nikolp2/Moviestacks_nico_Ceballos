const url = "https://moviestack.onrender.com/api/movies";

const api = "0ff70d54-dc0b-4262-9c3d-776cb0f34dbd";

const init = {
  headers: {
    "x-api-key": api,
  },
};

fetch(url, init)
  .then((response) => response.json())
  .then((data) => {
    const movies = data.movies.filter((movie) => movie != null);
    console.log(movies);

    const favConteiner = document.getElementById("favConteiner");

    const favouritesLocal = JSON.parse(localStorage.getItem("movies")) || [];

    function createCard(movie) {
      return `
      <div class="card border-slate-100 w-40 p-1 overflow-auto text-'read more' h-64 flex-col justify-between">
        <img src="https://moviestack.onrender.com/static/${movie.image}" class="card-img" alt="">
        <div class="card-body align-center justify-center">
          <h5 class="card-title my-3 text-center text-lg font-semibold">${movie.title}</h5>
          <p class="italic footerText my-4 justify-center">${movie.tagline}</p>
          <button data-movie-id="${movie.id}" class="fav btn align-center justify-center m-6 text-red-500" type="button">fav</button>
          <a class="btn align-center justify-center m-6" href="./description.html?id=${movie.id}"><button type="button">Read more</button></a>
        </div>          
      </div>
    `;
    }

    renderCards(movies);
    function renderCards(filteredMovies) {
      let savedMovies = "";
      favConteiner.innerHTML = "";
      filteredMovies.forEach((movie) => {
        favouritesLocal.forEach((fav) => {
          if (movie.id == fav) {
            savedMovies += createCard(movie);
          }
        });
      });
    //   console.log(savedMovies);
      favConteiner.innerHTML = savedMovies;
    }

    // favConteiner.addEventListener("click", (e) => {
    //     if (e.target.id != "") {
    //         favouritesLocal = favouritesLocal.filter(movie => movie.id != e.target.id)
    //         localStorage.setItem("favourites", JSON.stringify(favouritesLocal))

    //     }
    // })
  })
  .catch((error) => console.error(error));
