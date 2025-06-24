import { useEffect, useState } from "react";
import { CharacterStatus } from "../../context/AtkTotalContext";
import { gradeColors, itemNames, slotNames } from "../../data/ItemNames";
import { BaseModal } from "../BaseModal/BaseModal";


interface Item extends CharacterStatus {
  name: string;
  img: string;
  grade: string;
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

  return (
    <BaseModal onClose={onClose}>

      <h2 className="mt-0">{slotNames[type] ?? type}</h2>
      <div className="flex flex-wrap gap-2.5 shadow-bgdarkblue border-primary">
        {items.map(item => (

          <div
            key={item.name}
            className="w-[150px] border  rounded-md p-2.5 cursor-pointer  bg-bgdarkblue  shadow-bgdarkblue  border-primary outline outline-1 outline-bgdarkblue"
            onClick={() => onSelectItem(item)}
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-full h-auto"
              loading="lazy"
            />
            <h4 className={`py-2.5 text-center ${gradeColors[item.grade] || "text-white"}`} >{itemNames[item.name] ?? item.name}</h4>
          </div>
        ))}
      </div>
    </BaseModal>

  );
}
