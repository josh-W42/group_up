const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', (req, res) => {
    res.send("Here's the rooms page");
});

module.exports = router;