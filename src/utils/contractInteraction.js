import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config';

export const getContract = async () => {
    if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        return contract;
    }
    throw new Error('MetaMask is not installed');
};

export const getBackendContract = async () => {
    const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
    const signer = provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
};

// Default export if you need both functions as an object
export default {
    getContract,
    getBackendContract
};
