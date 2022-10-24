// scripts/upgrade-box.js
const { ethers, upgrades } = require("hardhat");

async function main() {
    const NodeV2 = await ethers.getContractFactory("NodeV2");
    const instance = await upgrades.upgradeProxy('0x9d34D407D8586478b3e4c39BE633ED3D7be1c80C', NodeV2);
    console.log("Node V2 upgraded");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});