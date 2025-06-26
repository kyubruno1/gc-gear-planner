import { useEquip } from "./context/EquipContext";
import { itemGrades } from "./utils/ItemNames";
import { statusLabels } from "./utils/StatusLabel";

export function EquipOverview() {
  const { equipped } = useEquip();
  //ISSO AQUI QUEBRA A IMAGEM DO PERSONAGEM
  return (
    <div className="text-white p-4 space-y-4">
      {Object.entries(equipped).map(([slot, item]) => (
        <div key={slot} className="border p-2 rounded bg-gray-900">
          {/* <pre>{JSON.stringify(item, null, 2)}</pre> */}
          <h3 className="text-lg font-bold">SLOT: {slot}</h3>
          <p>Equipped: {item.name}</p>

          {/* Cards */}
          {item.cards && item.cards.length > 0 ? (
            <p>
              Cards: [
              {item.cards.map((card, i) => (
                <span key={i}>
                  {card.name}
                  {i < item.cards.length - 1 ? ", " : ""}
                </span>
              ))}
              ]
            </p>
          ) : (
            <p>Cards: Nenhuma</p>
          )}

          {/* Selected Props */}
          {item.selectedProps ? (
            <div>
              <p>Props Selecionadas:</p>
              <ul className="ml-4 list-disc">
                {Object.entries(item.selectedProps).map(([key, val]) => {
                  // Se val for objeto { min, max }
                  if (
                    typeof val === "object" &&
                    val !== null &&
                    "min" in val &&
                    "max" in val
                  ) {
                    return (
                      <li key={key}>
                        {key}: {val.min} - {val.max}
                      </li>
                    );
                  }
                  // Se val for number direto
                  return (
                    <li key={key}>
                      {key}: {val}
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <p>Props Selecionadas: Nenhuma</p>
          )}

          {/* Pedra */}
          {item.stone ? (
            <p>
              Pedra: {itemGrades[item.stone.stone]} (+{item.stone.displayValue}) (+{item.stone.value} {statusLabels[item.stone.statusType]})
            </p>
          ) : (
            <p>Pedra: Nenhuma</p>
          )}
        </div>
      ))}
    </div>
  );
}
