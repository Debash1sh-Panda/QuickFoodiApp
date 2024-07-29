const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/verify-jwt', async (req, res) => {
    try {
        const user = req.body;
        // console.log(user)
        const token = jwt.sign(user, process.env.SECRET_TOKEN, {
            expiresIn: '2hr'
        })

        res.status(200).json({token : token})
        // console.log(user)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

module.exports = router;