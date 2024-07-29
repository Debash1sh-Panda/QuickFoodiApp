const jwt = require('jsonwebtoken');


//middleware
const verifyToken = (req, res, next) => {
    // console.log(req.headers.authorization);
    if (!req.headers.authorization) {
        return res.status(401).json({message: "Unauthorized Access"})
    }

    const extractToken = req.headers.authorization.split(' ')[1];
    // console.log(tokenExtract)
    jwt.verify(extractToken, process.env.SECRET_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(401).json({error: err.message, message: "Token is Invalid"})
        }
        req.decoded = decoded;
        next();
    })
}

module.exports = verifyToken;