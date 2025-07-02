// hooks/useSavedCharacters.ts
import { useCallback, useEffect, useState } from "react";
import { Character } from "../types/character";
import { CharacterStatus } from "../types/characterStatus";
import { EquippedItem } from "../types/equip";

export interface SavedCharacter {
  id: string; // uuid para identificar
  character: Character;
  jobKey: string;
  equipped: Record<string, EquippedItem>;
  savedAt: string;
  sheetName?: string;
  status?: CharacterStatus;
  totalAttack?: number;
  combinedSetsEffect?: any;
}

const STORAGE_KEY = "savedCharacters";

export function useSavedCharacters() {
  const [savedCharacters, setSavedCharacters] = useState<SavedCharacter[]>([]);

  // Carrega na montagem
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setSavedCharacters(JSON.parse(raw));
      } catch {
        setSavedCharacters([]);
      }
    }
  }, []);

  // Função para recarregar manualmente do localStorage
  const reloadSavedCharacters = useCallback(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setSavedCharacters(JSON.parse(raw));
      } catch {
        setSavedCharacters([]);
      }
    } else {
      setSavedCharacters([]);
    }
  }, []);

  function saveAll(characters: SavedCharacter[]) {
    setSavedCharacters(characters);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(characters));
  }

  function addCharacter(char: SavedCharacter) {
    setSavedCharacters((prev) => {
      const updated = [...prev, char];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }

  function removeCharacter(id: string) {
    setSavedCharacters((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }

  return { savedCharacters, addCharacter, removeCharacter, reloadSavedCharacters };
}
