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

    struct Auction {
        uint256 auctionId;
        address nftContract;
        uint256 tokenId;
        address seller;
        uint256 startingPrice;
        uint256 currentBid;
        address currentBider;
        uint256 endTime;
        bool active;
    }

    mapping(uint256 => Listing) public listings;
    mapping(address => mapping(uint256 => uint256)) public nftToListing;

    mapping(uint256 => Auction) public auctions;
    mapping(address => mapping(uint256 => uint256)) public nftToAuction;

    event ListingCreated(
        uint256 indexed listingId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        uint256 price
    );

    event AuctionCreated(
        uint256 indexed auctionId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        uint256 startingPrice,
        uint256 endTime
    );

    event BidPlaced(
        uint256 indexed auctionId,
        address indexed bidded,
        uint256 amount
    );
    event AuctionEnded(
        uint256 indexed auctionId,
        address indexed winner,
        uint256 amount
    );

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

    //Auction
    function createAuction(address nftContract, uint256 tokenId, uint256 startingPrice, uint256 duration) external {
            require(price > 0 , "Price must be greater than 0");
            require(nftContract != address(0), "Invalid NFT address");

            require(IERC721(nftContract).ownerOf(tokenId) == msg.sender, "You are not the owner of this NFT");

            require(duration >= 1 hours && duration <=30 days, "Duration must be between 1 hour and 30 days");

            require(nftToAuction[nftContract][tokenId] == 0, "NFT is already listed for auction");

            require(IERC721(nftContract).isApprovedForAll(msg.sender, address(this)) || IERC721(nftContract).getApproved(tokenId) == address(this), "You are not the approved contract for this NFT");

            listingCounter += 1;

            auctions[listingCounter] = Auction({
                auctionId: listingCounter,
                nftContract: nftContract,
                tokenId: tokenId,
                seller: msg.sender,
                startingPrice: startingPrice,
                currentBid : 0,
                currentBider: address(0),
                endTime: block.timestamp + duration,
                active: true
            });

            nftToAuction[nftContract][tokenId] = listingCounter;

            emit AuctionCreated(listingCounter, nftContract, tokenId, msg.sender, startingPrice, block.timestamp + duration);

        }



    function placeBid(uint256 auctionId) external payable {
        Auction storage auction = auctions[auctionId];

        require(auction.active, "Auction is not active");
        require(block.timestamp < auction.endTime, "Auction has ended");
        require(msg.sender != auction.seller, "You cannot bid on your own listing");
        require(msg.value > auction.currentBid, "Bid must be higher than current bid");
        require(msg.value >= acution.startingPrice, "Bid must be higher than starting price");

        if(auction.currentBider != address(0) {
            payable(auction.currentBider).transfer(auction.currentBid);
        }

        auction.currentBid = msg.value;
        auction.currentBider = msg.sender;

        if(auction.endTime - block.timestamp < 10 minutes) {
            auction.endTime = block.timestamp + 10 minutes;
        }

        emit BidPlaced(auctionId, msg.sender, msg.value);
    }

    function endAuction(uint256 auctionId) external payable {
        Auction storage auction = auctions[auctionId];

        require(auction.active, "Auction is not active");
        require(block.timestamp < auction.endTime, "Auction has ended");

        auction.active = false;
        nftToAuction[auction.nftContract][auction.tokenId] = 0;

        if(auction.currentBider != address(0)) {
            uint256 fee = (auction.currentBid * marketplaceFee) / 10000;
            uint256 sellerAmount = auction.currentBid - fee;

            IERC721(auction.nftContract).safeTransferFrom(
                auction.seller,
                auction.currentBider,
                auction.tokenId
            )

            payable(auction.seller).transfer(sellerAmount);

            emit AuctionEnded(auctionId, auction.currentBider, auction.currentBid);
        } else {
            emit AuctionEnded(auctionId, address(0), 0);
        }
    }
}
