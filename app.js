let cards = document.getElementById('cardConteiner');
movies.map((x) => {
    cardConteiner.innerHTML += `
      <div>
        <div class="card border-slate-100 w-40 p-1 overflow-auto text-'read more' h-64">
          <img src="${x.image}" class="card-img" alt="">
          <div class="card-body">
            <h5 class="card-title my-3 text-center text-lg font-semibold">${x.title}</h5>
            <p class="card-text italic">${x.overview}</p>
          </div>
        </div>
      </div>
    `;
  });
