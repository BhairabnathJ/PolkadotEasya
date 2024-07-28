const express = require('express');
const router = express.Router();
const { mintNft } = require('../substrate');

router.post('/calculate', async (req, res) => {
    const { averageTime, accuracy, address } = req.body;

    if (averageTime === undefined || accuracy === undefined || !address) {
        return res.status(400).json({ error: 'Invalid input data' });
    }

    try {
        const txHash = await mintNft(address, { averageTime, accuracy });
        res.json({ txHash });
    } catch (error) {
        console.error('Error minting NFT:', error);
        res.status(500).json({ error: 'Failed to mint NFT' });
    }
});

module.exports = router;
