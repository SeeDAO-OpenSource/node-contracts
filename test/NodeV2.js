const {
    time,
    loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
// const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const { upgrades } = require("hardhat");

describe("NodeV2", function () {
    async function deployContractFixture() {
        // Contracts are deployed using the first signer/account by default
        const [owner] = await ethers.getSigners();

        const Node = await ethers.getContractFactory("NodeV2");
        const node = await upgrades.deployProxy(Node);

        return { node, owner };
    }
    describe("Deployment", function () {
    });
    describe("Claim", function () {
        it("Should claim", async function () {
            // 2022-10-24 15:00:00
            const time1 = 1666594800;
            // 2022-10-25 15:00:00
            const time2 = 1666681200;
            const tokenId = 1;
            const [a1, a2, a3] = await ethers.getSigners();

            const elements = [];
            elements.push(ethers.utils.solidityKeccak256(['address', 'uint256'], [a1.address, tokenId]));
            elements.push(ethers.utils.solidityKeccak256(['address', 'uint256'], [a2.address, tokenId]));
            const merkleTree = new MerkleTree(elements, keccak256, { sort: true });
            const root = merkleTree.getHexRoot();
            // console.log("root:", root);
            const { node, owner } = await loadFixture(deployContractFixture);
            await node.connect(owner).setWhitelist(tokenId, root, time2);
            let proof = merkleTree.getHexProof(elements[0])
            expect(await node.verify(tokenId, a1.address, proof)).to.equal(true);
            await node.connect(a1).claim(tokenId, proof);
            await expect(node.connect(a1).claim(tokenId, proof)).to.be.revertedWith("Node: already claimed");
            expect(await node.verify(tokenId, a2.address, proof)).to.equal(false);
            await expect(node.connect(a2).claim(tokenId, proof)).to.be.revertedWith("Node: Invalid proof");

            // check expire
            await node.connect(owner).setWhitelist(tokenId, root, time1);
            await expect(node.connect(a1).claim(tokenId, proof)).to.be.revertedWith("Node: expired");

            // can't transfer
            await expect(node.connect(a1).safeTransferFrom(a1.address, a2.address, tokenId, 1, '0x')).to.be.revertedWith("Node: can't transfer");
            await expect(node.connect(a1).safeBatchTransferFrom(a1.address, a2.address, [tokenId], [1], '0x')).to.be.revertedWith("Node: can't transfer");
        });
    });
});