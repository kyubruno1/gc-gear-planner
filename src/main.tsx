import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import { AtkTotalProvider } from './context/AtkTotalContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AtkTotalProvider>
      <App />
    </AtkTotalProvider>
  </StrictMode>,
)
