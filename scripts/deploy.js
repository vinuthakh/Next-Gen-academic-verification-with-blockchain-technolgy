const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contract with the account:", deployer.address);

    const balance = await deployer.provider.getBalance(deployer.address);
    console.log("Deployer balance:", ethers.formatEther(balance), "ETH");

    const Certificate = await ethers.getContractFactory("Certificate");
    const certificate = await Certificate.deploy();
    
    // Updated wait syntax
    await certificate.waitForDeployment();

    const deployedAddress = await certificate.getAddress();
    console.log("Contract deployed successfully at address:", deployedAddress);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Error during deployment:", error.message);
        process.exit(1);
    });
