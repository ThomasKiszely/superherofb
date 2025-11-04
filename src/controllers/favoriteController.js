const favoriteService = require('../services/favoriteService');


async function getFavorites(req, res, next) {
    try {
        const favorites = await favoriteService.getAllFavorites();
        return res.status(200).json(favorites);
    }
    catch (error) {
        console.log('Fejl i controller ved hentning af favoritter');
        next(error);
    }
}

async function createFavoriteController(req, res, next) {
    try {
        const id = Number(req.body.id);
        const note = req.body.note;
        const newFavorite = await favoriteService.addFavorite(id, note);
        res.status(201).json(newFavorite);
    } catch (error) {
        console.log('Fejl i controller createFavoriteController', error);
        next(error);
    }
}

async function deleteFavoriteController(req, res, next) {
    try {
        const id = Number(req.params.id);
        const deletedFavorite = await favoriteService.deleteFavorite(Number(id));
        if (!deletedFavorite) {
            return res.status(404).json({ error: 'Favorite not found' });
        }
        res.status(200).json(deletedFavorite);
    } catch (error) {
        console.log('Fejl i controller deleteFavoriteController', error);
        next(error);
    }
}

module.exports = {
    getFavorites,
    createFavoriteController,
    deleteFavoriteController,

};