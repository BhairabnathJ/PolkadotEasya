import React, { useState } from 'react';
import { web3Enable, web3Accounts } from '@polkadot/extension-dapp';
import axios from 'axios';

const PolkadotLogin = ({ onLogin }) => {
    const [address, setAddress] = useState(null);

    const connect = async () => {
        try {
            const extensions = await web3Enable('Quiz App');
            if (extensions.length === 0) {
                throw new Error('No extension installed');
            }

            const accounts = await web3Accounts();
            setAddress(accounts[0].address);

            // Login to backend
            const response = await axios.post('http://localhost:5001/api/auth/login', {
                address: accounts[0].address,
            });

            onLogin(response.data);
        } catch (error) {
            console.error('Error connecting to Polkadot', error);
        }
    };

    return (
        <div>
            <button onClick={connect}>Connect Polkadot Wallet</button>
            {address && <p>Connected: {address}</p>}
        </div>
    );
};

export default PolkadotLogin;
