import { BrowserRouter } from 'react-router';
import { AtkTotalProvider } from './context/AtkTotalContext';
import './global.css';
import { Router } from './Router';



export function App() {
  return (
    <BrowserRouter>
      <AtkTotalProvider>
        <Router />
      </AtkTotalProvider>
    </BrowserRouter>
  )
}