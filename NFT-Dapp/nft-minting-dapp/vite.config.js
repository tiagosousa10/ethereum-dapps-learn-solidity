// Vite configuration imports
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration for React development
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()], // Enable React support with Fast Refresh
})
