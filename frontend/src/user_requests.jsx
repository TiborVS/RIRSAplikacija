import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/style.css'
import UserRequestPage from './pages/UserRequestPage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserRequestPage />
  </StrictMode>,
)
