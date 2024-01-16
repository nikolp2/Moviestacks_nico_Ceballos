const imageSlot = document.getElementById("imageSlot")
const detailSlot = document.getElementById("detailSlot")
const moneySlot = document.getElementById("moneySlot")
const statusSlot = document.getElementById("statusSlot")

const queryParams = new URLSearchParams(window.location.search);

const id = queryParams.get("id")

const movie = movies.find(movie => movie.id == id)

console.log(movies)

imageSlot.innerHTML = `<img src="${movie.image}" alt="${movie.title}">`

detailSlot.innerHTML = `
        <h2 class=" text-3xl">${movie.title}</h2>;
        <p class="italic">${movie.tagline}</p>
        <p>${movie.genres}</p>
        <p>${movie.overview}</p>
`

statusSlot.innerHTML = `
        <table class="border-slate-50">
            <tr>
                <td>Original Language</td>
                <td>${movie.original_language}</td>
            </tr>
            <tr>
                <td>Release Date</td>
                <td>${movie.release_date}</td>
            </tr>
            <tr>
                <td>Runtime</td>
                <td>${movie.runtime}</td>
            </tr>
            <tr>
                <td>Status</td>
                <td>${movie.status}</td>
            </tr>
        </table>    
`

moneySlot.innerHTML = `
        <table>
            <tr>
                <td>Vote Average</td>
                <td>${movie.vote_average}</td>
            </tr>
            <tr>
                <td>Budget</td>
                <td>$ ${movie.budget.toLocaleString('en-US')}</td>
            </tr>
            <tr>
                <td>revenue</td>
                <td>$ ${movie.revenue.toLocaleString('en-US')}</td>
            </tr>
        </table>
`