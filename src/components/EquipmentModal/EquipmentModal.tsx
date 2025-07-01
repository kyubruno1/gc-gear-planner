import { useEffect, useState } from "react";
import { EquippedItem } from "../../context/EquipContext";
import { gradeColors, itemNames, slotNames } from "../../utils/ItemNames";
import { formatStatValue, statusLabels } from "../../utils/StatusLabel";
import { BaseModal } from "../BaseModal/BaseModal";


interface Item extends EquippedItem {
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
    <BaseModal onClose={onClose} maxWidth="62.5rem" title={slotNames[type] ?? type} titleColor="text-purple-500">
      <div className="bg-bgdarkblue">
        <div className="grid grid-cols-3 gap-2.5 shadow-bgdarkblue border-primary rounded-md p-8 border-[5px] ">
          {items.map(item => (
            <div
              key={item.name}
              className="flex flex-col items-center justify-center rounded-md cursor-pointer shadow-bgdarkblue border-bgdarkblue text-shadow-title font-bold p-4 bg-gradient-to-b from-bluecustom to-bgtextdark"
              onClick={() => onSelectItem(item)}
            >
              <div className=" w-full p-1 rounded-md shadow-bgdarkblue">
                <h4 className={`pb-2.5 text-center ${gradeColors[item.grade] || "text-white"}`}>
                  {itemNames[item.name] ?? item.name}
                </h4>
              </div>
              <div className="w-64 h-w-64 rounded-lg">
                <img
                  src={item.img}
                  alt={item.name}
                  className="rounded-lg"
                  loading="lazy"
                />
              </div>
              {/* Propriedades > 0 */}
              <p className="text-lg text-primary mt-2 space-y-1">
                Status base
              </p>
              <div className="text-sm text-white mt-2 space-y-1">
                {Object.entries(item)
                  .filter(([key, value]) =>
                    typeof value === "number" &&
                    value > 0 &&
                    [
                      "attack",
                      "crit_chance",
                      "crit_damage",
                      "sp_attack",
                      "mp_rec",
                      "hell_spear_chance",
                      "hell_spear",
                      "taint_resistance",
                      "defense",
                      "hp",
                      "crit_resistance",
                      "sp_def",
                      "hp_rec",
                      "counter_attack_resistance",
                      "exp",
                      "gp"
                    ].includes(key)
                  )
                  .map(([key, value]) => (
                    <p key={key}>
                      {statusLabels[key]}: {formatStatValue(key, value)}
                    </p>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </BaseModal>
  );

}
