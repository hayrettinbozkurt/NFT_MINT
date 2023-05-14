const { expect } = require("chai");
const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { ethers } = require("hardhat");


describe("nft operations", () => {


    const deployFixture = async () => {

        const [owner, user1, user2, user3, user4] = await ethers.getSigners();
        const tokenInstance = await ethers.getContractFactory("HB");
        token = await tokenInstance.deploy(user3.address, user4.address);
        await token.deployed();

        return { token, owner, user1, user2, user3, user4 };

    }



    it("name and symbol should be correct", async () => {

        const { token, owner } = await loadFixture(deployFixture);
        const name = await token.name();
        const symbol = await token.symbol();
        expect(name).to.equal("hib");
        expect(symbol).to.equal("hb");

    });

    it("creator Of the token should be first user", async () => {

        const { token, owner } = await loadFixture(deployFixture);
        const _owner = await token.owner();
        expect(_owner).to.equal(owner.address);

    });

    it("mint new token to caller &&  balanceOf(caller) = 1", async () => {



        const { token, owner, user1 } = await loadFixture(deployFixture);

        const price = ethers.utils.parseEther("1");
        const fee = ethers.utils.parseEther("0.1");


        const tx = await token.safeMint(price, "tokenuri", { value: fee });
        await tx.wait();

        const balance = await token.balanceOf(owner.address);

        expect(balance).to.equal(1);

    });





    it("ownerOf(tokenId=0) = owner ", async () => {

        const { token, owner, user1 } = await loadFixture(deployFixture);

        const price = ethers.utils.parseEther("1");
        const fee = ethers.utils.parseEther("0.1");

        const tx = await token.safeMint(price, "tokenuri", { value: fee });
        await tx.wait();

        const _owner = await token.ownerOf(0);

        expect(_owner).to.equal(owner.address);

    });


    it("tokenURIOf(tokenId=0) == '_tokenuri_' ", async () => {

        const { token, owner, user1 } = await loadFixture(deployFixture);

        const price = ethers.utils.parseEther("1");
        const fee = ethers.utils.parseEther("0.1");

        const tx = await token.safeMint(price, "_tokenuri_", { value: fee });
        await tx.wait();

        const uri = await token.tokenURI(0);

        expect(uri).to.equal("_tokenuri_");

    });




    it("approve(tokenId=0) == user1 ", async () => {

        const { token, owner, user1 } = await loadFixture(deployFixture);

        const price = ethers.utils.parseEther("1");
        const fee = ethers.utils.parseEther("0.1");

        const tx = await token.safeMint(price, "_tokenuri_", { value: fee });
        await tx.wait();

        await token.approve(user1.address, 0);

        const usr = await token.getApproved(0);

        expect(usr).to.equal(user1.address);

    });



    it("user1 transfer (tokenId=0) to user2 on behalf of owner by using transferFrom ", async () => {

        const { token, owner, user1, user2 } = await loadFixture(deployFixture);

        const price = ethers.utils.parseEther("1");
        const fee = ethers.utils.parseEther("0.1");

        const tx = await token.safeMint(price, "_tokenuri_", { value: fee });

        await tx.wait();

        await token.approve(user1.address, 0);

        await token.connect(user1).transferFrom(owner.address, user2.address, 0);

        const _owner = await token.ownerOf(0);

        expect(_owner).to.equal(user2.address);


    });


    it("user1 transfer (tokenId=0) to user2 on behalf of owner by using safeTransferFrom ", async () => {

        const { token, owner, user1, user2 } = await loadFixture(deployFixture);

        const price = ethers.utils.parseEther("1");
        const fee = ethers.utils.parseEther("0.1");

        const tx = await token.safeMint(price, "_tokenuri_", { value: fee });
        await tx.wait();

        await token.approve(user1.address, 0);

        await token.connect(user1)["safeTransferFrom(address,address,uint256)"](owner.address, user2.address, 0);

        const _owner = await token.ownerOf(0);

        expect(_owner).to.equal(user2.address);


    });


    it("nft price must be greater than 0 and royalty fee must be %10 of price, otherwise throw error", async () => {

        const { token, owner, user1, user2 } = await loadFixture(deployFixture);

        const price=ethers.utils.parseEther("1");
        const fee=ethers.utils.parseEther("0.8");
 

        await expect(token.safeMint(0, "_tokenuri_", { value: fee })).to.be.revertedWith("SELLPRICE_ERROR");
        await expect(token.safeMint(price, "_tokenuri_", { value: fee })).to.be.revertedWith("MINTPRICE_ERROR");


    });

});

