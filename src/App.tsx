import { BrowserRouter } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { AtkTotalProvider } from './context/AtkTotalContext';
import { EquipProvider } from './context/EquipContext';
import { Router } from './Router';



export function App() {
  return (
    <BrowserRouter>
      <EquipProvider>
        <AtkTotalProvider>
          <Router />
          <ToastContainer position="top-right" autoClose={3000} toastClassName="bg-bgtextdark text-gold border-[4px] border-primary outline-[3px] outline outline-bgdarkblue font-bold text-outline-md"
            progressClassName="bg-gold" />
        </AtkTotalProvider>
      </EquipProvider>
    </BrowserRouter>
  )
}