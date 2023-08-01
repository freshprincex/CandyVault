
const hre = require("hardhat");

async function main() {

  const CandyContract = await hre.ethers.deployContract("CandyVault");

  const candyContract = await CandyContract.waitForDeployment();

  console.log(await candyContract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});