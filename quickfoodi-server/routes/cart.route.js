const express = require('express');
const router = express.Router();
const Cart = require('../models/models.cart');
const verifyToken = require('../middleware/verifyToken.middleware');

// Route to add an item to the cart
router.post('/cart', async (req, res) => {
    try {
        // console.log('Request body:', req.body); // Log the request body
        const { menuItemId, name, quantity, image, price, email } = req.body;

        if (!menuItemId || !name || !image || !price || !email) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newCartItem = new Cart({
            menuItemId,
            name,
            quantity,
            image,
            price,
            email,
        });

        // console.log(newCartItem)

        await newCartItem.save();
        res.status(201).json(newCartItem);
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Route to get cart items by email
router.get('/cart', verifyToken, async (req, res) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ message: 'Email query parameter is required' });
        }

        const cartItems = await Cart.find({ email });

        res.status(200).json(cartItems);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// router.get('/cart/:id', async (req, res) => {
//     try {
//         const { id } = req.params;

//         const cartItem = await Cart.findById(id);

//         if (!cartItem) {
//             return res.status(404).json({ message: 'Cart item not found' });
//         }

//         res.status(200).json(cartItem);
//     } catch (error) {
//         console.error('Error fetching cart item:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });


router.delete('/cart/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deleteResult = await Cart.deleteOne({ _id: id });

        if (deleteResult.deletedCount === 0) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        res.status(200).json({ message: 'Cart item deleted successfully', deletedCount: deleteResult.deletedCount });
    } catch (error) {
        console.error('Error deleting cart item:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.put('/cart/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const {quantity} = req.body;

        // Assuming `updateOne` expects an id and an update object
        const result = await Cart.updateOne({ _id: id }, {quantity: quantity});

        if (result.nModified === 0) {
            return res.status(404).json({ message: 'Cart item not found or no changes made' });
        }

        res.status(200).json({ message: 'Cart item updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating cart item', error: error.message });
    }
});


module.exports = router;
