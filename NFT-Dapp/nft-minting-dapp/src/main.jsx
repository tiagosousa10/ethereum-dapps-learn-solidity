// React imports
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Global styles
import './index.css'
// Main App component
import App from './App.jsx'
// Wallet provider wrapper
import { AppKitProvider } from './AppkitProvider.jsx'

// Render the React app to the DOM
// StrictMode helps identify potential problems in the application
// AppKitProvider wraps the app with wallet connection functionality
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppKitProvider>
      <App />
    </AppKitProvider>
  </StrictMode>,
)
