// Envirnment
require('dotenv').config();

// Express
const express = require('express');
const app = express();
const controllers = require('./controllers');
const ejsLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');

// MIDDLEWARE
app.set('view engine', 'ejs');
app.use(require('morgan')('dev'));
app.use(ejsLayouts);
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public/'));
app.use(methodOverride('_method'));

// Home route
app.get('/', (req, res) => {
    res.redirect('/rooms');
});

// error route
app.get('/error', (req, res) => {
    res.render('./main/error');
});

app.use('/rooms', controllers.rooms);
app.use('/categories', controllers.categories);
app.use('/comments', controllers.comments);

app.get('*', (req, res) => {
    res.status(404).render('./main/error');
});

// Listen
let PORT = process.env.PORT || 8000;
let server = app.listen(PORT, () => {
    console.log('Group-up Server running on: ', PORT)
});

module.exports = server;