import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import UserRequestPage from './pages/UserRequestPage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserRequestPage />
  </StrictMode>,
)
