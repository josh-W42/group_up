const express = require('express');
const router = express.Router();
const db = require('../models');

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

module.exports = router;