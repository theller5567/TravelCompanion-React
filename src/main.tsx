import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BudgetProvider } from './contexts/budgetProvider'
import './index.css'
import './styles/main.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BudgetProvider>
      <App />
    </BudgetProvider>
  </StrictMode>,
)
