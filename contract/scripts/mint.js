
const hre = require("hardhat");

async function main() {
  const MyNFT = await hre.ethers.getContractFactory("CroktoNFT");
  const CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS;
  const myNFT = await MyNFT.attach(CONTRACT_ADDRESS);

  const recipient = "0x85505c1DB5F28848c203eC2460c83aebF3567ac6";
  const tokenURI = "https://gateway.pinata.cloud/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/1";

  const tx = await myNFT.mintNFT(recipient, tokenURI);
  await tx.wait();

  console.log("NFT minted successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
