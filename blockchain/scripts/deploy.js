const hre = require("hardhat");

async function main() {
  const SupplyChainTracker = await hre.ethers.getContractFactory("SupplyChainTracker");
  console.log("Deploying contract...");
  const tracker = await SupplyChainTracker.deploy();
  console.log("Contract deployed to:", tracker.address);

  // Save the contract address to .env file
  const fs = require('fs');
  fs.appendFileSync('.env', `\nCONTRACT_ADDRESS=${tracker.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
