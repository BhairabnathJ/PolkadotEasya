const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/login', async (req, res) => {
    const { address } = req.body;

    if (!address) {
        return res.status(400).json({ error: 'Address is required' });
    }

    try {
        let user = await User.findOne({ polkadotAddress: address });

        if (!user) {
            user = new User({ polkadotAddress: address });
            await user.save();
        }

        res.json(user);
    } catch (error) {
        console.error('Internal Server Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
