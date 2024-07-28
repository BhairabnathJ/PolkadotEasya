const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    polkadotAddress: { type: String, required: true, unique: true },
    attempts: [
        {
            topic: String,
            score: Number,
            date: { type: Date, default: Date.now },
        },
    ],
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;