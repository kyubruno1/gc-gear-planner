import { useState } from "react";
import { useAtkTotal } from "../../context/AtkTotalContext";
import { useEquip } from "../../context/EquipContext";
import { CharacterStatus } from "../../types/characterStatus";
import { StoneData } from "../../types/stones";
import { CardModal } from "../CardModal/CardModal";
import { EquipmentModal } from "../EquipmentModal/EquipmentModal";
import { HoverModal } from "../HoverModal/HoverModal";
import { PropsModal } from "../PropsModal/PropsModal";
import { StonesModal } from "../StonesModal/StonesModal";
import { PropsData, ItemProps as SlotProps } from "./ItemsModal.types";
// import { stoneDataToStatus } from "../../utils/stoneHelpers";

function stoneDataToStatus(data: StoneData): Partial<CharacterStatus> {
  const status: Partial<CharacterStatus> = {};

  const statusKey = data.statusType as keyof CharacterStatus | undefined;

  // soma o valor da pedra no status correto
  if (statusKey) {
    status[statusKey] = (status[statusKey] ?? 0) + data.value;
  }

  // aplica o efeito especial, se houver
  if (data.effect) {
    status[data.effect as keyof CharacterStatus] =
      (status[data.effect as keyof CharacterStatus] ?? 0) + (data.effectValue ?? 0);
  }

  // aplica os efeitos automáticos (+18), se houver
  if (data.automaticEffects && data.automaticEffects.length > 0) {
    for (const effect of data.automaticEffects) {
      const key = effect.name as keyof CharacterStatus;
      const val = effect.values[0] ?? 0;
      status[key] = (status[key] ?? 0) + val;
    }
  }

  return status;
}

