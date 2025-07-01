import { Trash } from "phosphor-react";
import { useEffect, useState } from "react";
import { Card, useEquip } from "../../context/EquipContext";
import { gradeColors, itemNames } from "../../utils/ItemNames";
import { BaseModal } from "../BaseModal/BaseModal";
import { CardSelectModal } from "../CardSelectModal/CardSelectModal";

interface CardModalProps {
  onClose: () => void;
  rarity: string;
  slotName: string;
}

export function CardModal({ onClose, rarity, slotName }: CardModalProps) {
  const { equipped, equipCards } = useEquip();
  const equippedItem = equipped[slotName];


  const [allCards, setAllCards] = useState<Card[]>([]);
  const [selectedCards, setSelectedCards] = useState<(Card | null)[]>([]);
  const [openSlotIndex, setOpenSlotIndex] = useState<number | null>(null);

  const totalSlots = getCardSlotCount(rarity);

  // Carrega todas as cartas e reconstrói as equipadas ao mudar slotName
  useEffect(() => {
    import("../../data/cards.json").then((data) => {
      setAllCards(data.default);

      const equippedCardNames = equipped[slotName]?.cards?.map(c => c.name) ?? [];

      const reconstructed = Array.from({ length: 4 }).map((_, index) => {
        const name = equippedCardNames[index];
        return data.default.find((card: Card) => card.name === name) || null;
      });

      setSelectedCards(reconstructed);
    });
  }, [slotName, equipped]);

  // Selecionar carta para o slot aberto
  const handleCardSelect = (cardName: string) => {
    if (openSlotIndex === null) return;

    const selectedCard = allCards.find(c => c.name === cardName);
    if (!selectedCard) return;

    const updated = [...selectedCards];
    updated[openSlotIndex] = selectedCard;
    setSelectedCards(updated);
    setOpenSlotIndex(null);
  };

  // Salvar seleção e fechar modal
  const handleClose = () => {
    const filteredCards = selectedCards.slice(0, totalSlots).filter(Boolean) as Card[];
    equipCards(slotName, filteredCards);
    onClose();
  };

  const handleCardRemove = (index: number) => {
    const updated = [...selectedCards];
    updated[index] = null;
    setSelectedCards(updated);
  };

  return (
    <BaseModal onClose={handleClose} maxWidth="90rem" maxHeight="auto" title={`Encaixe`} titleColor="text-blue-400">
      {equippedItem && (
        <>
          <div className="flex flex-col justify-center items-center">
            <span className={`${gradeColors[equippedItem.grade]} font-bold text-xl text-outline-lg`}>{itemNames[equippedItem.name]}</span>
          </div>
          <div className="flex flex-col justify-center items-center gap-4 p-4">
            <div className="w-[14rem] h-[14rem] p-1 bg-yellow-300 rounded-lg outline outline-[3px] outline-gold">
              <img
                src={equippedItem.img}
                alt={equippedItem.name}
                className="w-full h-full rounded-md"
              />
            </div>
          </div>
          <div className="w-3 h-32 bg-gradient-to-b from-[#2bb3f0] to-transparent mx-auto -mt-4 -mb-16" />

        </>
      )}
      <div className="flex flex-wrap justify-center gap-4">
        {Array.from({ length: 4 }).map((_, i) => {
          const isActive = i < totalSlots;
          const card = selectedCards[i];

          return (
            <button
              key={i}
              onClick={isActive ? () => setOpenSlotIndex(i) : undefined}
              disabled={!isActive}
              className={`
                w-[250px] h-[350px] rounded-md border flex flex-col items-center justify-center text-center font-semibold shadow-md transition-colors duration-200 text-2xl p-1
                ${isActive
                  ? "bg-gradient-to-b from-bluecustom to-bgtextdark border-bgdarkblue cursor-pointer hover:brightness-110 text-white"
                  : "bg-gray-600 opacity-40 cursor-not-allowed text-gray-300"
                }
              `}
            >
              {card ? (
                <>
                  <div className="relative w-full h-full">
                    <img
                      src={card.img}
                      alt={`Carta ${card.name}`}
                      className="max-w-full max-h-full rounded-lg mb-2"
                      loading="lazy"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // evita abrir seleção
                        handleCardRemove(i);
                      }}
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700"
                      title="Remover Carta"
                    >
                      <Trash size={20} />
                    </button>
                  </div>
                  <span className="truncate w-full px-1">{card.name}</span>
                </>
              ) : (
                isActive ? "Selecionar" : "Bloqueado"
              )}
            </button>
          );
        })}
      </div>

      {openSlotIndex !== null && (
        <CardSelectModal
          onSelectCard={handleCardSelect}
          onClose={() => setOpenSlotIndex(null)}
          slot={slotName}
        />
      )}
    </BaseModal>
  );
}

export function getCardSlotCount(rarity: string): number {
  switch (rarity.toLowerCase()) {
    case "epic":
      return 2;
    case "legendary":
      return 3;
    case "ancient":
      return 4;
    case "rare":
      return 1;
    case "acessories":
      return 0;
    default:
      return 1;
  }
}
