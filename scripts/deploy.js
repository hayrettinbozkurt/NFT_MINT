const { ethers } = require("hardhat");

const dotenv=require("dotenv");


const ht=require("hardhat");

const fs=require("fs");


const main = async ()=>{

    let owner ;

    [owner]=await ethers.getSigners();
  
     
    const tokenInstance = await ethers.getContractFactory("HB");       
    token= await tokenInstance.deploy("0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199","0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199");
    await token.deployed();



    const nftInfo={
        abi:JSON.parse(token.interface.format('json')),       
        address:token.address 
    }


    fs.writeFileSync('./src/bc/contract/nft.json',JSON.stringify(nftInfo));



}

main()
.then(()=>process.exit(0))
.catch((err)=>{
    console.error(err);
    process.exit(1);});



