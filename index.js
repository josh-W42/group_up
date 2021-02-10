// Envirnment
require('dotenv').config();

// Express
const express = require('express');
const app = express();
const controllers = require('./controllers');
const ejsLayouts = require('express-ejs-layouts');

// MIDDLEWARE
app.set('view engine', 'ejs');
app.use(require('morgan')('dev'));
app.use(ejsLayouts);
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public/'));

// Home route
app.get('/', (req, res) => {
    res.send('Basic route setup');
});

app.use('/rooms', controllers.rooms);
app.use('/categories', controllers.categories);

// Listen
let PORT = process.env.PORT || 8000;
let server = app.listen(PORT, () => {
    console.log('Group-up Server running on: ', PORT)
});

module.exports = server;