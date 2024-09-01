const express = require("express");
const router = express.Router();
const User = require("../models/models.user");


router.post('/store-token', (req, res) => {
    const { token, email } = req.body;
  
    // Find the user by email and update their record with the token
    User.findOneAndUpdate({ email }, { token }, { new: true, upsert: true })
      .then((updatedUser) => {
        res.status(200).json({ message: 'Token stored successfully', user: updatedUser });
      })
      .catch((err) => {
        res.status(500).json({ message: 'Error storing token', error: err });
      });
  });

  router.post('/remove-token', (req, res) => {
    const { email } = req.body;
  
    // Find the user by email and remove the token from their record
    User.findOneAndUpdate({ email }, { $unset: { token: "" } })
      .then(() => {
        res.status(200).json({ message: 'Token removed successfully' });
      })
      .catch((err) => {
        res.status(500).json({ message: 'Error removing token', error: err });
      });
  }); 
  
  module.exports = router;