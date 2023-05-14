 

 
import { ethers } from "ethers";
import getSigner from "../bc/helper/web3Helper";
 


export default function Login(){
 

async function clc(){
    
 
   const signer= await getSigner();
   if(signer)
   { 
    

    window.location.replace("/mintNFT");
   }
   else{
    alert("geet metamask");
   }

 


   

//stateInstance.setProp("signer",1);
 

//window.location.replace("/mintNFT");

}

 










    return (
    <div>
        
        <button onClick={clc}>Connect yo your Wallet</button>


    </div>);
}