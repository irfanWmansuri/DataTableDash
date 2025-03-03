import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import  DataTables  from './DataTables'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataTables />
  </StrictMode>,
)
