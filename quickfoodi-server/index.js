const express = require("express");
const QFoodiApp = express();
const cors = require("cors");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const PORT = process.env.PORT || 3000;

//middlewares
QFoodiApp.use(cors());
QFoodiApp.use(express.json());

//db
require("./database").databaseConnection();

//jwt Authentication
const jwtRoute = require("./routes/verifyJwt.route");
QFoodiApp.use("/api/jwt", jwtRoute);

//for menuItems
const menuRoute = require("./routes/menu.route");
QFoodiApp.use("/api", menuRoute);

//for cartItems
const cartRoute = require("./routes/cart.route");
QFoodiApp.use("/api", cartRoute);

//for users
const userRoute = require("./routes/user.route");
QFoodiApp.use("/api", userRoute);

//for store token
const tokenRoute = require("./routes/token.route");
QFoodiApp.use("/api", tokenRoute);

//for payments
const paymentRoute = require("./routes/payment.route");
const verifyToken = require("./middleware/verifyToken.middleware");
QFoodiApp.use("/api", verifyToken, paymentRoute);


//Stripe api payment route
QFoodiApp.post('/create-payment-intent', async (req, res) => {
  const { price } = req.body;
  
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: price,
      currency: 'usd',
      payment_method_types: ['card'],
    });
console.log(paymentIntent)
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//default route
QFoodiApp.get("/", (req, res) => {
  res.send("Hello Developer !");
});

//server started
QFoodiApp.listen(PORT, () => {
  console.log("running on PORT", PORT);
});