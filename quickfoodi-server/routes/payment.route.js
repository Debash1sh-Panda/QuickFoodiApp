const express = require("express");
const Payment = require("../models/models.payment");
const router = express.Router();
const Cart = require("../models/models.cart");
const mongoose  = require("mongoose");
const verifyToken = require("../middleware/verifyToken.middleware");
const ObjectId = mongoose.Types.ObjectId;

router.post('/payments', async (req, res) => {

    const paymentInfo = req.body;
    try {
        const paymentRequest = await Payment.create(paymentInfo);

        const cartIds = paymentInfo.cartItems.map(id => new ObjectId(id));
        const deleteCartRequest = await Cart.deleteMany({_id: {$in: cartIds}})
        res.status(200).json(paymentRequest)
    } catch (error) {
        res.status(404).json({message : error.message})
    }
});


router.get('/payments', verifyToken, async (req, res) => {
    const email = req.query.email;
    try {
        const decodedEmail = req.decoded.email;
        if (email !== decodedEmail) {
            return res.status(403).json({ message: "Forbidden Access" });
        }
        const result = await Payment.find({ email: email }).sort({ createdAt: -1 });
        return res.status(200).json({ orders: result });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
});


module.exports = router;