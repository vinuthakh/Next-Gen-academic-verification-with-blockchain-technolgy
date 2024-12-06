const CONTRACT_ADDRESS = "0x26AFcEC41F4794d6599b2Ea0D0848824Ea9f85EC";
const CONTRACT_ABI = require("../artifacts/contracts/Certificate.sol/Certificate.json").abi;

console.log('Contract ABI:', CONTRACT_ABI); // Add this line to verify

module.exports = {
    CONTRACT_ADDRESS,
    CONTRACT_ABI
};
