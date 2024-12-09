import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import RegisterPage from './pages/RegisterPage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RegisterPage />
  </StrictMode>,
)
