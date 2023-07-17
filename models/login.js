const mongoose = require("mongoose");

const loginDetails = mongoose.Schema({
    username :[
        {
            user: String,
            trim: true,
        }
    ]
})

const User = mongoose.model('User',loginDetails);

module.exports = User;