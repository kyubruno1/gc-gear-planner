import { useState } from "react";
import { ItemProps, ItemPropValue } from "../../context/EquipContext";
import { statusLabels } from "../../data/StatusLabel";
import { BaseModal } from "../BaseModal/BaseModal";

interface PropsModalProps {
  onClose: (selectedProps: Record<string, number>) => void;
  propsData: ItemProps;
  rarity: "rare" | "epic" | "legendary" | "ancient";
  initialSelectedProps?: Record<string, number>;  // novo prop
}

const maxSelectionByRarity = {
  rare: 2,
  epic: 3,
  legendary: 4,
  ancient: 5,
};

export function PropsModal({ onClose, propsData, rarity, initialSelectedProps = {} }: PropsModalProps) {
  const maxSelectable = maxSelectionByRarity[rarity] ?? 2;

  // Inicializa com os valores selecionados já existentes
  const [selectedProps, setSelectedProps] = useState<Record<string, number>>(initialSelectedProps);
  const [error, setError] = useState<string | null>(null);

  function toggleSelect(key: string, value: ItemPropValue) {
    const isSelected = key in selectedProps;

    if (isSelected) {
      const copy = { ...selectedProps };
      delete copy[key];
      setSelectedProps(copy);
      setError(null);
      return;
    }

    if (Object.keys(selectedProps).length >= maxSelectable) {
      setError(`Você só pode escolher até ${maxSelectable} propriedades.`);
      return;
    }

    let val: number;

    if (typeof value === "number") {
      val = value;
    } else if (
      value &&
      typeof value === "object" &&
      "min" in value &&
      "max" in value
    ) {
      // Se min e max são diferentes, já atribui o min como valor inicial
      val = value.min;
    } else {
      return;
    }

    setSelectedProps({ ...selectedProps, [key]: val });
    setError(null);
  }

  function handleInputChange(
    key: string,
    min: number,
    max: number,
    input: string
  ) {
    const parsed = parseFloat(input);
    if (!isNaN(parsed)) {
      const clamped = Math.max(min, Math.min(max, parsed));
      setSelectedProps((prev) => ({ ...prev, [key]: clamped }));
    }
  }

  function formatValue(value: ItemPropValue): string {
    if (value === undefined || value === null) return "-";
    if (typeof value === "number") return value.toString();
    if ("min" in value && "max" in value)
      return `${value.min} ~ ${value.max}`;
    return "-";
  }

  return (
    <BaseModal onClose={() => onClose(selectedProps)}>
      <h2 className="text-white text-lg mb-3">Propriedades do Item</h2>

      <ul className="text-white text-sm space-y-2 max-h-[300px] overflow-y-auto">
        {Object.entries(propsData).map(([key, value]) => {
          if (value === undefined) return null;

          const isSelected = key in selectedProps;

          return (
            <li
              key={key}
              className={`flex flex-col gap-1 p-2 rounded-md ${isSelected ? "bg-purple-700" : "hover:bg-gray-700 cursor-pointer"
                }`}
              onClick={() => toggleSelect(key, value)}
            >
              <div className="flex justify-between items-center">
                <span>{statusLabels[key] ?? key}:</span>
                <span>{formatValue(value)}</span>
              </div>

              {/* Exibe input se estiver selecionado, valor com min/max diferente */}
              {isSelected &&
                typeof value === "object" &&
                value !== null &&
                "min" in value &&
                "max" in value &&
                value.min !== value.max && (
                  <input
                    type="number"
                    min={value.min}
                    max={value.max}
                    step="0.01"
                    className="mt-1 w-full px-2 py-1 rounded bg-gray-800 border border-gray-600 text-white"
                    value={selectedProps[key]}
                    onChange={(e) =>
                      handleInputChange(key, value.min, value.max, e.target.value)
                    }
                    onClick={(e) => e.stopPropagation()}
                  />
                )}
            </li>
          );
        })}
      </ul>

      <div className="mt-4 flex justify-between items-center">
        <span>
          Selecionados: {Object.keys(selectedProps).length} / {maxSelectable}
        </span>
        <button
          className="bg-green-600 px-3 py-1 rounded hover:bg-green-700"
          onClick={() => onClose(selectedProps)}
        >
          Confirmar
        </button>
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </BaseModal>
  );
}
