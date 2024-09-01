const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        trim: true,
        minlength: 3,
    },
    photoURL: {
        type: String
    },
    role: {
        type :String,
        enum: ["user", "admin"],
        default: "user"
    },
    token: {
        type: String,
    },
});

module.exports = mongoose.model("User", userSchema);