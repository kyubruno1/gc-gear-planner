import { useEffect, useState } from "react";
import { useEquip } from "../../context/EquipContext";
import { gradeColors, itemGrades, itemNames, slotNames } from "../../utils/ItemNames";
import { formatStatValue, statusLabels } from "../../utils/StatusLabel";
import { getCardSlotCount } from "../CardModal/CardModal";
import { SetEffectModal } from "../SetEffectModal/SetEffectModal";

interface HoverModalProps {
  slot: string
}

export function HoverModal({ slot }: HoverModalProps) {
  const [altPressed, setAltPressed] = useState(false);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.altKey) {
        setAltPressed(true);
      }
    }

    // function onKeyUp(e: KeyboardEvent) {
    //   if (!e.altKey) {
    //     setAltPressed(false);
    //   }
    // }

    window.addEventListener("keydown", onKeyDown);
    // window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      // window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  const { equipped } = useEquip();
  const equippedItem = equipped[slot];
  if (!equippedItem) return null; // Segurança caso não tenha equipamento nesse slot

  const gradeColor = gradeColors[equippedItem.grade];



  return (
    <>
      <div className="absolute top-5 left-28 ml-2 flex flex-col gap-[1px] p-1 rounded-md z-10 bg-[#2D3649] h-auto w-96 bg-opacity-70">
        <div className={`flex justify-center font-bold py-3 border-b border-bgdarkblue ${gradeColor}`}>
          <p>{itemNames[equippedItem.name]}</p>
        </div>

        <div className="flex p-4 justify-between border-b border-bgdarkblue items-center">
          <div className="text-white text-outline flex gap-5 items-center">
            <img className="w-[110px] h-[110px]" src={equippedItem.img} alt={equippedItem.name} />
            <div>
              <p>{slotNames[slot]}</p>
              <p>LV {equippedItem.equipLvl}</p>
            </div>
          </div>
          <p className={`${gradeColor} font-bold capitalize`}>{itemGrades[equippedItem.grade]}</p>
        </div>

        <div className="p-4 flex justify-between border-b border-bgdarkblue">
          <div className="text-textLightBlue font-bold">
            <p className="text-white">Ataque Total</p>
            <p>Ataque</p>
            <p>Defesa</p>
            <p>HP</p>
          </div>
          <div className="text-white font-bold">
            <p>-</p>
            <p>{formatStatValue("attack", equippedItem.attack ?? 0)}</p>
            <p>{formatStatValue("defense", equippedItem.defense ?? 0)}</p>
            <p>{formatStatValue("hp", equippedItem.hp ?? 0)}</p>
          </div>
        </div>

        <div className="border-b border-bgdarkblue p-4">
          <div className="bg-bgdarkblue bg-opacity-70 text-white">
            <div className="p-4  text-white">
              <div className="flex gap-4 flex-wrap flex-col">
                {/* Cartas equipadas */}
                {equippedItem.cards?.map((card, idx) => (
                  <div key={idx} className="flex gap-2">
                    <div className="w-[20px] h-[20px] border bg-gray-800 text-white flex items-center justify-center">
                      <button className="w-[16px] h-[16px] border bg-primary" />
                    </div>
                    <div>
                      {card.effects.map((effect, i) => (
                        <p key={i} className="text-xs">
                          {statusLabels[effect.name] || effect.name}: {formatStatValue(effect.name, effect.value)}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Slots vazios */}
                {Array.from({
                  length: getCardSlotCount(equippedItem.grade) - (equippedItem.cards?.length || 0),
                }).map((_, idx) => (
                  <div key={`empty-${idx}`} className="flex gap-2">
                    <button className="w-[20px] h-[20px] border bg-gray-800 text-white" />
                    <span className="text-xs text-gray-300">Encaixe Vazio</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-bgdarkblue p-4">
          <div className="p-4 text-white">
            {equippedItem.selectedProps && Object.keys(equippedItem.selectedProps).length > 0 ? (
              <div className="flex flex-col gap-2">
                {Object.entries(equippedItem.selectedProps).map(([key, value]) => {
                  const displayValue =
                    typeof value === "number"
                      ? formatStatValue(key, value)
                      : `Min: ${formatStatValue(key, value.min)} / Max: ${formatStatValue(key, value.max)}`;

                  return (
                    <div key={key} className="flex gap-1">
                      <span className="text-textLightBlue font-bold">
                        Efeito: {statusLabels[key] || key} +
                      </span>
                      <span className="text-textLightBlue font-bold">
                        {displayValue}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-gray-400">Nenhuma propriedade selecionada.</p>
            )}
          </div>
        </div>

        <div className="p-4">
          <h4 className="text-white"><span className="text-xl font-bold">Alt</span> pressione para mostrar efeito de conjunto</h4>
        </div>
      </div>
      <div>
        {altPressed && (
          <SetEffectModal />
        )}
      </div>
    </>
  );
}
