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
  crit_chance: number;
  crit_damage: number;
  sp_attack: number;
  mp_rec: number;
  hell_spear_chance: number;
  hell_spear: number;
  taint_resistance: number;
  defense: number;
  hp: number;
  crit_resistance: number;
  sp_def: number;
  hp_rec: number;
  counter_attack_resistance: number;
  exp: number;
  gp: number;
}

interface AtkTotalContextType {
  atkTotal: number;
  characterStatus: CharacterStatus | null;
  addSource: (id: string, status: Partial<CharacterStatus>) => void;
  removeSource: (id: string) => void;
  clearSources: () => void;
}

const AtkTotalContext = createContext<AtkTotalContextType | undefined>(undefined);

export function AtkTotalProvider({ children }: { children: ReactNode }) {
  const { equipped, calculateBonusExtras, flattenBonusExtras } = useEquip();

  // Status base inicial
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

  // Agora as fontes podem ser parciais (ex: props com só algumas stats)
  const [sources, setSources] = useState<Record<string, Partial<CharacterStatus>>>({
    base: statusBase,
  });
  const [characterStatus, setCharacterStatus] = useState<CharacterStatus>(statusBase);
  const [atkTotal, setAtkTotal] = useState<number>(calculateAtkTotal(statusBase));

  // Função para garantir que todos os campos existam (mesmo que 0)
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

  // Soma todas as fontes, normalizando cada uma antes para evitar undefined
  function sumSources(sources: Record<string, Partial<CharacterStatus>>): CharacterStatus {
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
      const norm = normalizeCharacterStatus(cur);
      for (const key in acc) {
        acc[key as keyof CharacterStatus] += norm[key as keyof CharacterStatus];
      }
      return acc;
    }, empty);
  }

  // Função de cálculo do ataque total (sua fórmula)
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

  // Atualiza/add nova fonte parcial
  function addSource(id: string, status: Partial<CharacterStatus>) {
    setSources((prev) => {
      const updated = { ...prev, [id]: status };
      const summed = sumSources(updated);
      setCharacterStatus(summed);
      setAtkTotal(calculateAtkTotal(summed));
      return updated;
    });
  }

  // Remove fonte por id
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

  // Extrai os status dos equipamentos e cartas, normalizando-os
  function extractStatusFromEquipments(): Record<string, Partial<CharacterStatus>> {
    const extracted: Record<string, Partial<CharacterStatus>> = {};

    for (const slot in equipped) {
      const item = equipped[slot];
      extracted[`equip:${slot}`] = normalizeCharacterStatus(item);

      if (item.cards && item.cards.length > 0) {
        item.cards.forEach((card, index) => {
          extracted[`equip:${slot}:card${index}`] = normalizeCharacterStatus(card);
        });
      }

      // Também inclui as props selecionadas do item (que são parciais)
      if (item.selectedProps) {
        extracted[`equip:${slot}:props`] = normalizeCharacterStatus(item.selectedProps);
      }
    }

    return extracted;
  }

  // Sempre que os equipamentos mudam, atualiza as fontes e status
  useEffect(() => {
    const bonusSets = calculateBonusExtras();
    const flatBonus = flattenBonusExtras(bonusSets);
    const normalizedBonus = normalizeCharacterStatus(flatBonus);

    const sourcesFromEquip = extractStatusFromEquipments();

    const merged: Record<string, Partial<CharacterStatus>> = {
      base: statusBase,
      ...sourcesFromEquip,
      "bonusSet:all": normalizedBonus,
    };

    setSources(merged);
    const summed = sumSources(merged);
    setCharacterStatus(summed);
    setAtkTotal(calculateAtkTotal(summed));
  }, [equipped]);

  return (
    <AtkTotalContext.Provider
      value={{
        atkTotal,
        characterStatus,
        addSource,
        removeSource,
        clearSources,
      }}
    >
      {children}
    </AtkTotalContext.Provider>
  );
}

export function useAtkTotal() {
  const context = useContext(AtkTotalContext);
  if (!context)
    throw new Error("useAtkTotal deve ser usado dentro de AtkTotalProvider");
  return context;
}
