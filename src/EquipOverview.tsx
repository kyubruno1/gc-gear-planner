import { useEquip } from "./context/EquipContext";

export function EquipOverview() {
  const { equipped } = useEquip();

  return (
    <div className="text-white p-4 space-y-4">
      {Object.entries(equipped).map(([slot, item]) => (
        <div key={slot} className="border p-2 rounded bg-gray-900">
          <h3 className="text-lg font-bold">SLOT: {slot}</h3>
          <p>Equipped: {item.name}</p>
          {item.cards && item.cards.length > 0 ? (
            <p>
              Cards: [
              {item.cards.map((card, i) => (
                <span key={i}>{card.name}{i < item.cards.length - 1 ? ', ' : ''}</span>
              ))}
              ]
            </p>
          ) : (
            <p>Cards: Nenhuma</p>
          )}
        </div>
      ))}
    </div>
  );
}
