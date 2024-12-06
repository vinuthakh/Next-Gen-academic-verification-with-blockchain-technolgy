const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners(); // The first account from `accounts`
  const balance = await deployer.getBalance();
  console.log(`Deployer Address: ${deployer.address}`);
  console.log(`Deployer Balance: ${ethers.utils.formatEther(balance)} ETH`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
