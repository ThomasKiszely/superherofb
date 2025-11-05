const Favorite = require('../models/Favorite');

async function addFavorite(id, note) {
    try{
        const existing = await Favorite.findOne({ id });
        if(existing) return existing;
        const newFavorite = new Favorite({id, note});
        return await newFavorite.save();
    } catch (error) {
        throw error;
    }
}

async function getFavorites(){
    try {
        return Favorite.find({});
    } catch (error) {
        throw error;
    }
}
async function deleteFavorite(id){
    try {
        return await Favorite.findOneAndDelete({id});
    } catch (error) {
        throw error;
    }
}

module.exports = {
    addFavorite,
    getFavorites,
    deleteFavorite,
}