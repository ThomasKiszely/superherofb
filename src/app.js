const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path');
const router = require('./routes/superHeroRoutes');
const favoriteRouter = require('./routes/favoriteRoutes');
const { connectToDatabase } = require('./services/db');
connectToDatabase();

const { notFound, errorHandler } = require('./middleware/middlewares');
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..','public')));



app.use('/superheroes', router);
app.use('/favorites', favoriteRouter);


app.use(notFound);
app.use(errorHandler);


module.exports = app;