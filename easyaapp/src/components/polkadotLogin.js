import React, { useState, useEffect } from 'react';
import { web3Enable, web3Accounts } from '@polkadot/extension-dapp';
import axios from 'axios';

const PolkadotLogin = ({ onLogin }) => {
    const [address, setAddress] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (address) {
            const loginUser = async () => {
                try {
                    console.log('Logging in with address:', address);
                    const response = await axios.post('http://localhost:5001/api/auth/login', {
                        address: address,
                    });
                    console.log('Login response:', response.data);
                    onLogin(response.data);
                } catch (error) {
                    console.error('Error connecting to Polkadot:', error);
                    if (error.response) {
                        console.error('Error response data:', error.response.data);
                    }
                    setError('Failed to connect to backend. Please try again.');
                }
            };

            loginUser();
        }
    }, [address, onLogin]);

    const connect = async () => {
        try {
            const extensions = await web3Enable('Quiz App');
            if (extensions.length === 0) {
                throw new Error('No extension installed');
            }

            const accounts = await web3Accounts();
            setAddress(accounts[0].address);
        } catch (error) {
            console.error('Error connecting to Polkadot:', error);
            setError('Failed to connect to backend. Please try again.');
        }
    };

    const disconnect = () => {
        setAddress(null);
        onLogin(null); // Reset user state in parent component
    };

    return (
        <div>
            {!address ? (
                <button onClick={connect}>Connect Polkadot Wallet</button>
            ) : (
                <div>
                    <p>Connected: {address}</p>
                    <button onClick={disconnect}>Disconnect</button>
                </div>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default PolkadotLogin;
