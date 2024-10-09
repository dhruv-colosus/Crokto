
const hre = require("hardhat");

async function main() {
  const MyNFT = await hre.ethers.getContractFactory("CroktoNFT");

  const deploymentGas = await MyNFT.signer.estimateGas(
    MyNFT.getDeployTransaction()
  );
  
  console.log(`Estimated gas for deployment: ${deploymentGas.toString()}`);

  const myNFT = await MyNFT.deploy({
    gasLimit: deploymentGas.mul(120).div(100) // Adding 20% buffer
  });
  await myNFT.deployed();

  console.log("MyNFT deployed to:", myNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
