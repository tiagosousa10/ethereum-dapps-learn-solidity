// Viem imports for blockchain client creation
import { createPublicClient, http } from "viem";
// Local development blockchain (Anvil/Hardhat)
import { anvil } from "viem/chains";

// Create a public client for reading blockchain data and sending transactions
// Uses the local Anvil network for development
export const publicClient = createPublicClient({
    chain: anvil, // Connect to local Anvil blockchain
    transport: http() // Use HTTP transport for communication
})