require("hardhat/config");
const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");

task("root", "Generate Merkle Tree Root from a list of accounts")
    .addParam("json", "The input json file with accounts and amounts")
    .addParam("token", "The target token Id")
    .setAction(async (taskArgs, hre) => {
        const owner = await hre.ethers.getSigner(0);

        const data = require(taskArgs.json);
        // console.log(data);
        // console.log(typeof taskArgs.token, taskArgs.token);
        const elements = [];
        for (var i = 0; i < data.length; i++) {
            // console.log(data[i].account);
            elements.push(ethers.utils.solidityKeccak256(['address', 'uint256'], [data[i].account, taskArgs.token]));
        }
        // console.log("elements length:", elements.length);
        const merkleTree = new MerkleTree(elements, keccak256, { sort: true });
        const root = merkleTree.getHexRoot();
        console.log("root:", root);
        // for (var i = 0; i < elements.length && i < 4; i++) {
        //     console.log("element:", elements[i]);
        //     let proof = merkleTree.getHexProof(elements[i])
        //     console.log('proof:', proof);
        // }
        for (var i = 0; i < data.length; i++) {
            let proof = merkleTree.getHexProof(elements[i])
            data[i]['proof'] = proof;
        }
        console.log(data);
    });