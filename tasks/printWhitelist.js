require("hardhat/config");

task("printWhitelist", "Set whitelist")
    .addParam("contract", "The `Node` contract address")
    .addParam("token", "The target token Id")
    .setAction(async (taskArgs, hre) => {
        const Node = await hre.ethers.getContractFactory("Node");
        const node = await Node.attach(taskArgs.contract);
        let root = await node.roots(taskArgs.token);
        let expiration = await node.expirations(taskArgs.token);
        console.log('root = ', root);
        // console.log('expiration = ', expiration);
        let d = new Date(expiration.toNumber() * 1000);
        console.log('expiration = ', d.toLocaleString());
    });