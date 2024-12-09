import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AdminRequestPage from './pages/AdminRequestPage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminRequestPage />
  </StrictMode>,
)
