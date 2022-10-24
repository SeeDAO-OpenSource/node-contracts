require("hardhat/config");

task("whitelist", "Set whitelist")
    .addParam("contract", "The `Node` contract address")
    .addParam("token", "The target token Id")
    .addParam("root", "The Merkle tree root")
    .addParam("expiration", "The expiration timestamp")
    .setAction(async (taskArgs, hre) => {
        const owner = await hre.ethers.getSigner(0);

        const Node = await hre.ethers.getContractFactory("NodeV2");
        const node = await Node.attach(taskArgs.contract);
        await node.connect(owner).setWhitelist(taskArgs.token, taskArgs.root, taskArgs.expiration);
        // await node.connect(owner).setURI("https://ipfs.io/ipfs/QmZQEPPGL9sNDekzjFeiAzCQNQHf6nBwGfxe7SrerXKLhq/{id}.json");
    });