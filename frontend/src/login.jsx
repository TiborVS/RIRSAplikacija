import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/style.css'
import LoginPage from './pages/LoginPage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoginPage />
  </StrictMode>,
)
