
const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');

import { expect } from "chai";
import { ethers } from "ethers";
const { default: NFTOps } = require("./bc/service/nftOps");



describe("nft operations", () => {




    it("mintToken", async () => { 

        const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_BCURL);
        const wallet = new ethers.Wallet(process.env.REACT_APP_PVKEY);
        const signer = wallet.connect(provider);


        NFTOps.setSigner(signer);
        

         const tx= await NFTOps.mintToken(0.1,"uri");
       
        expect(tx).to.not.equal(null || undefined);
 
    });
 


    it("price <=0 throw error", async () => {
        NFTOps.mintToken(0, "uri").catch((err) => {
            expect(err.message).to.equal("Price must be greater than 0")
        })
    });

    it("empty uri throw error", async () => {
        NFTOps.mintToken(1, "").catch((err) => {
            expect(err.message).to.equal("uri cant be empty")
        })
    });


    it("empty signer throw error", async () => {

        NFTOps.setSigner(null);

        NFTOps.mintToken(1, "asd").catch((err) => {
            expect(err.message).to.equal("Signer Error")
        })
    });

    


});