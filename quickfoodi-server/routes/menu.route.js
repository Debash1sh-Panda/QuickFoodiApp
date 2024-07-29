const express = require('express');
const router = express.Router();
const Menu = require('../models/models.menu');

// Route to get all menu items
router.get('/menu', async (req, res) => {
    try {
        const menuItems = await Menu.find({});
        res.json(menuItems);
    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
