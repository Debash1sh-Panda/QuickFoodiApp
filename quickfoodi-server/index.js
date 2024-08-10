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

//for payments
const paymentRoute = require("./routes/payment.route");
QFoodiApp.use("/api", paymentRoute);


//Stripe api payment route
QFoodiApp.post("/api/create-payment-intent", async (req, res) => {
  const { price } = req.body;
  const amount = price*100;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",

    payment_method_types: ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

//default route
QFoodiApp.get("/", (req, res) => {
  res.send("Hello Developer !");
});

//server started
QFoodiApp.listen(PORT, () => {
  console.log("running on PORT", PORT);
});