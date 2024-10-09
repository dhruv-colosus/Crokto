const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const projectName = 'nodejs-nft-project';

// Create project directory
fs.mkdirSync(projectName);
process.chdir(projectName);

// package.json
const packageJson = {
  "name": "nodejs-nft-project",
  "version": "1.0.0",
  "description": "NFT minting project using OpenZeppelin and Hardhat",
  "main": "index.js",
  "scripts": {
    "test": "npx hardhat test",
    "compile": "npx hardhat compile",
    "deploy": "npx hardhat run scripts/deploy.js --network mumbai",
    "mint": "npx hardhat run scripts/mint.js --network mumbai"
  },
  "dependencies": {
    "@openzeppelin/contracts": "^4.8.0",
    "dotenv": "^16.0.3"
  },
  "devDependencies": {
    "@nomiclabs/hardhat-ethers": "^2.2.2",
    "@nomiclabs/hardhat-waffle": "^2.0.5",
    "chai": "^4.3.7",
    "ethereum-waffle": "^4.0.10",
    "ethers": "^5.7.2",
    "hardhat": "^2.12.7"
  }
};

fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));

// hardhat.config.js
const hardhatConfig = `
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
  solidity: "0.8.17",
  networks: {
    mumbai: {
      url: process.env.MUMBAI_RPC_URL,
      accounts: [process.env.PRIVATE_KEY]
    },
  },
};
`;

fs.writeFileSync('hardhat.config.js', hardhatConfig);

// MyNFT.sol
const contractCode = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("MyNFT", "MNFT") {}

    function mintNFT(address recipient, string memory tokenURI)
        public onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}
`;

fs.mkdirSync('contracts');
fs.writeFileSync('contracts/MyNFT.sol', contractCode);

// deploy.js
const deployScript = `
const hre = require("hardhat");

async function main() {
  const MyNFT = await hre.ethers.getContractFactory("MyNFT");
  const myNFT = await MyNFT.deploy();

  await myNFT.deployed();

  console.log("MyNFT deployed to:", myNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
`;

fs.mkdirSync('scripts');
fs.writeFileSync('scripts/deploy.js', deployScript);

// mint.js
const mintScript = `
const hre = require("hardhat");

async function main() {
  const MyNFT = await hre.ethers.getContractFactory("MyNFT");
  const CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS;
  const myNFT = await MyNFT.attach(CONTRACT_ADDRESS);

  const recipient = "0xf80FE97797B24956d26d09A51f366229022Da597";
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
`;

fs.writeFileSync('scripts/mint.js', mintScript);

// .env
const envFile = `
MUMBAI_RPC_URL=https://rpc-mumbai.maticvigil.com/
PRIVATE_KEY=your_private_key_here
NFT_CONTRACT_ADDRESS=your_contract_address_here
`;

fs.writeFileSync('.env', envFile);

// Install dependencies
console.log('Installing dependencies...');
execSync('npm install', { stdio: 'inherit' });

console.log('Project setup complete!');
console.log('Next steps:');
console.log('1. cd ' + projectName);
console.log('2. Update the PRIVATE_KEY in the .env file');
console.log('3. Run "npx hardhat compile" to compile the contract');
console.log('4. Run "npx hardhat run scripts/deploy.js --network mumbai" to deploy');
console.log('5. Update NFT_CONTRACT_ADDRESS in .env with the deployed contract address');
console.log('6. Run "npx hardhat run scripts/mint.js --network mumbai" to mint an NFT');