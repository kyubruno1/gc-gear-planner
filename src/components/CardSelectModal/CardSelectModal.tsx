import { useEffect, useState } from "react";

interface Card {
  name: string;
  img: string;
  effect: string;
}

interface CardSelectModalProps {
  onSelectCard: (cardName: string) => void;
  onClose: () => void;
}

export function CardSelectModal({ onSelectCard, onClose }: CardSelectModalProps) {
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    async function loadCards() {
      try {
        const data = await import("../../data/cards.json");
        setCards(data.default);
      } catch (error) {
        console.error("Erro ao carregar cartas", error);
        setCards([]);
      }
    }
    loadCards();
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999]"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[750px] max-h-[750px] bg-bgdarkblue font-bold shadow-bgdarkblue rounded-md overflow-y-auto p-5 relative border border-primary"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white"
          aria-label="Fechar modal"
        >
          ✕
        </button>

        <h2 className="mb-4 text-xl text-white">Selecione uma Carta</h2>
        <div className="flex flex-wrap gap-3">
          {cards.map((card) => (
            <div
              key={card.name}
              onClick={() => onSelectCard(card.name)}
              className="w-[150px] border border-gray-300 rounded-md p-2.5 cursor-pointer bg-primary hover:bg-primary/80 text-white text-center"
            >
              <img
                src={card.img}
                alt={card.name}
                className="w-full h-auto rounded"
                loading="lazy"
              />
              <h4 className="mt-2 font-semibold">{card.name}</h4>
              <p className="text-sm text-gray-200">{card.effect}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
