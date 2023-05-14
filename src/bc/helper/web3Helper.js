import { ethers } from "ethers";
import nft from "../contract/nft.json";

// get signer from metamask
// signer should use fuji testnet
export default async function getSigner() {

    let provider;
    let signer;

    if (!window.ethereum) {
        return null;

    }
    else {


        const chainId = await window.ethereum.request({ method: 'eth_chainId' });

        // fujinet chainId
        if (chainId !== "0xa869") {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0xa869' }],
            })
        }


        provider = new ethers.providers.Web3Provider(window.ethereum);
        await window.ethereum.request({
            method: "eth_requestAccounts",
        })
        signer = await provider.getSigner();
    }


    return signer;


}

//return smart contract
async function getContract(signer) {
    if (signer) {
        const contract = new ethers.Contract(nft.address, nft.abi, signer);
        return contract;
    }
    return null;
}

export { getContract }