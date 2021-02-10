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
    }).catch(error => {
        console.log('###### \nError\n');
        console.log(error);
        console.log('###### \nEnd\n')
        res.status(400).redirect('/error');
    });
});

// GET /rooms/id - show one route
router.get('/:id', (req, res) => {
    db.room.findOne({
        where: {id: req.params.id},
        include: [db.comment]
    }).then(room => {
        res.render('./rooms/show', { room });
    }).catch(error => {
        console.log('###### \nError\n');
        console.log(error);
        console.log('###### \nEnd\n')
        res.status(404).redirect('/error');
    });
});

// GET /rooms/edit/id - edit a room
router.get('/edit/:id', (req, res) => {
    db.room.findOne({
        where: {id: req.params.id}
    }).then(room => {
        db.category.findAll().then(categories => {
            res.render('./rooms/edit', {room, categories});
        });
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

// PUT route for editing a room
router.put('/edit/:id', uploads.single('image'), (req, res) => {
    let image = req.file.path;

    cloudinary.uploader.upload(image, (result) => {
        db.room.findOne({
            where: {id: req.params.id}
        }).then(room => {
            room.name = req.body.name;
            room.description = req.body.description;
            room.imageUrl = result.secure_url;
            room.addCategory(req.body.category);
            room.save();
            res.redirect('/rooms');
        }).catch(error => {
            console.log('###### \nError\n');
            console.log(error);
            console.log('###### \nEnd\n')
            res.status(400).redirect('/error');
        });
    });
});

// DELETE route for just deleting a whole room
router.delete('/:id', (req, res) => {
    db.room.findOne({
        where: {id: req.params.id}
    }).then(room => {
        room.destroy();
        res.redirect('/rooms');
    }).catch(error => {
        console.log('###### \nError\n');
        console.log(error);
        console.log('###### \nEnd\n')
        res.status(400).redirect('/error');
    });
});


module.exports = router;