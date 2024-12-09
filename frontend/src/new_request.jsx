import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import NewRequestPage from './pages/NewRequestPage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NewRequestPage />
  </StrictMode>,
)
