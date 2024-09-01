const express = require("express");
const router = express.Router();
const User = require("../models/models.user");


// get all user
router.get("/user", async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ success: "false", message: "Internal Server Error" });
  }
});

// create user
router.post("/user", async (req, res) => {
  try {
    const user = req.body;
    // console.log('Received user data:', user);

    const existingUser = await User.findOne({ email: user.email });

    if (existingUser) {
      return res
        .status(200)
        .json({ success: "true", message: "User already exist" });
    }

    const result = await User.create(user);
    res.status(200).json(result);
  } catch (error) {
    onsole.error('Error saving user:', error);
    res
      .status(500)
      .json({ success: "false", message: "Internal Server Error" });
  }
});

//delete user through id
router.delete("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    // console.log(user)

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    await User.findByIdAndDelete(userId);

    return res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//get admin
router.get("/admin/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User does not exist" });
    }

    const isAdmin = user.role === "admin";

    if (!isAdmin) {
      return res.status(403).json({ success: false, message: "Admin access only" });
    }

    res.status(200).json({ success: true, data: { role: user.role } });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});


//make admin of a user
router.patch("/admin/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { role } = req.body;

    if (role !== "admin") {
      return res.status(400).json({ success: false, message: "Invalid role specified" });
    }

    const updateUser = await User.findByIdAndUpdate(
      userId,
      { role: "admin" },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updateUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, user: updateUser });
  } catch (error) {
    console.error("Error promoting user to admin:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
