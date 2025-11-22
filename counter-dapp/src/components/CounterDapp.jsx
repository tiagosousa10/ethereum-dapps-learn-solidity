import React, { useState } from "react";
import { Wallet, Plus, Minus, Check, RefreshCcw } from "lucide-react";
import { useAppKit } from "@reown/appkit/react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { constants } from "../utils/constants";
import { anvil } from "viem/chains";
import { publicClient } from "../utils/viem";

const CounterDapp = () => {
  const [result, setResult] = useState(null);
  const { open, close } = useAppKit();
  const { isConnected, address } = useAccount();
  const { data: currentCount, isLoading } = useReadContract({
    abi: constants.counterABI.abi,
    address: constants.counterAddress,
    functionName: "get",
    chainId: anvil.id,
  });

  const { writeContractAsync } = useWriteContract({});

  const handleIncDec = async (isInc) => {
    try {
      const tx = await writeContractAsync({
        abi: constants.counterABI.abi,
        address: constants.counterAddress,
        functionName: isInc ? "inc" : "dec",
        args: [],
      });

      const receipt = publicClient.waitForTransactionReceipt({
        hast: tx,
      });

      if ((receipt.status = "success")) {
        setResult({
          status: "success",
        });
      } else {
        setResult({
          status: "reverted",
        });
      }
    } catch (error) {
      console.log("error", error.message);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Counter DApp (Dummy)
          </h1>
          <p className="text-gray-600 text-lg">
            UI-only demo using local state
          </p>
        </div>

        {/* Main Card */}
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Wallet Connection Section */}
            <div className="mb-8">
              {!isConnected ? (
                <button
                  onClick={() => open()}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Wallet size={20} />
                  Connect Wallet
                </button>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-green-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-medium">Connected</span>
                  </div>
                  <p className="text-sm text-green-600 mt-1 font-mono">
                    {address || "0x742d...C2F3"}
                  </p>
                </div>
              )}
            </div>

            {/* Counter Display */}
            <div className="text-center mb-8">
              <div className="bg-gray-50 rounded-2xl p-8 mb-6">
                <h2 className="text-lg font-medium text-gray-600 mb-4">
                  Current Count
                </h2>
                <div className="text-6xl font-bold text-indigo-600 mb-2">
                  {isLoading ? (
                    <RefreshCcw className="animate-spin mx-auto" size={60} />
                  ) : (
                    <p>{currentCount || "0"}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleIncDec(false)}
                  className="bg-red-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-red-600 transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!isConnected}
                >
                  <Minus size={18} />
                  Decrease
                </button>

                <button
                  onClick={() => handleIncDec(true)}
                  className="bg-green-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-green-600 transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!isConnected}
                >
                  <Plus size={18} />
                  Increase
                </button>
              </div>

              {/* Status */}
              {result && (
                <div
                  className={`${
                    result.status === "success"
                      ? "bg-green-50 border-green-200"
                      : "bg-red-50 border-red-200"
                  } border rounded-xl p-4`}
                >
                  <div
                    className={`flex items-center gap-2 ${
                      result.status === "success"
                        ? "text-green-700"
                        : "text-red-700"
                    }`}
                  >
                    <Check size={16} />
                    <span className="font-medium">
                      Transaction {result.status}
                    </span>
                  </div>
                </div>
              )}

              {/* Connection Required Message */}
              {!isConnected && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-blue-700">
                    <Wallet size={16} />
                    <span className="font-medium">Wallet Required</span>
                  </div>
                  <p className="text-sm text-blue-600 mt-1">
                    Connect your wallet to interact with the counter
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Footer Info */}
          <div className="text-center mt-8 text-gray-500 text-sm">
            <p>Contract Address: 0xDEAD...BEEF (Dummy)</p>
            <p>Network: Local Dummy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounterDapp;
