import { ethers } from "ethers";

import  { getContract } from "../helper/web3Helper";


export default class NFTOps {

    // set metamask signer
    // will be used during NFTPage initial render
    static setSigner(sg) {
        this.signer = sg;
    }

     //used for nft minting 
     // params[price]: nft price
     // params[uri]: nft metadata uri
    static async mintToken(price, uri) {

       
        if (!uri || uri==="") {
            throw new Error("uri cant be empty");
        }
        
        if(!price || price<=0){
            throw new Error("Price must be greater than 0");
        }

        if(!this.signer){
            throw new Error("Signer Error");
        }

        // 10% of price will transfer to treasury and liquidty wallet
        const royaltyfeeRate = parseInt(process.env.REACT_APP_ROYALTYRATE | 10);


         const signer=this.signer;
 

        const contract = await getContract(signer);

        try {
          
            const tx = await contract.safeMint(ethers.utils.parseEther(price.toString()), uri, { value: ethers.utils.parseEther((price / royaltyfeeRate).toString()) });
           
            await tx.wait();

            return tx;
            
        } catch (error) {
            console.log(error);
            return null;
        }
  
 

    }

}



 