const express = require('express');
const QFoodiApp = express();
const cors = require('cors');
require('dotenv').config();


const PORT = process.env.PORT || 3000

//middlewares
QFoodiApp.use(cors());
QFoodiApp.use(express.json());

//db
require('./database').databaseConnection();

//jwt Authentication
const jwtRoute = require('./routes/verifyJwt.route');
QFoodiApp.use('/api/jwt', jwtRoute);

//for menuItems
const menuRoute = require('./routes/menu.route');
QFoodiApp.use('/api', menuRoute);

//for cartItems
const cartRoute = require('./routes/cart.route');
QFoodiApp.use('/api', cartRoute);

//for users
const userRoute = require('./routes/user.route');
QFoodiApp.use('/api', userRoute);

//default route
QFoodiApp.get('/',(req, res) => {
    res.send("Hello Developer !");
})

//server started
QFoodiApp.listen(PORT, () => {
    console.log("running on PORT", PORT);
})