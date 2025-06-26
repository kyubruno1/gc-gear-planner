import { createContext, ReactNode, useContext, useState } from "react";
import { StoneData } from "../components/StonesModal/StonesModal";
import bonusSets from '../data/bonus-set.json';
import { CharacterStatus } from "./AtkTotalContext";

export interface EquippedItem extends CharacterStatus {
  stone?: StoneData;
  name: string;
  type: string;
  img: string;
  bonusType: string;
  equipType?: string;
  grade: string;
  props: ItemProps;
  selectedProps?: Partial<ItemProps>;
  cards?: Card[];
}

export interface Card {
  name: string;
  img: string;
  [key: string]: any;
}

type ItemPropValue = number | { min: number; max: number };

export interface ItemProps {
  prop_level?: number;
  attack?: ItemPropValue;
  defense?: ItemPropValue;
  hp?: ItemPropValue;
  hp_rec?: ItemPropValue;
  mp_rec?: ItemPropValue;
  lv_min?: ItemPropValue;
  gp?: ItemPropValue;
  sp_attack?: ItemPropValue;
  sp_def?: ItemPropValue;
  crit_chance?: ItemPropValue;
  crit_damage?: ItemPropValue;
  taint_resistance?: ItemPropValue;
  back_attack?: ItemPropValue;
  exp?: ItemPropValue;
  hell_spear_chance?: ItemPropValue;
  hell_spear?: ItemPropValue;
}

export interface EquippedItems {
  [slot: string]: EquippedItem;
}

type EquipState = Record<string, EquippedItem>;

interface EquipContextType {
  equipped: EquipState;
  equipItem: (item: EquippedItem) => void;
  unequipItem: (type: string) => void;
  clearEquipments: () => void;
  countBonusType: (bonusType: string) => number;
  countAllBonusTypes: () => Record<string, number>;
  calculateBonusExtras: () => Partial<CharacterStatus>;
  flattenBonusExtras: (bonusesByType: Record<string, Partial<CharacterStatus>>) => Partial<CharacterStatus>;
  equipCards: (slot: string, cards: Card[]) => void;
  removeCardsFromSlot: (slot: string) => void;
  equipProps: (slot: string, selectedProps: Partial<ItemProps>) => void;
  extractSelectedPropsBonus: () => Partial<CharacterStatus>;
  equipStone: (slot: string, stone: StoneData) => void;
  unequipStone: (slot: string) => void;
}

const EquipContext = createContext<EquipContextType | undefined>(undefined);

export function EquipProvider({ children }: { children: ReactNode }) {
  const [equipped, setEquipped] = useState<EquipState>({});

  function equipItem(item: EquippedItem) {
    setEquipped((prev) => ({
      ...prev,
      [item.type]: item,
    }));
  }

  function unequipItem(type: string) {
    setEquipped((prev) => {
      const copy = { ...prev };
      delete copy[type];
      return copy;
    });
  }

  function clearEquipments() {
    setEquipped({});
  }

  function countBonusType(bonusType: string): number {
    const slotsWithBonus = new Set<string>();
    for (const slot in equipped) {
      if (equipped[slot].bonusType === bonusType) {
        slotsWithBonus.add(slot);
      }
    }
    return slotsWithBonus.size;
  }

  function countAllBonusTypes(): Record<string, number> {
    const counts: Record<string, Set<string>> = {};
    for (const slot in equipped) {
      const bonus = equipped[slot].bonusType;
      if (!counts[bonus]) counts[bonus] = new Set();
      counts[bonus].add(slot);
    }
    const result: Record<string, number> = {};
    for (const bonus in counts) {
      result[bonus] = counts[bonus].size;
    }
    return result;
  }

  function calculateBonusExtras(): Record<string, Partial<CharacterStatus>> {
    const counts = countAllBonusTypes();
    const bonusesByType: Record<string, Partial<CharacterStatus>> = {};

    for (const bonusSet of bonusSets) {
      const bonusType = bonusSet.bonusType;
      const qty = counts[bonusType] || 0;

      const bonusStats: Partial<CharacterStatus> = {};

      for (const key in bonusSet) {
        if (key === 'bonusType') continue;

        const minEquip = Number(key);
        if (qty >= minEquip) {
          const values = bonusSet[key];
          for (const stat in values) {
            bonusStats[stat] = (bonusStats[stat] || 0) + values[stat];
          }
        }
      }

      if (Object.keys(bonusStats).length > 0) {
        bonusesByType[bonusType] = bonusStats;
      }
    }

    return bonusesByType;
  }

  function flattenBonusExtras(bonusesByType: Record<string, Partial<CharacterStatus>>): Partial<CharacterStatus> {
    const flatBonus: Partial<CharacterStatus> = {};

    for (const bonusType in bonusesByType) {
      const bonusStats = bonusesByType[bonusType];
      for (const stat in bonusStats) {
        flatBonus[stat] = (flatBonus[stat] || 0) + (bonusStats[stat] || 0);
      }
    }

    return flatBonus;
  }

  function equipCards(slot: string, cards: Card[]) {
    setEquipped(prev => {
      const item = prev[slot];
      if (!item) return prev;

      return {
        ...prev,
        [slot]: {
          ...item,
          cards,
        },
      };
    });
  }

  function removeCardsFromSlot(slot: string) {
    setEquipped(prev => {
      const item = prev[slot];
      if (!item) return prev;

      const updatedItem = { ...item };
      delete updatedItem.cards;

      return {
        ...prev,
        [slot]: updatedItem,
      };
    });
  }

  function equipProps(slot: string, selectedProps: Partial<ItemProps>) {
    setEquipped((prev) => ({
      ...prev,
      [slot]: {
        ...prev[slot],
        selectedProps,
      },
    }));
  }

  // Essa função pega o valor numérico dos selectedProps de todos os equipamentos
  // Somando para cada stat o valor correto (number direto ou o valor selecionado se min/max)
  function extractSelectedPropsBonus(): Partial<CharacterStatus> {
    const bonuses: Partial<CharacterStatus> = {};

    Object.values(equipped).forEach(item => {
      if (!item.selectedProps) return;

      for (const key in item.selectedProps) {
        const value = item.selectedProps[key];
        if (typeof value === "number") {
          bonuses[key as keyof CharacterStatus] = (bonuses[key as keyof CharacterStatus] || 0) + value;
        }
      }
    });

    return bonuses;
  }

  function equipStone(slot: string, stone: StoneData) {
    setEquipped(prev => {
      const item = prev[slot];
      if (!item) return prev;

      return {
        ...prev,
        [slot]: {
          ...item,
          stone,  // adiciona a pedra no item equipado
        },
      };
    });
  }

  function unequipStone(slot: string) {
    setEquipped(prev => {
      const item = prev[slot];
      if (!item) return prev;

      const { stone, ...rest } = item; // remove a pedra
      return {
        ...prev,
        [slot]: rest,
      };
    });
  }

  return (
    <EquipContext.Provider value={{
      equipped,
      equipItem,
      unequipItem,
      clearEquipments,
      countBonusType,
      countAllBonusTypes,
      calculateBonusExtras,
      flattenBonusExtras,
      equipCards,
      removeCardsFromSlot,
      equipProps,
      extractSelectedPropsBonus,
      equipStone,
      unequipStone
    }}>
      {children}
    </EquipContext.Provider>
  );
}

export function useEquip() {
  const context = useContext(EquipContext);
  if (!context) throw new Error("useEquip must be used within EquipProvider");
  return context;
}
