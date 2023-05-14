// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract HB is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    address private _treasurywallet;
    address private _liquiditywallet;

    constructor(address trwallet, address liqwallet) ERC721("hib", "hb") {

        require(trwallet!=address(0), "TRWALLET_ERROR");
        require(liqwallet!=address(0), "LIQWALLET_ERROR");
        _treasurywallet=trwallet;
        _liquiditywallet=liqwallet;
    }

     // set treasury wallet and liquidity wallets
    function setWallets (address treasurywallet, address liquiditywallet) public  onlyOwner{
        _treasurywallet=treasurywallet;
        _liquiditywallet=liquiditywallet;
    }

      function safeMint(uint256 price, string memory uri) public payable  returns (uint256) {
 
        //sell price should be greater than 0 
        require(price>0, "SELLPRICE_ERROR");

        //%10 of price is royalty fee
        require((price/10)==msg.value,"MINTPRICE_ERROR");
        

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri); 
         
         // %6 of royalty fee transfer to treasury wallet
        payable(_treasurywallet).transfer((msg.value*3)/50);

        // %4 of royalty fee transfer to liquidity wallet
        payable(_liquiditywallet).transfer((msg.value*2)/50); 


        return tokenId; 


    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}