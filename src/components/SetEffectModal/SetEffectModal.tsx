import { useEffect, useState } from "react";
import { useEquip } from "../../context/EquipContext";
import setData from "../../data/bonus-set.json";
import { itemNames } from "../../utils/ItemNames";
import { formatStatValue, statusLabels } from "../../utils/StatusLabel";

interface SetEffectModalProps { }

export function SetEffectModal(props: SetEffectModalProps) {
  const { equipped } = useEquip();
  const [activeSets, setActiveSets] = useState<any[]>([]);

  useEffect(() => {
    const active: any[] = [];

    for (const set of setData) {
      const { bonusType, name, setPieces, ...bonuses } = set;

      // Conta quantas peças do set estão equipadas
      const equippedPieces = Object.values(equipped)
        .filter(item => item.bonusType === bonusType)
        .map(item => {
          console.log("Equipado:", item.name);
          return item.name;
        });

      const pieceCount = equippedPieces.length;

      if (pieceCount > 0) {
        active.push({
          name,
          bonusType,
          equippedPieces,
          totalPieces: setPieces,
          pieceCount,
          bonuses,
        });
      }
    }

    setActiveSets(active);
  }, [equipped]);

  return (
    <div className="absolute top-5 left-[31.5rem] ml-2 flex flex-col gap-[1px] p-1 rounded-md z-10 bg-[#2D3649] h-auto w-[32rem] bg-opacity-70 text-white font-bold text-sm">
      {/* <div className="flex justify-center font-bold py-3 border-b border-bgdarkblue text-gold text-lg">
        <p className="text-outline-white">Bônus de Conjunto Ativos</p>
      </div> */}

      {activeSets.length === 0 && (
        <p className="p-4 text-gray-400">Nenhum conjunto ativo.</p>
      )}

      {activeSets.map((set, idx) => (
        <div key={idx} className="border-b border-bgdarkblue">
          <div className="flex justify-center font-bold p-4 border-b border-bgdarkblue text-gold ">
            <p >{set.name}</p>
          </div>

          <ul className="grid grid-cols-1 gap-2 mb-3 p-4 border-b border-bgdarkblue">
            {set.totalPieces.map((part: string, index: number) => {
              const isEquipped = set.equippedPieces.includes(part);
              const displayName = itemNames[part] || part.replace(/_/g, " ");
              return (
                <li
                  key={index}
                  className={`p-1 ${isEquipped ? "text-gold" : "text-gray-400"}`}
                >
                  {displayName}
                </li>
              );
            })}
          </ul>

          <div className="p-4">
            <ul className="pl-2 space-y-1">
              {Object.entries(set.bonuses).map(([pieceCountStr, stats]) => {
                const threshold = parseInt(pieceCountStr);
                const isActive = set.pieceCount >= threshold;

                return (
                  <li key={pieceCountStr} className="flex justify-between p-1">
                    <span className={isActive ? "text-gold" : "text-white"}>
                      Conjunto {threshold}:
                    </span>
                    <ul className="">
                      {Object.entries(stats as Record<string, number>).map(
                        ([statKey, statValue]) => (
                          <li key={statKey} className={isActive ? "text-gold" : "text-white"}>
                            {statusLabels[statKey] || statKey}:{" "}
                            {formatStatValue(statKey, statValue)}
                          </li>
                        )
                      )}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
