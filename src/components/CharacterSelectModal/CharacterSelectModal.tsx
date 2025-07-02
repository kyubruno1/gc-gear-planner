import { useState } from "react";
import { useCharacter } from "../../context/CharacterContext";
import characters from "../../data/characters.json";
import { Character } from "../../types/character";
import { BaseModal } from "../BaseModal/BaseModal";

interface CharacterSelectModalProps {
  onClose: () => void;
}

export function CharacterSelectModal({ onClose }: CharacterSelectModalProps) {
  const [selectedCharacterName, setSelectedCharacterName] = useState<string | null>(null);
  const { setSelectedCharacter, setSelectedJobKey } = useCharacter();

  function getJobKeys(character: Character): string[] {
    return Object.keys(character.jobs).filter((key) => {
      const job = character.jobs[key];
      return Array.isArray(job) && job.length > 0;
    });
  }

  function getJobImage(jobKey: string): string {
    const jobMap: Record<string, string> = {
      first_job: "1jb",
      second_job: "2jb",
      third_job: "3jb",
      forth_job: "4jb",
    };
    return `/assets/images/system/${jobMap[jobKey] || "1jb"}.png`;
  }

  function getJobHoverImage(jobKey: string): string {
    const jobMap: Record<string, string> = {
      first_job: "1jb-hover",
      second_job: "2jb-hover",
      third_job: "3jb-hover",
      forth_job: "4jb-hover",
    };
    return `/assets/images/system/${jobMap[jobKey] || "1jb-hover"}.png`;
  }

  return (
    <BaseModal onClose={onClose} maxWidth="90rem" title="Selecione seu Personagem" titleColor="text-gold">
      <div className="p-4 max-h-[80vh] overflow-auto">
        <h1 className="text-2xl font-bold mb-4"></h1>
        <div className="grid lg:grid-cols-12 gap-6 sm:grid-cols-3">
          {characters.map((char) => (
            <div
              key={char.name}
              className="flex flex-col items-center cursor-pointer"
              onClick={() =>
                setSelectedCharacterName((prev) => (prev === char.name ? null : char.name))
              }
            >
              <h2 className="text-lg text-white font-semibold capitalize text-outline-md">{char.name}</h2>
              <img src={char.img} alt={char.name} className="w-24 h-24 object-contain mb-4" />
              {/* Botões 2x2 abaixo da imagem */}
              {selectedCharacterName === char.name && (
                <div className="grid grid-cols-2 gap-2 mb-2">
                  {getJobKeys(char).map((jobKey) => (
                    <img
                      key={jobKey}
                      src={getJobImage(jobKey)}
                      onMouseOver={(e) => {
                        e.currentTarget.src = getJobHoverImage(jobKey);
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.src = getJobImage(jobKey);
                      }}
                      className="w-12 h-12 cursor-pointer transition duration-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCharacter(char);
                        setSelectedJobKey(jobKey);
                        onClose();
                      }}
                      alt={jobKey}
                      title={jobKey.replace(/_/g, " ")}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </BaseModal>
  );
}
