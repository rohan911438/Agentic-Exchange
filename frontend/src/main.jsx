import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Log a check to verify polyfills are correctly loaded from index.html
if (typeof window !== 'undefined') {
  console.log('[DAPP_DEBUG] Polyfills Check - Buffer:', !!window.Buffer, 'process:', !!window.process);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
