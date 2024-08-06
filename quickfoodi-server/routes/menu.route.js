const express = require("express");
const router = express.Router();
const Menu = require("../models/models.menu");

// Route to get all menu items
router.get("/menu", async (req, res) => {
  try {
    const menuItems = await Menu.find({}).sort({ createdAt: -1 });
    res.json(menuItems);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/addmenu", async (req, res) => {
  try {
    const newItem = req.body;
    const result = await Menu.create(newItem);
    res.status(200).json({ success: true, result });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/deleteitem/:id", async (req, res) => {
  try {
    const menuId = req.params.id;
    const deletedItem = await Menu.findByIdAndDelete(menuId);

    if (!deletedItem) {
      return res.status(404).json({ message: "menu not found" });
    }
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/menu/:id", async (req, res) => {
  const menuId = req.params.id;
  try {
    const singleId = await Menu.findById(menuId);

    if (!singleId) {
      return res.status(404).json({ message: "menu not found" });
    }
    res.status(200).json({ message: "success", singleId });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/update-menu/:id", async (req, res) => {
  const menuId = req.params.id;
  const { name, recipe, image, category, price } = req.body;

  try {
    const updateMenu = await Menu.findByIdAndUpdate(
      menuId,
      { name, recipe, image, category, price },
      { new: true, runValidators: true }
    );

    if (!updateMenu) {
      return res.status(404).json({ message: "menu not found" });
    }
    res.status(200).json({ message: "success", updateMenu });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
