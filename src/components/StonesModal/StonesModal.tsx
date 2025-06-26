import { useEffect, useState } from "react";
import stoneDataJson from "../../data/stone-data.json";
import { statusLabels } from "../../utils/StatusLabel";
import { BaseModal } from "../BaseModal/BaseModal";

type StoneType = "normal" | "epic";

interface StonesModalProps {
  onClose: () => void;
  rarity: "normal" | "epic" | "ancient"; // raridade do equipamento
  isAncient: boolean;        // se é ancestral
  slotName: string;
  initialValue?: {
    stone: StoneType;
    value: number;
    effect?: string;
    effectValueIndex?: number;
  };
  onApply: (
    slotName: string,
    data: {
      stone: StoneType;
      displayValue: number;
      value: number;
      effect?: string;
      effectValueIndex?: number;
      effectValue?: number;
      effectValueType?: "flat" | "percent";
      automaticEffects?: Effect[];
      statusType: string;
    }
  ) => void;
}

interface Effect {
  name: string;
  values: number[];
  valueType: "flat" | "percent";
}

interface StoneSlotData {
  type: string;
  special_effects: {
    default?: Effect[];
    ancient?: Effect[];
    "18"?: Effect[];
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [level: string]: any;
}

interface StoneDataItem {
  stone: "normal" | "epic";
  data: {
    [slotName: string]: StoneSlotData;
  };
}

const stoneData = stoneDataJson as StoneDataItem[]

export function StonesModal({
  onClose,
  isAncient,
  slotName,
  initialValue,
  onApply,
}: StonesModalProps) {
  const [showStones, setShowStones] = useState(true);
  const [activeStone, setActiveStone] = useState<StoneType | null>(
    initialValue?.stone || null
  );
  const [selectedEffect, setSelectedEffect] = useState<string | null>(
    initialValue?.effect || null
  );
  const [effectValueIndex, setEffectValueIndex] = useState<number>(
    initialValue?.effectValueIndex ?? 0
  );
  const [stoneValueSelected, setStoneValueSelected] = useState<number | null>(
    initialValue?.value ?? null
  );

  // Usa a pedra que está selecionada no modal para pegar os dados corretos
  const currentStoneData = activeStone
    ? stoneData.find((s) => s.stone === activeStone)
    : null;

  const stoneInfo = currentStoneData?.data[slotName];

  const stoneKeys = Object.keys(stoneInfo || {})
    .filter((k) => !["type", "special_effects"].includes(k))
    .sort((a, b) => Number(a) - Number(b));

  // Pega efeitos especiais para o slot
  const specialEffectsDefault: Effect[] = stoneInfo?.special_effects?.default || [];
  const specialEffectsAncient: Effect[] = stoneInfo?.special_effects?.ancient || [];
  const specialEffectsExtra18: Effect[] = stoneInfo?.special_effects?.["18"] || [];

  // Efeitos que o usuário pode escolher
  const currentEffects = isAncient ? specialEffectsAncient : specialEffectsDefault;

  // Efeitos automáticos +18
  let automaticEffects: Effect[] = [];
  if (stoneValueSelected === 18) {
    automaticEffects = specialEffectsExtra18;
  }

  function handleStoneClick(stone: StoneType) {
    if (activeStone === stone) {
      setActiveStone(null);
      setSelectedEffect(null);
      setEffectValueIndex(0);
      setStoneValueSelected(null);
    } else {
      setActiveStone(stone);
      setSelectedEffect(null);
      setEffectValueIndex(0);
      setStoneValueSelected(null);
    }
  }

  function handleValueSelect(value: number) {
    if (!activeStone) return;

    if (activeStone === "epic" && !selectedEffect) {
      alert("Selecione um efeito especial para a pedra épica.");
      return;
    }

    setStoneValueSelected(value);

    const effectData = currentEffects.find((e) => e.name === selectedEffect);

    const effectValue = effectData?.values[effectValueIndex] ?? undefined;
    const effectValueType = effectData?.valueType ?? "flat";

    if (!stoneInfo?.type) {
      alert("Tipo da pedra não definido!");
      return;
    }

    onApply(slotName, {
      stone: activeStone,
      displayValue: value,
      value: stoneInfo?.[value],
      effect: selectedEffect ?? undefined,
      effectValueIndex,
      effectValue,
      effectValueType,
      automaticEffects,
      statusType: stoneInfo?.type || ""
    });

    setShowStones(false);
    setActiveStone(null);
    setSelectedEffect(null);
    setEffectValueIndex(0);
    setStoneValueSelected(null);
  }

  // Reseta efeito se ele não existir mais
  useEffect(() => {
    if (
      selectedEffect &&
      !currentEffects.some((e) => e.name === selectedEffect)
    ) {
      setSelectedEffect(null);
      setEffectValueIndex(0);
    }
  }, [stoneValueSelected, currentEffects, selectedEffect]);

  return (
    <BaseModal onClose={onClose}>
      <div className="flex flex-col gap-4 items-center">
        {showStones && (
          <div className="flex gap-8">
            {/* Pedra Normal */}
            <div className="flex flex-col items-center">
              <img
                src="/assets/images/system/normal_stone.png"
                alt="Normal Stone"
                className="cursor-pointer"
                onClick={() => handleStoneClick("normal")}
              />
              {activeStone === "normal" && stoneInfo && (
                <div className="flex flex-wrap gap-1 mt-2 max-w-xs max-h-40 overflow-auto border p-2 rounded bg-gray-100">
                  {stoneKeys.map((key) => (
                    <button
                      key={key}
                      onClick={() => handleValueSelect(Number(key))}
                      className={`px-2 py-1 border rounded ${stoneValueSelected === Number(key) && activeStone === "normal"
                        ? "bg-blue-300"
                        : "bg-white hover:bg-gray-200"
                        }`}
                      title={`Bonus value: ${stoneInfo[key]}`}
                    >
                      {key}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Pedra Épica */}
            <div className="flex flex-col items-center">
              <img
                src="/assets/images/system/epic_stone.png"
                alt="Epic Stone"
                className="cursor-pointer"
                onClick={() => handleStoneClick("epic")}
              />
              {activeStone === "epic" && stoneInfo && (
                <div className="flex flex-col gap-3 mt-2 max-w-xs max-h-80 overflow-auto border p-2 rounded bg-gray-100">
                  <div className="flex flex-wrap gap-1">
                    {stoneKeys.map((key) => (
                      <button
                        key={key}
                        onClick={() => handleValueSelect(Number(key))}
                        className={`px-2 py-1 border rounded ${stoneValueSelected === Number(key) && activeStone === "epic"
                          ? "bg-blue-300"
                          : "bg-white hover:bg-gray-200"
                          }`}
                        title={`Bonus value: ${stoneInfo[key]}`}
                      >
                        {key}
                      </button>
                    ))}
                  </div>

                  <label className="text-sm font-medium">Efeito Especial:</label>
                  <select
                    className="p-1 border rounded text-sm"
                    value={selectedEffect ?? ""}
                    onChange={(e) => {
                      setSelectedEffect(e.target.value || null);
                      setEffectValueIndex(0);
                    }}
                  >
                    <option value="" disabled>
                      Selecione um efeito
                    </option>
                    {currentEffects.map((effect) => (
                      <option key={effect.name} value={effect.name}>
                        {statusLabels[effect.name] ?? effect.name}
                      </option>
                    ))}
                  </select>

                  {selectedEffect && (() => {
                    const effectData = currentEffects.find((e) => e.name === selectedEffect);
                    if (!effectData || effectData.values.length <= 1) return null;
                    return (
                      <select
                        className="p-1 border rounded text-sm mt-2"
                        value={effectValueIndex}
                        onChange={(e) => setEffectValueIndex(Number(e.target.value))}
                      >
                        {effectData.values.map((val, idx) => (
                          <option key={idx} value={idx}>
                            {val}
                            {effectData.valueType === "percent" ? "%" : ""}
                          </option>
                        ))}
                      </select>
                    );
                  })()}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </BaseModal>
  );
}
