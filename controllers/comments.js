const express = require('express');
const router = express.Router();
const db = require('../models');

const axios = require('axios');

// Post route for creating new comments
router.post('/:roomId', (req, res) => {
    db.comment.create({
        poster: req.body.poster,
        content: req.body.content,
        roomId: req.params.roomId
    }).then(newComment => {
        res.redirect(`/rooms/${req.params.roomId}`);
    }).catch(error => {
        console.log('###### \nError\n');
        console.log(error);
        console.log('###### \nEnd\n')
        res.status(400).redirect('/error');
    });
});

// Get a random pokemon, for fun!
router.get('/:roomId/pokemon', (req, res) => {
    const randomPoke = Math.floor(Math.random() * 150) + 1;
    let pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${randomPoke}`;
    axios.get(pokemonUrl).then( function(apiResponse) {
      let pokemon = apiResponse.data;

      db.comment.create({
        poster: "PokeBot",
        content: `A Wild ${pokemon.name} has appeared!`,
        roomId: req.params.roomId
      }).then(newComment => {
          res.redirect(`/rooms/${req.params.roomId}`);
      }).catch(error => {
        console.log('###### \nError\n');
        console.log(error);
        console.log('###### \nEnd\n')
        res.status(400).redirect('/error');
      });
    });

    db.room.findByPk(req.params.roomId, { include: [db.comment] }).then(room => {
        // Use request to call the API
    });

});

module.exports = router;