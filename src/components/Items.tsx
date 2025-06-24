import { useState } from "react";
import { CharacterStatus, useAtkTotal } from "../context/AtkTotalContext";
import { useEquip } from "../context/EquipContext";
import { Container } from "./Container/Container";

interface ItemProps {
  name: string; // tipo do equipamento, ex: 'helmet', 'gloves'
}

export function Items({ name }: ItemProps) {
  const { addSource } = useAtkTotal();

  const { equipped, equipItem } = useEquip();
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
    new URL(`../../public/assets/images/equip-clean/${fileName}`, import.meta.url).href;

  return (
    <>
      <button
        type="button"
        style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
        onClick={() => setActiveType(name)} // abre container com o tipo do equipamento
      >
        <img
          src={equippedItem ? equippedItem?.img : imagePath(`${name}.png`)}
          alt={equippedItem ? equippedItem.name : name}
          style={{ width: 95, height: 95 }}
        />
      </button>

      {activeType && (
        <Container
          type={activeType}
          onSelectItem={handleSelectItem}
          onClose={() => setActiveType(null)}
        />
      )}
    </>
  );
}
