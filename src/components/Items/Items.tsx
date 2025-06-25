import { useState } from "react";
import { CharacterStatus, useAtkTotal } from "../../context/AtkTotalContext";
import { useEquip } from "../../context/EquipContext";
import { CardModal } from "../CardModal/CardModal";
import { EquipmentModal } from "../EquipmentModal/EquipmentModal";
import { PropsModal } from "../PropsModal/PropsModal";

interface ItemProps {
  name: string;
}

type PropValue = number | { min: number; max: number };
type PropsData = Record<string, PropValue>;

export function Items({ name }: ItemProps) {
  const { addSource } = useAtkTotal();

  const { equipped, equipItem, unequipItem, equipProps } = useEquip();
  const equippedItem = equipped[name]; // nome do slot

  const [itemModal, setItemModal] = useState<string | null>(null);
  const [cardModal, setCardModal] = useState<string | null>(null);
  const [propsModal, setPropsModal] = useState<PropsData | null>(null);

  function handleSelectItem(item: CharacterStatus & { name: string; type: string; img: string }) {
    equipItem(item);
    addSource(item.name, item);
    setItemModal(null);
  }

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
          onClick={() => setItemModal(name)}
        >
          <img
            src={equippedItem ? equippedItem.img : imagePath(`${name}.png`)}
            alt={equippedItem ? equippedItem.name : name}
            className="w-[95px] h-[95px] border-2 border-gray rounded-md bg-lightgray"
          />
        </button>

        {hovering && equippedItem && (
          <div className="absolute top-0 left-16 ml-2 flex flex-col gap-[1px] p-1 rounded-md z-10">
            {equippedItem.equipType === "armor_set" && (
              <button
                onClick={() => setCardModal(name)}
                className="flex px-1 py-[3px] border border-gray-700 rounded-md bg-teal-400 hover:bg-teal-600 text-xs"
              >
                Encaixe
              </button>
            )}

            <button
              onClick={() => setPropsModal(equippedItem.props as PropsData)}
              className="flex px-1 py-[3px] border border-gray-700 rounded-md bg-purple-500 hover:bg-purple-400 text-xs"
            >
              Prop.
            </button>

            <button
              onClick={() => unequipItem(name)}
              className="flex px-1 py-[3px] border border-gray-700 rounded-md bg-red-400 hover:bg-red-600 text-xs"
            >
              Remover
            </button>
          </div>
        )}
      </div>

      {itemModal && (
        <EquipmentModal
          type={itemModal}
          onSelectItem={handleSelectItem}
          onClose={() => setItemModal(null)}
        />
      )}

      {cardModal && (
        <CardModal
          onClose={() => setCardModal(null)}
          rarity={equippedItem.grade || "rare"}
          slotName={equippedItem.type}
        />
      )}

      {propsModal && equippedItem && (
        <PropsModal
          propsData={equippedItem.props}
          rarity={equippedItem.grade as "rare" | "epic" | "legendary" | "ancient"}
          initialSelectedProps={equippedItem.selectedProps ?? {}}
          onClose={(selectedProps) => {
            equipProps(name, selectedProps);

            // Filtra somente props válidas e converte para CharacterStatus
            const validProps = Object.fromEntries(
              Object.entries(selectedProps).filter(([key]) =>
                key in equippedItem
              )
            );

            addSource(`props-${name}`, validProps as Partial<CharacterStatus>);

            setPropsModal(null);
          }}
        />
      )}
    </>
  );
}
