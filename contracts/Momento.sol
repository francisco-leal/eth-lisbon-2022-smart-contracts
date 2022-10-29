pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

contract Momento is ERC721, ERC721Enumerable, AccessControl {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string private _baseURIExtended;
    mapping (uint256 => string) _tokenURIs;

    // Not sure we need this
    // mapping(address => mapping(address => bool)) public allowList;

    constructor(address _owner, string memory _ticker) ERC721("Momento", _ticker) {
      _setupRole(DEFAULT_ADMIN_ROLE, _owner);
    }

    function mint(address _to, string memory _uri) public {
        _tokenIds.increment();
        uint256 id = _tokenIds.current();

        _tokenURIs[id] = _uri;
        _safeMint(_to, id);
    }

    function burn(uint256 _id) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _burn(_id);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseURIExtended;
    }

    function setBaseURI(string memory baseURI_) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _baseURIExtended = baseURI_;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory uri = _tokenURIs[tokenId];

        require(bytes(uri).length != 0, "URI is not set for this tokenId");

        return uri;
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }
}
