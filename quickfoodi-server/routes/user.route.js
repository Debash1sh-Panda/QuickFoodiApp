const express = require('express');
const router = express.Router();
const User = require('../models/models.user');


// get all user
router.get('/user', async (req, res) => {
    try {
        const user = await User.find({});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ success:"false", message: 'Internal Server Error' });
    }
})


// create user 
router.post('/user', async (req, res) => {
    try {
        const user = req.body;

        const existingUser = await User.findOne({email: user.email});

        if(existingUser){
            return res.status(200).json({success: "true", message: "User already exist"})
        }

        const result = await User.create(user);
        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({ success:"false", message: 'Internal Server Error' });
    }
})


//delete user through id
router.delete("/user/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({success: "false", message: "User not Found"})
        }

        return res.status(200).json({success:"true", message: "User deleted successfully"})
    } catch (error) {
        res.status(500).json({ success:"false", message: 'Internal Server Error' });
    }
})


//get admin
router.get('/admin/:email', async (req, res) => {
    try {
        const email = req.params.email;

        const user = await User.findOne({email: email});

        if (!user) {
            return res.status(404).json({success: "false", message: "User not Exist"})
        }
        
        // if (email !== req.decoded.email){
        //     return res.status(403).json({success: "false", message: "Forbidden access"})
        // }
        
        const isAdmin = user.role === "admin";

        // If user is not an admin
        if (!isAdmin) {
            return res.status(403).json({ success: "false", message: "Admin can access only" });
        }

        // If everything is correct, return success with admin status
        res.status(200).json({ success: "true", isAdmin: true, user});

    } catch (error) {
        res.status(500).json({ success:"false", message: 'Internal Server Error' });
    }
})


//make admin of a user
router.patch('/admin/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const {name, email, photoURl, role} = req.body;

        const updateUser = await User.findByIdAndUpdate(
            userId,
            {
                role: "admin"
            },
            {
                new: true,
                runValidators: true,
                // populate
            }
        );

        if (!updateUser) {
            return res.status(404).json({success: "false", message: "User not Found"})
        }

        return res.status(200).json({success: "true", updateUser});

    } catch (error) {
        res.status(500).json({ success:"false", message: 'Internal Server Error' });
    }
})


module.exports = router;