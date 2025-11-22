// React imports
// import { useState } from "react"; // Currently unused
// Component imports
import ConnectWalletButton from "./components/ConnectWalletButton.jsx";
import MintCard from "./components/MintCard.jsx";
// Styles
import "./App.css";
// Wagmi hooks for wallet interaction
import { useAccount } from "wagmi";
import { useAppKit } from "@reown/appkit/react";

// Main App component - handles wallet connection state and renders appropriate UI
function App() {
  // Get connected wallet address
  const { address } = useAccount();
  // Hook to open wallet connection modal
  const { open } = useAppKit()

  return (
    <>
      {/* Main container with full height background */}
      <div className="min-h-screen bg-slate-300 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          {/* Conditional rendering based on wallet connection status */}
          {!address ? (
            // Show wallet connection UI when not connected
            <div className="bg-white rounded-2xl shadow-lg p-28 flex items-center justify-center">
              <ConnectWalletButton onClick={() => open()} />
            </div>
          ) : (
            // Show NFT minting interface when wallet is connected
            <MintCard account={address} />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