export function Items({ name, equipmentType }: SlotProps) {
  const { addSource, removeSource } = useAtkTotal();
  const { equipped, equipItem, unequipItem, equipProps, equipStone, unequipStone } = useEquip();
  const equippedItem = equipped[name]; // nome do slot

  const [itemModal, setItemModal] = useState<string | null>(null);
  const [cardModal, setCardModal] = useState<string | null>(null);
  const [propsModal, setPropsModal] = useState<PropsData | null>(null);
  const [stoneModal, setStoneModal] = useState(false);

  const [stoneValues, setStoneValues] = useState<{
    [slot: string]: StoneData | undefined;
  }>({});

  const [hovering, setHovering] = useState(false);

  const rarityColors: Record<string, string> = {
    normal: "bg-gray-300 text-gray-900",
    epic: "bg-gold text-white",
  };

  function handleApplyStone(slotName: string, data: StoneData) {
    setStoneValues((prev) => ({
      ...prev,
      [slotName]: data,
    }));

    const status = stoneDataToStatus(data);
    addSource("stone:" + slotName, status);
    equipStone(slotName, data);
    setStoneModal(false);
  }

  function handleRemoveStone(slotName: string) {
    setStoneValues((prev) => {
      const copy = { ...prev };
      delete copy[slotName];
      return copy;
    });
    unequipStone(slotName);
    removeSource("stone:" + slotName);
  }

  function handleUnequipItem(slotName: string) {
    unequipItem(slotName);
    handleRemoveStone(slotName);
    removeSource(`props-${slotName}`);
    removeSource(`equip:${slotName}:card0`);
    removeSource(`equip:${slotName}:card1`);
    removeSource(`equip:${slotName}:card2`);
    removeSource(`equip:${slotName}:card3`);
    removeSource(`equip:${slotName}:props`);
    removeSource(`equip:${slotName}`);
  }

  // const imagePath = (fileName: string) =>
  //   new URL(`../../../public/assets/images/equip-clean/${fileName}`, import.meta.url).href;

  const imagePath = (fileName: string) => {
    const cleanedName = fileName.startsWith("visual-")
      ? fileName.replace("visual-", "")
      : fileName;

    return new URL(`../../../public/assets/images/equip-clean/${cleanedName}`, import.meta.url).href;
  };

  return (
    <>
      <div
        className="relative inline-block"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <button
          type="button"
          className="border-none p-0 cursor-pointer relative"
          onClick={() => setItemModal(name)}
        >
          <img
            src={equippedItem ? equippedItem.img : imagePath(`${name}.png`)}
            alt={equippedItem ? equippedItem.name : name}
            className="w-[110px] h-[110px] border-2 border-gray rounded-md bg-lightgray"
          />
          {/* Badge do nível do colar/pulseira */}
          {equippedItem?.selectedLevel !== undefined && (
            <div className="absolute bottom-1 right-1 pointer-events-none z-10">
              <div className="bg-blue-500 text-white text-xs font-bold px-1.5 py-[1px] rounded shadow">
                +{equippedItem.selectedLevel}
              </div>
            </div>
          )}

          {stoneValues[name] && (
            <div className={`absolute bottom-1 right-1 pointer-events-none z-10`}>
              <div
                className={`${rarityColors[stoneValues[name].stone]} text-xs font-bold px-1.5 py-[1px] rounded shadow`}
              >
                +{stoneValues[name].displayValue}
              </div>
            </div>
          )}
        </button>

        {hovering && equippedItem && (
          <div className="absolute top-0 left-10 ml-2 flex flex-col gap-[1px] p-1 rounded-md z-10">
            {/* <div className="grid grid-cols-2 grid-rows-2 gap-[1px] z-10"> */}
            {equippedItem.equipType === "armor_set" && (
              <>
                <button
                  onClick={() => setCardModal(name)}
                  className="flex px-1 py-[3px] border border-gray-700 rounded-md bg-teal-400 hover:bg-teal-600 text-xs text-outline-lg text-white"
                >
                  Encaixe
                </button>

                <button
                  onClick={() => setStoneModal(true)}
                  className="flex px-1 py-[3px] border border-gray-700 rounded-md bg-blue-500 hover:bg-blue-400 text-xs"
                >
                  <img src="public/assets/images/system/clean-stone.png" width={32} height={11} className="mx-auto" />
                </button>
              </>
            )}

            {equippedItem.type !== "bracelet" && equippedItem.type !== "necklace" && (
              <button
                onClick={() => setPropsModal(equippedItem.props as PropsData)}
                className="flex px-1 py-[3px] border border-gray-700 rounded-md bg-purple-500 hover:bg-purple-400 text-xs"
              >
                <img src="public/assets/images/system/arrow_cropped.png" width={32} height={11} className="mx-auto" />
              </button>
            )}

            <button
              onClick={() => handleUnequipItem(name)}
              className="flex px-1 py-[3px] border border-gray-700 rounded-md bg-red-400 hover:bg-red-600 text-xs"
            >
              Remover
            </button>
          </div>
        )}

        {hovering && equippedItem && (
          <HoverModal
            slot={name}
          />
        )}
      </div>

      {itemModal && (
        <EquipmentModal
          type={itemModal}
          equipmentType={equipmentType}
          onSelectItem={(item) => {
            equipItem(item);
            addSource(item.name, item);
            setItemModal(null);
          }}
          onClose={() => setItemModal(null)}
        />
      )}

      {cardModal && equippedItem && (
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

            const validProps = Object.fromEntries(
              Object.entries(selectedProps).filter(([key]) => key in equippedItem)
            );

            addSource(`props-${name}`, validProps as Partial<CharacterStatus>);
            setPropsModal(null);
          }}
        />
      )}

      {stoneModal && equippedItem && (
        <StonesModal
          onClose={() => setStoneModal(false)}
          rarity={equippedItem.grade as "normal" | "epic"}
          isAncient={equippedItem.grade === "ancient"}
          slotName={name}
          initialValue={stoneValues[name]}
          onApply={handleApplyStone}
        />
      )}
    </>
  );
}
