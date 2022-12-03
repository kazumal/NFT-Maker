// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMaker is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("testCollection", "TC") {}

    mapping(uint => string) tokenIdToTokenURI;

    function setNewOwner(address _newOwner) private onlyOwner {
        transferOwnership(_newOwner);
    }

    function mintToken(
        address _to,
        string memory _tokenURI
    ) public onlyOwner returns (uint256) {
        _tokenIds.increment();

        uint256 id = _tokenIds.current();
        _safeMint(_to, id);
        tokenIdToTokenURI[id] = _tokenURI;

        return id;
    }

    function setTokenURI(
        uint256 _tokenId,
        string memory _tokenURI
    ) public onlyOwner returns (uint256 tokenId) {
        tokenIdToTokenURI[_tokenId] = _tokenURI;
        return (_tokenId);
    }

    function tokenURI(
        uint256 _tokenId
    ) public view virtual override returns (string memory) {
        string memory TokenURI = tokenIdToTokenURI[_tokenId];
        return (TokenURI);
    }
}
