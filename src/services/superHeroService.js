const superHeroRepo = require('../data/superHeroRepo')


async function getAllSuperHeroes() {
    try {
        const superHeroes = await superHeroRepo.fetchSuperHeroes();
        return superHeroes;
    } catch (error){
        console.log('Fejl ved hentning af superhelte i service');
        throw error;
    }
}

async function getSuperHeroByID(id) {
    try {
        const superHero = await superHeroRepo.fetchSuperHeroesId(id);
        return superHero;
    } catch (error) {
        console.log('Fejl i service ved hentning af 1 superhelt');
        throw error;
    }
}

module.exports = { getAllSuperHeroes, getSuperHeroByID };