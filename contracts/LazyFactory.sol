//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
pragma abicoder v2; // required to accept structs as function parameters

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "hardhat/console.sol";

contract LazyFactory is
    ERC721URIStorage,
    EIP712,
    AccessControl,
    ReentrancyGuard
{
    using Counters for Counters.Counter;
    Counters.Counter private tokenCount;
    string private constant SIGNING_DOMAIN = "PEPSI_COKE";
    string private constant SIGNATURE_VERSION = "1";
    bytes32 public constant SIGNER_ROLE = keccak256("SIGNER_ROLE");

    struct Voucher {
        string firstName;
        string lastName;
        string tokenUri;
        string content;
        bytes signature;
    }

    mapping(address => uint256) private balanceByAddress;
    event fallingBack(string);

    constructor(
        string memory name,
        string memory symbol,
        address payable deployer
    ) ERC721(name, symbol) EIP712(SIGNING_DOMAIN, SIGNATURE_VERSION) {
        _setupRole(SIGNER_ROLE, deployer);
    }

    function redeem(Voucher calldata voucher) public payable nonReentrant {
        uint256 tokenId = tokenCount.current();
        address signer = _verify(voucher);
        require(hasRole(SIGNER_ROLE, signer), "Invalid Signature");

        _mint(signer, tokenId);
        _setTokenURI(tokenId, voucher.tokenUri);

        // transfer the token to the buyer
        _transfer(signer, signer, tokenId);
        tokenCount.increment();
    }

    function _hash(Voucher calldata voucher) internal view returns (bytes32) {
        return
            // _hashTypedDataV4(bytes32 structHash) → bytes32
            _hashTypedDataV4(
                keccak256(
                    abi.encode(
                        keccak256(
                            "Voucher(string firstName,string lastName,string tokenUri,string content)"
                        ),
                        voucher.firstName,
                        voucher.lastName,
                        voucher.lastName,
                        keccak256(bytes(voucher.tokenUri)),
                        keccak256(bytes(voucher.content))
                    )
                )
            );
    }

    // returns signer address
    function _verify(Voucher calldata voucher) internal view returns (address) {
        bytes32 digest = _hash(voucher);
        return ECDSA.recover(digest, voucher.signature);
    }

    function getChainID() external view returns (uint256) {
        uint256 id;
        // https://docs.soliditylang.org/en/v0.8.7/yul.html?highlight=chainid#evm-dialect
        assembly {
            id := chainid()
        }
        return id;
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(AccessControl, ERC721)
        returns (bool)
    {
        return
            ERC721.supportsInterface(interfaceId) ||
            AccessControl.supportsInterface(interfaceId);
    }
}
