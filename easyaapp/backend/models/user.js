const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    polkadotAdrdress: { type: String, required: true, unique: true },
    attempts: [
        {
            topic: String,
            score: Number,
            date: { type: Date, deafult: Date.now },
        },
    ],
});

const User = mongoose.model.model('User', userschema);
module.exports = user;