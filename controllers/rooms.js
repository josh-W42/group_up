const express = require('express');
const router = express.Router();
const db = require('../models');

const multer = require('multer');
const uploads = multer({ dest: './uploads' });
const cloudinary = require('cloudinary');

// Main GET route /rooms - Pulls up all rooms
router.get('/', async(req, res) => {
    try {
        const rooms = await db.room.findAll({
            include: [db.category]
        });
        res.render('./rooms/', { rooms });
    } catch (error) {
        console.log('###### \nError\n');
        console.log(error);
        console.log('###### \nEnd\n')
        res.status(400).redirect('/error');
    }
});

// GET route /rooms/new - Pulls up form to make new room.
router.get('/new', async(req, res) => {
    try {
        const categories = await db.category.findAll();
        res.render('./rooms/new', { categories });
    } catch (error) {
        console.log('###### \nError\n');
        console.log(error);
        console.log('###### \nEnd\n')
        res.status(400).redirect('/error');
    }
});

// GET /rooms/id - show one route
router.get('/:id', async(req, res) => {
    try {
        const room = await db.room.findOne({
            where: {id: req.params.id},
            include: [db.comment]
        });
        res.render('./rooms/show', { room });
    } catch (error) {
        console.log('###### \nError\n');
        console.log(error);
        console.log('###### \nEnd\n')
        res.status(404).redirect('/error');
    }
});

// GET /rooms/edit/id - edit a room
router.get('/edit/:id', async(req, res) => {
    try {
        const room = await db.room.findOne({
            where: {id: req.params.id}
        });
        const categories = await db.category.findAll();
        res.render('./rooms/edit', {room, categories});
    } catch (error) {
        console.log('###### \nError\n');
        console.log(error);
        console.log('###### \nEnd\n')
        res.status(404).redirect('/error');
    }
});

// POST route to add new room + upload img to cloudinary.
router.post('/', uploads.single('image'), async(req, res) => {
    try {
        let image = req.file.path;
        const result = await cloudinary.uploader.upload(image);
        const room = await db.room.create({
            name: req.body.name,
            description: req.body.description,
            imageUrl: result.secure_url
        });
        await room.addCategory(req.body.category);
        res.redirect('/rooms');        
    } catch (error) {
        console.log('###### \nError\n');
        console.log(error);
        console.log('###### \nEnd\n')
        res.status(400).redirect('/error');
    }
});

// PUT route for editing a room
router.put('/edit/:id', uploads.single('image'), async(req, res) => {
    
    try {
        const image = req.file.path;
        const result = await cloudinary.uploader.upload(image);
        const room = await db.room.findOne({ where: {id: req.params.id} });
        room.name = req.body.name;
        room.description = req.body.description;
        room.imageUrl = result.secure_url;
        await room.addCategory(req.body.category);
        await room.save();
        res.redirect('/rooms');
    } catch (error) {
        console.log('###### \nError\n');
        console.log(error);
        console.log('###### \nEnd\n');
        res.status(400).redirect('/error');
    }
});

// DELETE route for just deleting a whole room
router.delete('/:id', async(req, res) => {
    try {
        const room = await db.room.findOne({ where: {id: req.params.id} });
        await room.destroy();
        res.redirect('/rooms');
    } catch (error) {
        console.log('###### \nError\n');
        console.log(error);
        console.log('###### \nEnd\n')
        res.status(400).redirect('/error');
    }
});


module.exports = router;