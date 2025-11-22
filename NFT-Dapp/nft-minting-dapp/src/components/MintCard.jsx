// React imports
// Wagmi hooks for smart contract interactions
import { useReadContract, useWriteContract } from "wagmi";
// Smart contract configuration
import { constants } from "../../utils/constants";
// Utility to format Wei to Ether
import { formatEther } from "viem";
// Viem client for transaction handling
import { publicClient } from "../../utils/viem";
import { useState } from "react";

// NFT minting interface component
export default function MintCard({ account }) {
  const { data: price } = useReadContract({
    address: constants.nftAddress,
    abi: constants.nftABI,
    functionName: "price",
  });

  const { data: minted } = useReadContract({
    address: constants.nftAddress,
    abi: constants.nftABI,
    functionName: "totalSupply",
  });

  const { writeContractAsync } = useWriteContract();

  // Handle NFT minting process
  const handleMint = async () => {
    try {
      const tx = await writeContractAsync({
        address: constants.nftAddress,
        abi: constants.nftABI,
        functionName: "mint",
        value: price,
        args: [account],
      });

      const receipt = await publicClient.waitForTransactionReceipt({
        hash: tx,
      });

      if (receipt.status === "success") {
        alert("NFT minted successfully!");
      } else {
        alert("NFT minting failed!");
      }
    } catch (error) {
      console.log("Error while minting NFT", error.message);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
      {/* Collection title */}
      <h2 className="text-2xl font-semibold mb-4">RoboBots Collection</h2>

      {/* NFT preview image */}
      <img
        src="/assets/nft.gif"
        alt="Mint Preview"
        className="w-48 h-48 object-cover mx-auto rounded-lg mb-4"
      />

      {/* Display minting statistics */}
      <p className="mb-2">Minted: {minted}</p>

      {/* Show truncated wallet address */}
      <p className="mb-1 text-sm text-gray-600">
        Account: {account.slice(0, 4) + "...." + account.slice(-4)}
      </p>

      {/* Display mint price in ETH */}
      <p className="mb-4 text-sm text-gray-600">
        Price: {formatEther(price ?? 0n)} Ξ
      </p>

      {/* Mint button */}
      <button
        type="button"
        onClick={handleMint}
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
      >
        Mint
      </button>
    </div>
  );
}
