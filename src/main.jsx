import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { EntranceCurtain } from './EntranceCurtain.jsx'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <EntranceCurtain />
  </StrictMode>,
)
