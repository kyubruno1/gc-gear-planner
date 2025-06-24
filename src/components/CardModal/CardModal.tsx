import { useEffect, useState } from "react";
import { Card, useEquip } from "../../context/EquipContext";
import { BaseModal } from "../BaseModal/BaseModal";
import { CardSelectModal } from "../CardSelectModal/CardSelectModal";

interface CardModalProps {
  onClose: () => void;
  rarity: string;
  slotName: string;
}

export function CardModal({ onClose, rarity, slotName }: CardModalProps) {
  const { equipped, equipCards } = useEquip();

  const [allCards, setAllCards] = useState<Card[]>([]);
  const [selectedCards, setSelectedCards] = useState<(Card | null)[]>([]);
  const [openSlotIndex, setOpenSlotIndex] = useState<number | null>(null);

  const totalSlots = getCardSlotCount(rarity);

  // 1. Carrega todas as cartas disponíveis
  useEffect(() => {
    import("../../data/cards.json").then((data) => {
      setAllCards(data.default);

      const equippedCardNames = equipped[slotName]?.cards?.map(c => c.name) ?? [];

      // 2. Reconstrói os objetos Card com base nos nomes salvos
      const reconstructed = equippedCardNames.map(name =>
        data.default.find((card: Card) => card.name === name) || null
      );

      setSelectedCards(reconstructed);
    });
  }, [slotName]);

  // Atualiza localmente as cartas selecionadas
  const handleCardSelect = (cardName: string) => {
    if (openSlotIndex === null) return;

    const selectedCard = allCards.find(c => c.name === cardName);
    if (!selectedCard) return;

    const updated = [...selectedCards];
    updated[openSlotIndex] = selectedCard;
    setSelectedCards(updated);
    setOpenSlotIndex(null);
  };

  // Ao fechar, salva as cartas no contexto
  const handleClose = () => {
    const filteredCards = selectedCards.filter(Boolean) as Card[];
    equipCards(slotName, filteredCards);
    onClose();
  };

  return (
    <BaseModal onClose={handleClose}>
      <div className="flex gap-2 mb-4">
        {Array.from({ length: totalSlots }).map((_, i) => (
          <button
            key={i}
            onClick={() => setOpenSlotIndex(i)}
            className="w-[80px] h-[80px] border rounded bg-gray-800 text-white flex items-center justify-center"
          >
            {selectedCards[i] ? (
              <img
                src={selectedCards[i]!.img}
                alt={`Carta ${selectedCards[i]!.name}`}
                className="max-w-full max-h-full"
              />
            ) : (
              "Selecionar"
            )}
          </button>
        ))}
      </div>

      {openSlotIndex !== null && (
        <CardSelectModal
          onSelectCard={handleCardSelect}
          onClose={() => setOpenSlotIndex(null)}
        />
      )}
    </BaseModal>
  );
}

function getCardSlotCount(rarity: string): number {
  switch (rarity) {
    case "epic":
      return 2;
    case "legendary":
      return 3;
    case "ancestral":
      return 4;
    case "rare":
    default:
      return 1;
  }
}
