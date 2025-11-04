const favoriteRepo = require('../data/favoriteRepo');
const superHeroRepo = require('../data/superHeroRepo');

async function getAllFavorites() {
    try{
        const favoritesRaw = await favoriteRepo.getFavorites();
        console.log(favoritesRaw);
        const favorites = favoritesRaw.map(i => i.id);
        console.log(favorites);
        const superHeroes = await Promise.all(
            favorites.map(id => superHeroRepo.fetchSuperHeroesId(id))
        );
        const favoritesWithNote = superHeroes.map((hero, index) => ({
            ...hero,
                note: favoritesRaw[index].note,
        }));

        return favoritesWithNote;
    } catch (error){
        console.log('Fejl ved hentning af favoritter i service');
        throw error;
    }
}
async function addFavorite(id, note) {
    try {
        return favoriteRepo.addFavorite(id, note);
    } catch (error) {
        console.log('Fejl ved at tilføje favoritter i service');
        throw error;
    }
}
async function deleteFavorite(id) {
    try {
        return favoriteRepo.deleteFavorite(id);
    } catch (error) {
        console.log('Fejl ved sletning af favorite i service');
        throw error;
    }
}

module.exports = { getAllFavorites, addFavorite, deleteFavorite };