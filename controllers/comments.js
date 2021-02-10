const express = require('express');
const router = express.Router();
const db = require('../models');

const axios = require('axios');

// Post route for creating new comments
router.post('/:roomId', async(req, res) => {
    try {
        await db.comment.create({
            poster: req.body.poster,
            content: req.body.content,
            roomId: req.params.roomId
        });
        res.redirect(`/rooms/${req.params.roomId}`);
    } catch (error) {
        console.log('###### \nError\n');
        console.log(error);
        console.log('###### \nEnd\n')
        res.status(400).redirect('/error');
    };
});

// Get a random pokemon, for fun!
router.get('/:roomId/pokemon', async(req, res) => {
    try {
        const randomPoke = Math.floor(Math.random() * 150) + 1;
        const pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${randomPoke}`;
        const apiResponse = await axios.get(pokemonUrl);
        let pokemon = apiResponse.data;
        await db.comment.create({
          poster: "PokeBot",
          content: `A Wild ${pokemon.name} has appeared!`,
          roomId: req.params.roomId
        });
        res.redirect(`/rooms/${req.params.roomId}`);
    } catch (error) {
        console.log('###### \nError\n');
        console.log(error);
        console.log('###### \nEnd\n')
        res.status(400).redirect('/error');
    }
});

module.exports = router;