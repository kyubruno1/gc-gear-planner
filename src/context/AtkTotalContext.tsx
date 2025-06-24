import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useEquip } from "./EquipContext";

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

interface AtkTotalContextType {
  atkTotal: number;
  characterStatus: CharacterStatus | null;
  addSource: (id: string, status: CharacterStatus) => void;
  removeSource: (id: string) => void;
  clearSources: () => void;
}

const AtkTotalContext = createContext<AtkTotalContextType | undefined>(
  undefined
);

export function AtkTotalProvider({ children }: { children: ReactNode }) {
  const { equipped, calculateBonusExtras, flattenBonusExtras } = useEquip();

  //STATUS BASE DO PERSONAGEM
  const statusBase: CharacterStatus = {
    total_attack: 0,
    attack: 1000,
    crit_chance: 10,
    crit_damage: 50,
    sp_attack: 500,
    mp_rec: 30,
    hell_spear_chance: 5,
    hell_spear: 80,
    taint_resistance: 10,
    defense: 800,
    hp: 5000,
    crit_resistance: 10,
    sp_def: 400,
    hp_rec: 10,
    counter_attack_resistance: 5,
    exp: 0,
    gp: 0,
  };

  const initialSources: Record<string, CharacterStatus> = {
    base: statusBase,
  };

  const [sources, setSources] = useState(initialSources);
  const [characterStatus, setCharacterStatus] = useState<CharacterStatus>(
    sumSources(initialSources)
  );
  const [atkTotal, setAtkTotal] = useState<number>(
    calculateAtkTotal(characterStatus)
  );

  function sumSources(sources: Record<string, CharacterStatus>): CharacterStatus {
    const empty: CharacterStatus = {
      total_attack: 0,
      attack: 0,
      crit_chance: 0,
      crit_damage: 0,
      sp_attack: 0,
      mp_rec: 0,
      hell_spear_chance: 0,
      hell_spear: 0,
      taint_resistance: 0,
      defense: 0,
      hp: 0,
      crit_resistance: 0,
      sp_def: 0,
      hp_rec: 0,
      counter_attack_resistance: 0,
      exp: 0,
      gp: 0,
    };

    return Object.values(sources).reduce((acc, cur) => {
      for (const key in acc) {
        acc[key as keyof CharacterStatus] += cur[key as keyof CharacterStatus];
      }
      return acc;
    }, empty);
  }

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

  function addSource(id: string, status: CharacterStatus) {
    setSources((prev) => {
      const updated = { ...prev, [id]: status };
      const summed = sumSources(updated);
      setCharacterStatus(summed);
      setAtkTotal(calculateAtkTotal(summed));
      return updated;
    });
  }

  function removeSource(id: string) {
    if (id === "base") return;
    setSources((prev) => {
      const updated = { ...prev };
      delete updated[id];
      const summed = sumSources(updated);
      setCharacterStatus(summed);
      setAtkTotal(calculateAtkTotal(summed));
      return updated;
    });
  }

  function clearSources() {
    setSources({ base: statusBase });
    setCharacterStatus(statusBase);
    setAtkTotal(calculateAtkTotal(statusBase));
  }

  function normalizeCharacterStatus(partial: Partial<CharacterStatus>): CharacterStatus {
    const empty: CharacterStatus = {
      total_attack: 0,
      attack: 0,
      crit_chance: 0,
      crit_damage: 0,
      sp_attack: 0,
      mp_rec: 0,
      hell_spear_chance: 0,
      hell_spear: 0,
      taint_resistance: 0,
      defense: 0,
      hp: 0,
      crit_resistance: 0,
      sp_def: 0,
      hp_rec: 0,
      counter_attack_resistance: 0,
      exp: 0,
      gp: 0,
    };

    return { ...empty, ...partial };
  }


  // ⬇ Atualiza todos os bônus extras com base nos sets
  function updateBonusSetsSources() {
    const bonuses = calculateBonusExtras();
    const flatBonus = flattenBonusExtras(bonuses);

    setSources((prev) => {
      // Remove todos os antigos que são bonusSet
      const updated = Object.fromEntries(
        Object.entries(prev).filter(([key]) => !key.startsWith("bonusSet:"))
      );

      // Adiciona os novos bonusSet
      for (const bonusType in bonuses) {
        updated["bonusSet:all"] = normalizeCharacterStatus(flatBonus);
      }

      const summed = sumSources(updated);
      setCharacterStatus(summed);
      setAtkTotal(calculateAtkTotal(summed));
      return updated;
    });
  }

  // Atualiza os bônus quando os equipamentos mudarem
  useEffect(() => {
    updateBonusSetsSources();
  }, [equipped]);

  return (
    <AtkTotalContext.Provider
      value={{ atkTotal, characterStatus, addSource, removeSource, clearSources }}
    >
      {children}
    </AtkTotalContext.Provider>
  );
}

export function useAtkTotal() {
  const context = useContext(AtkTotalContext);
  if (!context) throw new Error("useAtkTotal deve ser usado dentro de AtkTotalProvider");
  return context;
}
