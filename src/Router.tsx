import { Route, Routes } from "react-router";
import { Equip } from "./Pages/Equip/Equip";
import { Visual } from "./Pages/Visual/Visual";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Equip />} />
      <Route path="/visual" element={<Visual />} />
    </Routes>)
}