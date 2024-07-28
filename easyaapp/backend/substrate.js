const { ApiPromise, WsProvider, Keyring } = require('@polkadot/api');
const { cryptoWaitReady } = require('@polkadot/util-crypto');

const connectSubstrate = async () => {
    const wsProvider = new WsProvider('wss://YOUR_SUBSTRATE_NODE_ENDPOINT');
    const api = await ApiPromise.create({ provider: wsProvider });
    await api.isReady;
    return api;
};

const mintNft = async (address, performanceData) => {
    await cryptoWaitReady();
    const api = await connectSubstrate();
    const keyring = new Keyring({ type: 'sr25519' });
    const alice = keyring.addFromUri('//Alice'); //

    const { averageTime, accuracy } = performanceData;

    // Custom logic to determine NFT properties based on performance
    const nftMetadata = {
        description: `Quiz Performance: Avg Time - ${averageTime}, Accuracy - ${accuracy}%`,
        properties: {
            averageTime,
            accuracy,
        },
    };

    // Example minting call - adjust based on your pallet's API
    const txHash = await api.tx.nfts.create(address, nftMetadata).signAndSend(alice);
    return txHash;
};

module.exports = {
    mintNft,
};
