const express = require('express');
const router = express.Router();
const superHeroController = require('../controllers/superHeroController');

router.get('/', superHeroController.getAllSuperHeroesController);
router.get('/:id', superHeroController.getSuperHeroByIdController);


module.exports = router;