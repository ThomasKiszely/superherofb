const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');
const { validateFavorite } = require('../middleware/middlewares');


router.get('/', favoriteController.getFavorites);
router.post('/', validateFavorite, favoriteController.createFavoriteController);
router.delete('/:id', favoriteController.deleteFavoriteController);


module.exports = router;