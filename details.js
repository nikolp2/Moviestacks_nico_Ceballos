const imageSlot = document.getElementById("imageSlot")
const detailSlot = document.getElementById("detailSlot")
const moneySlot = document.getElementById("moneySlot")
const statusSlot = document.getElementById("statusSlot")

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

  const queryParams = new URLSearchParams(window.location.search);
  
  const id = queryParams.get("id")
  
  const movieId = movies.find(movie => movie.id == id)
  

  imageSlot.innerHTML = `<img src="https://moviestack.onrender.com/static/${movieId.image}" alt="${movieId.title}">`
  
  detailSlot.innerHTML = `
          <h2 class="mb-3 text-3xl">${movieId.title}</h2>
          <p class="mb-3 italic">${movieId.tagline}</p>
          <p class="mb-3">${movieId.genres}</p>
          <p>${movieId.overview}</p>
  `
  
  statusSlot.innerHTML = `
          <table class="justify-center w-full">
              <tr class="border">
                  <td class="border">Original Language</td>
                  <td class="border">${movieId.original_language}</td>
              </tr>
              <tr class="border">
                  <td>Release Date</td>
                  <td>${movieId.release_date}</td>
              </tr>
              <tr class="border">
                  <td>Runtime</td>
                  <td>${movieId.runtime}</td>
              </tr>
              <tr class="border">
                  <td>Status</td>
                  <td>${movieId.status}</td>
              </tr>
          </table>    
  `
  
  moneySlot.innerHTML = `
          <table class="justify-center w-full">
              <tr class="border">
                  <td>Vote Average</td>
                  <td>${movieId.vote_average}</td>
              </tr>
              <tr class="border">
                  <td>Budget</td>
                  <td>$ ${movieId.budget.toLocaleString('en-US')}</td>
              </tr>
              <tr class="border">
                  <td>revenue</td>
                  <td>$ ${movieId.revenue.toLocaleString('en-US')}</td>
              </tr>
          </table>
  `



})

.catch((error) => console.error(error));




