const { errorHandler } = require('./errorHandler');
const { notFound } = require('./notFound');
const { validateFavorite } = require('./favoriteValidator');

module.exports = {
    errorHandler,
    notFound,
    validateFavorite,
}