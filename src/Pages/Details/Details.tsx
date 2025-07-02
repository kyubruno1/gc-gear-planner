import { useCharacter } from "../../context/CharacterContext";

export function Details() {
  const { character, selectedCharacter, selectedJobKey } = useCharacter();

  if (!character) return <p>Carregando...</p>;

  return (
    <div className="grid gap-4 bg-black p-4">
      <h2 className="text-2xl font-bold text-gold">Visualização Completa</h2>

      <div>
        <h3 className="text-xl font-semibold text-lightgray">
          Personagem:{" "}
          <span className="capitalize">
            {selectedCharacter?.name || "Nenhum selecionado"}
          </span>
        </h3>
        <h3 className="text-xl font-semibold text-lightgray">
          Classe:{" "}
          <span className="capitalize">
            {selectedJobKey
              ? selectedJobKey.replace(/_/g, " ")
              : "Nenhuma selecionada"}
          </span>
        </h3>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-lightgray">
          Ataque Total: {character.totalAttack}
        </h3>
        <pre className="text-white text-sm">
          {JSON.stringify(character.status, null, 2)}
        </pre>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-lightgray">Equipamentos</h3>
        {Object.entries(character.equipped).map(([slot, item]) => (
          <div key={slot} className="text-white">
            <strong>{slot}:</strong> {item?.name || "Vazio"}
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-xl font-semibold text-lightgray">Sets Ativos</h3>
        <ul>
          {Object.entries(character.combinedSetsEffect).map(
            ([setName, stats]) => (
              <li key={setName} className="text-white">
                <strong>{setName}</strong>
                <ul className="ml-4">
                  {Object.entries(stats).map(([statName, statValue]) => (
                    <li key={statName}>
                      {statName}: {statValue}
                    </li>
                  ))}
                </ul>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}
