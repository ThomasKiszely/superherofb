const superHeroService = require('../services/superHeroService');

async function getAllSuperHeroesController(req, res, next) {
    try {
        const superHeroes = await superHeroService.getAllSuperHeroes();
        res.status(200).json(superHeroes);
    } catch (error){
        console.error('Fejl i controller ved hentning af superhelte');
        next(error);
    }
}

async function getSuperHeroByIdController(req, res, next) {
    try {
        const superHeroId = req.params.id;
        const superHero = await superHeroService.getSuperHeroByID(superHeroId);
        res.status(200).json(superHero);
    } catch (error){
        console.error('Fejl i controller ved hentning af 1 superhelt');
        next(error);
    }
}


module.exports = {
    getAllSuperHeroesController,
    getSuperHeroByIdController,
}