const axios = require('axios');
const SuperHero = require('../models/SuperHero');

const fetchSuperHeroes = async () => {
   try {
       const response = await axios.get('https://akabab.github.io/superhero-api/api/all.json');
       const data = response.data;
       return data.map(hero => new SuperHero({
           id: hero.id,
           name: hero.name,
           fullName: hero.biography.fullName,
           strength: hero.powerstats.strength,
           image: hero.images.md
       }));
   } catch (error) {
       throw error;
   }
};

const fetchSuperHeroesId = async(shId) => {
    try {
        const response = await axios.get(`https://akabab.github.io/superhero-api/api/id/${shId}.json`);
        const data = response.data;
        return new SuperHero({
            id: data.id,
            name: data.name,
            fullName: data.biography.fullName,
            strength: data.powerstats.strength,
            image: data.images.md
        });
    } catch (error) {
        throw error;
    }
};

module.exports = {
    fetchSuperHeroes,
    fetchSuperHeroesId,
};
