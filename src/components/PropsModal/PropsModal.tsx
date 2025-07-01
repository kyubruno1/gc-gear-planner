import { motion } from "framer-motion";
import { ArrowClockwise, Bug, CaretCircleDoubleUp, Coins, Drop, Heart, Heartbeat, Shield, ShieldCheck, Star, Sword } from "phosphor-react";
import { useState } from "react";
import { ItemProps, ItemPropValue } from "../../context/EquipContext";
import { formatStatValue, statusLabels } from "../../utils/StatusLabel";
import { BaseModal } from "../BaseModal/BaseModal";

interface PropsModalProps {
  onClose: (selectedProps: Record<string, number>) => void;
  propsData: ItemProps;
  rarity: "rare" | "epic" | "legendary" | "ancient";
  initialSelectedProps?: Record<string, ItemPropValue>;
}

const maxSelectionByRarity = {
  rare: 2,
  epic: 3,
  legendary: 4,
  ancient: 5,
};

const effectIcons: Record<string, JSX.Element> = {
  defense: <Shield size={16} className="text-blue-400" />,
  attack: <Sword size={16} className="text-green-400" />,
  hp: <Heart size={16} className="text-red-400" />,
  hp_rec: <Heartbeat size={16} className="text-red-400" />,
  mp_rec: <Drop size={16} className="text-blue-500" />,
  sp_attack: <Sword size={16} className="text-green-400" />,
  sp_def: <ShieldCheck size={16} className="text-gray-500" />,
  gp: <Coins size={16} className="text-yellow-500" />,
  taint_resistance: <Bug size={16} className="text-green-950" />,
  crit_chance: <Star size={16} className="text-yellow-300" />,
  crit_damage: <Star size={16} className="text-gold" />,
  back_attack: <ArrowClockwise size={16} />,
  exp: <CaretCircleDoubleUp size={16} />,
  hell_spear: <Sword size={16} className="text-purple-500" />,
  hell_spear_chance: <Sword size={16} className="text-purple-500" />,
};

export function PropsModal({
  onClose,
  propsData,
  rarity,
  initialSelectedProps = {},
}: PropsModalProps) {
  const maxSelectable = maxSelectionByRarity[rarity] ?? 2;
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

    const val: number = typeof value === "number" ? value : rarity === "ancient" ? value.min : value.max;

    setSelectedProps({ ...selectedProps, [key]: val });
    setError(null);
  }

  function handleInputChange(key: string, min: number, max: number, input: string) {
    const parsed = parseFloat(input);
    if (!isNaN(parsed)) {
      const clamped = Math.max(min, Math.min(max, parsed));
      setSelectedProps((prev) => ({ ...prev, [key]: clamped }));
    }
  }

  function formatValue(value: ItemPropValue, key: string): string {
    if (value === undefined || value === null) return "-";
    if (typeof value === "number") return formatStatValue(key, value);
    if ("min" in value && "max" in value) {
      if (rarity === "ancient") {
        // mostra faixa min ~ max, formatando cada lado
        return `${formatStatValue(key, value.min)} ~ ${formatStatValue(key, value.max)}`;
      } else {
        // só mostra o max, formatado
        return formatStatValue(key, value.max);
      }
    }
    return "-";
  }

  return (
    <BaseModal
      onClose={() => onClose(selectedProps)}
      maxWidth="40rem"
      maxHeight="auto"
      title="Propriedades do Item"
      titleColor="text-purple-500"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
      >
        <ul className="text-white text-sm space-y-2 max-h-auto overflow-y-auto px-2">
          {Object.entries(propsData).map(([key, value]) => {
            if (value === undefined) return null;

            const isSelected = key in selectedProps;

            return (
              <li
                key={key}
                className={`flex flex-col gap-1 p-2 rounded-md transition-all duration-150 ${isSelected
                  ? "bg-purple-700 text-white"
                  : "hover:bg-gray-700 cursor-pointer text-gray-300"
                  }`}
                onClick={() => toggleSelect(key, value)}
              >
                <div className="flex justify-between items-center font-semibold">
                  <span className="flex items-center gap-1">
                    {effectIcons[key] ?? null}
                    {statusLabels[key] ?? key}:
                  </span>
                  <span>{formatValue(value, key)}</span>
                </div>

                {isSelected &&
                  rarity === "ancient" &&
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
                      onChange={(e) => handleInputChange(key, value.min, value.max, e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  )}
              </li>
            );
          })}
        </ul>

        {/* Barra de progresso */}
        <div className="relative w-full h-2 bg-gray-800 rounded my-4">
          <div
            className="absolute top-0 left-0 h-2 rounded bg-purple-600 transition-all"
            style={{ width: `${(Object.keys(selectedProps).length / maxSelectable) * 100}%` }}
          />
        </div>

        <div className="flex justify-between items-center text-white px-2">
          <span className="text-sm text-gray-300">
            Selecionados: {Object.keys(selectedProps).length} / {maxSelectable}
          </span>
          <button
            className="bg-green-600 px-4 py-1.5 rounded-md hover:bg-green-700 text-sm font-bold"
            onClick={() => onClose(selectedProps)}
          >
            Confirmar
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mt-3 px-2">{error}</p>}
      </motion.div>
    </BaseModal>
  );
}
