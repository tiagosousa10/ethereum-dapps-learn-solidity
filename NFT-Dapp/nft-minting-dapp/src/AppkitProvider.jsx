// Reown AppKit for wallet connection
import { createAppKit } from '@reown/appkit/react'
// Wagmi for Ethereum interactions
import { WagmiProvider } from 'wagmi'
// Local development network (Anvil/Hardhat)
import { anvil } from '@reown/appkit/networks'
// React Query for data fetching and caching
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// Wagmi adapter for AppKit
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

// Create QueryClient instance for managing server state
const queryClient = new QueryClient()

// Reown project ID for wallet connection
const projectId = '7ca7cf94ee5b1caba51b405ce99386f0'

// App metadata displayed in wallet connection modal
const metadata = {
    name: 'AppKit',
    description: 'AppKit Example',
    url: 'https://example.com',
    icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// Supported blockchain networks (using local Anvil network for development)
const networks = [anvil]

// Configure Wagmi adapter for blockchain interactions
const wagmiAdapter = new WagmiAdapter({
    networks,
    projectId,
    ssr: true // Enable server-side rendering support
})

// Initialize AppKit with configuration
createAppKit({
    adapters: [wagmiAdapter],
    networks,
    projectId,
    metadata,
})

// Provider component that wraps the app with wallet and query functionality
export function AppKitProvider({ children }) {
    return (
        <WagmiProvider config={wagmiAdapter.wagmiConfig}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </WagmiProvider>
    )
}