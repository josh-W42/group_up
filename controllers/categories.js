const express = require('express');
const router = express.Router();
const db = require('../models');


// basic /categories route
router.get('/', (req, res) => {
    db.category.findAll().then(categories => {
        res.render('./categories/', { categories });
    }).catch(error => {
        console.log('###### \nError\n');
        console.log(error);
        console.log('###### \nEnd\n')
        res.status(400).redirect('/error');
    });
});

// /categories/id - show route
router.get('/:id', (req, res) => {
    db.category.findOne({
        where: {id: req.params.id},
        include: [db.room]
    }).then(category => {
        res.render('./categories/show', { category });
    }).catch(error => {
        console.log('###### \nError\n');
        console.log(error);
        console.log('###### \nEnd\n')
        res.status(400).redirect('/error');
    });
});

module.exports = router;