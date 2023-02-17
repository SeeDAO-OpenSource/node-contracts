require("hardhat/config");

task("setURI", "Set URI")
    .addParam("contract", "The `Node` contract address")
    .addParam("uri", "The target token URI")
    .setAction(async (taskArgs, hre) => {
        const owner = await hre.ethers.getSigner(0);

        const Node = await hre.ethers.getContractFactory("NodeV2");
        const node = await Node.attach(taskArgs.contract);
        let feeData = await ethers.provider.getFeeData();
        console.log("change uri to ", taskArgs.uri);
        const response = await node.connect(owner).setURI(taskArgs.uri, {
            maxFeePerGas: feeData.maxFeePerGas,
            maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
        });
        console.log("send tx, waiting for confirmations...");
        await response.wait();
        console.log("transaction done");
    });