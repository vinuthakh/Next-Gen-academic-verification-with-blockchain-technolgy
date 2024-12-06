const fs = require('fs');
const path = require('path');

async function main() {
    // Get contract artifacts
    const contractArtifact = require("../artifacts/contracts/Certificate.sol/Certificate.json");
    
    const contractInfo = {
        address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
        abi: contractArtifact.abi
    };

    // Write to a JSON file
    fs.writeFileSync(
        path.join(__dirname, "../config/contract.json"),
        JSON.stringify(contractInfo, null, 2)
    );

    console.log("Contract information saved to config/contract.json");
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
