async function main() {
  // Get the contract factory
  const Certificate = await ethers.getContractFactory("Certificate");
  
  // Deploy a new instance
  const certificate = await Certificate.deploy();
  await certificate.waitForDeployment();
  
  const contractAddress = await certificate.getAddress();
  console.log("Contract deployed to:", contractAddress);

  // Issue a test certificate
  const testId = "4GM21CS061";
  console.log("Issuing certificate with ID:", testId);
  const issueTx = await certificate.issueCertificate(testId);
  await issueTx.wait();
  console.log("Certificate issued!");

  // Verify the certificate
  const isValid = await certificate.verifyCertificate(testId);
  console.log("Certificate verification result:", isValid);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error);
      process.exit(1);
  });
