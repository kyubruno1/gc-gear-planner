import { useState } from "react";
import { CharacterStatus, useAtkTotal } from "../../context/AtkTotalContext";
import { useEquip } from "../../context/EquipContext";
import { EquipmentModal } from "../EquipmentModal/EquipmentModal";
interface ItemProps {
  name: string;
}

export function Items({ name }: ItemProps) {
  const { addSource } = useAtkTotal();

  const { equipped, equipItem, unequipItem } = useEquip();
  const equippedItem = equipped[name]; // name = tipo ("helmet", "ring"...)

  // Controla a abertura do container (modal) para escolher item
  const [activeType, setActiveType] = useState<string | null>(null);

  // Função chamada ao selecionar um item no container
  function handleSelectItem(item: CharacterStatus & { name: string; type: string; img: string }) {
    equipItem(item); // atualiza contexto
    addSource(item.name, item); // atualiza contexto
    setActiveType(null); // fecha o container/modal
  }

  // Caminho para imagem: se tiver item equipado, mostra a imagem dele, senão a padrão
  const imagePath = (fileName: string) =>
    new URL(`../../../public/assets/images/equip-clean/${fileName}`, import.meta.url).href;


  const [hovering, setHovering] = useState(false);

  return (
    <>
      <div
        className="relative inline-block"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <button
          type="button"
          className="border-none p-0 cursor-pointer"
          onClick={() => setActiveType(name)}
        >
          <img
            src={equippedItem ? equippedItem.img : imagePath(`${name}.png`)}
            alt={equippedItem ? equippedItem.name : name}
            className="w-[95px] h-[95px] border-2 border-gray rounded-md bg-lightgray"
          />
        </button>

        {hovering && equippedItem && (
          <div className="absolute top-0 left-16 ml-2 flex flex-col gap-[1px] p-1 rounded-md z-10">
            <button onClick={() => setActiveType(name)} className="flex px-1 py-[3px] border border-gray-700 rounded-md bg-teal-400 hover:bg-teal-600 text-xs">Encaixe</button>
            <button onClick={() => setActiveType(name)} className="flex px-1 py-[3px] border border-gray-700 rounded-md bg-purple-500 hover:bg-purple-400 text-xs">Prop.</button>
            <button onClick={() => unequipItem(name)} className="flex px-1 py-[3px] border border-gray-700 rounded-md bg-red-400 hover:bg-red-600 text-xs">Remover</button>
          </div>
        )}
      </div>

      {activeType && (
        <EquipmentModal
          type={activeType}
          onSelectItem={handleSelectItem}
          onClose={() => setActiveType(null)}
        />
      )}
    </>
  );
}