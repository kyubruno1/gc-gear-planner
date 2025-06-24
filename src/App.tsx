import { BrowserRouter } from 'react-router';
import { AtkTotalProvider } from './context/AtkTotalContext';
import { EquipProvider } from './context/EquipContext';
import './global.css';
import { Router } from './Router';



export function App() {
  return (
    <BrowserRouter>
      <EquipProvider>
        <AtkTotalProvider>
          <Router />
        </AtkTotalProvider>
      </EquipProvider>
    </BrowserRouter>
  )
}