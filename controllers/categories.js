const express = require('express');
const router = express.Router();
const db = require('../models');


// basic /categories route
router.get('/', async(req, res) => {
    try {
        const categories = await db.category.findAll();
        res.render('./categories/', { categories });
    } catch (error) {
        console.log('###### \nError\n');
        console.log(error);
        console.log('###### \nEnd\n')
        res.status(400).redirect('/error');
    }
});

// /categories/id - show route
router.get('/:id', async(req, res) => {

    try {
        const category = await db.category.findOne({
            where: {id: req.params.id},
            include: [db.room]
        });
        res.render('./categories/show', { category });
    } catch (error) {
        console.log('###### \nError\n');
        console.log(error);
        console.log('###### \nEnd\n')
        res.status(400).redirect('/error');
    }
});

module.exports = router;