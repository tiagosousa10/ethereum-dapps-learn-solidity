//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract NFTMarketplace is Ownable {
    uint256 public marketplaceFee = 250; // 2.5%
    uint256 public listingCounter = 0;

    uint256 public constant MAX_FEE = 1000; // 10%

    struct Listing {
        uint256 listingId;
        address nftContract;
        uint256 tokenId;
        address seller;
        uint256 price;
        bool active;
    }

    mapping(uint256 => Listing) public listings;
    mapping(address => mapping(uint256 => uint256)) public nftToListing;

    event ListingCreated(
        uint256 indexed listingId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        uint256 price);

    event ListingCancelled(uint256 indexed listingId);
    event MarketPlaceCreated(address indexed owner);

    event ListingPurchased(
        uint256 indexed listingId,
        address indexed buyer,
        uint256 price
    );
    event MarketPlaceFeeUpdated(uint256 newFee);


    constructor() Ownable(msg.sender) {
        emit MarketPlaceCreated(msg.sender);
    }

    function createListing(address nftContract, uint256 tokenId, uint256 price) external {
        require(price > 0 , "Price must be greater than 0");
        require(nftContract != address(0), "Invalid NFT address");

        require(IERC721(nftContract).ownerOf(tokenId) == msg.sender, "You are not the owner of this NFT");

        require(IERC721(nftContract).isApprovedForAll(msg.sender, address(this)) || IERC721(nftContract).getApproved(tokenId) == address(this), "You are not the approved contract for this NFT");

        listingCounter += 1;

        listings[listingCounter] = Listing({
            listingId: listingCounter,
            nftContract: nftContract,
            tokenId: tokenId,
            seller: msg.sender,
            price: price,
            active: true
        });

        nftToListing[nftContract][tokenId] = listingCounter;

        emit ListingCreated(listingCounter, nftContract, tokenId, msg.sender, price);

    }

    function cancelListing(uint256 listingId) external {
        Listing storage listing = listings[listingId];
        require(listing.active, "Listing is not active");

        require(listing.seller == msg.sender, "You are not the seller of this listing");

        listing.active = false;

        nftToListing[listing.nftContract][listing.tokenId] = 0;

        emit ListingCancelled(listingId);
    }

    //Purchase
    function purchaseListing(uint256 listingId) external payable {
        Listing storage listing = listings[listingId];
        require(listing.active, "Listing is not active");
        require(listing.price >= msg.value , "Insufficient funds");
        require(msg.sender === listing.seller, "Cannot purchase your own listing");

        listing.active = false;
        nftToListing[listing.nftContract][listing.tokenId] = 0;

        IERC721(listing.nftContract).safeTransferFrom(
            listing.seller,
            msg.sender,
            listing.tokenId
        )

        uint256 fee = (listing.price * marketplaceFee) /10000;
        uint256 sellerAmount = listing.price - fee;

        payable(listing.seller).transfer(sellerAmount);

        if(msg.value > listing.price) {
            payable(msg.sender).transfer(msg.value - listing.price);
        }

        emit ListingPurchased(listingId, msg.sender, listing.price);

    }


    //marketplace fee

    function withdrawFees() external onlyOwner {
        uint256 balance = address(this).balance;

        require(balance > 0, "No fees to withdraw");
        payable(owner()).transfer(balance);
    }

    function updateMarketplaceFee(uint256 newFee) external onlyOwner {
        require(newFee <= MAX_FEE, "Fee cannot be greater than 10%");
        marketplaceFee = newFee;
        emit MarketPlaceFeeUpdated(newFee);
    }
}
