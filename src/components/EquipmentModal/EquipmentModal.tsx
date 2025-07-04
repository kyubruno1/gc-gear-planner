import { useEffect, useState } from "react";
import { gradeColors, itemNames, slotNames } from "../../utils/ItemNames";
import { formatStatValue, statusLabels } from "../../utils/StatusLabel";
import { BaseModal } from "../BaseModal/BaseModal";
import { EquipmentModalProps, Item } from "./EquipmentModal.types";

export function EquipmentModal({ type, equipmentType, onSelectItem, onClose }: EquipmentModalProps) {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedLevelMap, setSelectedLevelMap] = useState<Record<string, number>>({});

  useEffect(() => {
    async function loadItems() {
      try {
        const data = await import(`../../data/${equipmentType}/${type}.json`);
        setItems(data.default);
      } catch (error) {
        console.error(`Erro ao carregar dados do tipo ${type}`, error);
        setItems([]);
      }
    }
    loadItems();
  }, [equipmentType, type]);

  function getItemWithLevelApplied(item: Item): Item {
    if ((item.type === "necklace" || item.type === "bracelet") && item.statusNeck) {
      const level = selectedLevelMap[item.name] || 0;
      const statusKey = item.statusNeck.type as keyof Item;
      const value = item.statusNeck[level] as number;

      return {
        ...item,
        [statusKey]: value ?? 0,
        selectedLevel: level,
      };
    }
    return item;
  }

  return (
    <BaseModal onClose={onClose} maxWidth="62.5rem" title={slotNames[type] ?? type} titleColor="text-purple-500">
      <div className="bg-bgdarkblue">
        <div className="grid grid-cols-3 gap-2.5 shadow-bgdarkblue border-primary rounded-md p-8 border-[5px] ">
          {items.map(item => {
            const level = selectedLevelMap[item.name] || 0;
            const itemWithLevel = getItemWithLevelApplied(item);

            return (
              <div
                key={item.name}
                className="flex flex-col items-center justify-center rounded-md cursor-pointer shadow-bgdarkblue border-bgdarkblue text-shadow-title font-bold p-4 bg-gradient-to-b from-bluecustom to-bgtextdark"
                onClick={() => {
                  const selectedItem = { ...itemWithLevel };

                  if (equipmentType !== "equip" && itemWithLevel.props) {
                    selectedItem.selectedProps = {};

                    Object.entries(itemWithLevel.props).forEach(([key, value]) => {
                      const min = value.min ?? 0;
                      const max = value.max ?? 0;

                      if (min > 0 && min === max) {
                        selectedItem.selectedProps![key] = min; // valor único
                      }
                    });
                  }

                  onSelectItem(selectedItem);
                }}
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

                {(item.type === "necklace" || item.type === "bracelet") && item.statusNeck && (
                  <div className="flex gap-1 mt-2 flex-wrap justify-center">
                    {Array.from({ length: 10 }).map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedLevelMap((prev) => ({ ...prev, [item.name]: index }));
                        }}
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold
                          ${level === index ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300"}`}
                      >
                        {index}
                      </button>
                    ))}
                  </div>
                )}

                {equipmentType === "equip" ? (
                  <>
                    <p className="text-lg text-primary mt-2 space-y-1">Status base</p>
                    <div className="text-sm text-white mt-2 space-y-1">
                      {Object.entries(itemWithLevel)
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
                  </>
                ) : (
                  <>
                    <p className="text-lg text-primary mt-2 space-y-1">Propriedades disponíveis</p>
                    <div className="text-sm text-white mt-2 space-y-1">
                      {item.props &&
                        Object.entries(item.props)
                          .filter(([_, val]) => val.min > 0 || val.max > 0)
                          .map(([key, val]) => (
                            <p key={key}>
                              {statusLabels[key]}: {val.min === val.max ? val.min : `${val.min} ~ ${val.max}`}
                            </p>
                          ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </BaseModal>
  );
}
