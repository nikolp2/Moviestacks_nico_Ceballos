const btnFavorites = document.querySelectorAll('.favorites');


let favorites = [];

const updateFavinLocalStorage = () => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

const loadFavoritesFromLocalStorage = () => {
    const storedFavorites = localStorage.getItem('favorites');
    if(storedFavorites){
        favorites = JSON.parse(storedFavorites);
    }

}
