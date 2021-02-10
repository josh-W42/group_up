const express = require('express');
const router = express.Router();
const db = require('../models');

const multer = require('multer');
const uploads = multer({ dest: './uploads' });
const cloudinary = require('cloudinary');

// Main GET route /rooms - Pulls up all rooms
router.get('/', (req, res) => {
    db.room.findAll({
        include: [db.category]
    }).then(results => {
        let rooms = results;
        res.render('./rooms/', { rooms });
    }).catch(error => {
        console.log('###### \nError\n');
        console.log(error);
        console.log('###### \nEnd\n')
        res.status(400).redirect('/error');
    });
});

// GET route /rooms/new - Pulls up form to make new room.
router.get('/new', (req, res) => {
    db.category.findAll().then(results => {
        const categories = results;
        res.render('./rooms/new', { categories });
    });
});

// POST route to add new room + upload img to cloudinary.
router.post('/', uploads.single('image'), (req, res) => {
    let image = req.file.path;

    cloudinary.uploader.upload(image, (result) => {
        db.room.create({
            name: req.body.name,
            description: req.body.description,
            imageUrl: result.secure_url
        }).then(room => {
            room.addCategory(req.body.category);
            res.redirect('/rooms');
        }).catch(error => {
            console.log('###### \nError\n');
            console.log(error);
            console.log('###### \nEnd\n')
            res.status(400).redirect('/error');
        });
    });

});



module.exports = router;