// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract EvolveeNFT is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
	using Counters for Counters.Counter;

	Counters.Counter private _tokenIdCounter;

	constructor() ERC721("EvolveeNFT", "EVVNFT") {}

	function safeMint(address to, string memory nftTokenURI) public onlyOwner {
		_safeMint(to, _tokenIdCounter.current());
		_setTokenURI(_tokenIdCounter.current(), nftTokenURI);
		_tokenIdCounter.increment();
	}

	// The following functions are overrides required by Solidity.
	function _burn(uint256 tokenId)
		internal
		override(ERC721, ERC721URIStorage)
	{
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

	function currentCounter() public view returns (uint256) {
		return _tokenIdCounter.current();
	}

	function freeMint(address to, string memory nftTokenURI) public {
		_safeMint(to, _tokenIdCounter.current());
		_setTokenURI(_tokenIdCounter.current(), nftTokenURI);
		_tokenIdCounter.increment();
	}
}
