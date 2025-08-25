// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TicketNFT is ERC721, Ownable {
    uint256 public nextTicketId = 1;          // start at 1 (change to 0 if you like)
    string private _baseTokenURI;
    mapping(uint256 => bool) public used;     // optional: mark tickets as used
    address public verifier;                  // optional: who can scan/mark used

    event TicketMinted(address indexed to, uint256 indexed tokenId);
    event TicketUsed(uint256 indexed tokenId, address indexed by);

    constructor(string memory initialBaseURI)
        ERC721("HackathonTicket", "HACKT")
        Ownable(msg.sender)                   // OZ v5: pass initial owner
    {
        _baseTokenURI = initialBaseURI;       // e.g. "ipfs://Qm.../"
    }

    // ----------------- MINTING -----------------

    /// Auto-increment mint (no tokenId param)
    function mintTicket(address to) external onlyOwner returns (uint256) {
        uint256 id = nextTicketId++;
        _safeMint(to, id);
        emit TicketMinted(to, id);
        return id;
    }

    /// Explicit-id mint (useful if seat number == tokenId)
    function mintTicketWithId(address to, uint256 tokenId) external onlyOwner {
        require(_ownerOf(tokenId) == address(0), "ID already exists");
        _safeMint(to, tokenId);
        emit TicketMinted(to, tokenId);
        if (tokenId >= nextTicketId) nextTicketId = tokenId + 1;
    }

    // -------------- SOULBOUND LOGIC ------------

    /// Block transfers; allow only mint (from=0) and burn (to=0)
    function _update(address to, uint256 tokenId, address auth)
        internal
        override
        returns (address)
    {
        address from = _ownerOf(tokenId);
        require(from == address(0) || to == address(0), "Tickets are non-transferable");
        return super._update(to, tokenId, auth);
    }

    // -------------- OPTIONAL EXTRAS ------------

    // Base URI for metadata (tokenURI = base + tokenId)
    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    function setBaseURI(string calldata newBaseURI) external onlyOwner {
        _baseTokenURI = newBaseURI;
    }

    // Simple “scan” flow to prevent re-entry at venue
    function setVerifier(address v) external onlyOwner { verifier = v; }

    function markUsed(uint256 tokenId) external {
        require(msg.sender == owner() || msg.sender == verifier, "Not authorized");
        require(_ownerOf(tokenId) != address(0), "Nonexistent token");
        require(!used[tokenId], "Already used");
        used[tokenId] = true;
        emit TicketUsed(tokenId, msg.sender);
    }

    // Optional burn (e.g., after use)
    function burn(uint256 tokenId) external {
        require(msg.sender == owner() || msg.sender == verifier, "Not authorized");
        require(_ownerOf(tokenId) != address(0), "Nonexistent token");
        _burn(tokenId);
    }
}
