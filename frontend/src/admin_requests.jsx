import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/style.css'
import AdminRequestPage from './pages/AdminRequestPage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminRequestPage />
  </StrictMode>,
)
