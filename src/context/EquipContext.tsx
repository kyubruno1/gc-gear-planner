import { createContext, ReactNode, useContext, useState } from "react";
import { StoneData } from "../components/StonesModal/StonesModal";
import bonusSets from '../data/bonus-set.json';
import { Card } from "../types/cards";
import { CharacterStatus } from "../types/characterStatus";
import { EquippedItem } from "../types/equip";
import { ItemProps } from "../types/ItemProps";

type EquipState = Record<string, EquippedItem>;

interface EquipContextType {
  equipped: EquipState;
  setFullEquip: (newEquip: EquipState) => void;  // Substituir equipamento completo
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
  extractCardEffectsBonus: () => Partial<CharacterStatus>;
  equipStone: (slot: string, stone: StoneData) => void;
  unequipStone: (slot: string) => void;
}

const EquipContext = createContext<EquipContextType | undefined>(undefined);

// const LOCAL_STORAGE_KEY = "mygame_equipped";

export function EquipProvider({ children }: { children: ReactNode }) {
  const [equipped, setEquipped] = useState<EquipState>({});

  // Carregar do localStorage ao montar
  // useEffect(() => {
  //   const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  //   if (saved) {
  //     try {
  //       const parsed: EquipState = JSON.parse(saved);
  //       setEquipped(parsed);
  //     } catch (error) {
  //       console.error("Erro ao carregar equipamentos do localStorage", error);
  //     }
  //   }
  // }, []);

  // Salvar no localStorage sempre que 'equipped' mudar
  // useEffect(() => {
  //   try {
  //     localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(equipped));
  //   } catch (error) {
  //     console.error("Erro ao salvar equipamentos no localStorage", error);
  //   }
  // }, [equipped]);

  // Função para substituir o equipamento completo (ex: ao carregar personagem salvo)
  function setFullEquip(newEquip: EquipState) {
    setEquipped(newEquip);
  }

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

  function extractCardEffectsBonus(): Partial<CharacterStatus> {
    const bonuses: Partial<CharacterStatus> = {};

    Object.values(equipped).forEach(item => {
      if (!item.cards) return;

      for (const card of item.cards) {
        for (const effect of card.effects) {
          const key = effect.name as keyof CharacterStatus;
          bonuses[key] = (bonuses[key] || 0) + effect.value;
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
          stone,
        },
      };
    });
  }

  function unequipStone(slot: string) {
    setEquipped(prev => {
      const item = prev[slot];
      if (!item) return prev;

      const { stone, ...rest } = item;
      return {
        ...prev,
        [slot]: rest,
      };
    });
  }

  return (
    <EquipContext.Provider value={{
      equipped,
      setFullEquip,
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
      extractCardEffectsBonus,
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
