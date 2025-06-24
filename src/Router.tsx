import { Route, Routes } from "react-router";
import { Collection } from "./Pages/Collection/Collection";
import { Details } from "./Pages/Details/Details";
import { Equip } from "./Pages/Equip/Equip";
import { Pet } from "./Pages/Pet/Pet";
import { Runes } from "./Pages/Runes/Runes";
import { Titles } from "./Pages/Titles/Titles";
import { Visual } from "./Pages/Visual/Visual";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Equip />} />
      <Route path="/visual" element={<Visual />} />
      <Route path="/pet" element={<Pet />} />
      <Route path="/runas" element={<Runes />} />
      <Route path="/titulos" element={<Titles />} />
      <Route path="/colecao" element={<Collection />} />
      <Route path="/detalhes" element={<Details />} />
    </Routes>)
}