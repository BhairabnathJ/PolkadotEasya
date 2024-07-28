const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/attempt', async (req, res) => {
    const { address, topic, score } = req.body;

    if (!address || !topic || typeof score !== 'number') {
        return res.status(400).json({ error: 'Invalid data' });
    }

    try {
        const user = await User.findOne({ polkadotAddress: address });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.attempts.push({ topic, score });
        await user.save();

        res.json({ message: 'Attempt saved' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
