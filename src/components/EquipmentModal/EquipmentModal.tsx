import { useEffect, useState } from "react";
import { CharacterStatus } from "../../context/AtkTotalContext";

interface Item extends CharacterStatus {
  name: string;
  img: string;
}

interface EquipmentModalProps {
  type: string;
  onSelectItem: (item: Item) => void;
  onClose: () => void;
}

export function EquipmentModal({ type, onSelectItem, onClose }: EquipmentModalProps) {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    async function loadItems() {
      console.log(type)
      try {
        const data = await import(`../../data/${type}.json`);
        setItems(data.default);
      } catch (error) {
        console.error(`Erro ao carregar dados do tipo ${type}`, error);
        setItems([]);
      }
    }
    loadItems();
  }, [type]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
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
        onClick={e => e.stopPropagation()}
        className="w-[750px] max-h-[750px] bg-gray-500 text-red-600 shadow-[0_0_20px_rgba(0,0,0,0.5)] rounded-md overflow-y-auto p-5 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2"
          aria-label="Fechar modal"
        >✕</button>
        <h2 className="mt-0">{type}</h2>
        <div className="flex flex-wrap gap-2.5">
          {items.map(item => (
            <div
              key={item.name}
              className="w-[150px] border border-gray-300 rounded-md p-1.5 cursor-pointer"
              onClick={() => onSelectItem(item)}
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-auto"
                loading="lazy"
              />
              <h4>{item.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
