import { createContext, ReactNode, useContext, useState } from "react";

export interface CharacterStatus {
  total_attack: number;
  attack: number;
  crit_chance: number; // %
  crit_damage: number; // %
  sp_attack: number;
  mp_rec: number; // %
  hell_spear_chance: number; // %
  hell_spear: number;
  taint_resistance: number; // %
  defense: number;
  hp: number;
  crit_resistance: number; // %
  sp_def: number;
  hp_rec: number; // %
  counter_attack_resistance: number; // %
  exp: number; // %
  gp: number; // %
}

// Função para calcular ATK_Total
function calculateAtkTotal(character: CharacterStatus): number {
  const {
    attack,
    crit_chance,
    crit_damage,
    sp_attack,
    mp_rec,
    defense: def,
    sp_def,
    hp,
    hp_rec,
  } = character;

  return (
    ((1 - crit_chance / 100) + (crit_chance / 100) * (1.2 + crit_damage / 100)) *
    ((attack * 27 + (attack + sp_attack) * 20 * (1 + mp_rec / 100)) / 33.75) +
    0.7 * (def + sp_def / 5 + hp * (1 + hp_rec / 100))
  );
}

interface AtkTotalContextType {
  atkTotal: number;
  characterStatus: CharacterStatus | null;
  updateStatus: (status: CharacterStatus) => void;
}

const AtkTotalContext = createContext<AtkTotalContextType | undefined>(undefined);

export function AtkTotalProvider({ children }: { children: ReactNode }) {
  const [characterStatus, setCharacterStatus] = useState<CharacterStatus | null>(
    null
  );
  const [atkTotal, setAtkTotal] = useState(0);

  function updateStatus(status: CharacterStatus) {
    setCharacterStatus(status);
    const newAtkTotal = calculateAtkTotal(status);
    setAtkTotal(newAtkTotal);
  }

  return (
    <AtkTotalContext.Provider
      value={{ atkTotal, characterStatus, updateStatus }}
    >
      {children}
    </AtkTotalContext.Provider>
  );
}

export function useAtkTotal() {
  const context = useContext(AtkTotalContext);
  if (!context) {
    throw new Error("useAtkTotal deve ser usado dentro de AtkTotalProvider");
  }
  return context;
}
