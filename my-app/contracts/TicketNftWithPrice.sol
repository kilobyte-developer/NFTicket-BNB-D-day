// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TicketNFT is ERC721, Ownable {
    uint256 public nextTicketId = 1;          // start IDs at 1
    string private _baseTokenURI;
    mapping(uint256 => bool) public used;     // mark tickets as used
    address public verifier;                  // who can scan/mark used
    uint256 public ticketPrice = 0.01 ether;  // default ticket price

    event TicketMinted(address indexed to, uint256 indexed tokenId);
    event TicketUsed(uint256 indexed tokenId, address indexed by);
    event TicketPriceUpdated(uint256 newPrice);
    event FundsWithdrawn(address indexed to, uint256 amount);

    constructor(string memory initialBaseURI)
        ERC721("HackathonTicket", "HACKT")
        Ownable(msg.sender) // OZ v5 style constructor
    {
        _baseTokenURI = initialBaseURI;
    }

    // ----------------- ADMIN FUNCTIONS -----------------

    function setBaseURI(string calldata newBaseURI) external onlyOwner {
        _baseTokenURI = newBaseURI;
    }

    function setVerifier(address v) external onlyOwner {
        verifier = v;
    }

    function setTicketPrice(uint256 newPrice) external onlyOwner {
        ticketPrice = newPrice;
        emit TicketPriceUpdated(newPrice);
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds");
        payable(owner()).transfer(balance);
        emit FundsWithdrawn(owner(), balance);
    }

    // ----------------- MINTING -----------------

    /// Auto-increment mint (with crypto payment)
    function mintTicket(address to) external payable returns (uint256) {
        require(msg.value == ticketPrice, "Incorrect payment");

        uint256 id = nextTicketId++;
        _safeMint(to, id);
        emit TicketMinted(to, id);
        return id;
    }

    /// Explicit-id mint (for seat numbers, etc.)
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

    // -------------- TICKET USAGE ------------

    function markUsed(uint256 tokenId) external {
        require(msg.sender == owner() || msg.sender == verifier, "Not authorized");
        require(_ownerOf(tokenId) != address(0), "Nonexistent token");
        require(!used[tokenId], "Already used");
        used[tokenId] = true;
        emit TicketUsed(tokenId, msg.sender);
    }

    function burn(uint256 tokenId) external {
        require(msg.sender == owner() || msg.sender == verifier, "Not authorized");
        require(_ownerOf(tokenId) != address(0), "Nonexistent token");
        _burn(tokenId);
    }

    // -------------- METADATA ------------

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }
}
