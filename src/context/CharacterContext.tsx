// context/CharacterContext.tsx
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAtkTotal } from "../context/AtkTotalContext";
import { useEquip } from "../context/EquipContext";
import characters from "../data/characters.json";
import { Character } from "../types/character";
import { CharacterStatus } from "../types/characterStatus";
import { EquippedItem } from "../types/equip";

export interface FullCharacter {
  status: CharacterStatus;
  totalAttack: number;
  equipped: Record<string, EquippedItem | null>;
  combinedSetsEffect: Partial<CharacterStatus>;
}

interface CharacterContextType {
  character: FullCharacter | null;
  setCharacter: React.Dispatch<React.SetStateAction<FullCharacter | null>>;
  selectedCharacter: Character | null;
  setSelectedCharacter: React.Dispatch<React.SetStateAction<Character | null>>;
  selectedJobKey: string | null;
  setSelectedJobKey: React.Dispatch<React.SetStateAction<string | null>>;
  sheetName: string;
  setSheetName: (name: string, id?: string) => void;
  saveCharacter: (id?: string, onSaved?: () => void) => void; // Adicionada callback opcional
  reloadCharacter: () => void;
}

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export function CharacterProvider({ children }: { children: ReactNode }) {
  const { atkTotal, characterStatus } = useAtkTotal();
  const { equipped, calculateBonusExtras } = useEquip();

  const defaultCharacter = characters.find((c) => c.name === "elesis") || null;
  const defaultJobKey = "first_job";

  const [character, setCharacter] = useState<FullCharacter | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(defaultCharacter);
  const [selectedJobKey, setSelectedJobKey] = useState<string | null>(defaultJobKey);
  const [sheetNameState, setSheetNameState] = useState("Minha Build");

  useEffect(() => {
    reloadCharacter();
  }, [atkTotal, characterStatus, equipped]);

  function reloadCharacter() {
    if (!characterStatus) {
      setCharacter(null);
      return;
    }

    const bonusExtras = calculateBonusExtras();

    setCharacter({
      status: characterStatus,
      totalAttack: atkTotal,
      equipped,
      combinedSetsEffect: bonusExtras,
    });
  }

  function setSheetName(name: string, id?: string) {
    setSheetNameState(name);

    const saved = localStorage.getItem("savedCharacters");
    if (!saved) return;

    const parsed = JSON.parse(saved);
    const updated = parsed.map((item: any) =>
      id && item.id === id ? { ...item, sheetName: name } : item
    );

    if (id) {
      localStorage.setItem("savedCharacters", JSON.stringify(updated));
    }
  }

  function saveCharacter(idToSave?: string, onSaved?: () => void) {
    if (!character || !selectedCharacter || !selectedJobKey) return;

    const saved = localStorage.getItem("savedCharacters");
    const parsed = saved ? JSON.parse(saved) : [];

    const id = idToSave || uuidv4();

    const newEntry = {
      id,
      character: selectedCharacter,
      jobKey: selectedJobKey,
      equipped,
      status: character.status,
      totalAttack: character.totalAttack,
      combinedSetsEffect: character.combinedSetsEffect,
      sheetName: sheetNameState,
      savedAt: new Date().toISOString(),
    };

    // Remove o personagem com mesmo id para atualizar, ou adiciona novo
    const updated = [...parsed.filter((item: any) => item.id !== id), newEntry];

    localStorage.setItem("savedCharacters", JSON.stringify(updated));
    localStorage.setItem("currentBuildId", id);

    if (onSaved) onSaved();
  }

  return (
    <CharacterContext.Provider
      value={{
        character,
        setCharacter,
        selectedCharacter,
        setSelectedCharacter,
        selectedJobKey,
        setSelectedJobKey,
        reloadCharacter,
        sheetName: sheetNameState,
        setSheetName,
        saveCharacter,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
}

export function useCharacter() {
  const context = useContext(CharacterContext);
  if (!context) throw new Error("useCharacter must be used within a CharacterProvider");
  return context;
}
